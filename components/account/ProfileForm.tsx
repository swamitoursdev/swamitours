//components\account\ProfileForm.tsx
"use client";

import { useState } from "react";
import { updateProfile, type User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FormField, primaryButton } from "@/components/ui/FormField";

interface ProfileFormProps {
  user: User;
  initialName: string;
  initialPhone: string;
  email: string;
  onCancel: () => void;
  onSaved: (name: string, phone: string) => void;
}

export default function ProfileForm({
  user,
  initialName,
  initialPhone,
  email,
  onCancel,
  onSaved,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (name !== (user.displayName ?? "")) {
        await updateProfile(user, { displayName: name });
      }
      await setDoc(doc(db, "users", user.uid), { name, phone }, { merge: true });
      onSaved(name, phone);
    } catch {
      setError("Couldn't save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <FormField
        label="Full name"
        name="name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+91"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        disabled
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className={`${primaryButton} disabled:opacity-60`}>
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="text-sm font-medium text-ink/60 hover:text-ink disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}