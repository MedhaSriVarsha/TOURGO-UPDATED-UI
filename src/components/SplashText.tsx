import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import textPng from "../assets/text.png";
import taglinePng from "../assets/tagline.png";

interface SplashTextProps {
  visible: boolean;
}

/**
 * SplashText — Framer Motion controlled reveals.
 *
 * Owns: text.png, tagline.png, Get Started button.
 * Does NOT own: logo.png (that's GSAP / useSplashAnimation).
 *
 * Storyboard timing (relative to when "text-reveal" phase fires at ~2.4s):
 *   +0.00s → TOURGO text starts rising + blur clears  (Frame 5 → 6: 0.8s)
 *   +0.80s → Tagline fades in with small upward rise  (Frame 7: 0.6s)
 *   +1.60s → Get Started button fades up              (Frame 8: 0.5s)
 *
 * All transitions use smooth easing — no bounce, no overshoot.
 *
 * Button: Blue (#4A6FD6), rounded-full, premium hover (scale 1.03).
 */
const SplashText: React.FC<SplashTextProps> = ({ visible }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {/* ── TOURGO wordmark (text.png) ──
          Frame 5→6: rises 20px, blur 10px→0, opacity 0→1
          Duration 0.8s, ease [0.22, 1, 0.36, 1] (custom smooth out) */}
      <motion.img
        src={textPng}
        alt="TOURGO"
        draggable={false}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={
          visible
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(10px)" }
        }
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          width: "clamp(200px, 44vw, 360px)",
          height: "auto",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* ── Tagline (tagline.png) ──
          Frame 7: fades in 0→1, rises 10px, no blur
          Delay 0.8s after text starts */}
      <motion.img
        src={taglinePng}
        alt="Travel Beyond The Obvious"
        draggable={false}
        initial={{ opacity: 0, y: 10 }}
        animate={
          visible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        transition={{
          duration: 0.6,
          delay: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          width: "clamp(180px, 38vw, 310px)",
          height: "auto",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
          marginTop: "-0.25rem",
        }}
      />

      {/* ── Get Started button ──
          Frame 8: opacity 0→1, rises 12px
          Delay 1.6s after text starts
          Blue #4A6FD6, rounded-full, subtle scale hover */}
      <motion.button
        id="splash-get-started"
        initial={{ opacity: 0, y: 12 }}
        animate={
          visible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{
          duration: 0.5,
          delay: 1.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/login")}
        style={{
          marginTop: "2rem",
          paddingBlock: "0.875rem",
          paddingInline: "2.75rem",
          backgroundColor: "#4a6fd6",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "0.8125rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(74, 111, 214, 0.28)",
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3a5bbf";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 28px rgba(74, 111, 214, 0.38)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4a6fd6";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 20px rgba(74, 111, 214, 0.28)";
        }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default SplashText;