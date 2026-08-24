//C:\Users\nikhi\Projects\swamitours\app\contact-us\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { FormField, primaryButton } from "@/components/ui/FormField";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Swami Tours team for support and queries.",
  alternates: { canonical: "/contact-us" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="We'd love to hear from you"
      description="Questions about a booking or a tour package? Send us a message and we'll get back within a day."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <form className="space-y-4 rounded-xl border border-ink/10 bg-white p-6">
          <FormField label="Name" name="name" placeholder="Your name" required />
          <FormField label="Phone" name="phone" type="tel" placeholder="+91" required />
          <FormField label="Email" name="email" type="email" placeholder="you@example.com" />
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
              Message
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="How can we help?"
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder-ink/35 focus:outline-2 focus:outline-saffron"
            />
          </label>
          <button type="submit" className={primaryButton}>
            Send message
          </button>
        </form>
        <div className="space-y-3 text-sm text-ink/70">
          <p>
            D1/03, New Green Valley CHS, Sector 8B, CBD Belapur, Navi Mumbai —
            400614
          </p>
          <p>+91 93243 78802</p>
          <p>swamitours001@gmail.com</p>
          <p>Booking desk open 24 × 7</p>
        </div>
      </div>
    </PageShell>
  );
}
