import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase";

/**
 * Merges Firebase Auth profile info into the Firestore `users/{uid}` doc.
 * Uses `merge: true` and only includes non-empty fields to avoid overwriting existing data.
 */
export async function syncUserDoc(user: User, nameOverride?: string) {
  if (!user?.uid) return;

  const name = nameOverride?.trim() || user.displayName?.trim() || undefined;

  const payload: Record<string, any> = {
    lastSeenAt: serverTimestamp(),
  };

  if (name) payload.name = name;
  if (user.email) payload.email = user.email;
  if (user.photoURL) payload.photoURL = user.photoURL;

  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, payload, { merge: true });
  } catch (err) {
    // Non-blocking: authentication remains valid even if Firestore sync fails
    console.error("Failed to sync user profile to Firestore:", err);
  }
}