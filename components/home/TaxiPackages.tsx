"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routeSlug } from "@/lib/cab-routes";

const packages = [
  { title: "Mumbai to Pune", to: "Pune", note: "Vice versa fares also available", price: "₹2,999", unit: "", tone: "var(--color-saffron)" },
  { title: "Mumbai to Nashik", to: "Nashik", note: "Vice versa fares also available", price: "₹2,999", unit: "", tone: "var(--color-moss)" },
  { title: "Mumbai to Kolhapur", to: "Kolhapur", note: "Vice versa fares also available", price: "₹6,999", unit: "", tone: "var(--color-saffron-dark)" },
  { title: "Mumbai to Sangli", to: "Sangli", note: "Vice versa fares also available", price: "₹6,999", unit: "", tone: "var(--color-moss-dark)" },
  { title: "Mumbai to Chhatrapati Sambhaji Nagar", to: "Aurangabad", note: "Vice versa fares also available", price: "₹6,999", unit: "", tone: "var(--color-saffron)" },
  { title: "Mumbai to Goa", to: "Goa", note: "Vice versa fares also available", price: "₹11,999", unit: "", tone: "var(--color-moss)" },
  { title: "3 & 5 Jyotirlinga Darshan", note: "Trimbakeshwar, Bhimashankar & more", price: "₹14,999", unit: "/day", tone: "var(--color-saffron-dark)" },
  { title: "Hill Station Getaway", note: "Experience Maharashtra's hill stations", price: "₹5,999", unit: "/day", tone: "var(--color-moss-dark)" },
  { title: "Mumbai City Darshan", note: "Discover the wonders of Mumbai", price: "₹2,999", unit: "/day", tone: "var(--color-moss)" },
  { title: "Ashtavinayak Darshan", note: "Full-circuit temple tour package", price: "₹8,499", unit: "/day", tone: "var(--color-saffron)" },
];

function packageImageSrc(title: string): string {
  return encodeURI(`/assets/Taxi Packages/${title}.webp`);
}

/** Standalone city photo used in the route "split → reveal" visual (not the combined route graphic). */
function cityImageSrc(name: string): string {
  return encodeURI(`/assets/Taxi Packages/${name}.webp`);
}

/** Some destinations' standalone photo file doesn't match the route's `to` label exactly. */
const DESTINATION_IMAGE_NAME: Record<string, string> = {
  Aurangabad: "Chatrapati Sambhaji Nagar",
};

function destinationImageName(city: string): string {
  return DESTINATION_IMAGE_NAME[city] ?? city;
}

/** The `to` field drives routing/slugs (kept as-is); this is just what's shown to the user. */
const DESTINATION_DISPLAY_NAME: Record<string, string> = {
  Aurangabad: "Chhatrapati Sambhaji Nagar",
};

function destinationDisplayName(city: string): string {
  return DESTINATION_DISPLAY_NAME[city] ?? city;
}

