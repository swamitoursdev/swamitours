const reviews = [
  {
    quote:
      "If you are looking for a reliable car rental agency in Belapur, Swami Tours is the best choice. Exceptional car rental agency in Navi Mumbai.",
    name: "Nikhil L",
    meta: "Google review",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="14" height="14" fill="var(--color-saffron)">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.4 6-5.5-3.2-5.5 3.2 1.4-6L1.3 7.7l6.1-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
          Riders say
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-3">
          <h2 className="font-display text-3xl font-semibold text-white">
            5.0 on Google
          </h2>
          <span className="font-mono text-xs text-white/50">(2 reviews)</span>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <blockquote
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/85"
            >
              <Stars />
              <p className="mt-3 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-4 font-mono text-xs text-saffron">
                {r.name} <span className="text-white/40">· {r.meta}</span>
              </p>
            </blockquote>
          ))}

          <a
            href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwi4mMy__L2VAxUAAAAAHQAAAAAQCA..i&sca_esv=2fa727a4d830487c&udm=1&pvq=Cg0vZy8xMW5xeG55dGp5IhEKC3N3YW1pIHRvdXJzEAIYAw&lqi=Cgtzd2FtaSB0b3Vyc0idzLvK27SAgAhaFRAAEAEYABgBIgtzd2FtaSB0b3Vyc5IBEWNhcl9yZW50YWxfYWdlbmN5&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7c3baa3d1adbd:0x91ed20f6c76f79c3"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-start justify-center text-white/70 hover:border-saffron hover:text-white transition-colors"
          >
            <span className="font-display text-base font-semibold">
              Read all reviews on Google →
            </span>
            <span className="mt-2 text-sm text-white/50">
              And leave one of your own after a trip.
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}