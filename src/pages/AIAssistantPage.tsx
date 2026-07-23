import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { colors, radius, shadows, fontFamily, pageVariants } from "../design/tokens";
import { useAuthContext } from "../context/AuthContext";

/* ── Inline SVG Icons ── */
const HistoryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1612" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);
const RobotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="4" fill="none" />
    <circle cx="9" cy="16" r="1.5" fill="#ffffff" stroke="none" />
    <circle cx="15" cy="16" r="1.5" fill="#ffffff" stroke="none" />
    <path d="M8 7l4 4 4-4" />
    <circle cx="12" cy="5" r="2" fill="#ffffff" stroke="none" />
  </svg>
);
const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#75706b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);
const SendPaperPlaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22,2 15,22 11,13 2,9 22,2" fill="#ffffff" />
  </svg>
);

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

/* 6 Exact Suggested Prompts matching the screenshot */
const SUGGESTED_PROMPTS = [
  "Plan a 3 days trip to Goa",
  "Best places to visit in Coorg",
  "Budget hotels in Manali",
  "Top 10 beaches in India",
  "Suggest restaurants in Bangalore",
  "Find hidden gems near me",
];

/* Custom AI responses tailored to each prompt option */
const AI_RESPONSES: Record<string, string> = {
  "plan a 3 days trip to goa":
    "🏖️ **Goa 3-Day Travel Itinerary**\n\n• **Day 1 (North Goa)**: Baga Beach & Calangute Beach, water sports, sunset at Fort Aguada, and dinner at Thalassa Shack.\n• **Day 2 (South Goa)**: Heritage walk in Fontainhas Latin Quarter, Se Cathedral, & sunset cruise on Mandovi River.\n• **Day 3 (Nature & Relaxation)**: Dudhsagar Waterfalls trip, spice plantation tour, and night market shopping in Anjuna!",
  "best places to visit in coorg":
    "🌿 **Top Places in Coorg (The Scotland of India)**\n\n1. **Raja's Seat**: Breathtaking sunset viewpoint over misty green valleys.\n2. **Abbey Falls**: Stunning 70ft waterfall amidst coffee plantations.\n3. **Namdroling Monastery**: Golden Temple at Bylakuppe Tibetan settlement.\n4. **Dubare Elephant Camp**: Interactive elephant bathing & river rafting.",
  "budget hotels in manali":
    "🏔️ **Top Rated Budget Hotels in Manali**\n\n1. **The Orchard Greens** — ₹1,800/night ⭐4.6 (Old Manali views)\n2. **Zostel Manali** — ₹850/bed ⭐4.8 (Social backpacker vibe)\n3. **Snow Valley Resorts** — ₹2,400/night ⭐4.7 (Family friendly)\n4. **Hosteller Old Manali** — ₹950/bed ⭐4.7 (Riverside stay)",
  "top 10 beaches in india":
    "🌊 **Top Beaches in India**\n\n1. **Radhanagar Beach** — Havelock Island (Crystal clear blue)\n2. **Baga Beach** — North Goa (Water sports & nightlife)\n3. **Palolem Beach** — South Goa (Peaceful crescent cove)\n4. **Varkala Beach** — Kerala (Dramatic red cliff coastline)\n5. **Kovalam Beach** — Trivandrum (Lighthouse viewpoint)\n6. **Om Beach** — Gokarna (OM-shaped serene shore)\n7. **Puri Beach** — Odisha | 8. **Dhanushkodi** — Rameswaram\n9. **Marari Beach** — Alleppey | 10. **Tarkarli** — Maharashtra",
  "suggest restaurants in bangalore":
    "🍽️ **Must-Try Restaurants in Bangalore**\n\n1. **CTR (Shri Sagar)** — Legendary Crispy Butter Masala Dosa 🧈\n2. **Toit Brewpub (Indiranagar)** — Craft brews & wood-fired pizzas 🍕\n3. **Nagarjuna (MG Road)** — Authentic Andhra Spicy Meal Thali 🌶️\n4. **Corner House Ice Cream** — Iconic Death By Chocolate 🍨\n5. **Truffles (Koramangala)** — Famous juicy burgers 🍔",
  "find hidden gems near me":
    "✨ **Hidden Gems & Secret Escapes**\n\n1. **Gandikota Canyon** — India's Grand Canyon with Red Granite cliffs over river Pennar.\n2. **Yana Caves** — Massive black karst rock monoliths in dense Karnataka forests.\n3. **Gokarna Secret Beaches** — Half Moon & Paradise beach hike.\n4. **Chitradurga Fort** — Stone fortress of 18 palaces & secret tunnels.",
};

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function generateAIAnswer(query: string): string {
  const q = query.toLowerCase();
  for (const [key, val] of Object.entries(AI_RESPONSES)) {
    if (q.includes(key) || key.includes(q)) return val;
  }
  return `✨ Here are your personalized recommendations for "${query}":\n\n• **Top Spot**: High-rated scenic destination with rich cultural heritage.\n• **Best Season**: October to March for pleasant weather.\n• **Pro Tip**: Book early & check local weather updates beforehand. Would you like a step-by-step 3-day itinerary? 🗺️`;
}

