//app\careers\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { primaryButton } from "@/components/ui/FormField";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore driver and career opportunities at Swami Tours.",
  alternates: { canonical: "/careers" },
};

const openings = [
  { role: "Cab Driver — Local", type: "Full-time" },
  { role: "Cab Driver — Outstation", type: "Full-time" },
  { role: "Fleet Coordinator", type: "Full-time" },
  { role: "Customer Support Executive", type: "Part-time" },
];

export default function Page() {
  return (
    <PageShell
      eyebrow="Join us"
      title="Build your career with Swami Tours"
      description="We're always looking for reliable drivers and support staff who care about safe, comfortable travel."
    >
      <div className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
        {openings.map((job) => (
          <div
            key={job.role}
            className="flex flex-wrap items-center justify-between gap-3 p-5"
          >
            <div>
              <p className="font-medium text-ink">{job.role}</p>
              <p className="text-xs text-ink/60">{job.type}</p>
            </div>
            <a href="mailto:swamitours001@gmail.com" className={primaryButton}>
              Apply
            </a>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
