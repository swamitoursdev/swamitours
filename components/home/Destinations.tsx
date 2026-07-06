const destinations = [
  { name: "Trimbakeshwar", note: "Jyotirlinga darshan, 30 min from Nashik" },
  { name: "Shirdi", note: "Sai Baba temple, popular day trip" },
  { name: "Saptashrungi", note: "Hilltop Devi temple & ropeway" },
  { name: "Pandharpur", note: "Vithoba temple, Ashadhi Ekadashi route" },
  { name: "Bhimashankar", note: "Jyotirlinga amid the Sahyadri hills" },
  { name: "Aurangabad", note: "Ajanta-Ellora caves circuit" },
];

export default function Destinations() {
  return (
    <section id="destinations" className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
      <div className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
          Where we go
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
          Popular routes out of Nashik.
        </h2>
        <p className="mt-3 text-sm text-ink/60">
          Placeholder list — swap in your real routes, distances and fares.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((dest, i) => (
          <div
            key={dest.name}
            className="group relative overflow-hidden rounded-2xl h-40 flex flex-col justify-end p-5"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(135deg, var(--color-moss), var(--color-moss-dark))"
                  : "linear-gradient(135deg, var(--color-saffron), var(--color-saffron-dark))",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="white"
              className="absolute top-4 right-4 opacity-70"
              aria-hidden="true"
            >
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <h3 className="font-display text-lg font-semibold text-white">
              {dest.name}
            </h3>
            <p className="mt-1 text-xs text-white/80">{dest.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
