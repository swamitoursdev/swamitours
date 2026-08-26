import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "Cancellation Policy | Swami Tours",
  description:
    "Cancellation policy for cab bookings, outstation trips, and pilgrimage tour packages with Swami Tours.",
  alternates: { canonical: "/Policy/cancellation-policy" },
};

export default function CancellationPolicyPage() {
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
            Cancellation Policy
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Last updated: August 26, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 space-y-10 text-sm leading-relaxed">
        <p>
          We understand that travel plans can change. This policy explains
          how cancellations and rescheduling are handled for local cab
          bookings, outstation trips, and pilgrimage tour packages booked
          with Swami Tours. It should be read together with our{" "}
          <Link href="/Policy/terms-and-conditions" className="text-saffron hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          — where this policy is silent on a point, or in case of any
          conflict, the Terms &amp; Conditions and your specific booking
          confirmation will govern. For information about refunds, please
          see our{" "}
          <Link
            href="/Policy/return-and-refund-policy"
            className="text-saffron hover:underline"
          >
            Return &amp; Refund Policy
          </Link>
          .
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            1. Local Cab Bookings
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>
              Cancellations made more than 2 hours before the scheduled
              reporting time are free of charge.
            </li>
            <li>
              Cancellations made within 2 hours of the reporting time, or
              after a driver has already been dispatched, may attract a
              nominal cancellation fee to cover the driver's time and fuel.
            </li>
            <li>No-shows at the pickup location will be charged in full.</li>
            <li>
              If a vehicle has been specifically blocked or reserved for
              your booking, the advance amount paid may be non-refundable
              regardless of the timing of cancellation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            2. Outstation Trips &amp; Pilgrimage Tour Packages
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>
              Cancellations made 72 hours or more before the trip start date
              incur no cancellation charge.
            </li>
            <li>
              Cancellations made between 24–72 hours before the trip start
              date may incur a cancellation charge of up to 50% of the
              advance amount, to cover vehicle and driver arrangements
              already made.
            </li>
            <li>
              Cancellations made less than 24 hours before the trip start
              date, or no-shows, will forfeit the full advance amount paid.
              Where the total package cost has already been substantially
              committed for the booking (e.g. a fully-arranged multi-day
              pilgrimage tour), the full package cost may become payable.
            </li>
            <li>
              For multi-day pilgrimage packages, cancelling any unused
              portion of the trip mid-journey does not reduce the applicable
              cancellation charge, as vehicle and driver costs are committed
              for the full duration.
            </li>
            <li>
              As with local bookings, advance amounts paid to specifically
              block or reserve a vehicle may be non-refundable, regardless
              of the cancellation window above. See our{" "}
              <Link
                href="/Policy/return-and-refund-policy"
                className="text-saffron hover:underline"
              >
                Return &amp; Refund Policy
              </Link>{" "}
              for how refunds are calculated.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            3. Cancellations by Swami Tours
          </h2>
          <p className="mt-3">
            In the rare event that we are unable to fulfill a confirmed
            booking due to vehicle unavailability, driver issues, or
            unforeseen circumstances, we will inform you as early as
            possible and offer either a suitable alternative vehicle or a
            cancellation on our end at no charge to you.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            4. Rescheduling
          </h2>
          <p className="mt-3">
            We're happy to reschedule your booking to a different date or
            time, subject to vehicle and driver availability. Rescheduling
            requested at least 24 hours in advance is generally accommodated
            without a separate rescheduling fee, though any difference in
            fare arising from the new date, time, route, or package (for
            example, seasonal pricing or night charges) will still apply.
            Requests made closer to the travel date will be accommodated on
            a best-effort basis and may attract additional charges.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            5. Weather &amp; Force Majeure
          </h2>
          <p className="mt-3">
            In case a trip cannot proceed due to circumstances beyond
            anyone's control — such as severe weather, roadblocks,
            landslides, government restrictions, or natural events — we will
            make reasonable efforts to reschedule the trip with you rather
            than treat it as a standard cancellation, wherever practicable.
            This is subject to vehicle and driver availability at the
            revised date and time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            6. How to Cancel
          </h2>
          <p className="mt-3">
            To cancel or reschedule a booking, please call us at{" "}
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
            with your booking details as soon as possible.
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