/** Observes each card and marks it visible the first time it enters the viewport. */
function useRevealOnScroll(count: number) {
  const refs = useRef<Array<HTMLElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>(() => Array(count).fill(false));

  useEffect(() => {
    const nodes = refs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setVisible((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { refs, visible };
}

export default function TaxiPackages() {
  const cardCount = packages.length + 1; // +1 for the "Best Price" CTA card
  const { refs, visible } = useRevealOnScroll(cardCount);
  const [broken, setBroken] = useState<boolean[]>(() => Array(packages.length).fill(false));

  const cardWidth =
    "w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] sm:h-[440px]";

  return (
    <section className="w-full px-5 sm:px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-[1800px] w-full">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
            Taxi Packages
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Explore our wide range of inter-city, spiritual and sightseeing
            tour packages designed for your comfort.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-5 md:gap-6">
          {packages.map((p, i) => {
            const href = p.to ? `/${routeSlug("Mumbai", p.to)}` : "/book-a-ride";
            const imageSrc = packageImageSrc(p.title);
            const showImage = !broken[i];
            const isRoute = Boolean(p.to);

            return (
              <div
                key={p.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className={`package-card group relative ${cardWidth} transition-all duration-700 ease-out hover:z-20 ${
                  visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible[i] ? `${(i % 4) * 90}ms` : "0ms" }}
              >
                {isRoute ? (
                  // One-way city routes: a full-bleed photo poster — the Mumbai/destination
                  // visual fills the whole card and the route info sits directly over it,
                  // matching the reference banner treatment (no separate ticket panel).
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl sm:aspect-auto sm:h-full">
                    <div className="route-slider absolute inset-0 flex h-full w-[200%]">
                      <div
                        className="h-full w-1/2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${cityImageSrc("Mumbai")})` }}
                      />
                      <div
                        className="h-full w-1/2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${cityImageSrc(destinationImageName(p.to!))})` }}
                      />
                    </div>

                    <div
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10"
                      aria-hidden="true"
                    />

                    <div className="relative flex h-full flex-col justify-end p-5">
                      <h3
                        className="font-display text-[28px] font-black leading-[0.95] text-white"
                        style={{
                          textShadow: "0 2px 0 rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        Mumbai <span className="text-white/60">–</span> {destinationDisplayName(p.to!)}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-white/75">{p.note}</p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                        <span className="font-display text-xl font-bold text-white">{p.price}</span>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors group-hover:bg-saffron group-hover:text-white"
                        >
                          Book Now
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Multi-destination tours: the original photo-forward card.
                  // Flex column fills the shared card height; the image area
                  // absorbs whatever space the text panel doesn't need, so
                  // every card lines up regardless of note length.
                  <div className="flex h-full flex-col">
                    {showImage ? (
                      <div className="relative aspect-3/2 w-full sm:aspect-auto sm:min-h-0 sm:flex-1">
                        <div
                          className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                          style={{ background: p.tone }}
                          aria-hidden="true"
                        />
                        <div className="relative h-full w-full scale-[1.0] transition-transform duration-500 ease-out group-hover:scale-[1.15]">
                          <Image
                            src={imageSrc}
                            alt={p.title}
                            fill
                            unoptimized
                            className="object-contain drop-shadow-lg"
                            onError={() =>
                              setBroken((prev) => {
                                const next = [...prev];
                                next[i] = true;
                                return next;
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="aspect-3/2 w-full rounded-xl transition-transform duration-500 ease-out group-hover:scale-105 sm:aspect-auto sm:min-h-0 sm:flex-1"
                        style={{ background: `linear-gradient(150deg, ${p.tone}, var(--color-ink))` }}
                      />
                    )}

                    <div className="-mt-1 flex flex-col justify-between rounded-xl border border-ink/10 bg-white p-5 transition-all duration-300 group-hover:border-ink/20 group-hover:shadow-xl sm:flex-none">
                      <div>
                        <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                        <p className="mt-1 text-xs text-ink/60">{p.note}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-display text-lg font-semibold text-saffron-dark">
                          {p.price}
                          {p.unit && <span className="text-xs font-normal text-ink/50">{p.unit}</span>}
                        </span>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1 text-xs font-medium text-moss-dark transition-colors hover:text-moss"
                        >
                          View Details
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/book-a-ride"
            ref={(el) => {
              refs.current[packages.length] = el;
            }}
            data-index={packages.length}
            className={`package-card ${cardWidth} rounded-xl bg-moss text-white flex flex-col items-center justify-center gap-2 p-8 text-center transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:bg-moss-dark ${
              visible[packages.length] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visible[packages.length]
                ? `${(packages.length % 4) * 90}ms`
                : "0ms",
            }}
          >
            <span className="font-display text-lg font-semibold">Best Price Guaranteed!</span>
            <span className="text-xs text-white/70">Book your cab now — 24/7 support available</span>
            <span className="mt-2 rounded-lg bg-saffron px-4 py-2 text-xs font-medium">
              View Taxi Packages
            </span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .route-slider {
          transform: translateX(-25%);
        }
        .group:hover .route-slider {
          animation: route-reveal 2.2s ease-in-out forwards;
        }
        @keyframes route-reveal {
          0% {
            transform: translateX(-25%);
          }
          45% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes route-loop {
          0%,
          12% {
            transform: translateX(-25%);
          }
          35%,
          50% {
            transform: translateX(0%);
          }
          73%,
          88% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        @media (max-width: 639.98px) {
          .route-slider {
            animation: route-loop 6s ease-in-out infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .package-card {
            transition: none !important;
          }
          .route-slider {
            animation: none !important;
            transform: translateX(-25%) !important;
          }
        }
      `}</style>
    </section>
  );
}