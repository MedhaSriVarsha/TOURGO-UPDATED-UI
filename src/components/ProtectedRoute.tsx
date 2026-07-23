/**
 * src/components/ProtectedRoute.tsx
 *
 * Wraps authenticated routes.
 *
 * Behaviour:
 *   - While the initial Firebase session is resolving (loading === true),
 *     render a full-screen blank matching the brand background so the
 *     user sees no flash of the login page.
 *   - If no user is signed in, redirect to /login (replace — no history entry).
 *   - If signed in, render the child route element.
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  /* Initial auth check — show a plain brand-coloured screen to avoid
   * an unstyled flash or an incorrect redirect before Firebase resolves. */
  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100dvh",
          minHeight: "100vh",
          backgroundColor: "#e4e1da",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Subtle pulsing dot while session is checked */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#4a6fd6",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(0.85); }
            50%       { opacity: 1;   transform: scale(1.1);  }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
