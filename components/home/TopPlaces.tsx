"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routeSlug } from "@/lib/cab-routes";

const places = ["Shirdi", "Aurangabad", "Lonavala", "Mahabaleshwar", "Alibaug", "Matheran"];
const tones = [
  "var(--color-saffron)", "var(--color-moss)", "var(--color-saffron-dark)",
  "var(--color-moss-dark)", "var(--color-saffron)", "var(--color-moss)",
];

// Images live at /assets/Top Places/<file>.webp — dropped in over time, so a
// missing file is expected and falls back to the tone gradient circle rather
// than breaking the card. Filenames on disk don't always match the display
// label exactly, so map them explicitly.
const placeImageFile: Record<string, string> = {
  Shirdi: "Shirdi.webp",
  Lonavala: "Lonavla.webp",
  Mahabaleshwar: "Mahabaleshwar.webp",
  Matheran: "Matheran.webp",
  Aurangabad: "Aurangabad.webp",
  Alibaug: "Alibaug.webp",
};

function placeImageSrc(place: string): string | null {
  const file = placeImageFile[place];
  if (!file) return null;
  return encodeURI(`/assets/Top Places/${file}`);
}

export default function TopPlaces() {
  const [broken, setBroken] = useState<boolean[]>(() => Array(places.length).fill(false));
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll-triggered reveal — fires on mobile and desktop alike, no hover needed.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 text-center">
        <h2
          className={`font-display text-2xl sm:text-3xl font-semibold text-ink transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          Discover Maharashtra: Top Sights
        </h2>
        <p
          className={`mt-3 text-sm sm:text-base text-ink/70 max-w-2xl mx-auto transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          From sacred shrines to hill-station sunsets, six destinations worth building your trip around.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 lg:gap-x-0">
          {places.map((place, i) => {
            const imageSrc = placeImageSrc(place);
            const showImage = imageSrc !== null && !broken[i];

            return (
              <Link
                key={place}
                href={`/${routeSlug("Mumbai", place)}`}
                className={`group flex flex-col items-center gap-3 justify-self-center transition-all duration-700 ease-out ${
                  visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
                }`}
                style={{ transitionDelay: visible ? `${200 + i * 120}ms` : "0ms" }}
              >
                <div
                  className="place-float relative h-24 w-24 sm:h-28 sm:w-28 lg:h-40 lg:w-40 rounded-full"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  {/* pulsing ring behind the circle */}
                  <span
                    className="place-pulse-ring absolute inset-0 rounded-full"
                    style={{ background: tones[i], animationDelay: `${i * 0.35}s` }}
                    aria-hidden="true"
                  />
                  <div
                    className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl active:scale-95"
                    style={!showImage ? { background: `linear-gradient(160deg, ${tones[i]}, var(--color-ink))` } : undefined}
                  >
                    {showImage && imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={place}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 160px, (min-width: 640px) 112px, 96px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-125"
                        onError={() =>
                          setBroken((prev) => {
                            const next = [...prev];
                            next[i] = true;
                            return next;
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <p className="text-sm lg:text-base font-medium text-ink transition-colors duration-300 group-hover:text-saffron-dark">
                  {place}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes placeFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .place-float {
          animation: placeFloat 3.2s ease-in-out infinite;
        }

        @keyframes placePulseRing {
          0% {
            transform: scale(1);
            opacity: 0.35;
          }
          70% {
            transform: scale(1.25);
            opacity: 0;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }
        .place-pulse-ring {
          animation: placePulseRing 2.6s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .place-float,
          .place-pulse-ring {
            animation: none;
          }
          h2,
          p,
          div {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}