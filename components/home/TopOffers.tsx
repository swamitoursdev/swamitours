const offers = [
  { title: "Travel India with the most affordable rates", note: "Get upto ₹500 off on your monthly cab with Swami Tours.", tone: "var(--color-moss)" },
  { title: "Airport Rides Made Easy", note: "Get upto ₹400 off with Swami Tours.", tone: "var(--color-saffron-dark)" },
  { title: "Rent a Car for Short Trips", note: "Enjoy your local trip and get upto ₹150 off on rental.", tone: "var(--color-moss-dark)" },
  { title: "Hassle-Free Cab Hiring", note: "Local trip starting at ₹150/- off.", tone: "var(--color-saffron)" },
];

export default function TopOffers() {
  return (
    <section className="bg-moss/5 py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-ink">
          Top Offers
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offers.map((o) => (
            <div
              key={o.title}
              className="rounded-xl overflow-hidden text-white flex flex-col justify-between h-44 p-5"
              style={{ background: `linear-gradient(150deg, ${o.tone}, var(--color-ink))` }}
            >
              <p className="font-display text-base font-semibold leading-snug">{o.title}</p>
              <p className="text-xs text-white/80">{o.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}