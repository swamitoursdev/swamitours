"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { states, slugify } from "@/lib/cab-routes";

const INITIAL_VISIBLE = 12;

export default function StatesGrid() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Hover styles never show on touch devices, and Next.js prefetches routes
  // so a tap navigates almost instantly — too fast for CSS :active to read
  // as an animation. Intercept the click, play a quick press animation, then
  // navigate. Modified clicks (new tab, middle click) are left alone.
  const handleChipClick =
    (key: string, href: string) => (event: React.MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      setPressedKey(key);
      window.setTimeout(() => router.push(href), 150);
    };

  // Only play the entrance animation once the grid actually scrolls into
  // view — otherwise it fires at page load, off-screen, and mobile users
  // scrolling down never see any motion at all.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const filtered = isSearching
    ? states.filter((state) => state.toLowerCase().includes(query))
    : states;

  const shouldCollapse = !isSearching && filtered.length > INITIAL_VISIBLE;
  const primary = shouldCollapse ? filtered.slice(0, INITIAL_VISIBLE) : filtered;
  const extra = shouldCollapse ? filtered.slice(INITIAL_VISIBLE) : [];

  const renderChip = (state: string, i: number) => {
    const href = `/cab-service-in-${slugify(state)}`;
    const isPressed = pressedKey === state;
    return (
      <Link
        key={state}
        href={href}
        onClick={handleChipClick(state, href)}
        style={{
          animationDelay: hasEntered ? `${Math.min(i * 16, 260)}ms` : undefined,
        }}
        className={`rounded-lg border border-ink/10 bg-white px-3 py-2.5 text-center text-sm text-saffron-dark transition-all duration-150 ease-out hover:-translate-y-1 hover:border-saffron/30 hover:bg-saffron/5 hover:shadow-md ${
          hasEntered ? "chip-in" : "opacity-0"
        } ${
          isPressed
            ? "scale-95 -translate-y-0.5 border-saffron/30 bg-saffron/5 shadow-md"
            : ""
        }`}
      >
        Cab Service in {state}
      </Link>
    );
  };

  return (
    <section ref={sectionRef} className="py-16">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-8 lg:px-14 xl:px-20">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-ink">
          Taxi &amp; Cab Services Available Across Indian States
        </h2>
        <p className="mt-2 text-center text-sm text-ink/60">
          Discover trusted cab services in multiple states across India.
          Choose your state to explore city taxis, airport pickups and
          outstation travel options with Swami Tours.
        </p>

        <div className="mt-6 mx-auto max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search states, e.g. Maharashtra"
            className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2 text-sm text-ink placeholder-ink/40 transition-colors focus:outline-2 focus:outline-saffron"
          />
        </div>

        {filtered.length > 0 ? (
          <>
            <div
              key={isSearching ? `search-${query}` : "static"}
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
            >
              {primary.map((state, i) => renderChip(state, i))}
            </div>

            {extra.length > 0 && (
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div
                    key={expanded ? "expanded" : "collapsed"}
                    className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
                  >
                    {extra.map((state, i) => renderChip(state, i))}
                  </div>
                </div>
              </div>
            )}

            {shouldCollapse && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((e) => !e)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink/70 transition-all duration-200 hover:border-saffron/30 hover:text-saffron-dark hover:shadow-sm active:scale-95"
                >
                  {expanded ? "Show less" : `Show all ${filtered.length} states`}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      expanded ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="mt-8 text-center text-sm text-ink/50">
            No states match &quot;{search}&quot;.
          </p>
        )}
      </div>

      <style jsx>{`
        .chip-in {
          opacity: 0;
          animation: chipIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes chipIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .chip-in {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}