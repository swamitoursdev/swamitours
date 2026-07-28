import Link from "next/link";

const packages = [
  { title: "Mumbai to Shirdi Taxi", note: "Starting at just ₹2,499/day", price: "₹2,499", tone: "var(--color-saffron)" },
  { title: "Local Cab Rental", note: "Book by the hour, any city", price: "₹2,499", tone: "var(--color-moss)" },
  { title: "3 & 5 Jyotirlinga Darshan", note: "Trimbakeshwar, Bhimashankar & more", price: "₹14,999", tone: "var(--color-saffron-dark)" },
  { title: "Hill Station Getaway", note: "Experience Maharashtra's hill stations", price: "₹5,999", tone: "var(--color-moss-dark)" },
  { title: "Mumbai City Darshan", note: "Discover the wonders of Mumbai", price: "₹2,999", tone: "var(--color-moss)" },
  { title: "Ashtavinayak Darshan", note: "Full-circuit temple tour package", price: "₹8,499", tone: "var(--color-saffron)" },
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
          {packages.map((p) => (
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
                    {p.price}<span className="text-xs font-normal text-ink/50">/day</span>
                  </span>
                  <Link href="/book-a-ride" className="text-xs font-medium text-moss-dark hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
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