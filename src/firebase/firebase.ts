/**
 * src/firebase/firebase.ts
 *
 * Firebase app initialisation and auth export.
 * All credentials come from Vite environment variables — never hardcoded.
 *
 * Required .env keys (see .env.example):
 *   VITE_FIREBASE_API_KEY
 *   VITE_FIREBASE_AUTH_DOMAIN
 *   VITE_FIREBASE_PROJECT_ID
 *   VITE_FIREBASE_STORAGE_BUCKET
 *   VITE_FIREBASE_MESSAGING_SENDER_ID
 *   VITE_FIREBASE_APP_ID
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

/**
 * Avoid re-initialising the app during Vite HMR cycles.
 * If an app is already initialised, reuse it.
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

/**
 * Persist the auth session across page refreshes in localStorage.
 * This call is idempotent and safe to repeat.
 */
setPersistence(auth, browserLocalPersistence).catch(() => {
  /* Silently swallow — happens when cookies are blocked */
});

/** Pre-configured Google provider with all required scopes */
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

export default app;
