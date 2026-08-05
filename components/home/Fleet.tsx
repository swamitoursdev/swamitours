import { fareRows } from "@/lib/cab-routes";

const tones = [
  "var(--color-saffron)",
  "var(--color-moss)",
  "var(--color-saffron-dark)",
  "var(--color-moss-dark)",
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
            From a quick city hatchback to a Tempo Traveller for the whole
            group — every category below is available to book by Cab Type.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fareRows.map((row, i) => (
            <div
              key={`${row.category}-${i}`}
              className="rounded-2xl bg-white p-5 border border-ink/10"
            >
              <CarMark tone={tones[i % tones.length]} />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-saffron-dark">
                {row.category}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold text-ink">
                {row.vehicles}
              </h3>
              <p className="mt-2 text-sm font-medium text-ink/65">{row.rate}</p>
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