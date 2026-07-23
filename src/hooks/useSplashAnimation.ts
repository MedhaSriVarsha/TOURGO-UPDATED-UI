import { useEffect, useRef } from "react";
import gsap from "gsap";

export type AnimationPhase =
  | "idle"
  | "logo-reveal"
  | "text-reveal"
  | "complete";

interface UseSplashAnimationProps {
  onPhaseChange?: (phase: AnimationPhase) => void;
}

/**
 * useSplashAnimation
 *
 * GSAP-owned animation: logo.png reveal ONLY.
 * Framer Motion owns: text, tagline, button, page transition.
 *
 * Storyboard timing (exact):
 *   0.0s  – Frame 1: Background only, nothing visible
 *   0.6s  – Frame 2: Elements begin emerging (reveal starts)
 *   1.2s  – Frame 3: Icon reveal in progress
 *   1.8s  – Frame 4: Icon fully revealed & settled
 *   2.4s  – Frame 5: TOURGO text starts rising with blur
 *   3.2s  – Frame 6: Brand name fully revealed
 *   4.0s  – Frame 7: Tagline appears
 *   4.8s  – Frame 8: Button appears
 *   5.6s  – Frame 9: Final state — all visible
 *
 * Reveal technique: circle clip-path expand from center outward.
 * The mask creates the "emerging from inside the background" feel.
 * No blur on the icon itself — the circle edge is the reveal mechanism.
 */
export const useSplashAnimation = ({
  onPhaseChange,
}: UseSplashAnimationProps = {}) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ── Initial state: fully masked, invisible ──
      gsap.set(el, {
        clipPath: "circle(0% at 50% 45%)",
        opacity: 1,
      });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // Frame 1 → Frame 2: 0.0s to 0.6s — hold, background only
      tl.to({}, { duration: 0.6 });

      // Signal start
      tl.call(() => onPhaseChange?.("logo-reveal"));

      // Frame 2 → Frame 4: 0.6s to 1.8s — circle expands (1.2s duration)
      // power2.out gives a natural deceleration that reads as "settling"
      tl.to(
        el,
        {
          clipPath: "circle(72% at 50% 45%)",
          duration: 1.2,
          ease: "power2.out",
        }
      );

      // Frame 4 → Frame 5: 1.8s to 2.4s — hold at full reveal (0.6s)
      tl.to({}, { duration: 0.6 });

      // Signal text phase
      tl.call(() => onPhaseChange?.("text-reveal"));

      // Frame 9: 5.6s — signal complete (3.2s after text-reveal starts)
      tl.to({}, { duration: 3.2 });
      tl.call(() => onPhaseChange?.("complete"));
    }, el);

    return () => ctx.revert();
  }, [onPhaseChange]);

  return { logoRef };
};