import Link from "next/link";
import { states, slugify } from "@/lib/cab-routes";

export default function StatesGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-ink">
          Taxi &amp; Cab Services Available Across Indian States
        </h2>
        <p className="mt-2 text-center text-sm text-ink/60">
          Discover trusted cab services in multiple states across India.
          Choose your state to explore city taxis, airport pickups and
          outstation travel options with Swami Tours.
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {states.map((state) => (
            <Link
              key={state}
              href={`/cab-service-in-${slugify(state)}`}
              className="rounded-lg border border-ink/10 bg-white px-3 py-2.5 text-center text-sm text-saffron-dark hover:bg-saffron/5 hover:border-saffron/30 transition-colors"
            >
              Cab Service in {state}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}