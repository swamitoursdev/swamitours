//components\auth\AuthCard.tsx
"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

export default function AuthCard() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return mode === "login" ? (
    <LoginForm onSwitchToSignup={() => setMode("signup")} />
  ) : (
    <SignupForm onSwitchToLogin={() => setMode("login")} />
  );
}
