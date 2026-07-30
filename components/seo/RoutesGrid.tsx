"use client";

import { useState } from "react";
import Link from "next/link";
import { routes as defaultRoutes, routeSlug } from "@/lib/cab-routes";

export default function RoutesGrid({
  title = "Popular City Services",
  routes = defaultRoutes,
  exclude,
  fromCity,
}: {
  title?: string;
  routes?: { from: string; to: string }[];
  exclude?: string;
  fromCity?: string;
}) {
  const [search, setSearch] = useState("");

  const scoped = fromCity
    ? routes.filter((r) => r.from.toLowerCase() === fromCity.toLowerCase())
    : routes;

  const withoutCurrent = exclude
    ? scoped.filter((r) => routeSlug(r.from, r.to) !== exclude)
    : scoped;

  const query = search.trim().toLowerCase();
  const list = query
    ? withoutCurrent.filter((r) =>
        `${r.from} to ${r.to}`.toLowerCase().includes(query)
      )
    : withoutCurrent;

  if (withoutCurrent.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-ink">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-ink/60">
          Discover reliable cab services in top cities with Swami Tours.
          Click below to explore availability!
        </p>

        <div className="mt-6 mx-auto max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search routes, e.g. Pune or Shirdi"
            className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2 text-sm text-ink placeholder-ink/40 transition-colors focus:outline-2 focus:outline-saffron"
          />
        </div>

        {list.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {list.map((r) => {
              const slug = routeSlug(r.from, r.to);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-lg border border-ink/10 bg-white px-3 py-2.5 text-center text-sm text-saffron-dark hover:bg-saffron/5 hover:border-saffron/30 transition-colors"
                >
                  {r.from} to {r.to}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-ink/50">
            No routes match &quot;{search}&quot;.
          </p>
        )}
      </div>
    </section>
  );
}