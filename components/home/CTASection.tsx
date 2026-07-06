import RouteDivider from "../ui/RouteDivider";

export default function CTASection() {
  return (
    <section className="relative bg-saffron">
      <div className="absolute inset-x-0 -top-3">
        <RouteDivider flip />
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Planning a trip? Let's route it out.
          </h2>
          <p className="mt-2 text-white/85 text-sm">
            Call or WhatsApp us the pickup point and date — we'll send a fare in minutes.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="tel:+919324378802"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/80 transition-colors"
          >
            Call Now
          </a>
          <a
            href="https://wa.me/919324378802"
            className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}