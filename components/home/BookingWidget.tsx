"use client";

import { useState } from "react";

const tripTypes = ["One Way", "Round Trip", "Local", "Airport"] as const;

export default function BookingWidget() {
  const [tripType, setTripType] = useState<(typeof tripTypes)[number]>("One Way");

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl shadow-ink/10 p-2">
      <div className="flex flex-wrap gap-1 p-2">
        {tripTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            aria-pressed={tripType === type}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tripType === type
                ? "bg-moss text-white"
                : "text-ink/60 hover:bg-sand"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 p-3 pt-1">
        <label className="flex flex-col gap-1 lg:col-span-1">
          <span className="text-xs font-mono uppercase tracking-wide text-ink/50">
            Pickup
          </span>
          <input
            type="text"
            placeholder="Nashik Road"
            className="rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-2 focus:outline-saffron"
          />
        </label>

        <label className="flex flex-col gap-1 lg:col-span-1">
          <span className="text-xs font-mono uppercase tracking-wide text-ink/50">
            {tripType === "Local" ? "Package" : "Drop"}
          </span>
          <input
            type="text"
            placeholder={tripType === "Local" ? "4hr / 40km" : "Shirdi"}
            className="rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-2 focus:outline-saffron"
          />
        </label>

        <label className="flex flex-col gap-1 lg:col-span-1">
          <span className="text-xs font-mono uppercase tracking-wide text-ink/50">
            Date
          </span>
          <input
            type="date"
            className="rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-2 focus:outline-saffron"
          />
        </label>

        <label className="flex flex-col gap-1 lg:col-span-1">
          <span className="text-xs font-mono uppercase tracking-wide text-ink/50">
            Time
          </span>
          <input
            type="time"
            className="rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-2 focus:outline-saffron"
          />
        </label>

        <button
          type="submit"
          className="self-end rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-white hover:bg-saffron-dark transition-colors lg:col-span-1"
        >
          Search Cabs
        </button>
      </form>
    </div>
  );
}
