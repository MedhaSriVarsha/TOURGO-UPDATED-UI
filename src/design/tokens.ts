/**
 * TourGo Design System — shared tokens & types
 *
 * Single source of truth for colors, spacing, radius, shadows,
 * and motion presets used across every screen.
 */

/** Returns rgba string for blue brand color */
export const blueAlpha = (a: number) => `rgba(74, 111, 214, ${a})`;
/** Returns rgba string for orange brand color */
export const orangeAlpha = (a: number) => `rgba(255, 138, 0, ${a})`;

export const colors = {
  bg: "#e4e1da",
  bgLight: "#eceae4",
  bgDark: "#d5d2cb",
  white: "#ffffff",
  blue: "#4a6fd6",
  blueDark: "#3a5bbf",
  blueLight: "#6485dc",
  orange: "#ff8a00",
  orangeDark: "#e67a00",
  textPrimary: "#1a1612",
  textSecondary: "#4a4540",
  textMuted: "#8a8580",
  surface: "rgba(255, 255, 255, 0.58)",
  surfaceHover: "rgba(255, 255, 255, 0.78)",
  border: "rgba(0, 0, 0, 0.08)",
  borderFocus: "#4a6fd6",
  overlay: "rgba(0, 0, 0, 0.32)",
  /** Shorthand helpers — kept on colors for ergonomics */
  blueAlpha,
  orangeAlpha,
} as const;

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 4px rgba(0,0,0,0.06)",
  md: "0 4px 16px rgba(0,0,0,0.08)",
  lg: "0 8px 32px rgba(0,0,0,0.10)",
  xl: "0 16px 48px rgba(0,0,0,0.12)",
  blue: "0 4px 20px rgba(74, 111, 214, 0.28)",
  blueLg: "0 8px 32px rgba(74, 111, 214, 0.36)",
} as const;

export const fontFamily = {
  sans: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  display: "'Outfit', 'Plus Jakarta Sans', sans-serif",
  body: "'Inter', 'Plus Jakarta Sans', sans-serif",
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/** Framer Motion transition presets */
export const transitions = {
  /** Standard page or element enter */
  enter: {
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  /** Smooth spring effect */
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  /** Smooth ease out for secondary elements */
  smooth: {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  },
  /** Quick micro-interaction */
  fast: {
    duration: 0.18,
    ease: "easeOut" as const,
  },
} as const;

/** Standard page enter variants */
export const pageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.995,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
} as const;

/** Stagger children animation */
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
} as const;

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
} as const;
