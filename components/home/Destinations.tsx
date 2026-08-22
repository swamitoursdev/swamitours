"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { routeSlug } from "@/lib/cab-routes";

// `to` must match a destination name in lib/cab-routes.ts exactly, since
// that's what generates the route pages (routeSlug pairs it with "Mumbai").
// Grouped cards (multiple places in one card) now point at their own
// combined destination entry, so each gets a real, dedicated route page.
// `image` maps to the actual file in /assets/Destinations (filenames don't
// match `to` 1:1 — e.g. "Lonavala & Khandala" ships as Lonavla.webp).
const destinations = [
  { name: "Matheran", to: "Matheran", image: "Matheran", note: "Car up to the base, then a short trek in" },
  { name: "Lonavala & Khandala", to: "Lonavala & Khandala", image: "Lonavla", note: "Weekend getaway, monsoon route" },
  { name: "Karjat & Khopoli", to: "Karjat & Khopoli", image: "Karjat", note: "Waterfalls and resort stays, short hop from Navi Mumbai" },
  { name: "Mahabaleshwar", to: "Mahabaleshwar", image: "Mahabaleshwar", note: "Hill station, strawberry season drives" },
  { name: "Trimbakeshwar & Nashik", to: "Trimbakeshwar & Nashik", image: "Trimbakeshwar", note: "Jyotirlinga darshan, wine country stops" },
  { name: "Shirdi & Shani Shingnapur", to: "Shirdi & Shani Shingnapur", image: "Shirdi", note: "Sai Baba temple, popular day trip" },
  { name: "Kolhapur – Jyotiba & Mahalakshmi", to: "Kolhapur – Jyotiba & Mahalakshmi", image: "Kolhapur", note: "Temple circuit, full day drive" },
  {
    name: "Konkan – Harihareshwar, Shrivardhan, Diveagar Beach, Aare Ware Beach, Ganpatipule & Alibaug",
    to: "Konkan",
    image: "Konkan",
    note: "Coastal route, beaches and temple towns strung along the way",
  },
];

// Images live at /assets/Destinations/<image>.webp — webp only, no fallback
// to jpg. Missing file is expected/handled and falls back to the tone
// gradient tile rather than breaking the card.
function destinationImageSrc(image: string): string {
  return encodeURI(`/assets/Destinations/${image}.webp`);
}

export default function Destinations() {
  const [broken, setBroken] = useState<boolean[]>(() => Array(destinations.length).fill(false));

  return (
    <section id="destinations" className="w-full px-5 sm:px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-[1800px] w-full">
        <div className="max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
            Where we go
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Popular routes out of Navi Mumbai.
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            Placeholder list — swap in your real routes, distances and fares.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((dest, i) => {
            const imageSrc = destinationImageSrc(dest.image);
            const showImage = !broken[i];
            const fallbackGradient =
              i % 2 === 0
                ? "linear-gradient(135deg, var(--color-moss), var(--color-moss-dark))"
                : "linear-gradient(135deg, var(--color-saffron), var(--color-saffron-dark))";

            return (
              <Link
                key={dest.name}
                href={`/${routeSlug("Mumbai", dest.to)}`}
                className="group relative overflow-hidden rounded-2xl h-40 flex flex-col justify-end p-5 transition-transform hover:-translate-y-0.5"
                style={!showImage ? { background: fallbackGradient } : undefined}
              >
                {showImage && (
                  <>
                    <Image
                      src={imageSrc}
                      alt={dest.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={() =>
                        setBroken((prev) => {
                          const next = [...prev];
                          next[i] = true;
                          return next;
                        })
                      }
                    />
                    {/* dark scrim so white text stays readable over a photo */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                      aria-hidden="true"
                    />
                  </>
                )}

                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="white"
                  className="absolute top-4 right-4 z-10 opacity-70"
                  aria-hidden="true"
                >
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <h3 className="relative z-10 font-display text-lg font-semibold text-white">
                  {dest.name}
                </h3>
                <p className="relative z-10 mt-1 text-xs text-white/80">{dest.note}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}