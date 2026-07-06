const fleet = [
  { name: "WagonR", seats: "4 Seater", use: "Hatchback — quick city runs", tone: "var(--color-saffron)" },
  { name: "Swift Dzire", seats: "4 Seater", use: "Sedan — comfortable outstation", tone: "var(--color-moss)" },
  { name: "Tigor", seats: "4 Seater", use: "Sedan — city & highway", tone: "var(--color-saffron-dark)" },
  { name: "Maruti Ertiga", seats: "6 Seater", use: "MUV — small family groups", tone: "var(--color-moss-dark)" },
  { name: "Nexon", seats: "5 Seater", use: "Compact SUV", tone: "var(--color-saffron)" },
  { name: "Scorpio", seats: "7 Seater", use: "SUV — hill & ghat routes", tone: "var(--color-moss)" },
  { name: "Tavera", seats: "7-8 Seater", use: "MUV — group travel", tone: "var(--color-saffron-dark)" },
  { name: "Innova Crysta", seats: "7 Seater", use: "MUV — premium outstation", tone: "var(--color-moss-dark)" },
  { name: "Tempo Traveller", seats: "12-17 Seater", use: "Group pilgrimage tours", tone: "var(--color-saffron)" },
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
            Pick the ride that fits the trip.
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            Lineup below — confirm which of these you actually run, and swap
            in real per-km / per-day rates once you have a rate card handy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fleet.map((car) => (
            <div key={car.name} className="rounded-2xl bg-white p-5 border border-ink/10">
              <CarMark tone={car.tone} />
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {car.name}
              </h3>
              <p className="font-mono text-xs text-ink/50 mt-1">{car.seats}</p>
              <p className="mt-2 text-sm text-ink/65">{car.use}</p>
              <a
                href="tel:+919324378802"
                className="mt-4 inline-block text-sm font-medium text-saffron-dark hover:text-saffron"
              >
                Call for rates →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}