import React, { useState } from "react";
import { motion } from "framer-motion";

interface MobileFrameProps {
  children: React.ReactNode;
}

/** Status Bar component rendering 9:41, Cellular Signal, Wi-Fi, and Battery */
const MobileStatusBar: React.FC = () => (
  <div
    style={{
      height: "44px",
      paddingInline: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      position: "relative",
      zIndex: 150,
      userSelect: "none",
      pointerEvents: "none",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
    }}
  >
    {/* Time */}
    <span
      style={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#1a1612",
        letterSpacing: "-0.2px",
      }}
    >
      9:41
    </span>

    {/* Notch / Dynamic Island */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "10px",
        transform: "translateX(-50%)",
        width: "110px",
        height: "28px",
        backgroundColor: "#000000",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "10px",
      }}
    >
      {/* Camera lens dot */}
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "#161618",
          border: "1px solid #28282b",
        }}
      />
    </div>

    {/* Right Icons: Signal, Wi-Fi, Battery */}
    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#1a1612" }}>
      {/* Signal */}
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
        <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
        <rect x="4" y="5.5" width="2.5" height="5.5" rx="0.5" />
        <rect x="8" y="3" width="2.5" height="8" rx="0.5" />
        <rect x="12" y="0.5" width="2.5" height="10.5" rx="0.5" />
      </svg>

      {/* Wi-Fi */}
      <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
        <path d="M7.5 1.5C10.2 1.5 12.6 2.6 14.3 4.4L13.1 5.6C11.7 4.2 9.7 3.3 7.5 3.3C5.3 3.3 3.3 4.2 1.9 5.6L0.7 4.4C2.4 2.6 4.8 1.5 7.5 1.5ZM7.5 5.5C9.2 5.5 10.7 6.2 11.8 7.3L10.6 8.5C9.8 7.7 8.7 7.2 7.5 7.2C6.3 7.2 5.2 7.7 4.4 8.5L3.2 7.3C4.3 6.2 5.8 5.5 7.5 5.5ZM7.5 9.2C8.2 9.2 8.7 9.7 8.7 10.3C8.7 11 8.2 11.5 7.5 11.5C6.8 11.5 6.3 11 6.3 10.3C6.3 9.7 6.8 9.2 7.5 9.2Z" />
      </svg>

      {/* Battery */}
      <div
        style={{
          width: "22px",
          height: "11px",
          borderRadius: "3px",
          border: "1px solid currentColor",
          padding: "1px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "82%",
            height: "100%",
            backgroundColor: "currentColor",
            borderRadius: "1.5px",
          }}
        />
        {/* Battery pin */}
        <div
          style={{
            position: "absolute",
            right: "-3.5px",
            top: "2.5px",
            width: "2px",
            height: "4px",
            borderRadius: "0 1px 1px 0",
            backgroundColor: "currentColor",
          }}
        />
      </div>
    </div>
  </div>
);

/** Home Bar indicator at bottom of mobile frame */
const MobileHomeIndicator: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: "8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "134px",
      height: "5px",
      backgroundColor: "#1a1612",
      borderRadius: "100px",
      opacity: 0.85,
      zIndex: 150,
      pointerEvents: "none",
    }}
  />
);

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div
      className="device-canvas"
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Clean Mobile Screen Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "412px",
          height: "100%",
          maxHeight: "870px",
          backgroundColor: "#ffffff",
          borderRadius: "44px",
          border: "8px solid #1c1c1e",
          outline: "1px solid rgba(255,255,255,0.3)",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.22), 0 10px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Inner Screen Content */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>

        {/* Home Indicator */}
        <MobileHomeIndicator />
      </motion.div>
    </div>
  );
};

export default MobileFrame;
