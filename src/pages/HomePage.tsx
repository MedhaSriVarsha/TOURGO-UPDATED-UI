import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import {
  colors,
  radius,
  fontFamily,
  pageVariants,
  staggerContainer,
  staggerItem,
} from "../design/tokens";
import { useAuthContext } from "../context/AuthContext";
import logoPng from "../assets/logo.png";
import logo1Png from "../assets/logo1.png";
import taglinePng from "../assets/tagline.png";
import textPng from "../assets/text.png";
import heroPng from "../assets/hero.png";

/* ── Inline SVG icons matching the exact mockup ── */
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#75706b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#75706b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><circle cx="15" cy="6" r="1.8" fill="none" />
    <line x1="4" y1="12" x2="20" y2="12" /><circle cx="9" cy="12" r="1.8" fill="none" />
    <line x1="4" y1="18" x2="20" y2="18" /><circle cx="17" cy="18" r="1.8" fill="none" />
  </svg>
);
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1612" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);
const CompassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="#FF6B00" stroke="none" />
  </svg>
);
const HotelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="12" height="18" rx="1" /><path d="M8 7h2M8 11h2M8 15h2M12 21v-4h4v4" />
  </svg>
);
const NearbyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="#22C55E" stroke="none" />
    <circle cx="12" cy="10" r="3" fill="#ffffff" stroke="none" />
  </svg>
);
const OfferIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24H4a1 1 0 00-1 1v5.59a2 2 0 00.59 1.41l9.58 9.59a2 2 0 002.83 0l5.59-5.59a2 2 0 000-2.83z" fill="#7C5CFF" stroke="none" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="#ffffff" stroke="none" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF6B00" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

/* ── Data matching the screenshot + expanded places ── */
const QUICK_ACTIONS = [
  { id: "explore", label: "Explore", icon: <CompassIcon />, color: "#FF6B00", active: true, path: "/explore" },
  { id: "hotels", label: "Hotels", icon: <HotelIcon />, color: "#2563EB", active: false, path: "/bookings" },
  { id: "nearby", label: "Nearby", icon: <NearbyIcon />, color: "#22C55E", active: false, path: "/explore" },
  { id: "offers", label: "Offers", icon: <OfferIcon />, color: "#7C5CFF", active: false, path: "/rewards" },
];

