//components\auth\SignupForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { FormField, primaryButton } from "@/components/ui/FormField";

function isMobileOrInApp() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  const isInApp = /FBAN|FBAV|Instagram|Line|WhatsApp|Twitter/i.test(ua);
  return isMobile || isInApp;
}

type SignupFormProps = {
  onSwitchToLogin?: () => void;
};

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Catch the result when the browser comes back from a redirect-based sign-up
  // (needed for mobile / in-app browsers where signInWithPopup fails).
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          router.push("/");
        }
      })
      .catch((err) => setError(getFriendlyError(err)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleEmailSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      router.push("/");
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError(null);
    setLoading(true);
    try {
      if (isMobileOrInApp()) {
        // Popups are unreliable/unsupported on mobile browsers and in-app
        // webviews (Instagram, WhatsApp, etc). Redirect instead — the result
        // is picked up by getRedirectResult() above after the page reloads.
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
        router.push("/");
      }
    } catch (err) {
      setError(getFriendlyError(err));
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleEmailSignup}
      className="mx-auto max-w-sm space-y-4 rounded-xl border border-ink/10 bg-white p-6"
    >
      <FormField
        label="Full name"
        name="name"
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormField
        label="Confirm password"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className={`${primaryButton} w-full disabled:opacity-60`}>
        {loading ? "Creating account..." : "Create account"}
      </button>

      <div className="flex items-center gap-3 text-xs text-ink/40">
        <span className="h-px flex-1 bg-ink/10" />
        or
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white py-2 text-sm font-medium text-ink hover:bg-ink/5 disabled:opacity-60"
      >
        <GoogleIcon />
        {loading ? "Redirecting..." : "Continue with Google"}
      </button>

      <p className="text-center text-xs text-ink/60">
        Already have an account?{" "}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-saffron-dark underline-offset-2 hover:underline"
          >
            Login
          </button>
        ) : (
          <a href="/login" className="text-saffron-dark">Login</a>
        )}
      </p>
    </form>
  );
}

function getFriendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Google sign-up was cancelled.";
    case "auth/operation-not-supported-in-this-environment":
      return "Google sign-up isn't supported in this browser. Please open this page in Chrome or Safari.";
    case "auth/unauthorized-domain":
      return "This domain isn't authorized for Google sign-in yet.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.6 35.4 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.6 5.4C41.5 35.9 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"/>
    </svg>
  );
}
