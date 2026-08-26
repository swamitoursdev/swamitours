//components\home\BookingWidget.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { airports } from "./airports";
import { cabTypes, vehicleRates } from "@/lib/cab-routes";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const tripTypes = ["Airport", "Local", "One Way", "Round Trip"] as const;
const WHATSAPP_NUMBER = "919324378802"; // +91 93243 78802

// Small 32-bit string hash (FNV-1a-ish) used to build a stable, deterministic
// Firestore doc ID from a trip's defining details. This is what lets us
// upsert instead of always inserting a new row when the same booking is
// submitted more than once (e.g. double-clicking Search Cabs, or resending
// the same details after a failed WhatsApp send).
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // keep it a 32-bit int
  }
  return (hash >>> 0).toString(16);
}

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
  const { user } = useAuth();

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
  const [savingTrip, setSavingTrip] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // defaultPickup/defaultDrop only seed state on mount by default — this
  // keeps them in sync when the parent changes them later (e.g. clicking a
  // "places on this route" chip should update the drop field live).
  useEffect(() => {
    setPickup(defaultPickup);
  }, [defaultPickup]);

  useEffect(() => {
    setDrop(defaultDrop);
  }, [defaultDrop]);

  // If the user is logged in, prefill name/phone from their saved profile.
  // Uses functional updates so it never clobbers something they've already
  // typed into the form (e.g. if the profile fetch resolves after they've
  // started filling the form out).
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : null;
        setName((prev) => prev || (typeof data?.name === "string" ? data.name : user.displayName) || "");
        setPhone((prev) => prev || (typeof data?.phone === "string" ? data.phone : "") || "");
      } catch {
        // Non-fatal — booking form just stays blank if the profile fetch fails
      }
    })();
  }, [user]);

  const isRoundTrip = tripType === "Round Trip";
  const isAirport = tripType === "Airport";
  const isAirportPickup = isAirport && airportDirection === "Pickup";
  const isAirportDrop = isAirport && airportDirection === "Drop";
  const selectedVehicle = vehicleRates.find((v) => v.id === cabTypeId) ?? null;
  const vehiclesInCategory = cabCategory
    ? vehicleRates.filter((v) => v.category === cabCategory)
    : [];

  function handleCabCategoryChange(value: string) {
    setCabCategory(value);
    setCabTypeId(""); // vehicle choice no longer valid once the category changes
  }

  const inputClasses =
    "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/45 backdrop-blur-sm transition-colors focus:outline-2 focus:outline-saffron focus:bg-white/15 [color-scheme:dark]";
  const timeInputClasses = `${inputClasses} [&::-webkit-calendar-picker-indicator]:[filter:brightness(0)_saturate(100%)_invert(8%)_sepia(54%)_saturate(6763%)_hue-rotate(240deg)_brightness(87%)_contrast(139%)] [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer`;
  const labelClasses = "text-xs font-mono uppercase tracking-wide text-white/60";
  const errorTextClasses = "text-[11px] text-red-300";
  function fieldClasses(field: string) {
    return `${inputClasses} ${errors[field] ? "border-red-400/70 focus:outline-red-400" : ""}`;
  }

  const petsField = (
    <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
      <span className={`${labelClasses} flex items-center gap-1`}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3 w-3 text-white/60"
          aria-hidden="true"
        >
          <circle cx="12" cy="15.5" r="4" />
          <circle cx="4.5" cy="9.5" r="2.1" />
          <circle cx="9.5" cy="4.5" r="2.1" />
          <circle cx="14.5" cy="4.5" r="2.1" />
          <circle cx="19.5" cy="9.5" r="2.1" />
        </svg>
        Carrying Pets?
      </span>
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
    error,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
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
            className={`${inputClasses} flex cursor-pointer items-center justify-between ${
              error ? "border-red-400/70" : ""
            }`}
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
        {error && <span className={errorTextClasses}>{error}</span>}
      </label>
    );
  }

  function swapLocations() {
    setPickup(drop);
    setDrop(pickup);
  }

  // Validates every field, capping how many characters each one accepts and
  // rejecting obviously malformed values (e.g. a phone number that isn't 10
  // digits). Returns a map of field -> error message; an empty map means the
  // form is valid.
  function validate() {
    const errs: Record<string, string> = {};

    if (!cabCategory) errs.cabCategory = "Select a cab type.";
    if (!cabTypeId) errs.cabTypeId = cabCategory ? "Select a cab." : "Select a cab type first.";

    const trimmedPickup = pickup.trim();
    if (!trimmedPickup) {
      errs.pickup = isAirportPickup ? "Pickup airport is required." : "Pickup location is required.";
    } else if (trimmedPickup.length > 100) {
      errs.pickup = "Max 100 characters.";
    }

    const trimmedDrop = drop.trim();
    if (!trimmedDrop) {
      errs.drop =
        tripType === "Local" ? "Package details are required." : "Drop location is required.";
    } else if (trimmedDrop.length > 100) {
      errs.drop = "Max 100 characters.";
    }

    if (!date) errs.date = "Date is required.";
    if (!time) errs.time = "Time is required.";

    if (isRoundTrip) {
      if (!returnDate) errs.returnDate = "Return date is required.";
      if (!returnTime) errs.returnTime = "Return time is required.";
      if (date && returnDate && returnDate < date) {
        errs.returnDate = "Return date can't be before the departure date.";
      }
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      errs.name = "Name is required.";
    } else if (trimmedName.length > 60) {
      errs.name = "Max 60 characters.";
    } else if (!/^[A-Za-z\s.'-]+$/.test(trimmedName)) {
      errs.name = "Only letters, spaces, and . ' - are allowed.";
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      errs.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      errs.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!passengers) {
      errs.passengers = "Required.";
    } else {
      const pax = Number(passengers);
      if (!Number.isInteger(pax) || pax < 1 || pax > 20) errs.passengers = "Must be 1-20.";
    }

    if (luggage) {
      const bags = Number(luggage);
      if (!Number.isInteger(bags) || bags < 0 || bags > 20) errs.luggage = "Must be 0-20.";
    }

    if (notes.length > 300) errs.notes = "Max 300 characters.";

    return errs;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const pickupLabel = isAirportPickup ? "Pickup Airport" : "Pickup Location";
    const dropLabel =
      tripType === "Local" ? "Package" : isAirportDrop ? "Drop Airport" : "Drop Location";

    const lines = [
      "*NEW CAB BOOKING REQUEST*",
      "───────────────────",
      `*Trip Type:* ${tripType}${isAirport ? ` (${airportDirection})` : ""}`,
      `*Cab Type:* ${selectedVehicle ? `${selectedVehicle.label} (${selectedVehicle.category})` : "-"}`,
      `*${pickupLabel}:* ${pickup.trim()}`,
      `*${dropLabel}:* ${drop.trim()}`,
      `*${isRoundTrip ? "Departure Date" : "Date"}:* ${formatDateDMY(date)}`,
      `*${isRoundTrip ? "Departure Time" : "Time"}:* ${time}`,
    ];

    if (isRoundTrip) {
      lines.push(`*Return Date:* ${formatDateDMY(returnDate)}`, `*Return Time:* ${returnTime}`);
    }

    lines.push(
      "",
      "*PASSENGER DETAILS*",
      "───────────────────",
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Passengers:* ${passengers}`,
      `*Luggage:* ${luggage || "0"} bag(s)`,
      `*Carrying Pets:* ${carryingPets ? "Yes" : "No"}`
    );

    if (notes.trim()) {
      lines.push("", "*NOTES*", "───────────────────", notes.trim());
    }

    lines.push(
      "",
      "*TERMS & RENTAL RULES*",
      "───────────────────",
      "• *Kilometer Limit:* Minimum 300 km charged per calendar day.",
      "• *Day Calculation:* 1 calendar day is calculated from 12:00 AM to 11:00 PM.",
      "• *Night Charges:* Applicable for pickups scheduled before 6:00 AM or travel past designated night hours.",
      "• *Allowances:* Driver allowance and night charges will apply as required.",
      "• *Driver Stay & Food:* Accommodation and meals for the driver to be arranged/borne by the customer during outstation trips.",
      "• *Exclusions:* Toll, parking fees, state/border taxes, permits, and entry fees are extra as per actual receipts.",
      "_Final fare will be confirmed on WhatsApp based on actual running (km)._"
    );

    const message = encodeURIComponent(lines.join("\n"));

    // Save this booking as a trip on the user's account, so it shows up in
    // TripsList / Profile stats. Only runs for logged-in users — guests
    // still get the WhatsApp flow below with no Firestore write.
    //
    // The doc ID is derived deterministically from the fields that define
    // "the same trip" (who, route, date/time, trip type). Resubmitting the
    // same booking — e.g. a double-tap on Search Cabs, or retrying after a
    // failed WhatsApp open — reuses that ID instead of inserting a new row,
    // so it can never inflate the trip count. A genuinely different booking
    // (different date, route, etc.) still gets its own document as before.
    if (user) {
      setSavingTrip(true);
      try {
        const tripKey = [
          user.uid,
          pickup.trim().toLowerCase(),
          drop.trim().toLowerCase(),
          date,
          time,
          tripType,
          isAirport ? airportDirection : "",
          isRoundTrip ? returnDate : "",
          isRoundTrip ? returnTime : "",
        ].join("|");
        const tripId = `${user.uid}_${hashString(tripKey)}`;
        const tripRef = doc(db, "trips", tripId);

        const tripFields = {
          userId: user.uid,
          route: `${pickup.trim()} → ${drop.trim()}`,
          date: date || null,
          status: "Upcoming",
          tripType,
          airportDirection: isAirport ? airportDirection : null,
          cabType: selectedVehicle ? selectedVehicle.label : null,
          time: time || null,
          returnDate: isRoundTrip ? returnDate || null : null,
          returnTime: isRoundTrip ? returnTime || null : null,
          name: name.trim(),
          phone: phone.trim(),
          passengers: passengers || null,
          luggage: luggage || null,
          carryingPets,
          notes: notes.trim() || null,
        };

        const existing = await getDoc(tripRef);
        if (existing.exists()) {
          // Same trip resubmitted — update the details in place instead of
          // creating a duplicate, and keep the original createdAt.
          await setDoc(tripRef, { ...tripFields, updatedAt: serverTimestamp() }, { merge: true });
        } else {
          await setDoc(tripRef, { ...tripFields, createdAt: serverTimestamp() });
        }
      } catch (err) {
        // Non-fatal — the booking still goes through via WhatsApp even if
        // saving to the account fails (e.g. rules not yet updated).
        console.error("Failed to save this trip to your account:", err);
      } finally {
        setSavingTrip(false);
      }
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }

  // Drives the Search Cabs button's disabled state. validate() is a pure
  // function (it only returns an errors map, it never calls setErrors), so
  // it's safe to call on every render just to check "is everything filled
  // in and valid right now" without touching the errors shown under fields
  // — those are still only ever set on submit, in handleSubmit.
  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <div
      id="booking"
      className="w-full scroll-mt-24 rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-md p-2 sm:p-3"
    >
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
              error={errors.date}
            />

            <label className="flex flex-col gap-1">
              <span className={labelClasses}>
                {isRoundTrip ? "Departure Time" : "Time"}
              </span>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className={`${timeInputClasses} ${errors.time ? "border-red-400/70" : ""}`}
              />
              {errors.time && <span className={errorTextClasses}>{errors.time}</span>}
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
                  className={fieldClasses("pickup")}
                />
              ) : (
                <input
                  type="text"
                  value={pickup}
                  onChange={(event) => setPickup(event.target.value)}
                  placeholder="Eg: Nashik"
                  maxLength={100}
                  className={fieldClasses("pickup")}
                />
              )}
              {errors.pickup && <span className={errorTextClasses}>{errors.pickup}</span>}
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
                  className={fieldClasses("drop")}
                />
              ) : (
                <input
                  type="text"
                  value={drop}
                  onChange={(event) => setDrop(event.target.value)}
                  placeholder={tripType === "Local" ? "4hr / 40km" : "Eg: Shirdi"}
                  maxLength={100}
                  className={fieldClasses("drop")}
                />
              )}
              {errors.drop && <span className={errorTextClasses}>{errors.drop}</span>}
            </label>
          </div>

          {/* Return Date + Time */}
          {isRoundTrip && (
            <div className="grid grid-cols-2 gap-2">
              <DateField
                label="Return Date"
                value={returnDate}
                onChange={setReturnDate}
                error={errors.returnDate}
              />

              <label className="flex flex-col gap-1">
                <span className={labelClasses}>Return Time</span>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(event) => setReturnTime(event.target.value)}
                  className={`${timeInputClasses} ${errors.returnTime ? "border-red-400/70" : ""}`}
                />
                {errors.returnTime && <span className={errorTextClasses}>{errors.returnTime}</span>}
              </label>
            </div>
          )}
        </div>

        {/* Passenger details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 pt-2 mt-1 border-t border-white/15">
          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Cab Type</span>
            <select
              value={cabCategory}
              onChange={(event) => handleCabCategoryChange(event.target.value)}
              className={fieldClasses("cabCategory")}
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
            {errors.cabCategory && <span className={errorTextClasses}>{errors.cabCategory}</span>}
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Cab</span>
            <select
              value={cabTypeId}
              onChange={(event) => setCabTypeId(event.target.value)}
              disabled={!cabCategory}
              className={`${fieldClasses("cabTypeId")} disabled:opacity-40 disabled:cursor-not-allowed`}
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
            {errors.cabTypeId && <span className={errorTextClasses}>{errors.cabTypeId}</span>}
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              maxLength={60}
              className={fieldClasses("name")}
            />
            {errors.name && <span className={errorTextClasses}>{errors.name}</span>}
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Phone</span>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="9876543210"
              maxLength={10}
              className={fieldClasses("phone")}
            />
            {errors.phone && <span className={errorTextClasses}>{errors.phone}</span>}
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Passengers</span>
            <input
              type="number"
              min={1}
              max={20}
              value={passengers}
              onChange={(event) => setPassengers(event.target.value.slice(0, 2))}
              placeholder="2"
              className={fieldClasses("passengers")}
            />
            {errors.passengers && <span className={errorTextClasses}>{errors.passengers}</span>}
          </label>

          <label className="flex flex-col gap-1 col-span-1">
            <span className={labelClasses}>Luggage (bags)</span>
            <input
              type="number"
              min={0}
              max={20}
              value={luggage}
              onChange={(event) => setLuggage(event.target.value.slice(0, 2))}
              placeholder="1"
              className={fieldClasses("luggage")}
            />
            {errors.luggage && <span className={errorTextClasses}>{errors.luggage}</span>}
          </label>

          {petsField}

          <button
            type="submit"
            disabled={savingTrip || !isFormValid}
            aria-disabled={savingTrip || !isFormValid}
            className="self-end rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors col-span-2 sm:col-span-1 lg:col-span-7 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-green-600"
          >
            {savingTrip ? "Saving..." : "Search Cabs"}
          </button>
        </div>

        {/* Notes */}
        <label className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className={labelClasses}>Notes (optional)</span>
            <span className="text-[10px] text-white/35">{notes.length}/300</span>
          </div>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value.slice(0, 300))}
            placeholder="Any specific instructions — e.g. child seat, extra stop, preferred route..."
            rows={2}
            maxLength={300}
            className={`${fieldClasses("notes")} resize-none`}
          />
          {errors.notes && <span className={errorTextClasses}>{errors.notes}</span>}
        </label>

        {/* Terms & Rental Rules */}
        <div className="rounded-lg border border-white/15 bg-black/20 px-3 py-2.5">
          <span className="font-mono text-xs uppercase tracking-wide text-white/60">
            Terms &amp; Rental Rules
          </span>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-white/50">
            <li>
              <span className="font-medium text-white/70">Kilometer Limit:</span> Minimum 300 km
              charged per calendar day.
            </li>
            <li>
              <span className="font-medium text-white/70">Day Calculation:</span> 1 calendar day
              is calculated from 12:00 AM to 11:00 PM.
            </li>
            <li>
              <span className="font-medium text-white/70">Night Charges:</span> Applicable for
              pickups scheduled before 6:00 AM or travel past designated night hours.
            </li>
            <li>
              <span className="font-medium text-white/70">Allowances:</span> Driver allowance and
              night charges will apply as required.
            </li>
            <li>
              <span className="font-medium text-white/70">Driver Stay &amp; Food:</span>{" "}
              Accommodation and meals for the driver to be arranged/borne by the customer during
              outstation trips.
            </li>
            <li>
              <span className="font-medium text-white/70">Exclusions:</span> Toll, parking fees,
              state/border taxes, permits, and entry fees are extra as per actual receipts.
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}