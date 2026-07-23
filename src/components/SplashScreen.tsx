import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashBackground from "./SplashBackground";
import SplashText from "./SplashText";
import { useSplashAnimation, type AnimationPhase } from "../hooks/useSplashAnimation";
import logoPng from "../assets/logo.png";

/**
 * SplashScreen
 *
 * Orchestrates the full storyboard animation sequence:
 *
 *   GSAP owns:       logo.png clip-path circle reveal (0.6s → 1.8s)
 *   Framer owns:     text.png, tagline.png, button reveal + page exit
 *
 * The key insight: logo.png, text.png, and tagline.png all share the
 * identical warm gray background (#E4E1DA). Because SplashBackground uses
 * the same color, the assets emerge seamlessly from the surface —
 * no blend modes, no tricks. The clip-path IS the reveal mechanism.
 *
 * Storyboard composition (vertical stack, centered):
 *   [ logo.png — graphical icon ]
 *   [ text.png — TOURGO wordmark ]
 *   [ tagline.png — TRAVEL BEYOND THE OBVIOUS ]
 *   [ Get Started button ]
 */
const SplashScreen: React.FC = () => {
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  const handlePhaseChange = useCallback((newPhase: AnimationPhase) => {
    setPhase(newPhase);
  }, []);

  const { logoRef } = useSplashAnimation({ onPhaseChange: handlePhaseChange });

  const textVisible = phase === "text-reveal" || phase === "complete";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash-screen"
        className="splash-root"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
        }}
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {/* ── Warm matte surface background ── */}
        <SplashBackground />

        {/* ── Centered content column ── */}
        <div
          className="relative z-10 flex flex-col items-center gpu-layer"
          style={{ width: "100%", maxWidth: "480px", paddingInline: "24px" }}
        >
          {/*
           * Logo wrapper — GSAP applies clipPath here.
           *
           * logo.png is a wide landscape image (the icon is centered within
           * a large warm-gray canvas). We constrain the width and let the
           * image's natural aspect ratio determine the height.
           *
           * The clip-path circle expands from the center of the icon
           * (approximately 45% down the image) outward.
           */}
          <div
            ref={logoRef}
            className="gpu-layer"
            style={{
              width: "clamp(260px, 52vw, 440px)",
              /* clipPath is set and animated entirely by GSAP */
            }}
          >
            <img
              src={logoPng}
              alt="TourGo icon — motorcycle rider with palm trees"
              draggable={false}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </div>

          {/*
           * SplashText: text.png + tagline.png + button
           * Framer Motion controls all three reveals.
           * The -mt-6 pulls text up to overlap with the logo's bottom
           * white-space padding (the png has natural padding baked in).
           */}
          <div style={{ marginTop: "-1.5rem", width: "100%" }}>
            <SplashText visible={textVisible} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
