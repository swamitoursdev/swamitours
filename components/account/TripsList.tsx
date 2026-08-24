//components\account\TripsList.tsx
//components\account\TripsList.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

type Trip = {
  id: string;
  route: string;
  date: string;
  status: string;
  tripType: string;
  airportDirection: string | null;
  cabType: string | null;
  time: string | null;
  returnDate: string | null;
  returnTime: string | null;
  name: string | null;
  phone: string | null;
  passengers: string | null;
  luggage: string | null;
  carryingPets: boolean;
  notes: string | null;
  approxFare: number | null;
  assignedStaffName: string | null;
  assignedStaffPhone: string | null;
  assignedStaffRole: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-moss/10 text-moss-dark",
  completed: "bg-ink/10 text-ink/60",
  cancelled: "bg-red-100 text-red-700",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status.toLowerCase()] ?? "bg-moss/10 text-moss-dark";
}

function formatFare(amount: number | null) {
  if (amount == null) return null;
  return `₹${amount.toLocaleString("en-IN")}`;
}

// dd/mm/yyyy display for the yyyy-mm-dd values stored by the booking form
function formatDate(raw: string) {
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TripsList() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Redirect logged-out visitors to /login
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Load this user's trips from Firestore
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const q = query(
          collection(db, "trips"),
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const snap = await getDocs(q);
        setTrips(
          snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              route: data.route ?? "",
              date: data.date ?? "",
              status: data.status ?? "Upcoming",
              tripType: data.tripType ?? "",
              airportDirection: data.airportDirection ?? null,
              cabType: data.cabType ?? null,
              time: data.time ?? null,
              returnDate: data.returnDate ?? null,
              returnTime: data.returnTime ?? null,
              name: data.name ?? null,
              phone: data.phone ?? null,
              passengers: data.passengers ?? null,
              luggage: data.luggage ?? null,
              carryingPets: Boolean(data.carryingPets),
              notes: data.notes ?? null,
              approxFare: typeof data.approxFare === "number" ? data.approxFare : null,
              assignedStaffName: data.assignedStaffName ?? null,
              assignedStaffPhone: data.assignedStaffPhone ?? null,
              assignedStaffRole: data.assignedStaffRole ?? null,
            };
          })
        );
      } catch (err) {
        // Log the real Firestore error — most commonly a missing composite
        // index for the where+orderBy combo below. Check the console for a
        // direct link to auto-create it if trips aren't loading.
        console.error("Failed to load trips:", err);
        setError("Couldn't load your trips. Please try again later.");
      } finally {
        setLoadingTrips(false);
      }
    })();
  }, [user]);

  if (authLoading || !user || loadingTrips) {
    return (
      <div className="rounded-xl border border-ink/10 bg-white p-6 text-sm text-ink/60">
        Loading your trips...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-ink">Your trips</h1>
        {!error && (
          <p className="text-sm text-ink/60">
            {trips.length} trip{trips.length === 1 ? "" : "s"} with us so far.
          </p>
        )}
      </div>

      {error ? (
        <div className="rounded-xl border border-ink/10 bg-white p-6 text-sm text-red-600">
          {error}
        </div>
      ) : trips.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink/20 bg-ink/2 p-10 text-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink/30"
          >
            <path
              d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm font-medium text-ink">No trips yet</p>
          <p className="text-sm text-ink/60">
            You haven&apos;t taken any trips with us yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
          {trips.map((trip) => {
            const isExpanded = expandedId === trip.id;
            const isRoundTrip = trip.tripType === "Round Trip";

            // Only the fields that actually have a value get shown, so a
            // Local trip doesn't show blank "Return Date" etc.
            const details: { label: string; value: string }[] = [
              trip.tripType && {
                label: "Trip type",
                value: trip.airportDirection
                  ? `${trip.tripType} (${trip.airportDirection})`
                  : trip.tripType,
              },
              trip.cabType && { label: "Cab", value: trip.cabType },
              trip.time && { label: "Time", value: trip.time },
              isRoundTrip &&
                trip.returnDate && { label: "Return date", value: formatDate(trip.returnDate) },
              isRoundTrip &&
                trip.returnTime && { label: "Return time", value: trip.returnTime },
              trip.name && { label: "Passenger name", value: trip.name },
              trip.phone && { label: "Phone", value: trip.phone },
              trip.passengers && { label: "Passengers", value: trip.passengers },
              trip.luggage && { label: "Luggage", value: `${trip.luggage} bag(s)` },
              { label: "Carrying pets", value: trip.carryingPets ? "Yes" : "No" },
              formatFare(trip.approxFare) && {
                label: "Approx. fare",
                value: `${formatFare(trip.approxFare)} (estimate)`,
              },
            ].filter(Boolean) as { label: string; value: string }[];

            return (
              <div key={trip.id} className="p-5">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : trip.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-2 text-left"
                  aria-expanded={isExpanded}
                >
                  <div>
                    <p className="font-medium text-ink">{trip.route || "Route unavailable"}</p>
                    <p className="text-xs text-ink/60">{formatDate(trip.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(trip.status)}`}
                    >
                      {trip.status}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`text-ink/40 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {trip.assignedStaffName && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-moss/20 bg-moss/5 px-3 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="shrink-0 text-moss-dark"
                      >
                        <path
                          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink truncate">
                          {trip.assignedStaffName}
                        </p>
                        <p className="text-xs text-ink/60">
                          {trip.assignedStaffRole || "Your driver"}
                        </p>
                      </div>
                    </div>
                    {trip.assignedStaffPhone && (
                      <a
                        href={`tel:${trip.assignedStaffPhone}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-moss-dark px-3 py-1.5 text-xs font-semibold text-white hover:bg-moss-dark/90 transition-colors"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Call driver
                      </a>
                    )}
                  </div>
                )}

                {isExpanded && (
                  <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-ink/10 pt-4 sm:grid-cols-2">
                    {details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between gap-2 text-sm">
                        <dt className="text-ink/60">{d.label}</dt>
                        <dd className="font-medium text-ink">{d.value}</dd>
                      </div>
                    ))}
                    {trip.notes && (
                      <div className="col-span-full text-sm">
                        <dt className="text-ink/60">Notes</dt>
                        <dd className="mt-1 font-medium text-ink">{trip.notes}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}