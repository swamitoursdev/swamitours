"use client";

import { useState } from "react";
import Link from "next/link";
import { states, slugify } from "@/lib/cab-routes";

export default function StatesGrid() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const list = query
    ? states.filter((state) => state.toLowerCase().includes(query))
    : states;

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

        <div className="mt-6 mx-auto max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search states, e.g. Maharashtra"
            className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2 text-sm text-ink placeholder-ink/40 transition-colors focus:outline-2 focus:outline-saffron"
          />
        </div>

        {list.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {list.map((state) => (
              <Link
                key={state}
                href={`/cab-service-in-${slugify(state)}`}
                className="rounded-lg border border-ink/10 bg-white px-3 py-2.5 text-center text-sm text-saffron-dark hover:bg-saffron/5 hover:border-saffron/30 transition-colors"
              >
                Cab Service in {state}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-ink/50">
            No states match &quot;{search}&quot;.
          </p>
        )}
      </div>
    </section>
  );
}