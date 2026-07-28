import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/my-profile", "/my-trips", "/earnings", "/travel-points"],
    },
    sitemap: "https://www.swamitours.com/sitemap.xml",
  };
}
