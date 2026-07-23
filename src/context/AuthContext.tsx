/**
 * src/context/AuthContext.tsx
 *
 * Provides the authenticated Firebase user to the entire component tree.
 *
 * Usage:
 *   Wrap <App /> with <AuthProvider> in main.tsx.
 *   Then consume via `useAuth()` hook in any component.
 *
 * Behaviour:
 *   - `loading` is true while onAuthStateChanged is resolving the
 *     initial session on first render (avoids flash redirects).
 *   - `user` is null when signed out, FirebaseUser when signed in.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";

/* ── Types ── */

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

interface AuthContextValue {
  /** The currently signed-in user profile, or null when signed out. */
  user: UserProfile | null;
  /**
   * True only during the initial auth-state resolution.
   */
  loading: boolean;
  /** Logs in as the default Demo User (Raghu Charan). */
  loginAsDemo: () => void;
  /** Signs the current user out and clears the session. */
  logout: () => Promise<void>;
}

const DEMO_USER: UserProfile = {
  uid: "demo-user-raghu",
  displayName: "Raghu Charan",
  email: "raghu.charan@example.com",
};

/* ── Context ── */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ── Provider ── */

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("tourgo_demo_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * onAuthStateChanged fires once immediately with the persisted
     * session (or null), then on every subsequent sign-in / sign-out.
     */
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Traveller"),
          photoURL: firebaseUser.photoURL,
        });
        localStorage.removeItem("tourgo_demo_user");
      } else {
        const storedDemo = localStorage.getItem("tourgo_demo_user");
        if (storedDemo) {
          try {
            setUser(JSON.parse(storedDemo));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAsDemo = () => {
    setUser(DEMO_USER);
    localStorage.setItem("tourgo_demo_user", JSON.stringify(DEMO_USER));
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem("tourgo_demo_user");
    setUser(null);
    try {
      await signOut(auth);
    } catch {
      // Ignore if signed out already
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ── Hook ── */

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  }
  return ctx;
};
