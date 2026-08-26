import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Swami Tours",
  description:
    "Return and refund policy for cab bookings, outstation trips, and pilgrimage tour packages with Swami Tours.",
  alternates: { canonical: "/Policy/return-and-refund-policy" },
};

export default function ReturnAndRefundPolicyPage() {
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
            Return &amp; Refund Policy
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Last updated: August 26, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 space-y-10 text-sm leading-relaxed">
        <p>
          As a cab and tour service provider, Swami Tours does not sell
          physical goods, so this policy covers refunds of amounts already
          paid to us — not product returns. It should be read together with
          our{" "}
          <Link href="/Policy/terms-and-conditions" className="text-saffron hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/Policy/cancellation-policy"
            className="text-saffron hover:underline"
          >
            Cancellation Policy
          </Link>
          , which govern when a booking can be cancelled and when an advance
          payment may be non-refundable regardless of timing.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            1. When You're Eligible for a Refund
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>
              Cancellations made within the free-cancellation window set out
              in our Cancellation Policy are eligible for a full refund of
              any advance paid — <strong>unless</strong> the vehicle was
              specifically blocked or reserved for your booking, in which
              case the advance may be non-refundable even within this
              window, as described in our Cancellation Policy.
            </li>
            <li>
              If we are unable to fulfil a confirmed booking due to vehicle
              unavailability, driver issues, or an error on our part, you
              are entitled to a full refund of any advance paid.
            </li>
            <li>
              If a trip cannot proceed due to circumstances beyond anyone's
              control (severe weather, roadblocks, landslides, government
              restrictions), and you choose not to reschedule, any advance
              paid will be refunded minus non-recoverable costs already
              incurred.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            2. When a Refund Is Not Available
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>
              Cancellations made outside the free-cancellation window, or
              no-shows, are not eligible for a refund, as outlined in our
              Cancellation Policy.
            </li>
            <li>
              Advance amounts paid to specifically block or reserve a
              vehicle are not eligible for a refund, regardless of the
              cancellation window, as described in our Cancellation Policy.
            </li>
            <li>
              Amounts already spent on tolls, parking, permits, or other
              trip-related costs incurred before a cancellation are
              non-refundable.
            </li>
            <li>
              Completed trips are not eligible for a refund except where a
              genuine service issue is reported and verified (see Section 3).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            3. Service Issues
          </h2>
          <p className="mt-3">
            If you experience a genuine service issue on a completed
            trip — such as being charged for a stop or distance that was not
            actually travelled — please report it to us within 48 hours of
            the trip with relevant details. We will review the complaint and,
            where verified, issue a partial or full refund of the disputed
            amount.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            4. How Refunds Are Processed
          </h2>
          <p className="mt-3">
            Eligible refunds are processed to the original mode of payment
            within 5–7 business days of approval. Refunds for cash payments
            are settled via UPI or bank transfer to an account you provide.
            Refunds are calculated after deduction of any applicable
            cancellation charges, the cost of services already completed,
            payment gateway or bank transaction charges, and other
            legitimately incurred expenses (such as tolls or permits already
            paid on your behalf).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            5. How to Request a Refund
          </h2>
          <p className="mt-3">
            To request a refund, please call us at{" "}
            <a href="tel:+919324378802" className="text-saffron hover:underline">
              +91 93243 78802
            </a>{" "}
            or email{" "}
            <a
              href="mailto:swamitours001@gmail.com"
              className="text-saffron hover:underline"
            >
              swamitours001@gmail.com
            </a>{" "}
            with your booking details and the reason for the request.
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