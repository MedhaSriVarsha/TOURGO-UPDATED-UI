import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * SplashBackground
 *
 * Storyboard spec: "Premium warm matte surface. Very subtle texture.
 * Light grey (#E4E1DA). No mountains. No maps. No travel illustrations.
 * No gradients. No particles. No glow."
 *
 * Implementation:
 * - Solid #E4E1DA fill (warm, matte, matches all three assets' background)
 * - Micro paper-grain texture at ~2% opacity for tactile depth
 * - No vignettes, no radial gradients, no color blooms
 * - The asset images (logo.png, text.png, tagline.png) all share this exact
 *   background color, so they appear to emerge FROM the surface naturally
 */
const SplashBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Instant appearance — background is the canvas, not an animated element
    gsap.set(bgRef.current, { opacity: 1 });
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ backgroundColor: "#dcdcd4(220,220,212)" }}
    >
      {/*
       * Paper grain / linen micro-texture.
       * Achieved with a repeating SVG noise pattern encoded inline.
       * Opacity 0.018 — invisible at a glance, but adds premium tactile
       * depth that separates this from a plain flat surface.
       */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.018, mixBlendMode: "multiply" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="splash-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#splash-noise)" />
      </svg>

      {/*
       * Barely-visible horizontal rule at vertical center — gives the eye
       * a subtle "horizon line" to rest on before the logo appears.
       * 1px, 4% opacity. Feels intentional, not accidental.
       */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "50%",
          height: "1px",
          background: "rgba(26, 22, 18, 0.04)",
        }}
      />
    </div>
  );
};

export default SplashBackground;