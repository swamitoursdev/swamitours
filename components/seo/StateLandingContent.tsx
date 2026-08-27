"use client";

import { useState } from "react";
import BookingWidget, { type TripType } from "@/components/home/BookingWidget";
import RouteDivider from "@/components/ui/RouteDivider";
import PhotoCollage from "@/components/ui/PhotoCollage";
import FareTable from "./FareTable";
import FaqAccordion from "./FaqAccordion";
import RoutesGrid from "./RoutesGrid";
import { getStateContent } from "@/lib/cab-routes";

export default function StateLandingContent({ state }: { state: string }) {
  const { blog, faqs } = getStateContent(state);
  // Same rule as the route pages — fare table applies to Round Trip only.
  const [tripType, setTripType] = useState<TripType>("One Way");
  const showFareTable = tripType === "Round Trip";

  return (
    <main className="flex-1">
      <section className="relative bg-moss pt-28 pb-16 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
            {state}
          </p>
          <h1 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-white max-w-xl">
            Cab Service in {state} — Local &amp; Outstation Taxis
          </h1>
          <div className="mt-8">
            <BookingWidget
              defaultDrop={state}
              defaultTripType="One Way"
              onTripTypeChange={setTripType}
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14 space-y-14">
        {showFareTable && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Taxi Fare</h2>
            <p className="mt-1 text-sm text-ink/60">
              Comfortable, well-maintained cabs at transparent prices — pay what&apos;s shown, no surprise charges.
            </p>
            <div className="mt-5"><FareTable /></div>
          </section>
        )}

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

      <RoutesGrid title={`Popular cab routes serving ${state}`} />
    </main>
  );
}