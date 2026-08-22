const steps = [
  {
    label: "Always On Call",
    value: "Book at 3 PM or 3 AM — we're rolling either way, 24/7.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-saffron-dark)" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Drivers You Can Trust",
    value: "Every driver background-checked. Every cab inspected. No surprises.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-saffron-dark)" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Safety, Not an Afterthought",
    value: "GPS-tracked trips and seatbelt-first rides — your safety, guaranteed.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-saffron-dark)" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.2" />
        <path d="M12 12.2V16" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-cream py-16 sm:py-20">
      <div className="w-full px-5 sm:px-8 lg:px-12 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-saffron-dark">
          Ride with confidence
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">
          Booking a cab{" "}
          <span className="text-saffron-dark italic">shouldn&apos;t</span> feel
          like a chore.
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-ink/60">
          One call, one message, or one tap — that's all it takes. Here's why
          thousands of travellers trust Swami Tours to get them there.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className="group relative rounded-2xl border border-ink/10 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-saffron/40"
            >
              <span className="absolute top-6 right-6 font-display text-4xl font-semibold text-ink/5 group-hover:text-saffron/10 transition-colors">
                0{i + 1}
              </span>

              <div className="h-14 w-14 rounded-full bg-saffron/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-saffron/20">
                {s.icon}
              </div>

              <p className="mt-5 font-display text-lg font-semibold text-ink">
                {s.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {s.value}
              </p>

              <div className="mt-5 h-0.5 w-10 bg-saffron/30 transition-all duration-300 group-hover:w-16 group-hover:bg-saffron" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-saffron-dark px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md"
          >
            Book Your Ride Now
          </a>
          <p className="text-xs text-ink/50">
            ★ 5.0 rated · Trusted by travellers across Maharashtra
          </p>
        </div>
      </div>
    </section>
  );
}