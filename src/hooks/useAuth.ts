/**
 * src/hooks/useAuth.ts
 *
 * Convenience re-export of the auth context hook plus
 * pre-wired Firebase auth actions (signIn, signInWithGoogle, signOut).
 *
 * Keeps LoginPage free of direct firebase/auth imports.
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  type UserCredential,
  type AuthError,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useAuthContext } from "../context/AuthContext";

/* ── Firebase error → friendly message map ── */

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/too-many-requests":
    "Too many failed attempts. Please try again later.",
  "auth/network-request-failed":
    "Network error. Check your connection and try again.",
  "auth/popup-closed-by-user": "Sign-in window was closed. Please try again.",
  "auth/popup-blocked":
    "Popup was blocked by your browser. Allow popups for this site.",
  "auth/cancelled-popup-request": "", // Ignore — means another popup is already open
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email using a different sign-in method.",
  /* ── Sign-up specific ── */
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/weak-password":
    "Password is too weak. Use at least 6 characters.",
};

/**
 * Maps a Firebase AuthError code to a user-friendly string.
 * Falls back to the raw error message if the code is not in the map.
 */
export const getAuthErrorMessage = (error: AuthError): string => {
  const mapped = FIREBASE_ERROR_MESSAGES[error.code];
  // Return empty string for codes we intentionally want to silence
  if (mapped === "") return "";
  return mapped ?? error.message;
};

/* ── Auth actions ── */

/**
 * signInWithEmail
 * Wraps Firebase signInWithEmailAndPassword.
 * Throws AuthError on failure — caller handles UI error display.
 */
export const signInWithEmail = (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

/**
 * signInWithGoogle
 * Opens a Firebase Google OAuth popup.
 * Throws AuthError on failure or popup dismissal.
 */
export const signInWithGoogle = (): Promise<UserCredential> =>
  signInWithPopup(auth, googleProvider);

/**
 * logOut
 * Signs the current user out and clears the persisted session.
 */
export const logOut = (): Promise<void> => signOut(auth);

/**
 * registerWithEmail
 * Creates a new Firebase user with email + password, then immediately
 * sets their displayName via updateProfile so the profile is complete
 * on first use.
 *
 * Returns the UserCredential so the caller can navigate after success.
 * Throws AuthError on failure — caller handles UI error display.
 */
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  /* Update displayName immediately after account creation */
  await updateProfile(credential.user, { displayName: displayName.trim() });
  return credential;
};

/* ── Re-export context hook ── */

export { useAuthContext as useAuth };