/**
 * AIAssistantPage — Matches exact user screenshot with prompt cards, robot badge, and AI engine.
 */
const AIAssistantPage: React.FC = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const userName = (user?.displayName?.split(" ")[0] || "Raghu").trim();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend.trim(),
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: generateAIAnswer(textToSend),
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleClearHistory = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <motion.div
      key="ai-assistant-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ height: "100%", backgroundColor: "#f8f7f4", display: "flex", flexDirection: "column" }}
    >
      {/* Top Header — Matching screenshot */}
      <div style={{
        padding: "16px 18px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f8f7f4",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
      }}>
        <h1 style={{
          fontFamily: fontFamily.display,
          fontWeight: 800,
          fontSize: "1.5rem",
          color: "#1a1612",
          letterSpacing: "-0.01em",
        }}>
          AI Assistant
        </h1>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleClearHistory}
          title="Reset conversation"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HistoryIcon />
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="page-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* AI Greeting Card — Matching exact screenshot */}
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          {/* Blue Circular Robot Badge */}
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: radius.full,
            background: "linear-gradient(135deg, #3a6bd8 0%, #2a52b2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(58,107,216,0.3)",
            flexShrink: 0,
          }}>
            <RobotIcon />
          </div>

          {/* Greeting Bubble */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "14px 18px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
            maxWidth: "82%",
          }}>
            <p style={{
              fontFamily: fontFamily.display,
              fontWeight: 700,
              fontSize: "0.98rem",
              color: "#1a1612",
              marginBottom: "4px",
            }}>
              Hi {userName}! 👋
            </p>
            <p style={{
              fontFamily: fontFamily.sans,
              fontSize: "0.86rem",
              color: "#4a4540",
              lineHeight: 1.45,
            }}>
              I'm your TourGo AI Assistant.<br />
              How can I help you today?
            </p>
          </div>
        </div>

        {/* Initial State: Render 6 Suggested Prompt Cards if no chat started yet */}
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
            {SUGGESTED_PROMPTS.map((promptText) => (
              <motion.button
                key={promptText}
                whileHover={{ scale: 1.015, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSendMessage(promptText)}
                style={{
                  width: "100%",
                  padding: "15px 18px",
                  borderRadius: "20px",
                  backgroundColor: "#ffffff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{
                  fontFamily: fontFamily.sans,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  color: "#1a1612",
                }}>
                  {promptText}
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Chat Messages Stream */}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                gap: "10px",
              }}
            >
              {msg.role === "ai" && (
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: radius.full,
                  background: "linear-gradient(135deg, #3a6bd8 0%, #2a52b2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <RobotIcon />
                </div>
              )}

              <div style={{
                maxWidth: "82%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                backgroundColor: msg.role === "user" ? "#3a6bd8" : "#ffffff",
                color: msg.role === "user" ? "#ffffff" : "#1a1612",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}>
                <p style={{
                  fontFamily: fontFamily.sans,
                  fontSize: "0.88rem",
                  lineHeight: 1.55,
                  whiteSpace: "pre-line",
                }}>
                  {msg.text}
                </p>
                <p style={{
                  fontFamily: fontFamily.sans,
                  fontSize: "0.65rem",
                  color: msg.role === "user" ? "rgba(255,255,255,0.75)" : "#8a8580",
                  marginTop: "6px",
                  textAlign: "right",
                }}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing Animation Indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: radius.full,
                background: "linear-gradient(135deg, #3a6bd8 0%, #2a52b2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <RobotIcon />
              </div>
              <div style={{
                padding: "12px 18px",
                borderRadius: "20px 20px 20px 4px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                    style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3a6bd8" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Floating Bottom Input Box — Matching exact screenshot */}
      <div style={{
        padding: "10px 18px 96px",
        backgroundColor: "transparent",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          {/* Pill Search Input */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "12px 18px",
            backgroundColor: "#ffffff",
            borderRadius: radius.full,
            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          }}>
            <input
              id="ai-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(input)}
              placeholder="Ask me anything..."
              style={{
                border: "none",
                background: "none",
                outline: "none",
                width: "100%",
                fontFamily: fontFamily.sans,
                fontSize: "0.9rem",
                color: "#1a1612",
                fontWeight: 500,
              }}
            />
            <span style={{ color: "#8a8580", display: "flex", cursor: "pointer" }} title="Voice mic input">
              <MicIcon />
            </span>
          </div>

          {/* Send Button */}
          <motion.button
            id="ai-send"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim()}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: radius.full,
              backgroundColor: "#3a6bd8",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: input.trim() ? "pointer" : "pointer",
              boxShadow: "0 4px 16px rgba(58,107,216,0.4)",
              flexShrink: 0,
            }}
          >
            <SendPaperPlaneIcon />
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default AIAssistantPage;
