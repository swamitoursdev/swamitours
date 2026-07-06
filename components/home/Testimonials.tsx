const reviews = [
  {
    quote:
      "Booked a same-day trip to Shirdi and the driver called ahead to confirm pickup. Smooth both ways.",
    name: "Placeholder Reviewer",
  },
  {
    quote:
      "Used their Tempo Traveller for a family Ekadashi trip to Pandharpur. Clean vehicle, easy to reach the driver.",
    name: "Placeholder Reviewer",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
          Riders say
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white">
          Real reviews go here.
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <blockquote
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/85"
            >
              <p className="leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-4 font-mono text-xs text-saffron">{r.name}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
