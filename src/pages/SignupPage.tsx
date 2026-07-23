/**
 * src/pages/SignupPage.tsx
 *
 * Premium Sign Up page — TourGo
 *
 * Design language is identical to LoginPage:
 *   • #F8F5EF warm cream background
 *   • 3-layer SVG sandy wave shapes
 *   • Same logo, typography, card radius, shadows, spacing
 *   • Same Framer Motion transition presets
 *   • Same pill-style inputs with inline SVG icons
 *   • Same animated error card
 *   • Same social button pattern (Google live, FB/IG Coming Soon)
 *
 * Auth: uses registerWithEmail (createUserWithEmailAndPassword +
 * updateProfile) and signInWithGoogle — both from existing useAuth hook.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { type AuthError } from "firebase/auth";
import logoPng from "../assets/logo.png";
import {
  registerWithEmail,
  signInWithGoogle,
  getAuthErrorMessage,
} from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────
   Inline SVG icons  (no external deps, mirrors LoginPage style)
───────────────────────────────────────────────────────────────── */

const PersonIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      fill="#9CA3AF"
    />
    <path
      d="M12 14C7.02944 14 3 17.134 3 21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21C21 17.134 16.9706 14 12 14Z"
      fill="#9CA3AF"
    />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="3" fill="#9CA3AF" />
    <path
      d="M2 8l10 7 10-7"
      stroke="#F4F5F7"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="11" rx="2" fill="#9CA3AF" />
    <path
      d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon: React.FC<{ open: boolean }> = ({ open }) =>
  open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="#9CA3AF" strokeWidth="2" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 12 23 12a18.5 18.5 0 0 1-2.16 3.19"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1" y1="1" x2="23" y2="23"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

const ArrowRightIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <polyline points="12,5 19,12 12,19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Google "G" brand logo */
const GoogleIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/* Facebook "f" — disabled / Coming Soon */
const FacebookIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#1877F2" />
    <path d="M16 8h-2a1 1 0 00-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 014-4h2v3z" fill="white" />
  </svg>
);

/* Instagram — disabled / Coming Soon */
const InstagramIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="ig-grad-su" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#ffd600" />
        <stop offset="50%" stopColor="#ff0069" />
        <stop offset="100%" stopColor="#d300c5" />
      </radialGradient>
    </defs>
    <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#ig-grad-su)" />
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   Framer Motion variants  (identical presets as LoginPage)
───────────────────────────────────────────────────────────────── */

const logoVariant = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const headingVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 28, delay: 0.22 },
  },
};

const inputStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.32 } },
};

const inputItemVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const socialPopVariant = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: 0.56 + i * 0.08, type: "spring" as const, stiffness: 380, damping: 22 },
  }),
};

const loginLinkVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.72 } },
};

/* ─────────────────────────────────────────────────────────────────
   Social providers metadata
───────────────────────────────────────────────────────────────── */

const SOCIAL_PROVIDERS = [
  { id: "google",    label: "Google",    Icon: GoogleIcon,    color: "#4285F4", bg: "#EAF1FF", live: true  },
  { id: "facebook",  label: "Facebook",  Icon: FacebookIcon,  color: "#1877F2", bg: "#E8F0FD", live: false },
  { id: "instagram", label: "Instagram", Icon: InstagramIcon, color: "#E1306C", bg: "#FDE8F0", live: false },
] as const;

type SocialId = "google" | "facebook" | "instagram";

/* ─────────────────────────────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────────────────────────────── */

