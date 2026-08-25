//C:\Users\nikhi\Projects\swamitours\app\contact-us\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { ContactForm } from "@/components/home/ContactForm";

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
        <ContactForm />
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