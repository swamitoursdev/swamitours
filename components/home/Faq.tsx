import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";

const faqs = [
  { q: "What services does Swami Tours offer?", a: "We provide one-way cabs, round-trip taxi services, local hourly rentals, airport transfers and outstation taxi services across Maharashtra." },
  { q: "Which cities does Swami Tours serve?", a: "We're based in Navi Mumbai and serve routes across Maharashtra, including Pune, Shirdi, Nashik and more." },
  { q: "Can I book a one-way taxi?", a: "Yes, one-way bookings are available for local and outstation trips with transparent per-km pricing." },
  { q: "Do you provide airport taxi services?", a: "Yes, we offer 24/7 airport pickup and drop with flight tracking so your driver is always on time." },
  { q: "Are your fares transparent?", a: "Yes — the fare shown at booking is an approximate estimate based on the details you provide. The final fare is charged as per our applicable rates, along with any extra charges for tolls, waiting, additional stops, or other services used during the trip." },
  { q: "Can I schedule a cab in advance?", a: "Yes, you can book ahead of time for any trip type, including early morning airport runs." },
];

export default function Faq() {
  return (
    <section className="w-full bg-cream py-16 sm:py-20">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-saffron-dark">
            Got Questions?
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">
            We&apos;ve Got the{" "}
            <span className="text-saffron-dark italic">Answers</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-ink/60">
            No fine print, no runaround. Here's everything travellers usually
            ask us before their first ride.
          </p>
        </div>

        <div className="mt-10 w-full rounded-2xl border border-ink/10 bg-white p-3 sm:p-6 shadow-sm text-center">
          <FaqAccordion faqs={faqs} />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-sm text-ink/60">Still have a question?</p>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full bg-saffron-dark px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md"
          >
            Ask Us Directly
          </Link>
        </div>
      </div>
    </section>
  );
}