import React from "react";
import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { colors, radius, shadows, fontFamily, pageVariants, staggerContainer, staggerItem } from "../design/tokens";

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff8a00" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);
const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8,21 12,21 16,21" /><line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 4H4a2 2 0 000 4v1a5 5 0 005 5h6a5 5 0 005-5V8a2 2 0 000-4h-3" />
    <rect x="7" y="2" width="10" height="6" rx="1" />
  </svg>
);

const BADGES = [
  { id: "b1", name: "First Ride", emoji: "🏍️", earned: true, desc: "Completed your first tour" },
  { id: "b2", name: "Explorer", emoji: "🗺️", earned: true, desc: "Visited 5 destinations" },
  { id: "b3", name: "Weekend Warrior", emoji: "⚡", earned: true, desc: "3 weekend trips completed" },
  { id: "b4", name: "Hill Climber", emoji: "⛰️", earned: false, desc: "Complete a high-altitude route" },
  { id: "b5", name: "Coast Rider", emoji: "🏖️", earned: false, desc: "Ride along 200km coastline" },
  { id: "b6", name: "Heritage Hunter", emoji: "🏛️", earned: false, desc: "Visit 3 heritage sites" },
];

const RECENT_ACTIVITY = [
  { id: "a1", action: "Completed Coorg trip", pts: "+120 pts", date: "2 days ago" },
  { id: "a2", action: "Reviewed Hampi route", pts: "+30 pts", date: "1 week ago" },
  { id: "a3", action: "Shared Gokarna itinerary", pts: "+50 pts", date: "2 weeks ago" },
];

/**
 * RewardsPage — gamified loyalty points and achievement badges.
 */
const RewardsPage: React.FC = () => {
  const points = 1840;
  const nextTier = 2500;
  const progress = (points / nextTier) * 100;

  return (
    <motion.div
      key="rewards-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-scroll"
      style={{ minHeight: "100vh", backgroundColor: colors.bg, paddingBottom: "100px" }}
    >
      {/* Header */}
      <div style={{ padding: "52px 20px 20px" }}>
        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.8125rem", color: colors.textMuted, marginBottom: "4px" }}>Your achievements</p>
        <h1 style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "1.625rem", color: colors.textPrimary }}>Rewards</h1>
      </div>

      {/* Points card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        style={{
          marginInline: "20px",
          marginBottom: "24px",
          padding: "24px",
          borderRadius: radius.xl,
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.blueDark} 100%)`,
          color: "#fff",
          boxShadow: shadows.blueLg,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <p style={{ fontFamily: fontFamily.sans, fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>Total points</p>
            <p style={{ fontFamily: fontFamily.display, fontWeight: 900, fontSize: "2.5rem", lineHeight: 1 }}>{points.toLocaleString()}</p>
          </div>
          <div style={{
            width: "48px", height: "48px", borderRadius: radius.full,
            backgroundColor: "rgba(255,255,255,0.18)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <TrophyIcon />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontFamily: fontFamily.sans, fontSize: "0.75rem", color: "rgba(255,255,255,0.75)" }}>Gold Rider tier</span>
            <span style={{ fontFamily: fontFamily.sans, fontSize: "0.75rem", color: "rgba(255,255,255,0.75)" }}>
              {nextTier - points} pts to Platinum
            </span>
          </div>
          <div style={{ height: "6px", borderRadius: radius.full, backgroundColor: "rgba(255,255,255,0.2)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "100%", borderRadius: radius.full, backgroundColor: colors.orange }}
            />
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <section style={{ paddingInline: "20px", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "1rem", color: colors.textPrimary, marginBottom: "14px" }}>Badges</h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}
        >
          {BADGES.map((badge) => (
            <motion.div
              key={badge.id}
              variants={staggerItem}
              style={{
                padding: "16px 12px",
                borderRadius: radius.lg,
                backgroundColor: badge.earned ? colors.surface : "rgba(255,255,255,0.3)",
                border: `1px solid ${badge.earned ? colors.border : "rgba(0,0,0,0.04)"}`,
                textAlign: "center",
                opacity: badge.earned ? 1 : 0.5,
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ fontSize: "1.75rem", marginBottom: "6px", filter: badge.earned ? "none" : "grayscale(1)" }}>{badge.emoji}</div>
              <p style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.72rem", color: colors.textPrimary, lineHeight: 1.3 }}>{badge.name}</p>
              <p style={{ fontFamily: fontFamily.sans, fontSize: "0.64rem", color: colors.textMuted, marginTop: "4px", lineHeight: 1.3 }}>{badge.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Recent activity */}
      <section style={{ paddingInline: "20px" }}>
        <h2 style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "1rem", color: colors.textPrimary, marginBottom: "14px" }}>Recent activity</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {RECENT_ACTIVITY.map((act) => (
            <div
              key={act.id}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px",
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.lg,
                backdropFilter: "blur(8px)",
              }}
            >
              <div>
                <p style={{ fontFamily: fontFamily.sans, fontWeight: 500, fontSize: "0.875rem", color: colors.textPrimary }}>{act.action}</p>
                <p style={{ fontFamily: fontFamily.sans, fontSize: "0.75rem", color: colors.textMuted, marginTop: "2px" }}>{act.date}</p>
              </div>
              <span style={{
                padding: "4px 10px", borderRadius: radius.full,
                backgroundColor: colors.orangeAlpha(0.1),
                fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.78rem", color: colors.orange,
              }}>
                {act.pts}
              </span>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </motion.div>
  );
};

export default RewardsPage;
