import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import {
  colors,
  radius,
  shadows,
  fontFamily,
  pageVariants,
  staggerContainer,
  staggerItem,
} from "../design/tokens";

/* ── SVG Icons matching screenshot ── */
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8580" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8580" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><circle cx="15" cy="6" r="1.8" fill="none" />
    <line x1="4" y1="12" x2="20" y2="12" /><circle cx="9" cy="12" r="1.8" fill="none" />
    <line x1="4" y1="18" x2="20" y2="18" /><circle cx="17" cy="18" r="1.8" fill="none" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff8a00" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

const iconWrapper = (paths: React.ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

/* 10 Categories — Exact 2 rows of 5 icons matching the screenshot */
const CATEGORIES = [
  { id: "all", label: "All", color: "#ff8a00", bgLight: "#fff5eb", icon: iconWrapper(<circle cx="12" cy="12" r="9" />) },
  { id: "hotels", label: "Hotels", color: "#3a6bd8", bgLight: "#eef3ff", icon: iconWrapper(<><rect x="4" y="3" width="10" height="18" /><path d="M14 21v-6h6v6" /></>) },
  { id: "restaurants", label: "Restaurants", color: "#e6643c", bgLight: "#fff2eb", icon: iconWrapper(<><path d="M6 2v7a2 2 0 002 2 2 2 0 002-2V2M8 11v11" /><path d="M17 2v20M17 2a4 4 0 00-4 4v3h8" /></>) },
  { id: "temples", label: "Temples", color: "#9360d8", bgLight: "#f3eeff", icon: iconWrapper(<><path d="M12 2l8 6H4l8-6z" /><path d="M6 8v13M18 8v13M2 21h20" /></>) },
  { id: "beaches", label: "Beaches", color: "#1890ff", bgLight: "#e6f7ff", icon: iconWrapper(<><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><circle cx="17" cy="6" r="3" /></>) },
  { id: "nature", label: "Nature", color: "#27ae60", bgLight: "#eaf8ef", icon: iconWrapper(<path d="M12 2L4 14h5l-2 8 9-12h-5l1-8z" />) },
  { id: "adventure", label: "Adventure", color: "#ff6b4a", bgLight: "#fff0eb", icon: iconWrapper(<polygon points="12,2 22,20 2,20" />) },
  { id: "heritage", label: "Heritage", color: "#6c5ce7", bgLight: "#f0edff", icon: iconWrapper(<><path d="M4 22V10l8-6 8 6v12" /><path d="M9 22v-6h6v6" /></>) },
  { id: "shopping", label: "Shopping", color: "#e84393", bgLight: "#ffeef4", icon: iconWrapper(<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 01-8 0" /></>) },
  { id: "events", label: "Events", color: "#faad14", bgLight: "#fffbe6", icon: iconWrapper(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>) },
];

/* Rich dataset per category so all options render live, matching cards */
const DESTINATIONS_DATA: Record<string, Array<{ id: string; name: string; rating: string; img: string; sub?: string }>> = {
  all: [
    { id: "manali", name: "Manali", rating: "4.6", img: "https://images.unsplash.com/photo-1626621341169-4a1e435c7f00?auto=format&fit=crop&w=500&q=80" },
    { id: "udaipur", name: "Udaipur", rating: "4.7", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80" },
    { id: "kerala", name: "Kerala", rating: "4.8", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=500&q=80" },
    { id: "goa", name: "Goa", rating: "4.8", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=500&q=80" },
  ],
  hotels: [
    { id: "taj-goa", name: "Taj Resort Goa", rating: "4.8", sub: "₹8,999/night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
    { id: "radisson-goa", name: "Radisson Blu", rating: "4.6", sub: "₹6,499/night", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" },
    { id: "leela-udaipur", name: "The Leela Palace", rating: "4.9", sub: "₹14,500/night", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=80" },
  ],
  restaurants: [
    { id: "thalassa", name: "Thalassa Shack", rating: "4.7", sub: "Greek & Seafood", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
    { id: "ambrai", name: "Ambrai Udaipur", rating: "4.8", sub: "Lake View Dining", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80" },
    { id: "fishermans", name: "Fisherman's Wharf", rating: "4.6", sub: "Goan Curry Special", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" },
  ],
  temples: [
    { id: "hampi", name: "Virupaksha Temple", rating: "4.8", sub: "Historic Ruins", img: "https://images.unsplash.com/photo-1600100397608-f886b5b70712?auto=format&fit=crop&w=500&q=80" },
    { id: "meenakshi", name: "Meenakshi Temple", rating: "4.9", sub: "Madurai", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" },
    { id: "golden-temple", name: "Golden Temple", rating: "4.9", sub: "Amritsar", img: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=500&q=80" },
  ],
  beaches: [
    { id: "baga", name: "Baga Beach", rating: "4.6", sub: "North Goa", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
    { id: "calangute", name: "Calangute Beach", rating: "4.5", sub: "North Goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80" },
    { id: "palolem", name: "Palolem Beach", rating: "4.7", sub: "South Goa", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=500&q=80" },
  ],
  nature: [
    { id: "coorg", name: "Coorg Mist Hills", rating: "4.7", sub: "Coffee Plantations", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=500&q=80" },
    { id: "chikmagalur", name: "Chikmagalur", rating: "4.6", sub: "Lush Waterfalls", img: "https://images.unsplash.com/photo-1601579112923-c5d2b6a8c8e4?auto=format&fit=crop&w=500&q=80" },
    { id: "munnar", name: "Munnar Tea Valleys", rating: "4.8", sub: "Kerala Nature", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=500&q=80" },
  ],
  adventure: [
    { id: "solang", name: "Solang Paragliding", rating: "4.8", sub: "Manali Himalaya", img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=500&q=80" },
    { id: "rishikesh", name: "River Rafting", rating: "4.8", sub: "Rishikesh Rapids", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80" },
    { id: "bir-billing", name: "Bir Billing Flight", rating: "4.9", sub: "Sky Adventures", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80" },
  ],
  heritage: [
    { id: "amer-fort", name: "Amer Fort Jaipur", rating: "4.8", sub: "Royal Architecture", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80" },
    { id: "taj-mahal", name: "Taj Mahal Agra", rating: "4.9", sub: "Wonder of World", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80" },
    { id: "mysore-palace", name: "Mysore Palace", rating: "4.7", sub: "Illuminated Fort", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=500&q=80" },
  ],
  shopping: [
    { id: "anjuna-market", name: "Anjuna Flea Market", rating: "4.6", sub: "Goa Beach Bazaar", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=500&q=80" },
    { id: "johari-bazaar", name: "Johari Bazaar", rating: "4.7", sub: "Jaipur Jewelry", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=500&q=80" },
    { id: "dilli-haat", name: "Dilli Haat Craft", rating: "4.6", sub: "Handloom Crafts", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=500&q=80" },
  ],
  events: [
    { id: "sunburn", name: "Sunburn Music Fest", rating: "4.8", sub: "Vagator Goa", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80" },
    { id: "hornbill", name: "Hornbill Festival", rating: "4.9", sub: "Nagaland Heritage", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80" },
    { id: "pushkar", name: "Pushkar Camel Fair", rating: "4.7", sub: "Rajasthan Cultural", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80" },
  ],
};

const EXPERIENCES_DATA = [
  { id: "watersports", name: "Water Sports", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80" },
  { id: "trekking", name: "Trekking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=300&q=80" },
  { id: "hillstations", name: "Hill Stations", img: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=300&q=80" },
  { id: "wildlife", name: "Wildlife", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80" },
];

/**
 * ExplorePage — Fully functional 10 category options + live search & card detail navigation.
 */
const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentDestinations = (DESTINATIONS_DATA[activeCategory] || DESTINATIONS_DATA.all).filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.sub && item.sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      key="explore-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff", position: "relative", overflow: "hidden" }}
    >
      <div className="page-scroll" style={{ flex: 1, paddingBottom: "100px" }}>
      <div style={{ padding: "16px 18px 10px" }}>
        {/* Explore Title */}
        <h1 style={{
          fontFamily: fontFamily.display,
          fontWeight: 800,
          fontSize: "1.6rem",
          color: "#1a1612",
          marginBottom: "14px",
          letterSpacing: "-0.01em",
        }}>
          Explore
        </h1>

        {/* Search Bar Input — Functional real-time search & click handler */}
        <div
          id="explore-search-bar"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            borderRadius: radius.full,
            border: "1px solid rgba(0,0,0,0.06)",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "#8a8580", display: "flex" }}><SearchIcon /></span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search places, hotels, restaurants..."
            style={{
              border: "none",
              background: "none",
              outline: "none",
              width: "100%",
              fontFamily: fontFamily.sans,
              fontSize: "0.88rem",
              color: "#1a1612",
              fontWeight: 500,
            }}
          />
          <button
            onClick={() => navigate("/search")}
            style={{ border: "none", background: "none", padding: 0, cursor: "pointer", color: "#8a8580", display: "flex" }}
          >
            <FilterIcon />
          </button>
        </div>

        {/* 2 Rows of 5 Circular Category Buttons — 100% Functional Options */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          rowGap: "16px",
          columnGap: "4px",
          marginBottom: "16px",
        }}>
          {CATEGORIES.map((c) => {
            const isActive = c.id === activeCategory;
            return (
              <motion.button
                key={c.id}
                id={`explore-cat-${c.id}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  setActiveCategory(c.id);
                  if (c.id === "hotels") navigate("/bookings");
                }}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: radius.full,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "#ffffff" : c.color,
                  backgroundColor: isActive ? c.color : c.bgLight,
                  boxShadow: isActive ? `0 6px 18px ${c.color}50` : "none",
                  transition: "all 0.22s ease",
                }}>
                  {c.icon}
                </span>
                <span style={{
                  fontFamily: fontFamily.sans,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.7rem",
                  color: isActive ? c.color : "#1a1612",
                  textAlign: "center",
                  lineHeight: 1.1,
                  transition: "color 0.2s ease",
                }}>
                  {c.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Section Header based on active category */}
      <section style={{ marginBottom: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", marginBottom: "12px" }}>
          <h2 style={{
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: "1.02rem",
            color: "#1a1612",
            letterSpacing: "-0.01em",
          }}>
            {activeCategory === "all" ? "Trending Destinations" : `${CATEGORIES.find((c) => c.id === activeCategory)?.label || "Trending"} Places`}
          </h2>
          <button
            id="dest-view-all"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
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

        {/* Destination Cards Rail */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            padding: "0 18px 4px",
            scrollbarWidth: "none",
          }}
        >
          <AnimatePresence mode="popLayout">
            {currentDestinations.map((d) => (
              <motion.button
                key={d.id}
                id={`dest-${d.id}`}
                layout
                variants={staggerItem}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/place/${d.id}`)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                  width: "155px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <div style={{
                  width: "155px",
                  height: "160px",
                  borderRadius: "22px",
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  position: "relative",
                  backgroundColor: "#f4f3ef",
                }}>
                  <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    right: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.94rem", color: "#ffffff" }}>
                        {d.name}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <StarIcon />
                        <span style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.75rem", color: "#ffffff" }}>
                          {d.rating}
                        </span>
                      </span>
                    </div>
                    {d.sub && (
                      <span style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "rgba(255,255,255,0.85)" }}>
                        {d.sub}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Popular Experiences Section */}
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", marginBottom: "12px" }}>
          <h2 style={{
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: "1.02rem",
            color: "#1a1612",
            letterSpacing: "-0.01em",
          }}>
            Popular Experiences
          </h2>
          <button
            id="exp-view-all"
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
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            padding: "0 18px 4px",
            scrollbarWidth: "none",
          }}
        >
          {EXPERIENCES_DATA.map((e) => (
            <motion.button
              key={e.id}
              id={`exp-${e.id}`}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (e.id === "watersports") setActiveCategory("adventure");
                else if (e.id === "trekking") setActiveCategory("nature");
                else if (e.id === "hillstations") setActiveCategory("nature");
                else if (e.id === "wildlife") setActiveCategory("nature");
              }}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                width: "110px",
                textAlign: "left",
              }}
            >
              <div style={{
                width: "110px",
                height: "110px",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "8px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                position: "relative",
                backgroundColor: "#f4f3ef",
              }}>
                <img src={e.img} alt={e.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.7) 100%)",
                }} />
                <p style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "8px",
                  right: "8px",
                  fontFamily: fontFamily.display,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}>
                  {e.name}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default ExplorePage;
