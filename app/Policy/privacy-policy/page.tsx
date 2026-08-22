import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "Privacy Policy | Swami Tours",
  description:
    "How Swami Tours collects, uses, and protects your personal information when you book cabs, outstation trips, or pilgrimage tour packages.",
  alternates: { canonical: "/Policy/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
      <div className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-14">
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Policies
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-2">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Last updated: August 22, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 space-y-10 text-sm leading-relaxed">
        <p>
          Swami Tours ("we", "us", "our") respects your privacy. This Privacy
          Policy explains what information we collect when you book our
          local cab, outstation, or pilgrimage tour services, how we use it,
          and the choices you have.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            1. Information We Collect
          </h2>
          <p className="mt-3">We may collect the following information when you contact or book with us:</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Name and contact details (phone number, email address)</li>
            <li>Pickup and drop locations, travel dates, and itinerary preferences</li>
            <li>Payment details necessary to process your booking (we do not store full card details)</li>
            <li>Communications you send us via phone, email, or our website contact form</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            2. How We Use Your Information
          </h2>
          <p className="mt-3">We use your information to:</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Confirm and manage your bookings and itineraries</li>
            <li>Coordinate pickup, drop, and driver assignment</li>
            <li>Send booking confirmations, updates, or invoices</li>
            <li>Respond to enquiries and customer support requests</li>
            <li>Improve our services based on customer feedback</li>
          </ul>
          <p className="mt-3">
            We do not sell or rent your personal information to third
            parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            3. Sharing of Information
          </h2>
          <p className="mt-3">
            We may share limited booking details (such as your name, phone
            number, and pickup/drop location) with the driver assigned to
            your trip, solely for the purpose of completing your journey. We
            may also share information where required by law, such as with
            local authorities during interstate travel checks.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            4. Data Retention
          </h2>
          <p className="mt-3">
            We retain booking and contact information for as long as
            necessary to fulfill your trip, respond to any follow-up queries,
            and maintain basic business records as required by applicable
            law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            5. Data Security
          </h2>
          <p className="mt-3">
            We take reasonable measures to protect your personal information
            from unauthorized access, misuse, or disclosure. However, no
            method of transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            6. Your Choices
          </h2>
          <p className="mt-3">
            You may request access to, correction of, or deletion of your
            personal information held by us by contacting us using the
            details below. You may also opt out of promotional
            communications at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            7. Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            8. Contact Us
          </h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy or how your data
            is handled, please contact us at{" "}
            <a
              href="mailto:swamitours001@gmail.com"
              className="text-saffron hover:underline"
            >
              swamitours001@gmail.com
            </a>{" "}
            or call +91 93243 78802.
          </p>
        </section>

        <Link
          href="/"
          className="inline-block text-sm font-mono text-saffron hover:underline"
        >
          ← Back to home
        </Link>
      </div>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}