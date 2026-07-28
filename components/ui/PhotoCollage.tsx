const tones = [
  "var(--color-moss-dark)", "var(--color-saffron)", "var(--color-moss)",
  "var(--color-saffron-dark)", "var(--color-saffron-dark)", "var(--color-moss)",
  "var(--color-saffron)", "var(--color-moss-dark)",
];

export default function PhotoCollage() {
  return (
    <div className="grid grid-cols-4 gap-1 overflow-hidden rounded-xl">
      {tones.map((tone, i) => (
        <div key={i} className="h-24 sm:h-32" style={{ background: `linear-gradient(160deg, ${tone}, var(--color-ink))` }} />
      ))}
    </div>
  );
}