import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><circle cx="15" cy="6" r="1.6" fill="currentColor" stroke="none" />
    <line x1="4" y1="12" x2="20" y2="12" /><circle cx="9" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <line x1="4" y1="18" x2="20" y2="18" /><circle cx="17" cy="18" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff8a00" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

const CATEGORIES = ["All", "Temples", "Food", "Hotels", "Beaches", "Nature"];

const PLACES: Record<string, { id: string; name: string; area: string; rating: string; reviews: string; img: string }[]> = {
  Beaches: [
    { id: "baga-beach", name: "Baga Beach", area: "North Goa", rating: "4.6", reviews: "950", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=70" },
    { id: "calangute-beach", name: "Calangute Beach", area: "North Goa", rating: "4.5", reviews: "950", img: "https://images.unsplash.com/photo-1559636225-ef5c8ab2e908?auto=format&fit=crop&w=400&q=70" },
    { id: "palolem-beach", name: "Palolem Beach", area: "South Goa", rating: "4.7", reviews: "780", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=70" },
    { id: "anjuna-beach", name: "Anjuna Beach", area: "North Goa", rating: "4.4", reviews: "760", img: "https://images.unsplash.com/photo-1584573397395-7d16bb0b1a1a?auto=format&fit=crop&w=400&q=70" },
  ],
  Temples: [
    { id: "virupaksha-temple", name: "Virupaksha Temple", area: "Hampi", rating: "4.7", reviews: "1.1k", img: "https://images.unsplash.com/photo-1600100397608-f886b5b70712?auto=format&fit=crop&w=400&q=70" },
    { id: "shanti-durga", name: "Shanti Durga Temple", area: "Goa", rating: "4.6", reviews: "610", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=70" },
  ],
  Food: [
    { id: "fisherman-wharf", name: "Fisherman's Wharf", area: "Panjim, Goa", rating: "4.5", reviews: "820", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=70" },
    { id: "vinayak-family", name: "Vinayak Family Restaurant", area: "Anjuna, Goa", rating: "4.4", reviews: "540", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=70" },
  ],
  Hotels: [
    { id: "taj-resort", name: "Taj Resort & Spa", area: "Baga, North Goa", rating: "4.8", reviews: "1.3k", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=70" },
  ],
  Nature: [
    { id: "dudhsagar-falls", name: "Dudhsagar Falls", area: "Goa-Karnataka border", rating: "4.8", reviews: "1.4k", img: "https://images.unsplash.com/photo-1601579112923-c5d2b6a8c8e4?auto=format&fit=crop&w=400&q=70" },
  ],
};

/**
 * SearchPage — "Search Places" screen. Free-text search + category
 * filter pills, results grouped by the active category.
 */
const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("Goa");
  const [active, setActive] = useState("Beaches");

  const results = useMemo(() => {
    if (active === "All") return Object.values(PLACES).flat();
    return PLACES[active] || [];
  }, [active]);

  return (
    <motion.div
      key="search-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-scroll"
      style={{ minHeight: "100%", backgroundColor: colors.bg, paddingBottom: "110px" }}
    >
      <div style={{ padding: "16px 18px 12px" }}>
        {/* Header Title with Back Arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <motion.button
            id="search-back"
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: colors.textPrimary,
              display: "flex",
              alignItems: "center",
              padding: "4px",
            }}
          >
            <BackIcon />
          </motion.button>
          <h1 style={{
            fontFamily: fontFamily.display,
            fontWeight: 800,
            fontSize: "1.3rem",
            color: colors.textPrimary,
            letterSpacing: "-0.01em",
          }}>
            Search Places
          </h1>
        </div>

        {/* Search Input Box */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderRadius: radius.full,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          marginBottom: "14px",
          border: "1px solid rgba(0,0,0,0.04)",
        }}>
          <span style={{ color: colors.textMuted, display: "flex" }}><SearchIcon /></span>
          <input
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "none",
              fontFamily: fontFamily.sans,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: colors.textPrimary,
            }}
          />
          <span style={{ color: colors.textSecondary, display: "flex", cursor: "pointer" }}><FilterIcon /></span>
        </div>

        {/* Horizontal Category Pill Tabs — Matching Image 3 */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
          {CATEGORIES.map((c) => {
            const isActive = c === active;
            return (
              <motion.button
                key={c}
                id={`cat-${c.toLowerCase()}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(c)}
                style={{
                  padding: "8px 18px",
                  borderRadius: radius.full,
                  whiteSpace: "nowrap",
                  border: isActive ? "none" : `1px solid ${colors.border}`,
                  backgroundColor: isActive ? colors.orange : "#ffffff",
                  color: isActive ? "#ffffff" : colors.textSecondary,
                  fontFamily: fontFamily.sans,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  flexShrink: 0,
                  boxShadow: isActive ? "0 4px 14px rgba(255,138,0,0.3)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Grid Section — Beaches in Goa */}
      <div style={{ padding: "0 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <h2 style={{
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: "1.02rem",
            color: colors.textPrimary,
            letterSpacing: "-0.01em",
          }}>
            {active} in {query || "Goa"}
          </h2>
          <button
            id="search-view-all"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontFamily: fontFamily.sans,
              fontWeight: 600,
              fontSize: "0.8rem",
              color: colors.blue,
            }}
          >
            View all
          </button>
        </div>

        {/* 2x2 Grid of Place Cards — Matching Image 3 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}
        >
          {results.map((p) => (
            <motion.button
              key={p.id}
              id={`result-${p.id}`}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/place/${p.id}`)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{
                width: "100%",
                height: "128px",
                borderRadius: "20px",
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
                lineHeight: 1.25,
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
                {p.area}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <StarIcon />
                <span style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.72rem", color: colors.textSecondary }}>
                  {p.rating} <span style={{ fontWeight: 400, color: colors.textMuted }}>({p.reviews})</span>
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default SearchPage;
