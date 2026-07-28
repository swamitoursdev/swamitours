import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { FormField, primaryButton } from "@/components/ui/FormField";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Swami Tours account.",
  alternates: { canonical: "/login" },
};

export default function Page() {
  return (
    <PageShell eyebrow="Account" title="Login to Swami Tours">
      <form className="mx-auto max-w-sm space-y-4 rounded-xl border border-ink/10 bg-white p-6">
        <FormField label="Phone number" name="phone" type="tel" placeholder="+91" required />
        <FormField label="Password" name="password" type="password" placeholder="••••••••" required />
        <button type="submit" className={`${primaryButton} w-full`}>
          Login
        </button>
        <p className="text-center text-xs text-ink/60">
          New here? <a href="#" className="text-saffron-dark">Create an account</a>
        </p>
      </form>
    </PageShell>
  );
}
