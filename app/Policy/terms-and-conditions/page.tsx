import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "Terms & Conditions | Swami Tours",
  description:
    "Terms and conditions for car rental and travel services offered by Swami Tours, CBD Belapur, Navi Mumbai.",
  alternates: { canonical: "/Policy/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Terms &amp; Conditions for Car Rental &amp; Travel Services
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            1. Booking Confirmation
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              A booking shall be considered confirmed only after the required
              advance payment has been received and the booking confirmation
              has been issued by Swami Tours.
            </p>
            <p>Vehicle availability is subject to confirmation at the time of booking.</p>
            <p>
              The vehicle category/model requested by the customer will be
              provided subject to availability. In unavoidable circumstances,
              Swami Tours may provide an equivalent or upgraded vehicle.
            </p>
            <p>
              The customer must provide correct pickup location, destination,
              travel date, reporting time, passenger count and other relevant
              information at the time of booking.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            2. Fare &amp; Payment
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              The agreed fare will be based on the vehicle, route, duration,
              package, kilometres/hours and other conditions communicated at
              the time of booking.
            </p>
            <p>
              Additional usage beyond the agreed package will be charged
              separately as per the applicable rate.
            </p>
            <p>
              Toll, parking charges, state entry tax, permit charges,
              municipal/local taxes and other government-authorised charges
              are extra unless specifically included in the quotation.
            </p>
            <p>Applicable GST/taxes, if any, will be charged as per prevailing law.</p>
            <p>
              Additional charges arising due to customer-requested route
              changes, additional stops, waiting, extensions or itinerary
              changes shall be payable by the customer.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            3. Outstation &amp; Multi-Day Bookings
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              For outstation bookings, the applicable minimum kilometres/day
              or package conditions will be as communicated in the
              quotation/booking confirmation.
            </p>
            <p>
              For multi-day/outstation duties, driver allowance/night halt
              charges will be applicable as agreed at the time of booking.
            </p>
            <p>
              If the customer is required to arrange the driver's
              accommodation, the customer shall provide a safe, clean and
              suitable place for sleeping and basic facilities for food and
              freshening up.
            </p>
            <p>
              If such arrangements are not provided by the customer,
              applicable driver allowance/accommodation/food charges shall be
              payable separately.
            </p>
            <p>
              Where the driver is required to stay overnight outside the
              base location, applicable night halt/driver allowance will be
              charged irrespective of whether the vehicle is used during the
              night.
            </p>
            <p>Any extension beyond the originally agreed duration shall attract additional charges.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            4. Driver Duty &amp; Rest
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              The driver is responsible for driving safely and in accordance
              with applicable traffic and motor vehicle laws.
            </p>
            <p>
              The customer shall not compel or pressure the driver to drive
              continuously beyond safe working limits.
            </p>
            <p>
              Adequate rest must be provided to the driver during
              long-distance and multi-day journeys.
            </p>
            <p>
              Swami Tours reserves the right to stop or delay the journey
              where continuing to drive would create an unreasonable safety
              risk.
            </p>
            <p>
              Driver decisions relating to road safety, traffic restrictions,
              weather conditions or vehicle safety shall be respected.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            5. Night Travel
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              If night travel is specifically requested or required as part
              of the itinerary, applicable night charges, if any, will be
              charged as communicated at the time of booking.
            </p>
            <p>
              The driver may refuse unsafe driving conditions where
              continuing the journey could endanger passengers, the driver
              or the vehicle.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            6. Waiting &amp; Additional Stops
          </h2>
          <div className="mt-3 space-y-3">
            <p>The booking package includes only the usage specifically agreed at the time of booking.</p>
            <p>Additional waiting beyond the included waiting period may attract waiting charges.</p>
            <p>
              Additional pickup/drop points, sightseeing stops, route
              diversions and detours requested by the customer may attract
              additional kilometre/time charges.
            </p>
            <p>Unplanned itinerary changes are subject to vehicle and driver availability.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            7. Cancellation &amp; Rescheduling
          </h2>
          <div className="mt-3 space-y-3">
            <p>Cancellation charges will depend on the time of cancellation and the booking type.</p>
            <p>
              Advance amounts may be non-refundable where the vehicle has
              been specifically blocked/reserved for the customer.
            </p>
            <p>
              For cancellation close to reporting time, the customer may be
              liable for the applicable cancellation charge or committed
              booking amount.
            </p>
            <p>Rescheduling is subject to vehicle availability and may attract additional charges.</p>
            <p>No-show at the scheduled pickup location/time may be treated as a cancellation.</p>
            <p className="text-gray-600">
              See our{" "}
              <Link
                href="/Policy/cancellation-policy"
                className="text-saffron hover:underline"
              >
                Cancellation Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/Policy/return-and-refund-policy"
                className="text-saffron hover:underline"
              >
                Return &amp; Refund Policy
              </Link>{" "}
              for full details.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            8. Pickup &amp; Reporting
          </h2>
          <div className="mt-3 space-y-3">
            <p>The customer should be available at the agreed pickup location and reporting time.</p>
            <p>Delays caused by the customer may result in waiting charges or changes to the itinerary.</p>
            <p>The customer is responsible for providing accurate pickup/drop details.</p>
            <p>
              If the pickup location is inaccessible due to traffic
              restrictions, road closures, security restrictions or other
              circumstances beyond Swami Tours' control, the customer may be
              required to reach an alternative safe pickup point.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            9. Passenger &amp; Vehicle Safety
          </h2>
          <div className="mt-3 space-y-3">
            <p>All passengers must comply with applicable traffic and safety regulations.</p>
            <p>Seat belts must be used wherever provided.</p>
            <p>Passengers must not interfere with the driver while the vehicle is moving.</p>
            <p>
              Smoking, consumption of alcohol inside the vehicle, use of
              illegal substances and behaviour that may endanger the driver,
              passengers or vehicle are strictly prohibited.
            </p>
            <p>
              The customer shall be responsible for damage to the vehicle
              caused by intentional, negligent or improper conduct of the
              customer/passengers, subject to applicable law.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            10. Luggage &amp; Personal Belongings
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Passengers are responsible for their personal belongings,
              luggage, valuables, documents, electronic devices and other
              items carried in the vehicle.
            </p>
            <p>
              Swami Tours shall not be responsible for loss, theft or damage
              to personal belongings left unattended in the vehicle, except
              to the extent liability cannot lawfully be excluded.
            </p>
            <p>Luggage must be within the safe carrying capacity of the vehicle.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            11. Vehicle Breakdown / Unforeseen Circumstances
          </h2>
          <div className="mt-3 space-y-3">
            <p>Swami Tours will make reasonable efforts to provide a safe and roadworthy vehicle.</p>
            <p>
              In the event of breakdown, accident, puncture, mechanical
              failure, traffic restriction, natural calamity, extreme
              weather, strike, road closure or other unforeseen circumstance,
              Swami Tours will make reasonable efforts to arrange an
              alternative vehicle or suitable solution, subject to
              availability.
            </p>
            <p>
              Delays arising from circumstances beyond the reasonable control
              of Swami Tours shall not automatically constitute a failure to
              provide the service.
            </p>
            <p>Any replacement vehicle may be of an equivalent or upgraded category, subject to availability.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            12. Route &amp; Permit Restrictions
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Certain roads, destinations, restricted areas, forest areas,
              private roads, cantonment areas or other locations may require
              permission or be subject to restrictions.
            </p>
            <p>The driver may decline to enter an unsafe, prohibited or legally restricted area.</p>
            <p>
              Additional permits, taxes or charges required for a specific
              route or destination shall be payable by the customer unless
              expressly included in the quotation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            13. Passenger Capacity
          </h2>
          <div className="mt-3 space-y-3">
            <p>The number of passengers shall not exceed the legally permitted seating capacity of the vehicle.</p>
            <p>Swami Tours may refuse to carry passengers or luggage beyond the vehicle's permitted capacity.</p>
            <p>The customer shall not insist on unsafe or illegal overloading.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            14. Customer Responsibilities
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Provide accurate booking and travel information.</li>
            <li>Follow applicable traffic and safety rules.</li>
            <li>Treat the driver respectfully and professionally.</li>
            <li>Avoid abusive, threatening or unsafe behaviour.</li>
            <li>Not force the driver to violate traffic or motor vehicle laws.</li>
            <li>Pay applicable additional charges arising from customer-requested changes.</li>
            <li>Take reasonable care of the vehicle during the journey.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            15. Driver Conduct
          </h2>
          <div className="mt-3 space-y-3">
            <p>Swami Tours expects its drivers to behave professionally and courteously.</p>
            <p>
              Any complaint regarding driver behaviour should be reported to
              Swami Tours as soon as reasonably possible.
            </p>
            <p>Customers should not engage in arguments, threats or physical confrontation with the driver.</p>
            <p>Serious complaints will be reviewed by Swami Tours and appropriate action will be taken.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            16. Pricing &amp; Quotations
          </h2>
          <div className="mt-3 space-y-3">
            <p>All quotations are based on the details provided by the customer.</p>
            <p>
              If the actual journey differs materially from the information
              provided at the time of quotation, the fare may be revised
              accordingly.
            </p>
            <p>Verbal discussions will be subject to the final written quotation/booking confirmation.</p>
            <p>Any special discount or promotional offer is subject to the terms communicated at the time of booking.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            17. Force Majeure
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Swami Tours shall not be held responsible for delays,
              cancellation or inability to provide the service caused by
              circumstances beyond its reasonable control, including natural
              disasters, floods, heavy rainfall, landslides, riots, strikes,
              road blockages, government restrictions, accidents, sudden
              vehicle failure, war, public emergencies or other unforeseen
              events.
            </p>
            <p>
              Swami Tours will make reasonable efforts to assist the customer
              and provide an alternative solution wherever practicable.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            18. Refunds
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Any refund, where applicable, shall be processed after
              deduction of applicable cancellation charges, completed
              services, payment gateway/banking charges and other
              legitimately incurred expenses.
            </p>
            <p>Refund eligibility will depend on the booking terms communicated to the customer.</p>
            <p>
              Advance payments made for vehicle blocking/reservation may be
              non-refundable depending on the cancellation period and
              booking type.
            </p>
            <p className="text-gray-600">
              See our{" "}
              <Link
                href="/Policy/return-and-refund-policy"
                className="text-saffron hover:underline"
              >
                Return &amp; Refund Policy
              </Link>{" "}
              for full details.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            19. Booking Confirmation Prevails
          </h2>
          <p className="mt-3">
            In case of any difference between these general Terms &amp;
            Conditions and the specific terms mentioned in the customer's
            quotation/booking confirmation, the specific written
            quotation/booking confirmation shall prevail for that particular
            booking, unless otherwise required by applicable law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            20. Legal Compliance
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              All services shall be provided subject to applicable laws,
              rules, permits, taxation requirements and motor vehicle
              regulations in force from time to time.
            </p>
            <p>
              Nothing in these Terms &amp; Conditions is intended to exclude
              or restrict any consumer right, statutory protection or
              liability that cannot legally be excluded or restricted.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            21. Dispute Resolution &amp; Jurisdiction
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Swami Tours and the customer shall first attempt to resolve any
              dispute amicably through mutual discussion.
            </p>
            <p>If the dispute cannot be resolved amicably, it shall be dealt with in accordance with applicable Indian law.</p>
            <p>
              Subject to applicable law and jurisdictional requirements,
              courts having appropriate jurisdiction in Navi Mumbai /
              Maharashtra shall have jurisdiction.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            22. Acceptance of Terms
          </h2>
          <p className="mt-3">
            By making the booking, paying the advance amount, using the
            vehicle/service, or otherwise confirming the booking, the
            customer acknowledges that they have read, understood and
            accepted these Terms &amp; Conditions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-900">
            Contact Us
          </h2>
          <p className="mt-3">
            Swami Tours — Professional, Reliable, Comfortable Travel.
            <br />
            Contact:{" "}
            <a href="tel:+919324378802" className="text-saffron hover:underline">
              +91 93243 78802
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:swamitours001@gmail.com"
              className="text-saffron hover:underline"
            >
              swamitours001@gmail.com
            </a>
            <br />
            Address: CBD Belapur, Navi Mumbai
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