/** Reusable animated error card — identical style to LoginPage */
const AuthErrorCard: React.FC<{ message: string; onDismiss: () => void }> = ({
  message,
  onDismiss,
}) => (
  <motion.div
    key="auth-error"
    initial={{ opacity: 0, y: -6, height: 0 }}
    animate={{ opacity: 1, y: 0, height: "auto" }}
    exit={{ opacity: 0, y: -4, height: 0 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    style={{ overflow: "hidden" }}
  >
    <div
      style={{
        marginTop: "12px",
        padding: "10px 14px",
        borderRadius: "12px",
        backgroundColor: "#FEF2F2",
        border: "1px solid #FECACA",
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
        <circle cx="12" cy="12" r="10" fill="#EF4444" />
        <line x1="12" y1="8" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="white" />
      </svg>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          color: "#B91C1C",
          lineHeight: 1.45,
          margin: 0,
          flex: 1,
        }}
      >
        {message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        style={{
          marginLeft: "auto",
          flexShrink: 0,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
          color: "#EF4444",
          display: "flex",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </motion.div>
);

/** Button-level loading spinner (same arc pattern as LoginPage) */
const ButtonSpinner: React.FC = () => (
  <motion.svg
    width="22" height="22" viewBox="0 0 22 22"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
  >
    <circle cx="11" cy="11" r="9" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" fill="none" />
    <circle
      cx="11" cy="11" r="9"
      stroke="white" strokeWidth="2.5"
      strokeLinecap="round" strokeDasharray="16 40"
      fill="none"
    />
  </motion.svg>
);

/* ─────────────────────────────────────────────────────────────────
   Pill input — shared layout helper
───────────────────────────────────────────────────────────────── */

interface PillInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  autoComplete: string;
  focused: boolean;
  disabled: boolean;
  leftIcon: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const PillInput: React.FC<PillInputProps> = ({
  id, type, value, onChange, onFocus, onBlur,
  placeholder, autoComplete, focused, disabled,
  leftIcon, rightSlot,
}) => (
  <div style={{ position: "relative" }}>
    {/* Left icon */}
    <div
      style={{
        position: "absolute", left: "18px", top: "50%",
        transform: "translateY(-50%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 1,
      }}
    >
      {leftIcon}
    </div>

    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      style={{
        width: "100%",
        height: "58px",
        paddingLeft: "50px",
        paddingRight: rightSlot ? "52px" : "18px",
        backgroundColor: focused ? "#F0F4FF" : "#F4F5F7",
        border: focused ? "1.5px solid #4F73FF" : "1.5px solid transparent",
        borderRadius: "18px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: "15px",
        color: "#1A1A2E",
        outline: "none",
        boxSizing: "border-box",
        boxShadow: focused
          ? "inset 0 2px 6px rgba(79,115,255,0.08)"
          : "inset 0 2px 6px rgba(0,0,0,0.04)",
        transition: "border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease",
        opacity: disabled ? 0.65 : 1,
      }}
    />

    {/* Right slot (eye toggle) */}
    {rightSlot && (
      <div
        style={{
          position: "absolute", right: "18px", top: "50%",
          transform: "translateY(-50%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {rightSlot}
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Validation helpers
───────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!name.trim()) errors.name = "Full name is required.";
  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords don't match. Please try again.";
  }
  return errors;
}

/* ─────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────── */

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  /* ── Form state ── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  /* ── Auth state ── */
  const [signupLoading, setSignupLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialId | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  /* ── Field-level inline validation errors ── */
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  /* If already signed in, skip to home */
  useEffect(() => {
    if (user) navigate("/home", { replace: true });
  }, [user, navigate]);

  /* ── Helpers ── */
  const clearError = () => setAuthError(null);
  const isAnyLoading = signupLoading || socialLoading !== null;

  /* ── Email registration handler ── */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    /* Client-side validation */
    const errors = validate(name, email, password, confirmPassword);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      /* Surface the first error as a top-level message too */
      setAuthError(Object.values(errors)[0]);
      return;
    }
    setFieldErrors({});

    setSignupLoading(true);
    try {
      await registerWithEmail(email.trim(), password, name.trim());
      /* Navigation delegated to the useEffect watching `user`.
       * onAuthStateChanged fires after account creation → user updates
       * in context → useEffect navigates to /home safely. */
    } catch (err) {
      const msg = getAuthErrorMessage(err as AuthError);
      setAuthError(msg || "Account creation failed. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };

  /* ── Social signup handler ── */
  const handleSocialSignup = async (providerId: SocialId) => {
    if (isAnyLoading) return;
    clearError();

    if (!SOCIAL_PROVIDERS.find((p) => p.id === providerId)?.live) {
      const label = SOCIAL_PROVIDERS.find((p) => p.id === providerId)?.label ?? providerId;
      setAuthError(`${label} sign-up coming soon! Use email or Google for now.`);
      return;
    }

    setSocialLoading(providerId);
    try {
      await signInWithGoogle();
      /* Do NOT navigate here — wait for onAuthStateChanged to propagate
       * through AuthContext so ProtectedRoute sees user before we arrive. */
    } catch (err) {
      const msg = getAuthErrorMessage(err as AuthError);
      if (msg) setAuthError(msg);
    } finally {
      setSocialLoading(null);
    }
  };

  /* ── Clear field error on change ── */
  const clearFieldError = (field: keyof ValidationErrors) =>
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

  /* ─────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────── */
  return (
    <motion.div
      key="signup-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      transition={{ duration: 0.35 }}
      style={{
        width: "100%",
        height: "100dvh",
        minHeight: "100vh",
        background: "#F8F5EF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Desert / sandy wave background (identical to LoginPage) ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
      >
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "-10%", left: "50%",
          transform: "translateX(-50%)",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,220,160,0.28) 0%, transparent 65%)",
        }} />

        {/* Back wave */}
        <svg viewBox="0 0 390 320" preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "320px", opacity: 0.55 }}>
          <path d="M0,200 C80,150 160,240 220,170 C280,100 340,200 390,160 L390,0 L0,0 Z" fill="#EDD9A3" />
        </svg>

        {/* Mid wave */}
        <svg viewBox="0 0 390 260" preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "260px", opacity: 0.42 }}>
          <path d="M0,180 C70,120 150,200 230,140 C310,80 360,180 390,140 L390,0 L0,0 Z" fill="#F0C97A" />
        </svg>

        {/* Front wave */}
        <svg viewBox="0 0 390 220" preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "220px", opacity: 0.3 }}>
          <path d="M0,160 C60,100 140,170 210,120 C280,70 340,150 390,110 L390,0 L0,0 Z" fill="#E8B94F" />
        </svg>

        {/* Birds */}
        <svg viewBox="0 0 390 80"
          style={{ position: "absolute", top: "12px", left: 0, width: "100%", height: "80px", opacity: 0.18 }}>
          <path d="M60,28 Q65,22 70,28" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M80,20 Q86,13 92,20" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M300,18 Q306,11 312,18" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M320,26 Q325,20 330,26" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M340,16 Q346,9 352,16" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Header: logo + heading ── */}
      <div
        style={{
          width: "100%", maxWidth: "390px",
          display: "flex", flexDirection: "column", alignItems: "center",
          paddingTop: "36px", position: "relative", zIndex: 1, flexShrink: 0,
        }}
      >
        {/* Logo */}
        <motion.div variants={logoVariant} initial="hidden" animate="visible"
          style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logoPng}
            alt="TourGo"
            draggable={false}
            style={{
              width: "160px", height: "auto", display: "block",
              userSelect: "none", pointerEvents: "none",
              filter: "drop-shadow(0 4px 16px rgba(255,138,0,0.18))",
            }}
          />
        </motion.div>

        {/* "Create your account" heading */}
        <motion.div
          variants={headingVariant}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "6px" }}
        >
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "21px",
              lineHeight: 1.2,
              color: "#1A1A2E",
              letterSpacing: "-0.01em",
              margin: 0,
              textAlign: "center",
            }}
          >
            Join{" "}
            <span style={{ color: "#3D68FF" }}>TourGo</span>
          </h1>

          {/* Orange dot divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px" }}>
            <div style={{ width: "20px", height: "2px", borderRadius: "1px", backgroundColor: "#FF8A00", opacity: 0.7 }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#FF8A00" }} />
            <div style={{ width: "20px", height: "2px", borderRadius: "1px", backgroundColor: "#FF8A00", opacity: 0.7 }} />
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#6B7280",
            margin: "6px 0 0",
            letterSpacing: "0.01em",
          }}>
            Travel Beyond The Obvious
          </p>
        </motion.div>
      </div>

      {/* ── Main floating card ── */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        style={{
          width: "100%",
          maxWidth: "390px",
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: "45px 45px 0 0",
          marginTop: "16px",
          padding: "28px 26px 24px",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
          overflowY: "auto",
        }}
      >
        {/* ── Input fields with stagger animation ── */}
        <motion.div
          variants={inputStagger}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {/* Full Name */}
          <motion.div variants={inputItemVariant}>
            <PillInput
              id="signup-name"
              type="text"
              value={name}
              onChange={(v) => { setName(v); clearError(); clearFieldError("name"); }}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Full Name"
              autoComplete="name"
              focused={focusedField === "name"}
              disabled={isAnyLoading}
              leftIcon={<PersonIcon />}
            />
            <AnimatePresence>
              {fieldErrors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "12px",
                    color: "#EF4444", marginTop: "4px", marginLeft: "4px",
                  }}
                >
                  {fieldErrors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
          <motion.div variants={inputItemVariant}>
            <PillInput
              id="signup-email"
              type="email"
              value={email}
              onChange={(v) => { setEmail(v); clearError(); clearFieldError("email"); }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="Email Address"
              autoComplete="email"
              focused={focusedField === "email"}
              disabled={isAnyLoading}
              leftIcon={<MailIcon />}
            />
            <AnimatePresence>
              {fieldErrors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "12px",
                    color: "#EF4444", marginTop: "4px", marginLeft: "4px",
                  }}
                >
                  {fieldErrors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password */}
          <motion.div variants={inputItemVariant}>
            <PillInput
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(v) => { setPassword(v); clearError(); clearFieldError("password"); }}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              placeholder="Password"
              autoComplete="new-password"
              focused={focusedField === "password"}
              disabled={isAnyLoading}
              leftIcon={<LockIcon />}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", display: "flex" }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              }
            />
            <AnimatePresence>
              {fieldErrors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "12px",
                    color: "#EF4444", marginTop: "4px", marginLeft: "4px",
                  }}
                >
                  {fieldErrors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={inputItemVariant}>
            <PillInput
              id="signup-confirm-password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(v) => { setConfirmPassword(v); clearError(); clearFieldError("confirmPassword"); }}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
              placeholder="Confirm Password"
              autoComplete="new-password"
              focused={focusedField === "confirmPassword"}
              disabled={isAnyLoading}
              leftIcon={<LockIcon />}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", display: "flex" }}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              }
            />
            <AnimatePresence>
              {fieldErrors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "12px",
                    color: "#EF4444", marginTop: "4px", marginLeft: "4px",
                  }}
                >
                  {fieldErrors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── Create Account button ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: "18px" }}
        >
          <motion.button
            id="signup-submit"
            type="button"
            onClick={handleSignup}
            disabled={isAnyLoading}
            whileHover={isAnyLoading ? {} : { scale: 1.025, boxShadow: "0 8px 32px rgba(61,104,255,0.42)" }}
            whileTap={isAnyLoading ? {} : { scale: 0.97 }}
            style={{
              width: "100%",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "linear-gradient(90deg, #4F73FF 0%, #2D5BFF 100%)",
              border: "none",
              borderRadius: "18px",
              cursor: isAnyLoading ? "not-allowed" : "pointer",
              boxShadow: "0 6px 24px rgba(61,104,255,0.36)",
              opacity: isAnyLoading ? 0.75 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {signupLoading ? (
              <ButtonSpinner />
            ) : (
              <>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "17px",
                  color: "#FFFFFF",
                  letterSpacing: "0.01em",
                }}>
                  Create Account
                </span>
                <ArrowRightIcon />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* ── Auth error card ── */}
        <AnimatePresence>
          {authError && (
            <AuthErrorCard message={authError} onDismiss={clearError} />
          )}
        </AnimatePresence>

        {/* ── OR divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.36 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "20px" }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E5E7EB" }} />
          <div style={{
            width: "38px", height: "28px",
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "#F4F5F7", borderRadius: "8px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: "11px",
              color: "#9CA3AF", letterSpacing: "0.06em",
            }}>
              OR
            </span>
          </div>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E5E7EB" }} />
        </motion.div>

        {/* ── Social sign-up buttons ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "28px", marginTop: "18px" }}>
          {SOCIAL_PROVIDERS.map((provider, i) => {
            const isThisLoading = socialLoading === provider.id;
            return (
              <motion.div
                key={provider.id}
                custom={i}
                variants={socialPopVariant}
                initial="hidden"
                animate="visible"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}
              >
                <motion.button
                  id={`signup-social-${provider.id}`}
                  type="button"
                  onClick={() => handleSocialSignup(provider.id)}
                  disabled={isAnyLoading}
                  whileHover={isAnyLoading ? {} : { scale: 1.08 }}
                  whileTap={isAnyLoading ? {} : { scale: 0.92 }}
                  animate={{
                    opacity: isAnyLoading && !isThisLoading ? 0.42 : 1,
                    scale: isThisLoading ? 1.06 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    backgroundColor: isThisLoading ? provider.bg : "#FFFFFF",
                    border: isThisLoading ? `2px solid ${provider.color}30` : "2px solid transparent",
                    boxShadow: isThisLoading
                      ? `0 4px 20px ${provider.color}30`
                      : "0 2px 12px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isAnyLoading ? "not-allowed" : "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "background-color 0.22s ease, border-color 0.22s ease",
                  }}
                >
                  {/* Spinning arc for active provider */}
                  {isThisLoading && (
                    <motion.svg
                      width="58" height="58" viewBox="0 0 58 58"
                      style={{ position: "absolute", inset: 0, zIndex: 2 }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
                    >
                      <circle cx="29" cy="29" r="26"
                        stroke={provider.color} strokeWidth="3"
                        strokeLinecap="round" strokeDasharray="41 123"
                        fill="none"
                      />
                    </motion.svg>
                  )}
                  <motion.div
                    animate={{ opacity: isThisLoading ? 0.55 : 1 }}
                    transition={{ duration: 0.18 }}
                    style={{ zIndex: 1 }}
                  >
                    <provider.Icon />
                  </motion.div>
                </motion.button>

                <motion.span
                  animate={{
                    color: isThisLoading ? provider.color : "#6B7280",
                    fontWeight: isThisLoading ? 600 : 400,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", display: "block" }}
                >
                  {isThisLoading ? "Connecting…" : provider.label}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Already have an account? Login link ── */}
        <motion.div
          variants={loginLinkVariant}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            marginTop: "auto",
            paddingTop: "20px",
          }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400, fontSize: "14px", color: "#6B7280",
          }}>
            Already have an account?
          </span>
          <motion.button
            type="button"
            onClick={() => navigate("/login")}
            whileHover={{ x: 2 }}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#3D68FF",
              cursor: "pointer",
              padding: "0 0 0 4px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Login
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <line x1="5" y1="12" x2="19" y2="12" stroke="#3D68FF" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="12,5 19,12 12,19" stroke="#3D68FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Home bar indicator */}
        <div style={{
          width: "120px", height: "5px", borderRadius: "3px",
          backgroundColor: "#1A1A2E", opacity: 0.15,
          margin: "16px auto 4px", flexShrink: 0,
        }} />
      </motion.div>
    </motion.div>
  );
};

export default SignupPage;
