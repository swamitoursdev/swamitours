//app\about-us\page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Swami Tours, our mission and our fleet of reliable cabs.",
  alternates: { canonical: "/about-us" },
};

// Decorative collage tiles — swap for real photography via next/image later.
const collageTones = [
  "var(--color-moss-dark)",
  "var(--color-saffron)",
  "var(--color-moss)",
  "var(--color-saffron-dark)",
  "var(--color-saffron-dark)",
  "var(--color-moss)",
  "var(--color-saffron)",
  "var(--color-moss-dark)",
];

const stats = [
  { label: "Daily Rides", value: "150+", blurb: "Customers who trust Swami Tours every single day." },
  { label: "Happy Clients", value: "5,000+", blurb: "A growing family of satisfied travellers." },
  { label: "Cities Covered", value: "50+", blurb: "Seamless connectivity across Maharashtra & beyond." },
  { label: "Fleet Vehicles", value: "9 types", blurb: "From hatchbacks to tempo travellers." },
];

const features = [
  {
    title: "24/7 Customer Support",
    text: "A dedicated support team always on call to help solve any problem.",
  },
  {
    title: "Safety First",
    text: "Verified, trained drivers and well-maintained cars on every trip.",
  },
  {
    title: "Hassle-free Booking",
    text: "Simple, transparent pricing and a smooth booking experience.",
  },
];

function CollageTile({ tone, i }: { tone: string; i: number }) {
  return (
    <div
      className="relative h-28 sm:h-36 overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${tone}, var(--color-ink))` }}
    >
      <svg
        viewBox="0 0 60 60"
        className="absolute -bottom-2 -right-2 h-16 w-16 opacity-25"
        aria-hidden="true"
      >
        {i % 2 === 0 ? (
          <path d="M5 50 Q20 20 35 50 T55 45" stroke="white" strokeWidth="2" fill="none" />
        ) : (
          <circle cx="30" cy="30" r="18" stroke="white" strokeWidth="2" fill="none" />
        )}
      </svg>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Photo-collage hero */}
        <section className="relative">
          <div className="grid grid-cols-4">
            {collageTones.map((tone, i) => (
              <CollageTile key={i} tone={tone} i={i} />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-xl bg-white px-10 py-6 text-center shadow-xl">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-ink">
                ABOUT US
              </h1>
              <p className="mt-1 text-sm">
                <Link href="/" className="text-saffron-dark hover:underline">
                  Home
                </Link>
                <span className="mx-2 text-ink/40">/</span>
                <span className="text-ink/60">About Us</span>
              </p>
            </div>
          </div>
        </section>

        {/* About content */}
        <section className="bg-sand py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="rounded-t-xl bg-linear-to-r from-saffron to-saffron-dark py-4 text-center">
              <h2 className="font-display text-lg font-semibold tracking-wide text-white">
                ABOUT US
              </h2>
            </div>
            <div className="space-y-4 rounded-b-xl border border-t-0 border-ink/10 bg-white p-6 sm:p-10 text-sm leading-relaxed text-ink/70">
              <p>
                <span className="font-semibold text-ink">Swami Tours</span> is a
                trusted name in taxi and car rental services, based in CBD
                Belapur, Navi Mumbai. We specialise in reliable, safe and
                comfortable rides for local travel, outstation trips, airport
                transfers and pilgrimage tours.
              </p>
              <p>
                Our mission is simple — to make every journey smooth,
                affordable and stress-free. Whether it&apos;s a short city
                ride, a family pilgrimage, a business trip or a multi-day
                tour, we ensure timely service with professional drivers and
                well-maintained cars.
              </p>
              <p>
                Over the years, we&apos;ve built our reputation on
                punctuality, transparency and customer satisfaction.
                Thousands of travellers, from solo passengers to families and
                corporate groups, trust us for their daily and long-distance
                travel needs.
              </p>
              <p className="font-medium text-ink">With Swami Tours, you get:</p>
              <p>
                24/7 taxi booking support · One-way, round-trip and local
                packages · Clean, comfortable and well-equipped vehicles ·
                Experienced and courteous drivers · Affordable and
                transparent pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-ink/10 bg-white p-6 text-center"
              >
                <p className="font-display text-3xl font-semibold text-saffron-dark">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-medium text-moss-dark">
                  {s.label}
                </p>
                <p className="mt-2 text-xs text-ink/60">{s.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature strip */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid divide-y divide-white/10 rounded-xl bg-ink text-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {features.map((f) => (
                <div key={f.title} className="p-8 text-center">
                  <h3 className="font-display text-lg font-semibold text-saffron">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}