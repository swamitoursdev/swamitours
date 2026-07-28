"use client";

import { useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { airports } from "./airports";

const tripTypes = ["Airport", "Local", "One Way", "Round Trip"] as const;
const WHATSAPP_NUMBER = "919324378802"; // +91 93243 78802

export default function BookingWidget() {
  const [tripType, setTripType] = useState<(typeof tripTypes)[number]>("Airport");
  const [carryingPets, setCarryingPets] = useState(false);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [airportDirection, setAirportDirection] = useState<"Pickup" | "Drop">("Pickup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState("");
  const [luggage, setLuggage] = useState("");

  const isRoundTrip = tripType === "Round Trip";
  const isAirport = tripType === "Airport";
  const isAirportPickup = isAirport && airportDirection === "Pickup";
  const isAirportDrop = isAirport && airportDirection === "Drop";

  const inputClasses =
    "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/45 backdrop-blur-sm transition-colors focus:outline-2 focus:outline-saffron focus:bg-white/15 [color-scheme:dark]";
  const labelClasses = "text-xs font-mono uppercase tracking-wide text-white/60";

  const petsField = (
    <div className="flex flex-col gap-1 flex-1 min-w-40">
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

  function swapLocations() {
    setPickup(drop);
    setDrop(pickup);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const pickupLabel = isAirportPickup ? "Pickup Airport" : "Pickup Location";
    const dropLabel =
      tripType === "Local" ? "Package" : isAirportDrop ? "Drop Airport" : "Drop Location";

    const lines = [
      "New Cab Booking Request",
      `Trip Type: ${tripType}${isAirport ? ` (${airportDirection})` : ""}`,
      `${pickupLabel}: ${pickup || "-"}`,
      `${dropLabel}: ${drop || "-"}`,
      `${isRoundTrip ? "Departure Date" : "Date"}: ${date || "-"}`,
      `${isRoundTrip ? "Departure Time" : "Time"}: ${time || "-"}`,
    ];

    if (isRoundTrip) {
      lines.push(`Return Date: ${returnDate || "-"}`, `Return Time: ${returnTime || "-"}`);
    }

    lines.push(
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
      `Passengers: ${passengers || "-"}`,
      `Luggage (bags): ${luggage || "-"}`,
      `Carrying Pets: ${carryingPets ? "Yes" : "No"}`
    );

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }

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

      {isAirport && (
        <div className="flex justify-center gap-1.5 pt-2.5">
          {(["Pickup", "Drop"] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => setAirportDirection(direction)}
              aria-pressed={airportDirection === direction}
              className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-colors ${
                airportDirection === direction
                  ? "border-saffron/60 bg-saffron/15 text-saffron"
                  : "border-white/20 bg-black/20 text-white/60 hover:bg-white/10"
              }`}
            >
              Airport {direction}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-2 sm:p-3 pt-3 mt-2 border-t border-white/15"
      >
        {/* Route / date / time */}
        <div className="flex flex-wrap items-end gap-2">
          <label className="flex flex-col gap-1 flex-1 min-w-37.5">
            <span className={labelClasses}>
              {isAirportPickup ? "Pickup Airport" : "Pickup Location"}
            </span>
            {isAirportPickup ? (
              <AutocompleteInput
                value={pickup}
                onChange={setPickup}
                options={airports}
                placeholder="Eg: Adampur Airport"
                className={inputClasses}
              />
            ) : (
              <input
                type="text"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                placeholder="Eg: Nashik"
                className={inputClasses}
              />
            )}
          </label>

          <button
            type="button"
            onClick={swapLocations}
            aria-label="Swap pickup and drop"
            className="shrink-0 rounded-full border border-white/25 bg-white/10 p-2.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17 3l4 4-4 4" />
              <path d="M21 7H9" />
              <path d="M7 21l-4-4 4-4" />
              <path d="M3 17h12" />
            </svg>
          </button>

          <label className="flex flex-col gap-1 flex-1 min-w-37.5">
            <span className={labelClasses}>
              {tripType === "Local"
                ? "Package"
                : isAirportDrop
                  ? "Drop Airport"
                  : "Drop Location"}
            </span>
            {isAirportDrop ? (
              <AutocompleteInput
                value={drop}
                onChange={setDrop}
                options={airports}
                placeholder="Eg: Adampur Airport"
                className={inputClasses}
              />
            ) : (
              <input
                type="text"
                value={drop}
                onChange={(event) => setDrop(event.target.value)}
                placeholder={tripType === "Local" ? "4hr / 40km" : "Eg: Shirdi"}
                className={inputClasses}
              />
            )}
          </label>

          <label className="flex flex-col gap-1 flex-1 min-w-35">
            <span className={labelClasses}>
              {isRoundTrip ? "Departure Date" : "Date"}
            </span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 flex-1 min-w-32.5">
            <span className={labelClasses}>
              {isRoundTrip ? "Departure Time" : "Time"}
            </span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className={inputClasses}
            />
          </label>

          {isRoundTrip && (
            <>
              <label className="flex flex-col gap-1 flex-1 min-w-35">
                <span className={labelClasses}>Return Date</span>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  className={inputClasses}
                />
              </label>

              <label className="flex flex-col gap-1 flex-1 min-w-32.5">
                <span className={labelClasses}>Return Time</span>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(event) => setReturnTime(event.target.value)}
                  className={inputClasses}
                />
              </label>
            </>
          )}

          {petsField}
        </div>

        {/* Passenger details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 mt-1 border-t border-white/15">
          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="9876543210"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Passengers</span>
            <input
              type="number"
              min={1}
              value={passengers}
              onChange={(event) => setPassengers(event.target.value)}
              placeholder="2"
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Luggage (bags)</span>
            <input
              type="number"
              min={0}
              value={luggage}
              onChange={(event) => setLuggage(event.target.value)}
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