import type { MetadataRoute } from "next";
import { routes, routeSlug, states, stateSlug } from "@/lib/cab-routes";

const base = "https://www.swamitours.com";

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
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const cityRouteEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}/${routeSlug(r.from, r.to)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const stateEntries: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${base}/${stateSlug(s)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...cityRouteEntries, ...stateEntries];
}