import Link from "next/link";
import { routeSlug } from "@/lib/cab-routes";

// `to` must match a destination name in lib/cab-routes.ts exactly — that's
// what generates the route pages (paired with "Mumbai"). Packages without a
// single from/to city (multi-stop tours) have no `to`, so they still link
// to /book-a-ride.
const packages = [
  { title: "Mumbai to Pune", to: "Pune", note: "Vice versa fares also available", price: "₹2,999", unit: "", tone: "var(--color-saffron)" },
  { title: "Mumbai to Nashik", to: "Nashik", note: "Vice versa fares also available", price: "₹2,999", unit: "", tone: "var(--color-moss)" },
  { title: "Mumbai to Kolhapur", to: "Kolhapur", note: "Vice versa fares also available", price: "₹6,999", unit: "", tone: "var(--color-saffron-dark)" },
  { title: "Mumbai to Sangli", to: "Sangli", note: "Vice versa fares also available", price: "₹6,999", unit: "", tone: "var(--color-moss-dark)" },
  { title: "Mumbai to Chatrapati Sambhaji Nagar", to: "Aurangabad", note: "Vice versa fares also available", price: "₹6,999", unit: "", tone: "var(--color-saffron)" },
  { title: "Mumbai to Goa", to: "Goa", note: "Vice versa fares also available", price: "₹11,999", unit: "", tone: "var(--color-moss)" },
  { title: "3 & 5 Jyotirlinga Darshan", note: "Trimbakeshwar, Bhimashankar & more", price: "₹14,999", unit: "/day", tone: "var(--color-saffron-dark)" },
  { title: "Hill Station Getaway", note: "Experience Maharashtra's hill stations", price: "₹5,999", unit: "/day", tone: "var(--color-moss-dark)" },
  { title: "Mumbai City Darshan", note: "Discover the wonders of Mumbai", price: "₹2,999", unit: "/day", tone: "var(--color-moss)" },
  { title: "Ashtavinayak Darshan", note: "Full-circuit temple tour package", price: "₹8,499", unit: "/day", tone: "var(--color-saffron)" },
];

export default function TaxiPackages() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-ink">
          Taxi Packages
        </h2>
        <p className="mt-2 text-center text-sm text-ink/60 max-w-xl mx-auto">
          Explore our wide range of inter-city, spiritual and sightseeing
          tour packages designed for your comfort.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((p) => {
            const href = p.to ? `/${routeSlug("Mumbai", p.to)}` : "/book-a-ride";
            return (
              <div key={p.title} className="rounded-xl border border-ink/10 bg-white overflow-hidden">
                <div
                  className="h-32"
                  style={{ background: `linear-gradient(150deg, ${p.tone}, var(--color-ink))` }}
                />
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-xs text-ink/60">{p.note}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-lg font-semibold text-saffron-dark">
                      {p.price}{p.unit && <span className="text-xs font-normal text-ink/50">{p.unit}</span>}
                    </span>
                    <Link href={href} className="text-xs font-medium text-moss-dark hover:underline">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            href="/book-a-ride"
            className="rounded-xl bg-moss text-white flex flex-col items-center justify-center gap-2 p-8 text-center"
          >
            <span className="font-display text-lg font-semibold">Best Price Guaranteed!</span>
            <span className="text-xs text-white/70">Book your cab now — 24/7 support available</span>
            <span className="mt-2 rounded-lg bg-saffron px-4 py-2 text-xs font-medium">View Taxi Packages</span>
          </Link>
        </div>
      </div>
    </section>
  );
}