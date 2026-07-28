import Link from "next/link";
import { routes as defaultRoutes, routeSlug } from "@/lib/cab-routes";

export default function RoutesGrid({
  title = "Popular City Services",
  routes = defaultRoutes,
  exclude,
}: {
  title?: string;
  routes?: { from: string; to: string }[];
  exclude?: string;
}) {
  const list = exclude ? routes.filter((r) => routeSlug(r.from, r.to) !== exclude) : routes;

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
      </div>
    </section>
  );
}