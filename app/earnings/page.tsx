//app\earnings\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Earnings",
  description: "Track your driver earnings with Swami Tours.",
  alternates: { canonical: "/earnings" },
};

const summary = [
  { label: "Today", value: "₹1,240" },
  { label: "This week", value: "₹8,650" },
  { label: "This month", value: "₹32,900" },
];

export default function Page() {
  return (
    <PageShell eyebrow="Driver" title="Earnings">
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink/10 bg-white p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
              {s.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-moss-dark">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
