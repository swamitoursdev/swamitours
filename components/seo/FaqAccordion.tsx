export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-2">
      {faqs.map((f) => (
        <details key={f.q} className="group rounded-lg border border-ink/10 bg-white px-4 py-3">
          <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-medium text-ink">
            {f.q}
            <span className="ml-3 text-saffron-dark transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-sm text-ink/60">{f.a}</p>
        </details>
      ))}
    </div>
  );
}