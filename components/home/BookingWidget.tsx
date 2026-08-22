"use client";

import { useEffect, useRef, useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { airports } from "./airports";
import { cabTypes, vehicleRates, estimateDistanceKm } from "@/lib/cab-routes";

const tripTypes = ["Airport", "Local", "One Way", "Round Trip"] as const;
const WHATSAPP_NUMBER = "919324378802"; // +91 93243 78802

type BookingWidgetProps = {
  defaultPickup?: string;
  defaultDrop?: string;
  defaultTripType?: (typeof tripTypes)[number];
};

export default function BookingWidget({
  defaultPickup = "",
  defaultDrop = "",
  defaultTripType = "Airport",
}: BookingWidgetProps) {
  const [tripType, setTripType] = useState<(typeof tripTypes)[number]>(defaultTripType);
  const [cabCategory, setCabCategory] = useState("");
  const [cabTypeId, setCabTypeId] = useState("");
  const [carryingPets, setCarryingPets] = useState(false);
  const [pickup, setPickup] = useState(defaultPickup);
  const [drop, setDrop] = useState(defaultDrop);
  const [airportDirection, setAirportDirection] = useState<"Pickup" | "Drop">("Pickup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState("");
  const [luggage, setLuggage] = useState("");
  const [notes, setNotes] = useState("");

  // defaultPickup/defaultDrop only seed state on mount by default — this
  // keeps them in sync when the parent changes them later (e.g. clicking a
  // "places on this route" chip should update the drop field live).
  useEffect(() => {
    setPickup(defaultPickup);
  }, [defaultPickup]);

  useEffect(() => {
    setDrop(defaultDrop);
  }, [defaultDrop]);

  const isRoundTrip = tripType === "Round Trip";
  const isAirport = tripType === "Airport";
  const isAirportPickup = isAirport && airportDirection === "Pickup";
  const isAirportDrop = isAirport && airportDirection === "Drop";
  const isDistanceBasedTrip = tripType === "One Way" || tripType === "Round Trip";

  const selectedVehicle = vehicleRates.find((v) => v.id === cabTypeId) ?? null;
  const vehiclesInCategory = cabCategory
    ? vehicleRates.filter((v) => v.category === cabCategory)
    : [];

  function handleCabCategoryChange(value: string) {
    setCabCategory(value);
    setCabTypeId(""); // vehicle choice no longer valid once the category changes
  }

  const distanceKm = isDistanceBasedTrip ? estimateDistanceKm(pickup, drop) : null;

  // approxFare stays null whenever we can't responsibly show a number —
  // the accompanying fareNote explains what's still needed instead of
  // guessing.
  let approxFare: number | null = null;
  let fareNote: string;

  if (!isDistanceBasedTrip) {
    fareNote =
      tripType === "Local"
        ? "Local package fares are quoted directly — send us the hours/km on WhatsApp."
        : "Airport transfer fares are quoted directly based on the exact pickup point.";
  } else if (!cabCategory) {
    fareNote = "Pick a cab type and cab to see an approx. fare.";
  } else if (!selectedVehicle) {
    fareNote = "Pick a cab to see an approx. fare.";
  } else if (selectedVehicle.rate == null) {
    fareNote = `${selectedVehicle.label} pricing is on request — we'll confirm the fare on WhatsApp.`;
  } else if (distanceKm == null) {
    fareNote = "Enter a pickup/drop we service (e.g. Mumbai and a listed destination) to see an approx. fare.";
  } else {
    approxFare = selectedVehicle.rate * distanceKm * (isRoundTrip ? 2 : 1);
    fareNote = `${distanceKm} km ${isRoundTrip ? "(round trip)" : "one way"} × ₹${selectedVehicle.rate}/km`;
  }

  const approxFareLabel =
    approxFare != null ? `₹${Math.round(approxFare).toLocaleString("en-IN")}` : null;

  const inputClasses =
    "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/45 backdrop-blur-sm transition-colors focus:outline-2 focus:outline-saffron focus:bg-white/15 [color-scheme:dark]";
  const timeInputClasses = `${inputClasses} [&::-webkit-calendar-picker-indicator]:[filter:brightness(0)_saturate(100%)_invert(8%)_sepia(54%)_saturate(6763%)_hue-rotate(240deg)_brightness(87%)_contrast(139%)] [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer`;
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

  // <input type="date"> always stores its value as yyyy-mm-dd regardless of
  // display format, so we convert to dd/mm/yyyy for the outgoing message.
  function formatDateDMY(isoDate: string) {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }

  // The browser renders a native date input's closed-state text (mm/dd/yyyy,
  // dd/mm/yyyy, etc.) based on the device/OS locale — there's no reliable
  // cross-browser way to force it via CSS or the `lang` attribute alone. To
  // guarantee dd/mm/yyyy everywhere, we overlay our own formatted text on
  // top of the native input *while it's not focused*, and let the native
  // input render/behave completely normally while it *is* focused. The
  // native input is always the real, editable element — we never disable
  // it or pull it out of the tab order — so typing, arrow keys, and the
  // native picker all keep working. Because only one of "native input" /
  // "our overlay" is ever visible at the same time, they can never produce
  // doubled or garbled text on top of each other.
  function DateField({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Clicking the overlay focuses the real input (so it becomes the
    // visible/editable element) and opens the native picker via
    // showPicker() (falling back to .click()).
    function openPicker() {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      if (typeof el.showPicker === "function") {
        try {
          el.showPicker();
          return;
        } catch {
          // fall through to click()
        }
      }
      el.click();
    }

    return (
      <label className="flex flex-col gap-1">
        <span className={labelClasses}>{label}</span>
        <div className="relative">
          <input
            ref={inputRef}
            type="date"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label={`${label} (dd/mm/yyyy)`}
            className={
              isFocused
                ? `${inputClasses} absolute inset-0 h-full w-full cursor-text`
                : "absolute inset-0 h-full w-full cursor-pointer opacity-0 pointer-events-none"
            }
          />
          <div
            onClick={openPicker}
            className={`${inputClasses} flex cursor-pointer items-center justify-between`}
          >
            {value ? (
              <span className="text-white">{formatDateDMY(value)}</span>
            ) : (
              <span className="text-white/45">dd/mm/yyyy</span>
            )}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-saffron"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 10h18M8 2v4M16 2v4" />
            </svg>
          </div>
        </div>
      </label>
    );
  }

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
      "*🚖 NEW CAB BOOKING REQUEST*",
      "───────────────────",
      `*Trip Type:* ${tripType}${isAirport ? ` (${airportDirection})` : ""}`,
      `*Cab Type:* ${selectedVehicle ? `${selectedVehicle.label} (${selectedVehicle.category})` : "-"}`,
      `*${pickupLabel}:* ${pickup || "-"}`,
      `*${dropLabel}:* ${drop || "-"}`,
      `*${isRoundTrip ? "Departure Date" : "Date"}:* ${formatDateDMY(date) || "-"}`,
      `*${isRoundTrip ? "Departure Time" : "Time"}:* ${time || "-"}`,
    ];

    if (isRoundTrip) {
      lines.push(
        `*Return Date:* ${formatDateDMY(returnDate) || "-"}`,
        `*Return Time:* ${returnTime || "-"}`
      );
    }

    lines.push(
      "",
      "*👤 PASSENGER DETAILS*",
      "───────────────────",
      `*Name:* ${name || "-"}`,
      `*Phone:* ${phone || "-"}`,
      `*Passengers:* ${passengers || "-"}`,
      `*Luggage:* ${luggage || "-"} bag(s)`,
      `*Carrying Pets:* ${carryingPets ? "Yes 🐾" : "No"}`
    );

    if (notes.trim()) {
      lines.push("", "*📝 NOTES*", "───────────────────", notes.trim());
    }

    lines.push(
      "",
      "*💰 APPROX. FARE*",
      "───────────────────",
      `${approxFareLabel ? `${approxFareLabel} (estimate, to be confirmed)` : "To be confirmed"}`,
      "_⚠️ Tolls, parking, state taxes & other charges are NOT included in the above fare._",
      "_Final fare will be charged based on actual running (km)._"
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
        <div className="flex flex-col gap-2">
          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-2">
            <DateField
              label={isRoundTrip ? "Departure Date" : "Date"}
              value={date}
              onChange={setDate}
            />

            <label className="flex flex-col gap-1">
              <span className={labelClasses}>
                {isRoundTrip ? "Departure Time" : "Time"}
              </span>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className={timeInputClasses}
              />
            </label>
          </div>

          {/* Pickup + swap + Drop */}
          <div className="flex items-end gap-2">
            <label className="flex flex-col gap-1 flex-1 min-w-0">
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

            <label className="flex flex-col gap-1 flex-1 min-w-0">
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
          </div>

          {/* Return Date + Time */}
          {isRoundTrip && (
            <div className="grid grid-cols-2 gap-2">
              <DateField label="Return Date" value={returnDate} onChange={setReturnDate} />

              <label className="flex flex-col gap-1">
                <span className={labelClasses}>Return Time</span>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(event) => setReturnTime(event.target.value)}
                  className={timeInputClasses}
                />
              </label>
            </div>
          )}
        </div>

        {/* Passenger details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-2 pt-2 mt-1 border-t border-white/15">
          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Cab Type</span>
            <select
              value={cabCategory}
              onChange={(event) => handleCabCategoryChange(event.target.value)}
              className={inputClasses}
            >
              <option value="" className="bg-ink text-white">
                Select cab type
              </option>
              {cabTypes.map((category) => (
                <option key={category} value={category} className="bg-ink text-white">
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Cab</span>
            <select
              value={cabTypeId}
              onChange={(event) => setCabTypeId(event.target.value)}
              disabled={!cabCategory}
              className={`${inputClasses} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <option value="" className="bg-ink text-white">
                {cabCategory ? "Select cab" : "Select cab type first"}
              </option>
              {vehiclesInCategory.map((v) => (
                <option key={v.id} value={v.id} className="bg-ink text-white">
                  {v.label} {v.rate != null ? `— ₹${v.rate}/km` : "— On Request"}
                </option>
              ))}
            </select>
          </label>

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

          {petsField}

          <button
            type="submit"
            className="self-end rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors col-span-2 sm:col-span-1"
          >
            Search Cabs
          </button>
        </div>

        {/* Notes */}
        <label className="flex flex-col gap-1">
          <span className={labelClasses}>Notes (optional)</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Any specific instructions — e.g. child seat, extra stop, preferred route..."
            rows={2}
            className={`${inputClasses} resize-none`}
          />
        </label>

        {/* Approx. fare estimate */}
        <div className="rounded-lg border border-white/15 bg-black/20 px-3 py-2">
          <span className="font-mono text-xs uppercase tracking-wide text-white/60">
            Approx. Fare
          </span>
          {approxFareLabel ? (
            <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span className="text-lg font-semibold text-saffron">{approxFareLabel}</span>
              <span className="text-xs text-white/50">{fareNote}</span>
            </div>
          ) : (
            <p className="mt-0.5 text-xs text-white/50">{fareNote}</p>
          )}
          <p className="mt-1 text-[11px] text-white/35">
            This is an indicative estimate only. Toll charges, parking fees, state taxes, and
            other applicable charges are not included. The final fare is calculated based on the
            actual kilometers traveled and will be confirmed at the time of booking.
          </p>
        </div>
      </form>
    </div>
  );
}