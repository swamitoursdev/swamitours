"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fareRows } from "@/lib/cab-routes";

const tones = [
  "var(--color-saffron)",
  "var(--color-moss)",
  "var(--color-saffron-dark)",
  "var(--color-moss-dark)",
];

/**
 * Maps a row's vehicle text to a photo in /public/assets/Fleet.
 * Keys are checked longest-first so "crysta"/"hycross" win over the
 * generic "innova" before it does.
 */
const fleetImages: Record<string, string> = {
  crysta: "/assets/Fleet/Crysta.webp",
  hycross: "/assets/Fleet/Hycross.webp",
  fortuner: "/assets/Fleet/Fortuner.webp",
  scorpio: "/assets/Fleet/Scorpio.webp",
  ertiga: "/assets/Fleet/Ertiga.webp",
  wagonr: "/assets/Fleet/WagonR.webp",
  accent: "/assets/Fleet/Accent.webp",
  etios: "/assets/Fleet/Etios.webp",
  innova: "/assets/Fleet/Innova.webp",
  carens: "/assets/Fleet/Carens.webp",
  urbania: "/assets/Fleet/Urbania.webp",
  tempo: "/assets/Fleet/Tempo.webp",
  traveller: "/assets/Fleet/Tempo.webp",
  traveler: "/assets/Fleet/Tempo.webp",
  prime: "/assets/Fleet/Prime.webp",
  dzire: "/assets/Fleet/Prime.webp",
  bus: "/assets/Fleet/Bus.webp",
};

function resolveFleetImage(...text: string[]): string | null {
  const normalized = text.join(" ").toLowerCase().replace(/[^a-z]/g, "");
  const key = Object.keys(fleetImages)
    .sort((a, b) => b.length - a.length)
    .find((k) => normalized.includes(k));
  return key ? fleetImages[key] : null;
}

function CarMark({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 120 60" width="100%" height="100%" aria-hidden="true">
      <rect x="8" y="26" width="104" height="20" rx="8" fill={tone} opacity="0.15" />
      <path
        d="M18 40 L26 22 Q30 16 40 16 H80 Q90 16 94 22 L102 40"
        fill="none"
        stroke={tone}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="14" y="38" width="92" height="10" rx="5" fill={tone} />
      <circle cx="34" cy="48" r="7" fill="var(--color-ink)" />
      <circle cx="86" cy="48" r="7" fill="var(--color-ink)" />
    </svg>
  );
}

/** Observes each card and marks it visible the first time it enters the viewport. */
function useRevealOnScroll(count: number) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
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

export default function Fleet() {
  const { refs, visible } = useRevealOnScroll(fareRows.length);
  const [broken, setBroken] = useState<boolean[]>(() => Array(fareRows.length).fill(false));

  return (
    <section id="fleet" className="w-full bg-cream py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
            The fleet
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-ink">
            Pick the ride that fits the trip.
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            From a quick city hatchback to a Tempo Traveller for the whole
            group — every category below is available to book by Cab Type.
          </p>

          {/* Animated route line — a small nod to the road the fleet actually runs */}
          <svg
            className="route-line mx-auto mt-6 w-full max-w-xs"
            viewBox="0 0 320 8"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="4"
              x2="320"
              y2="4"
              stroke="var(--color-saffron-dark)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 14"
            />
          </svg>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-5 md:gap-6">
          {fareRows.map((row, i) => {
            const tone = tones[i % tones.length];
            const imageSrc = resolveFleetImage(row.category, row.vehicles);
            const showImage = imageSrc && !broken[i];

            return (
              <div
                key={`${row.category}-${i}`}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className={`fleet-card group relative w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] transition-all duration-700 ease-out hover:z-20 ${
                  visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible[i] ? `${(i % 4) * 90}ms` : "0ms" }}
              >
                {showImage ? (
                  // aspect-3/2 assumed to match the Fleet webp photos — adjust if the
                  // actual files use a different native ratio.
                  <div className="relative aspect-3/2 w-full">
                    <div
                      className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                      style={{ background: tone }}
                      aria-hidden="true"
                    />
                    <div className="relative h-full w-full scale-[0.9] transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                      <Image
                        src={imageSrc}
                        alt={row.vehicles}
                        fill
                        unoptimized
                        className="object-contain drop-shadow-lg"
                        priority={i === 0}
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
                  <div className="relative flex aspect-3/2 w-full items-center justify-center rounded-xl bg-cream/60 p-3 transition-transform duration-500 ease-out group-hover:scale-105">
                    <CarMark tone={tone} />
                  </div>
                )}

                <div className="-mt-1 rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-300 group-hover:border-ink/20 group-hover:shadow-xl">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-saffron-dark">
                    {row.category}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink">
                    {row.vehicles}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink/65">{row.rate}</p>

                  <a
                    href="tel:+919324378802"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron-dark transition-colors hover:text-saffron"
                  >
                    Call for rates
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .route-line {
          stroke-dashoffset: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .route-line line {
            animation: dash-travel 6s linear infinite;
          }
        }
        @keyframes dash-travel {
          to {
            stroke-dashoffset: -60;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .fleet-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}