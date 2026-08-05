import Link from "next/link";
import BookingWidget from "@/components/home/BookingWidget";
import RouteDivider from "@/components/ui/RouteDivider";
import PhotoCollage from "@/components/ui/PhotoCollage";
import FareTable from "./FareTable";
import FaqAccordion from "./FaqAccordion";
import RoutesGrid from "./RoutesGrid";
import { getRouteContent, routeSlug } from "@/lib/cab-routes";

export default function RouteLandingContent({ from, to }: { from: string; to: string }) {
  const { blog, faqs, circuit, isCircuitHub } = getRouteContent(from, to);

  return (
    <main className="flex-1">
      <section className="relative bg-moss pt-28 pb-16 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
            {from} to {to}
          </p>
          <h1 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-white max-w-xl">
            Taxi Service {from} to {to} — Local &amp; Outstation Cabs
          </h1>
          <div className="mt-8">
            <BookingWidget
              defaultPickup={from}
              defaultDrop={to}
              defaultTripType="One Way"
            />
          </div>

          {circuit && (
            <div className="mt-8 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
                Places on this route
              </p>
              <p className="mt-1 text-sm text-white/70">
                {isCircuitHub
                  ? `This circuit covers ${circuit.stops.length} stops — tap one to see fares and book that leg directly.`
                  : `Part of the ${circuit.name} circuit (${circuit.stops.length} stops) — tap another to switch.`}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link
                  href={`/${routeSlug(circuit.anchor, circuit.name)}`}
                  aria-current={isCircuitHub ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-lg transition-colors ${
                    isCircuitHub
                      ? "border-moss-dark bg-moss-dark text-white shadow-moss-dark/50 ring-2 ring-white/40"
                      : "border-moss bg-moss text-white shadow-moss/40 hover:bg-moss-dark"
                  }`}
                >
                  {circuit.name} — all stops
                </Link>
                {circuit.stops.map((stop) => (
                  <Link
                    key={stop}
                    href={`/${routeSlug(circuit.anchor, stop)}`}
                    aria-current={to === stop ? "page" : undefined}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      to === stop
                        ? "border-saffron bg-saffron text-white"
                        : "border-white/20 bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {stop}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14 space-y-14">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Taxi Fare</h2>
          <p className="mt-1 text-sm text-ink/60">
            Comfortable, well-maintained cabs at transparent prices — pay what&apos;s shown, no surprise charges.
          </p>
          <div className="mt-5"><FareTable /></div>
        </section>

        <RouteDivider />

        <section className="space-y-4 text-sm leading-relaxed text-ink/70">
          <h2 className="font-display text-xl font-semibold text-ink">{blog.title}</h2>
          {blog.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Gallery</h2>
          <div className="mt-5"><PhotoCollage /></div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Frequently Asked Questions</h2>
          <div className="mt-5"><FaqAccordion faqs={faqs} /></div>
        </section>
      </div>

      <RoutesGrid
        title={`Popular outstation cab routes from ${from}`}
        fromCity={from}
        exclude={routeSlug(from, to)}
      />

      <RoutesGrid
        title={`Popular outstation cab routes from ${to}`}
        fromCity={to}
        exclude={routeSlug(from, to)}
      />
    </main>
  );
}