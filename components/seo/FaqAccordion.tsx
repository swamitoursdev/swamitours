export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      <style>{`
        @keyframes faqFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqAnswerIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {faqs.map((f, i) => (
        <details
          key={f.q}
          className="group relative overflow-hidden rounded-lg bg-white opacity-0 shadow-sm transition-shadow duration-300 hover:shadow-md"
          style={{ animation: `faqFadeIn 0.5s ease-out ${i * 90}ms forwards` }}
        >
          {/* gold strip border */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-amber-300 via-yellow-500 to-amber-600 transition-all duration-300 group-open:w-1.5 group-hover:w-1.5"
          />
          {/* faint gold ring on open/hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-ink/10 transition-all duration-300 group-open:ring-amber-400/60 group-hover:ring-amber-400/40"
          />

          <summary className="relative cursor-pointer list-none flex items-center justify-center gap-3 px-5 py-3 text-center text-sm font-medium text-ink">
            {f.q}
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-saffron-dark transition-all duration-300 group-open:rotate-45 group-open:bg-linear-to-br group-open:from-amber-400 group-open:to-amber-600 group-open:text-white">
              +
            </span>
          </summary>

          <p
            className="relative px-5 pb-4 text-center text-sm text-ink/60"
            style={{ animation: "faqAnswerIn 0.25s ease-out" }}
          >
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}