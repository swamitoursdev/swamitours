import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "My Trips",
  description: "View your past and upcoming trips with Swami Tours.",
  alternates: { canonical: "/my-trips" },
};

const trips = [
  { route: "CBD Belapur → Mumbai Airport", date: "12 Jul 2026", status: "Completed" },
  { route: "Navi Mumbai → Shirdi", date: "28 Jun 2026", status: "Completed" },
  { route: "Local — Vashi round trip", date: "15 Jun 2026", status: "Completed" },
];

export default function Page() {
  return (
    <PageShell eyebrow="Account" title="My Trips">
      <div className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
        {trips.map((trip) => (
          <div
            key={trip.route + trip.date}
            className="flex flex-wrap items-center justify-between gap-2 p-5"
          >
            <div>
              <p className="font-medium text-ink">{trip.route}</p>
              <p className="text-xs text-ink/60">{trip.date}</p>
            </div>
            <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-medium text-moss-dark">
              {trip.status}
            </span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
