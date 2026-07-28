import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { FormField, primaryButton } from "@/components/ui/FormField";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Swami Tours account and profile details.",
  alternates: { canonical: "/my-profile" },
};

export default function Page() {
  return (
    <PageShell eyebrow="Account" title="My Profile">
      <form className="max-w-lg space-y-4 rounded-xl border border-ink/10 bg-white p-6">
        <FormField label="Full name" name="name" placeholder="Your name" />
        <FormField label="Phone" name="phone" type="tel" placeholder="+91" />
        <FormField label="Email" name="email" type="email" placeholder="you@example.com" />
        <button type="submit" className={primaryButton}>
          Save changes
        </button>
      </form>
    </PageShell>
  );
}
