"use client";

import { useState } from "react";

const tripTypes = ["Airport", "Local", "One Way", "Round Trip"] as const;

export default function BookingWidget() {
  const [tripType, setTripType] = useState<(typeof tripTypes)[number]>("Airport");
  const [carryingPets, setCarryingPets] = useState(false);

  const isRoundTrip = tripType === "Round Trip";

  const inputClasses =
    "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/45 backdrop-blur-sm transition-colors focus:outline-2 focus:outline-saffron focus:bg-white/15 [color-scheme:dark]";
  const labelClasses = "text-xs font-mono uppercase tracking-wide text-white/60";

  const petsField = (
    <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
      <span className={labelClasses}>Carrying Pets?</span>
      <div className="flex gap-1 rounded-lg border border-white/25 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setCarryingPets(false)}
          aria-pressed={!carryingPets}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
            !carryingPets
              ? "bg-white/20 text-white"
              : "text-white/60 hover:bg-white/10"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => setCarryingPets(true)}
          aria-pressed={carryingPets}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
            carryingPets
              ? "bg-white/20 text-white"
              : "text-white/60 hover:bg-white/10"
          }`}
        >
          Yes
        </button>
      </div>
      {carryingPets && (
        <span className="text-[11px] text-white/50 mt-0.5">
          Additional pet charges apply
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-md p-2 sm:p-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 rounded-xl border border-white/15 bg-black/20 p-1 sm:p-1.5">
        {tripTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            aria-pressed={tripType === type}
            className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-center transition-colors ${
              tripType === type
                ? "bg-saffron text-white shadow-sm shadow-black/30"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-2 p-2 sm:p-3 pt-3 mt-2 border-t border-white/15">
        {/* Route / date / time */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Pickup</span>
            <input
              type="text"
              placeholder="Nashik Road"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>
              {tripType === "Local" ? "Package" : "Drop"}
            </span>
            <input
              type="text"
              placeholder={tripType === "Local" ? "4hr / 40km" : "Shirdi"}
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>
              {isRoundTrip ? "Departure Date" : "Date"}
            </span>
            <input type="date" className={inputClasses} />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>
              {isRoundTrip ? "Departure Time" : "Time"}
            </span>
            <input type="time" className={inputClasses} />
          </label>

          {!isRoundTrip && petsField}
        </div>

        {/* Return date/time, only for Round Trip */}
        {isRoundTrip && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            <label className="flex flex-col gap-1 col-span-1 lg:col-start-3">
              <span className={labelClasses}>Return Date</span>
              <input type="date" className={inputClasses} />
            </label>

            <label className="flex flex-col gap-1 col-span-1">
              <span className={labelClasses}>Return Time</span>
              <input type="time" className={inputClasses} />
            </label>

            {petsField}
          </div>
        )}

        {/* Passenger details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 mt-1 border-t border-white/15">
          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Name</span>
            <input
              type="text"
              placeholder="Full name"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Phone</span>
            <input
              type="tel"
              placeholder="9876543210"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Passengers</span>
            <input
              type="number"
              min={1}
              placeholder="2"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Luggage (bags)</span>
            <input
              type="number"
              min={0}
              placeholder="1"
              className={inputClasses}
            />
          </label>

          <button
            type="submit"
            className="self-end rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-white hover:bg-saffron-dark transition-colors col-span-2 sm:col-span-1"
          >
            Search Cabs
          </button>
        </div>
      </form>
    </div>
  );
}