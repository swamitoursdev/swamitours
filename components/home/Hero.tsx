import BookingWidget from "./BookingWidget";
import RouteDivider from "../ui/RouteDivider";

const stats = [
  { value: "8+", label: "Years on the road" },
  { value: "40+", label: "Destinations covered" },
  { value: "24×7", label: "Booking support" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-moss">
      {/* Custom illustration: ghats + hills + a dashed pilgrim route, drawn
          rather than sourced, so nothing here is stock photography. */}
      <svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full opacity-90"
        aria-hidden="true"
      >
        <rect width="1200" height="500" fill="var(--color-moss)" />
        <path d="M0 320 L180 200 L360 320 L520 220 L700 320 L880 210 L1050 320 L1200 260 L1200 500 L0 500 Z" fill="var(--color-moss-dark)" opacity="0.6" />
        <path d="M0 380 L220 280 L420 380 L600 300 L820 380 L1000 300 L1200 370 L1200 500 L0 500 Z" fill="#152c0d" opacity="0.7" />
        <path
          d="M40 460 C 300 380, 500 480, 760 400 S 1050 340, 1180 420"
          stroke="var(--color-saffron)"
          strokeWidth="3"
          strokeDasharray="4 14"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <circle cx="1180" cy="420" r="7" fill="var(--color-saffron)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-24 flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
          Cabs · Outstation · Pilgrimage Tours
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-tight text-white max-w-2xl">
          Every journey deserves a driver who knows the way.
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Swami Tours runs local cabs, outstation trips and pilgrimage
          packages across Maharashtra — one call, and the whole route is
          planned for you.
        </p>

        <div className="mt-10 w-full flex justify-center">
          <BookingWidget />
        </div>

        <div className="mt-14 grid grid-cols-3 gap-8 w-full max-w-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="text-white">
              <p className="font-display text-2xl font-semibold text-saffron">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-sand">
        <div className="-translate-y-3">
          <RouteDivider />
        </div>
      </div>
    </section>
  );
}