const POPULAR_PLACES = [
  { id: "goa", name: "Goa", sub: "Beach Paradise", rating: "4.8", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
  { id: "coorg", name: "Coorg", sub: "Scenic Hills", rating: "4.7", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=400&q=80" },
  { id: "hampi", name: "Hampi", sub: "Historic Wonder", rating: "4.6", img: "https://images.unsplash.com/photo-1600100397608-f886b5b70712?auto=format&fit=crop&w=400&q=80" },
  { id: "chikmagalur", name: "Chikmagalur", sub: "Green Escape", rating: "4.6", img: "https://images.unsplash.com/photo-1601579112923-c5d2b6a8c8e4?auto=format&fit=crop&w=400&q=80" },
  { id: "manali", name: "Manali", sub: "Snow & Valleys", rating: "4.8", img: "https://images.unsplash.com/photo-1626621341169-4a1e435c7f00?auto=format&fit=crop&w=400&q=80" },
  { id: "udaipur", name: "Udaipur", sub: "City of Lakes", rating: "4.7", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80" },
  { id: "kerala", name: "Kerala", sub: "Backwaters & Palms", rating: "4.9", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80" },
  { id: "jaipur", name: "Jaipur", sub: "Royal Heritage", rating: "4.6", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80" },
];

const TRENDING_EXPERIENCES = [
  { id: "adventure", name: "Adventure", sub: "12+ Activities", img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=400&q=80" },
  { id: "heritage", name: "Heritage", sub: "30+ Places", img: "https://images.unsplash.com/photo-1600100397608-f886b5b70712?auto=format&fit=crop&w=400&q=80" },
  { id: "watersports", name: "Water Sports", sub: "15+ Activities", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80" },
  { id: "wildlife", name: "Wildlife", sub: "20+ Safaris", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80" },
  { id: "trekking", name: "Trekking", sub: "18+ Routes", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80" },
  { id: "hillstations", name: "Hill Stations", sub: "25+ Resorts", img: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=400&q=80" },
];

/**
 * HomePage — TourGo Home screen matching the user's reference image exactly.
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activeAction, setActiveAction] = React.useState("explore");

  return (
    <motion.div
      key="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff", position: "relative", overflow: "hidden" }}
    >
      <div className="page-scroll" style={{ flex: 1, paddingBottom: "110px" }}>
        {/* ── TOP HERO SECTION (Luxury Tourism Landing Section with Brighter Bagan Sunrise Overlay) ── */}
        <div
          style={{
            position: "relative",
            padding: "20px 18px 60px",
            minHeight: "360px",
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(240, 130, 40, 0.08) 40%, rgba(20, 12, 8, 0.25) 85%, rgba(255, 255, 255, 0.05) 100%), url(${heroPng})`,
            backgroundSize: "108% 108%",
            backgroundPosition: "center center",
            borderRadius: "0px",
            filter: "contrast(1.28) brightness(0.92) saturate(1.25)",
          }}
        >
          {/* 3 Hot Air Balloons Clustered in Upper-Right Sky */}
          <div style={{ position: "absolute", top: "52px", right: "26px", opacity: 0.95, pointerEvents: "none", zIndex: 1 }}>
            <svg width="36" height="44" viewBox="0 0 34 42" fill="none">
              <path d="M17 0C7.61 0 0 7.61 0 17C0 24.5 9 34 17 40C25 34 34 24.5 34 17C34 7.61 26.39 0 17 0Z" fill="url(#balloonGrad1)" />
              <rect x="14" y="38" width="6" height="4" rx="1" fill="#4a210f" />
              <line x1="15" y1="34" x2="15" y2="38" stroke="#331408" strokeWidth="0.8" />
              <line x1="19" y1="34" x2="19" y2="38" stroke="#331408" strokeWidth="0.8" />
              <defs>
                <linearGradient id="balloonGrad1" x1="0" y1="0" x2="34" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#d96828" />
                  <stop offset="0.6" stopColor="#a34116" />
                  <stop offset="1" stopColor="#5c1f0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div style={{ position: "absolute", top: "112px", right: "56px", opacity: 0.9, pointerEvents: "none", zIndex: 1 }}>
            <svg width="24" height="30" viewBox="0 0 34 42" fill="none">
              <path d="M17 0C7.61 0 0 7.61 0 17C0 24.5 9 34 17 40C25 34 34 24.5 34 17C34 7.61 26.39 0 17 0Z" fill="url(#balloonGrad2)" />
              <rect x="14" y="38" width="6" height="4" rx="1" fill="#4a210f" />
              <defs>
                <linearGradient id="balloonGrad2" x1="0" y1="0" x2="34" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c45a25" />
                  <stop offset="1" stopColor="#69250d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div style={{ position: "absolute", top: "86px", right: "96px", opacity: 0.85, pointerEvents: "none", zIndex: 1 }}>
            <svg width="14" height="18" viewBox="0 0 34 42" fill="none">
              <path d="M17 0C7.61 0 0 7.61 0 17C0 24.5 9 34 17 40C25 34 34 24.5 34 17C34 7.61 26.39 0 17 0Z" fill="#782d11" />
            </svg>
          </div>

          {/* Top Header Row: 54x54 Profile Avatar (Left), Centered Logo, 54x54 Notification Glass Bell (Right) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "26px", position: "relative", zIndex: 2 }}>
            {/* Left: 54x54 Profile Avatar with thin orange border (#FF6B00) and subtle shadow */}
            <motion.button
              id="home-avatar"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/profile")}
              style={{
                width: "54px",
                height: "54px",
                borderRadius: radius.full,
                border: "2px solid #FF6B00",
                boxShadow: "0 4px 14px rgba(255, 107, 0, 0.2)",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Raghu Charan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span style={{ fontFamily: fontFamily.display, fontWeight: 700, color: colors.blue, fontSize: "1.2rem" }}>
                {(user?.displayName || "R")[0]}
              </span>
            </motion.button>

            {/* Center: Official TOURGO Logo (Man on bike between palm trees + TOURGO title text below bike + tagline) */}
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 4px" }}>
              <img
                src={logo1Png}
                alt="Man on bike between palm trees"
                style={{
                  width: "95px",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 2px 10px rgba(255, 107, 0, 0.18))",
                }}
                onError={(e) => {
                  (e.target as HTMLElement).src = logoPng;
                }}
              />
              <img
                src={textPng}
                alt="TOURGO"
                style={{
                  width: "108px",
                  height: "auto",
                  display: "block",
                  marginTop: "-1px",
                  filter: "drop-shadow(0 2px 8px rgba(37, 99, 235, 0.15))",
                }}
              />
              <img
                src={taglinePng}
                alt="TRAVEL BEYOND THE OBVIOUS"
                style={{
                  width: "124px",
                  height: "auto",
                  display: "block",
                  marginTop: "2px",
                }}
              />
            </div>

            {/* Right: Notification Bell inside a White Circular Glass Button with Orange Badge */}
            <motion.button
              id="home-notifications"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/profile", { state: { openModal: "notifications" } })}
              style={{
                width: "54px",
                height: "54px",
                borderRadius: radius.full,
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a1612",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              }}
            >
              <BellIcon />
              <span style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "9px",
                height: "9px",
                borderRadius: radius.full,
                backgroundColor: "#FF6B00",
                boxShadow: "0 0 0 2px #ffffff",
              }} />
            </motion.button>
          </div>

          {/* Heading: Large Premium Heading, "go?" in vibrant travel orange (#FF6B00) */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', 'Poppins', 'SF Pro Display', sans-serif",
            fontWeight: 800,
            fontSize: "2.35rem",
            color: "#1a1612",
            lineHeight: 1.15,
            marginBottom: "26px",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: 2,
          }}>
            Where do you<br />want to <span style={{ color: "#FF6B00" }}>go?</span>
          </h1>

          {/* Search Bar: Floating White Glass Card, 32px Radius, Circular Filter Button */}
          <motion.button
            id="home-search-bar"
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/search")}
            style={{
              width: "100%",
              height: "68px",
              borderRadius: "32px",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 14px 36px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.03)",
              padding: "0 12px 0 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span style={{ color: "#5a5550", display: "flex", alignItems: "center", flexShrink: 0 }}><SearchIcon /></span>
            <span style={{
              fontFamily: fontFamily.sans,
              fontSize: "0.84rem",
              color: "#8a8580",
              flex: 1,
              textAlign: "left",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
            }}>
              Search hotels, places, restaurants...
            </span>
            <span style={{
              width: "44px",
              height: "44px",
              borderRadius: radius.full,
              backgroundColor: "#f7f6f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5a5550",
              flexShrink: 0,
            }}>
              <FilterIcon />
            </span>
          </motion.button>
        </div>

        {/* Floating Quick-Access Card — White Glass, 28px Radius, Modern iOS Aesthetic */}
        <div style={{ padding: "0 18px", marginTop: "-34px", marginBottom: "28px", position: "relative", zIndex: 10 }}>
          <div style={{
            display: "flex",
            justify: "space-around",
            backgroundColor: "#ffffff",
            borderRadius: "28px",
            padding: "18px 10px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.03)",
          }}>
            {QUICK_ACTIONS.map((a) => {
              const isActive = activeAction === a.id;
              return (
                <motion.button
                  key={a.id}
                  id={`quick-${a.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveAction(a.id);
                    navigate(a.path);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  <span style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: radius.full,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isActive ? `${a.color}18` : "#f7f6f2",
                    boxShadow: isActive ? `inset 0 0 0 1.8px ${a.color}` : "none",
                    transition: "all 0.2s ease",
                  }}>
                    {a.icon}
                  </span>
                  <span style={{
                    fontFamily: fontFamily.sans,
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "0.84rem",
                    color: isActive ? a.color : "#1a1612",
                    transition: "color 0.2s ease",
                  }}>
                    {a.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Popular places near you */}
        <section style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", marginBottom: "14px" }}>
            <h2 style={{
              fontFamily: fontFamily.display,
              fontWeight: 700,
              fontSize: "1.02rem",
              color: colors.textPrimary,
              letterSpacing: "-0.01em",
            }}>
              Popular places near you
            </h2>
            <button
              id="popular-view-all"
              onClick={() => navigate("/explore")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: fontFamily.sans,
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#3a6bd8",
              }}
            >
              View all
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "0 18px 4px", scrollbarWidth: "none" }}
          >
            {POPULAR_PLACES.map((p) => (
              <motion.button
                key={p.id}
                id={`popular-${p.id}`}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/place/${p.id}`)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                  width: "128px",
                  textAlign: "left",
                }}
              >
                <div style={{
                  width: "128px",
                  height: "148px",
                  borderRadius: "22px",
                  overflow: "hidden",
                  marginBottom: "8px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  backgroundColor: colors.bgLight,
                }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p style={{
                  fontFamily: fontFamily.display,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}>
                  {p.name}
                </p>
                <p style={{
                  fontFamily: fontFamily.sans,
                  fontSize: "0.72rem",
                  color: colors.textMuted,
                  marginTop: "2px",
                  marginBottom: "3px",
                }}>
                  {p.sub}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <StarIcon />
                  <span style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.74rem", color: colors.textSecondary }}>
                    {p.rating}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Trending Experiences */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", marginBottom: "14px" }}>
            <h2 style={{
              fontFamily: fontFamily.display,
              fontWeight: 700,
              fontSize: "1.02rem",
              color: colors.textPrimary,
              letterSpacing: "-0.01em",
            }}>
              Trending Experiences
            </h2>
            <button
              id="trending-view-all"
              onClick={() => navigate("/explore")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: fontFamily.sans,
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#3a6bd8",
              }}
            >
              View all
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "0 18px 4px", scrollbarWidth: "none" }}
          >
            {TRENDING_EXPERIENCES.map((e) => (
              <motion.button
                key={e.id}
                id={`trend-${e.id}`}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/explore")}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                  width: "128px",
                  textAlign: "left",
                }}
              >
                <div style={{
                  width: "128px",
                  height: "148px",
                  borderRadius: "22px",
                  overflow: "hidden",
                  marginBottom: "8px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  backgroundColor: colors.bgLight,
                }}>
                  <img src={e.img} alt={e.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p style={{
                  fontFamily: fontFamily.display,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}>
                  {e.name}
                </p>
                <p style={{
                  fontFamily: fontFamily.sans,
                  fontSize: "0.72rem",
                  color: colors.textMuted,
                  marginTop: "2px",
                }}>
                  {e.sub}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </section>
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default HomePage;
