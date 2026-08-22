"use client";

import Image from "next/image";
import { useState } from "react";

const places = ["Shirdi", "Aurangabad", "Lonavala", "Mahabaleshwar", "Alibaug", "Matheran"];
const tones = [
  "var(--color-saffron)", "var(--color-moss)", "var(--color-saffron-dark)",
  "var(--color-moss-dark)", "var(--color-saffron)", "var(--color-moss)",
];

// Images live at /assets/TopPlaces/<place>.webp — dropped in over time, so a
// missing file is expected and falls back to the tone gradient circle rather
// than breaking the card.
function placeImageSrc(place: string): string {
  return encodeURI(`/assets/TopPlaces/${place}.webp`);
}

export default function TopPlaces() {
  const [broken, setBroken] = useState<boolean[]>(() => Array(places.length).fill(false));

  return (
    <section className="w-full py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
          Top Places To Visit In Maharashtra
        </h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 lg:gap-x-0">
          {places.map((place, i) => {
            const imageSrc = placeImageSrc(place);
            const showImage = !broken[i];

            return (
              <div key={place} className="flex flex-col items-center gap-3 justify-self-center">
                <div
                  className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-40 lg:w-40 overflow-hidden rounded-full border-4 border-white shadow-md"
                  style={!showImage ? { background: `linear-gradient(160deg, ${tones[i]}, var(--color-ink))` } : undefined}
                >
                  {showImage && (
                    <Image
                      src={imageSrc}
                      alt={place}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 160px, (min-width: 640px) 112px, 96px"
                      className="object-cover"
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
                <p className="text-sm lg:text-base font-medium text-ink">{place}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}