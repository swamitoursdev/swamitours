const places = ["Shirdi", "Aurangabad", "Lonavala", "Mahabaleshwar", "Alibaug", "Matheran"];
const tones = [
  "var(--color-saffron)", "var(--color-moss)", "var(--color-saffron-dark)",
  "var(--color-moss-dark)", "var(--color-saffron)", "var(--color-moss)",
];

export default function TopPlaces() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
          Top Places To Visit In Maharashtra
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {places.map((place, i) => (
            <div key={place} className="flex flex-col items-center gap-2 w-24">
              <div
                className="h-20 w-20 rounded-full border-4 border-white shadow-md"
                style={{ background: `linear-gradient(160deg, ${tones[i]}, var(--color-ink))` }}
              />
              <p className="text-sm font-medium text-ink">{place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}