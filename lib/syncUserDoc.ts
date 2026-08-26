// lib/syncUserDoc.ts
import { doc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase";

/**
 * Merges Firebase Auth profile info (email, name) into the Firestore
 * `users/{uid}` doc. Call this right after any successful sign-in or
 * sign-up (email/password, Google popup, Google redirect).
 *
 * Uses `merge: true` and only includes fields that actually have a
 * value, so it never overwrites `phone`, `idProofUrl`, etc. that get
 * written by other parts of the app (e.g. a profile-completion step),
 * and never wipes an existing name/email back to null.
 */
export async function syncUserDoc(user: User, nameOverride?: string) {
  const name = nameOverride?.trim() || user.displayName || undefined;

  const payload: Record<string, string> = {};
  if (name) payload.name = name;
  if (user.email) payload.email = user.email;

  if (Object.keys(payload).length === 0) return;

  try {
    await setDoc(doc(db, "users", user.uid), payload, { merge: true });
  } catch (err) {
    // Don't block navigation on this — the auth account was created
    // successfully either way. Just log so it's easy to spot in the console.
    console.error("Failed to sync user profile to Firestore:", err);
  }
}
