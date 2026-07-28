import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { primaryButton } from "@/components/ui/FormField";

export const metadata: Metadata = {
  title: "Travel Points",
  description: "Check and redeem your Swami Tours travel reward points.",
  alternates: { canonical: "/travel-points" },
};

export default function Page() {
  return (
    <PageShell eyebrow="Rewards" title="Travel Points">
      <div className="max-w-md rounded-xl border border-ink/10 bg-white p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
          Available balance
        </p>
        <p className="mt-2 font-display text-4xl font-semibold text-saffron-dark">
          320 pts
        </p>
        <p className="mt-2 text-sm text-ink/60">
          Earn 1 point for every ₹100 spent on rides.
        </p>
        <button className={`${primaryButton} mt-5`}>Redeem points</button>
      </div>
    </PageShell>
  );
}
