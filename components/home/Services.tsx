const services = [
  {
    title: "Outstation Trips",
    desc: "One-way or round trip cabs to any city, with a single driver for the whole route.",
    icon: (
      <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" />
    ),
  },
  {
    title: "Local Rentals",
    desc: "Hourly and daily packages for city errands, weddings and full-day sightseeing.",
    icon: <path d="M4 17h16M6 17V9l2-4h8l2 4v8M8 17v2M16 17v2" />,
  },
  {
    title: "Airport Transfers",
    desc: "Timed pickups and drops with flight-tracking, so a delay never means a missed cab.",
    icon: <path d="M3 13l8-2 3-8 2 1-1 8 6 2-1 2-6-1-3 6-2-1 1-6-6-1z" />,
  },
  {
    title: "Pilgrimage Packages",
    desc: "Multi-day yatra itineraries with rest stops planned around darshan timings.",
    icon: <path d="M12 2v6M9 8h6l3 12H6L9 8Z" />,
  },
  {
    title: "Corporate Travel",
    desc: "Monthly billing and dedicated vehicles for teams that travel on a schedule.",
    icon: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6" />,
  },
  {
    title: "24×7 Support",
    desc: "A dispatcher on call around the clock for changes, delays and last-minute trips.",
    icon: <path d="M12 8v4l3 2M12 21a9 9 0 100-18 9 9 0 000 18Z" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
      <div className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
          What we run
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
          One fleet, six kinds of trips.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-ink/10 bg-white p-6 hover:border-saffron/40 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="var(--color-moss)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {service.icon}
            </svg>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-ink/65 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
