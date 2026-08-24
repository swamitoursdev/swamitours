//app\login\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Swami Tours account.",
  alternates: { canonical: "/login" },
};

export default function Page() {
  return (
    <PageShell eyebrow="Account" title="Login to Swami Tours">
      <LoginForm />
    </PageShell>
  );
}