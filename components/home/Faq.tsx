import FaqAccordion from "@/components/seo/FaqAccordion";

const faqs = [
  { q: "What services does Swami Tours offer?", a: "We provide one-way cabs, round-trip taxi services, local hourly rentals, airport transfers and outstation taxi services across Maharashtra." },
  { q: "Which cities does Swami Tours serve?", a: "We're based in Navi Mumbai and serve routes across Maharashtra, including Pune, Shirdi, Nashik and more." },
  { q: "Can I book a one-way taxi?", a: "Yes, one-way bookings are available for local and outstation trips with transparent per-km pricing." },
  { q: "Do you provide airport taxi services?", a: "Yes, we offer 24/7 airport pickup and drop with flight tracking so your driver is always on time." },
  { q: "Are your fares transparent?", a: "Yes — no hidden charges. The fare shown at booking is what you pay." },
  { q: "Can I schedule a cab in advance?", a: "Yes, you can book ahead of time for any trip type, including early morning airport runs." },
];

export default function Faq() {
  return (
    <section className="bg-moss/5 py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-ink">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-center text-sm text-ink/60">
          Have questions about our taxi services? Explore answers related to
          bookings, fares, cancellations and safety.
        </p>
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}