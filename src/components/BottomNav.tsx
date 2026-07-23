import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { colors, fontFamily, shadows, radius } from "../design/tokens";

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const CompassIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
  </svg>
);

const BookingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/** Robot face icon used for the central AI Assistant button */
const RobotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3" />
    <circle cx="12" cy="2.6" r="0.9" fill="#fff" stroke="none" />
    <rect x="4" y="7" width="16" height="12" rx="4" />
    <circle cx="9" cy="13" r="1.3" fill="#fff" stroke="none" />
    <circle cx="15" cy="13" r="1.3" fill="#fff" stroke="none" />
    <path d="M9 16.5h6" />
    <path d="M2 12h2" /><path d="M20 12h2" />
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", path: "/home", icon: <HomeIcon /> },
  { id: "explore", label: "Explore", path: "/explore", icon: <CompassIcon /> },
  { id: "ai", label: "AI Assistant", path: "/ai", icon: <RobotIcon /> },
  { id: "bookings", label: "Bookings", path: "/bookings", icon: <BookingsIcon /> },
  { id: "profile", label: "Profile", path: "/profile", icon: <ProfileIcon /> },
];

/**
 * BottomNav — persistent tab bar for authenticated screens.
 * The AI Assistant tab sits in the middle as a raised, filled circle
 * (matches the brand mock), the rest are plain icon+label tabs.
 */
const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 12px 14px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "22px",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: shadows.lg,
          paddingBlock: "10px 8px",
          paddingInline: "4px",
          pointerEvents: "auto",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          if (item.id === "ai") {
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                type="button"
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
                  border: "none", background: "none", cursor: "pointer", flex: 1,
                  transform: "translateY(-14px)",
                }}
              >
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: "50px", height: "50px", borderRadius: radius.full,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `linear-gradient(145deg, ${colors.blueLight}, ${colors.blue})`,
                    boxShadow: shadows.blueLg,
                    border: "3px solid #fff",
                  }}
                >
                  <RobotIcon />
                </motion.span>
                <span style={{
                  fontFamily: fontFamily.sans, fontWeight: isActive ? 700 : 500,
                  fontSize: "0.625rem", color: isActive ? colors.blue : colors.textMuted, lineHeight: 1,
                }}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              type="button"
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                padding: "6px 10px",
                borderRadius: "16px",
                border: "none",
                backgroundColor: isActive ? colors.blueAlpha(0.1) : "transparent",
                color: isActive ? colors.blue : colors.textMuted,
                cursor: "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
                position: "relative",
                flex: 1,
              }}
            >
              {item.icon}
              <span style={{
                fontFamily: fontFamily.sans, fontWeight: isActive ? 600 : 400,
                fontSize: "0.625rem", letterSpacing: "0.02em", lineHeight: 1,
              }}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute", inset: 0, borderRadius: "16px",
                    backgroundColor: colors.blueAlpha(0.1), zIndex: -1,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
