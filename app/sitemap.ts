import type { MetadataRoute } from "next";
import { routes, routeSlug, states, stateSlug } from "@/lib/cab-routes";

const base = "https://www.swamitours.com";

// Bump the relevant constant below whenever that section's content actually
// changes (new copy, new routes/states added, redesigned page, etc). Using
// fixed dates instead of `new Date()` keeps lastmod meaningful — search
// engines use it as a freshness signal, so it shouldn't flip on every build
// when nothing on the page changed.
const SITE_LAST_MODIFIED = new Date("2026-07-30");
const ROUTES_LAST_MODIFIED = new Date("2026-07-30");
const STATES_LAST_MODIFIED = new Date("2026-07-30");

const staticRoutes = [
  "",
  "about-us",
  "book-a-ride",
  "my-profile",
  "my-trips",
  "earnings",
  "travel-points",
  "careers",
  "blogs",
  "contact-us",
  "login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}/${route}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const cityRouteEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}/${routeSlug(r.from, r.to)}`,
    lastModified: ROUTES_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const stateEntries: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${base}/${stateSlug(s)}`,
    lastModified: STATES_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...cityRouteEntries, ...stateEntries];
}