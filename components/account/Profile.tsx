//components\account\Profile.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import ProfileForm from "@/components/account/ProfileForm";
import IdProofUpload from "@/components/account/IdProofUpload";

interface Stats {
  totalTrips: number;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="text-2xl font-semibold text-ink sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-ink/60">{label}</p>
    </div>
  );
}

export default function Profile() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idProofUrl, setIdProofUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({ totalTrips: 0 });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Redirect logged-out visitors to /login
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Load profile fields, ID proof, and trip stats
  useEffect(() => {
    if (!user) return;

    let resolvedName = user.displayName ?? "";
    setEmail(user.email ?? "");

    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (typeof data.phone === "string") setPhone(data.phone);
          if (typeof data.idProofUrl === "string") setIdProofUrl(data.idProofUrl);
          if (typeof data.name === "string" && !user.displayName) {
            resolvedName = data.name;
          }
        }
      } catch {
        // Non-fatal — profile just loads with defaults from Auth
      } finally {
        setName(resolvedName);
        setLoadingProfile(false);
      }
    })();

    // Trip count reads from the same "trips" collection that TripsList
    // uses, so it always matches what's shown on the trips page.
    (async () => {
      try {
        const tripsRef = collection(db, "trips");
        const q = query(tripsRef, where("userId", "==", user.uid));
        const snap = await getDocs(q);
        setStats({ totalTrips: snap.size });
      } catch {
        setStats({ totalTrips: 0 });
      }
    })();
  }, [user]);

  function handleSaved(newName: string, newPhone: string) {
    setName(newName);
    setPhone(newPhone);
    setSaved(true);
    setIsEditing(false);
  }

  if (authLoading || !user || loadingProfile) {
    return (
      <div className="w-full rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/60">
        Loading your profile...
      </div>
    );
  }

  const hasName = name.trim().length > 0;
  const initial = (hasName ? name.trim()[0] : email[0] ?? "?").toUpperCase();
  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink/5 text-xl font-semibold text-ink/70">
          {initial}
        </div>
        <div>
          <p className="text-xl font-semibold text-ink">{hasName ? name : "Add your name"}</p>
          <p className="text-sm text-ink/60">{email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total trips" value={String(stats.totalTrips)} />
        <StatCard label="Member since" value={memberSince} />
        <StatCard label="ID proof" value={idProofUrl ? "Uploaded" : "Pending"} />
      </div>

      {/* Details + ID proof */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-ink/10 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Profile details</h2>
            {!isEditing && (
              <button
                type="button"
                onClick={() => {
                  setSaved(false);
                  setIsEditing(true);
                }}
                className="text-sm font-medium text-ink/60 hover:text-ink"
              >
                Edit
              </button>
            )}
          </div>

          {saved && <p className="mb-4 text-sm text-moss">Profile updated.</p>}

          {isEditing ? (
            <ProfileForm
              user={user}
              initialName={name}
              initialPhone={phone}
              email={email}
              onCancel={() => setIsEditing(false)}
              onSaved={handleSaved}
            />
          ) : (
            <dl className="divide-y divide-ink/10 border-t border-ink/10">
              <div className="flex items-center justify-between py-3">
                <dt className="text-sm text-ink/60">Full name</dt>
                <dd className="text-sm font-medium text-ink">{hasName ? name : "—"}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-sm text-ink/60">Phone</dt>
                <dd className="text-sm font-medium text-ink">{phone || "—"}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-sm text-ink/60">Email</dt>
                <dd className="text-sm font-medium text-ink">{email}</dd>
              </div>
            </dl>
          )}
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-ink">ID proof</h2>
          <IdProofUpload user={user} initialUrl={idProofUrl} onUploaded={setIdProofUrl} />
        </div>
      </div>
    </div>
  );
}