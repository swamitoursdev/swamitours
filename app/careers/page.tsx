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
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://wa.me/919324378802?text=${encodeURIComponent(
                  `Hi, I'm interested in applying for the ${job.role} position at Swami Tours.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12.02 2C6.5 2 2.03 6.47 2.03 12c0 1.77.46 3.45 1.32 4.94L2 22l5.2-1.36a9.96 9.96 0 0 0 4.82 1.23h.01c5.52 0 10-4.47 10-10S17.55 2 12.02 2Zm0 18.02h-.01a8.4 8.4 0 0 1-4.29-1.17l-.31-.18-3.09.81.82-3.01-.2-.31a8.38 8.38 0 0 1-1.29-4.46c0-4.64 3.78-8.42 8.43-8.42 2.25 0 4.36.88 5.95 2.47a8.36 8.36 0 0 1 2.47 5.96c0 4.64-3.79 8.31-8.48 8.31Zm4.62-6.3c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.13.17 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.3Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`mailto:swamitours001@gmail.com?subject=${encodeURIComponent(
                  `Application for ${job.role}`
                )}&body=${encodeURIComponent(
                  `Hi, I'm interested in applying for the ${job.role} position at Swami Tours.`
                )}`}
                className={`${primaryButton} inline-flex items-center gap-2`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}