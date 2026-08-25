//components\contact\ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FormField, primaryButton } from "@/components/ui/FormField";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!values.name || !values.phone) {
      setError("Please fill in your name and phone number.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        name: values.name,
        phone: values.phone,
        email: values.email || null,
        message: values.message || null,
        createdAt: serverTimestamp(),
        status: "new",
      });

      setSubmitted(true);
      setValues(initialValues);
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-ink/10 bg-white p-6 text-sm">
        <p className="font-medium text-ink">Thanks for reaching out!</p>
        <p className="mt-1 text-ink/60">
          We&apos;ve received your enquiry and will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 font-mono text-xs uppercase tracking-wide text-saffron hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-ink/10 bg-white p-6"
    >
      <FormField
        label="Name"
        name="name"
        placeholder="Your name"
        required
        value={values.name}
        onChange={handleChange}
      />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+91"
        required
        value={values.phone}
        onChange={handleChange}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
      />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="How can we help?"
          value={values.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder-ink/35 focus:outline-2 focus:outline-saffron"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={submitting} className={primaryButton}>
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
