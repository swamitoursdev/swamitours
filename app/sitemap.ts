import type { MetadataRoute } from "next";

const base = "https://www.swamitours.com";

const routes = [
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
  return routes.map((route) => ({
    url: `${base}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
