const fleet = [
  { name: "Hatchback", seats: "4 Seater", use: "City rides, airport drops", tone: "var(--color-saffron)" },
  { name: "Sedan", seats: "4 Seater", use: "Outstation comfort trips", tone: "var(--color-moss)" },
  { name: "SUV", seats: "6-7 Seater", use: "Family & group travel", tone: "var(--color-saffron-dark)" },
  { name: "Tempo Traveller", seats: "12-17 Seater", use: "Group pilgrimage tours", tone: "var(--color-moss-dark)" },
];

function CarMark({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 120 60" width="100%" height="56" aria-hidden="true">
      <rect x="8" y="26" width="104" height="20" rx="8" fill={tone} opacity="0.15" />
      <path
        d="M18 40 L26 22 Q30 16 40 16 H80 Q90 16 94 22 L102 40"
        fill="none"
        stroke={tone}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="14" y="38" width="92" height="10" rx="5" fill={tone} />
      <circle cx="34" cy="48" r="7" fill="var(--color-ink)" />
      <circle cx="86" cy="48" r="7" fill="var(--color-ink)" />
    </svg>
  );
}

export default function Fleet() {
  return (
    <section id="fleet" className="bg-moss/5 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
            The fleet
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Pick the size that fits the trip.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fleet.map((car) => (
            <div key={car.name} className="rounded-2xl bg-white p-5 border border-ink/10">
              <CarMark tone={car.tone} />
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {car.name}
              </h3>
              <p className="font-mono text-xs text-ink/50 mt-1">{car.seats}</p>
              <p className="mt-2 text-sm text-ink/65">{car.use}</p>
              <a
                href="tel:+910000000000"
                className="mt-4 inline-block text-sm font-medium text-saffron-dark hover:text-saffron"
              >
                Check availability →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
