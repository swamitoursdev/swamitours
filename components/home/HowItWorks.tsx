const steps = [
  { label: "We are Available", value: "24/7" },
  { label: "We have", value: "Verified Cabs & Drivers" },
  { label: "We Provide", value: "Safety Guaranteed" },
];

export default function HowItWorks() {
  return (
    <section className="bg-moss/5 py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
          Super <span className="text-saffron-dark italic">Easy</span> Booking
        </h2>
        <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">Ride with confidence</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.label} className="rounded-xl border border-ink/10 bg-white p-8">
              <div className="mx-auto h-12 w-12 rounded-full bg-saffron/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--color-saffron-dark)" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M5 20c1.5-4 5-5 7-5s5.5 1 7 5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-4 font-display text-base font-semibold text-ink">{s.label}</p>
              <p className="mt-1 text-sm text-saffron-dark">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}