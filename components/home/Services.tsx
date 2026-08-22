"use client";

import { useEffect, useState } from "react";

type Service = {
  title: string;
  desc: string;
  highlight?: boolean;
  image: string;
};

const services: Service[] = [
  {
    title: "Airport Transfers",
    desc: "Timed pickups and drops with flight-tracking, so a delay never means a missed cab.",
    image: "https://images.unsplash.com/photo-1527007622069-3a0241e1cd8c?w=700&q=80",
  },
  {
    title: "Local Rentals",
    desc: "Hourly and daily packages for city errands, weddings and full-day sightseeing.",
    image: "https://images.unsplash.com/photo-1573710459621-bb101783ca0f?w=700&q=80",
  },
  {
    title: "Corporate Travel",
    desc: "Monthly billing and dedicated vehicles for teams that travel on a schedule.",
    image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=700&q=80",
  },
  {
    title: "Outstation Trips",
    desc: "One-way or round trip cabs to any city, with a single driver for the whole route.",
    image: "https://images.unsplash.com/photo-1519994007676-baabab4bf574?w=700&q=80",
  },
  {
    title: "Pilgrimage Packages",
    desc: "Multi-day yatra itineraries with rest stops planned around darshan timings.",
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=700&q=80",
  },
  {
    title: "24×7 Support",
    desc: "A dispatcher on call around the clock for changes, delays and last-minute trips.",
    image: "https://images.unsplash.com/photo-1761227783777-d7eff1c85b2c?w=700&q=80",
  },
  {
    title: "Wedding & Events",
    desc: "Decorated cars and multi-vehicle convoys for weddings, sangeet runs and guest pickups — coordinated as a single booking.",
    image: "https://images.unsplash.com/photo-1691343327025-4b0cc1dc053f?w=700&q=80",
  },
  {
    title: "One Way Drops",
    desc: "Point-to-point drops with no return fare charged — pay only for the distance you actually travel.",
    highlight: true,
    image: "https://images.unsplash.com/photo-1695636757328-b25666627eac?w=700&q=80",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  // Drives the enter transition: false right after a tab click (panel sits
  // at its "off" position), then flipped to true a frame later so the
  // transition classes below actually animate instead of snapping.
  const [entered, setEntered] = useState(true);
  // Which side the panel should enter from — the tab we're leaving toward.
  const [fromRight, setFromRight] = useState(true);
  const current = services[active];

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [active]);

  function selectTab(index: number) {
    if (index === active) return;
    setFromRight(index > active);
    setEntered(false);
    setActive(index);
  }

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
      <div className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
          What we run
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          One fleet, different kinds of trips.
        </h2>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Our services"
        className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 border-b border-ink/10 pb-px sm:mt-10 sm:gap-x-6"
      >
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <button
              key={service.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectTab(index)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors active:scale-95 ${
                isActive
                  ? "border-saffron text-ink"
                  : "border-transparent text-ink/50 hover:text-ink/80"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {service.title}
                {service.highlight && (
                  <span className="rounded-full bg-saffron/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-saffron-dark">
                    Popular
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        className={`mt-6 grid overflow-hidden rounded-xl border border-ink/10 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out sm:mt-8 sm:grid-cols-2 sm:rounded-2xl ${
          entered
            ? "translate-x-0 opacity-100"
            : fromRight
              ? "translate-x-3 opacity-0"
              : "-translate-x-3 opacity-0"
        }`}
      >
        <div className="order-last flex flex-col justify-center gap-4 bg-ink p-6 sm:order-0 sm:p-10">
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
            {current.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70">{current.desc}</p>
          <a
            href="#booking"
            className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-saffron-dark active:scale-95 sm:mt-2 sm:w-fit sm:justify-start"
          >
            Explore More
          </a>
        </div>

        <div className="min-h-40 overflow-hidden sm:min-h-0">
          <img
            src={current.image}
            alt={current.title}
            className={`h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out ${
              entered ? "scale-100" : "scale-105"
            }`}
          />
        </div>
      </div>
    </section>
  );
}