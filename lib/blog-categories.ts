export const BLOG_CATEGORIES = [
  "Trekking & Adventure",
  "Food & Culture",
  "Destination Guides",
  "Fleet & Travel Tips",
  "Pilgrimage & Heritage",
  "News & Announcements",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
