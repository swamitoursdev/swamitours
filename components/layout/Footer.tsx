import Image from "next/image";
import Link from "next/link";

const quickLinks = ["Home", "Services", "Fleet", "Destinations", "Contact"];

const policyLinks = [
  { label: "Terms And Conditions", href: "/Policy/terms-and-conditions" },
  { label: "Privacy Policy", href: "/Policy/privacy-policy" },
  { label: "Cancellation Policy", href: "/Policy/cancellation-policy" },
  { label: "Return And Refund Policy", href: "/Policy/return-and-refund-policy" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-wide text-saffron">
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white/70">
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-x-8 gap-y-10 px-5 py-14 sm:grid-cols-3 sm:px-8 sm:py-16 lg:grid-cols-6 lg:px-14 xl:px-20">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:pr-8">
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/swami-logo.jpeg"
              alt="Swami Tours"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="font-display text-lg font-semibold text-white">
              Swami Tours
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Local cabs, outstation trips and pilgrimage tour packages based in
            CBD Belapur, Navi Mumbai.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-saffron">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.287 3.958c.299.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.837-.197-1.538-1.118l1.286-3.958a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
            5.0 on Google (2 reviews)
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <ColumnHeading>Quick Links</ColumnHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="inline-block transition-all duration-150 hover:translate-x-0.5 hover:text-white"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <ColumnHeading>Our Policies</ColumnHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            {policyLinks.map((policy) => (
              <li key={policy.href}>
                <Link
                  href={policy.href}
                  className="inline-block transition-all duration-150 hover:translate-x-0.5 hover:text-white"
                >
                  {policy.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 sm:col-span-1">
          <ColumnHeading>Contact</ColumnHeading>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-saffron/70" aria-hidden="true">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 003 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              <span>
                D1/03, New Green Valley CHS, Sector 8B, CBD Belapur,
                Navi Mumbai — 400614
                <br />
                <a
                  href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwi4mMy__L2VAxUAAAAAHQAAAAAQCA..i&sca_esv=2fa727a4d830487c&udm=1&pvq=Cg0vZy8xMW5xeG55dGp5IhEKC3N3YW1pIHRvdXJzEAIYAw&lqi=Cgtzd2FtaSB0b3Vyc0idzLvK27SAgAhaFRAAEAEYABgBIgtzd2FtaSB0b3Vyc5IBEWNhcl9yZW50YWxfYWdlbmN5&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7c3baa3d1adbd:0x91ed20f6c76f79c3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-saffron transition-colors hover:text-white"
                >
                  Get directions
                  <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                    <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-saffron/70" aria-hidden="true">
                <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.826 1.68l-1.293.646a11.05 11.05 0 005.516 5.516l.647-1.293a1.5 1.5 0 011.678-.826l3.224.716A1.5 1.5 0 0117.5 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 12.97 12.97 0 012 5V3.5z" />
              </svg>
              <a href="tel:+919324378802" className="transition-colors hover:text-white">
                +91 93243 78802
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-saffron/70" aria-hidden="true">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              <a href="mailto:swamitours001@gmail.com" className="transition-colors hover:text-white">
                swamitours001@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <ColumnHeading>Hours</ColumnHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
              Open 24 hours
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
              Booking desk: 24×7
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright — extra bottom padding on mobile so this clears the fixed
         bottom nav bar; that bar sits ~64px tall plus the safe-area inset on
         devices with a home indicator, so we pad for both. Adjust the 64px
         figure if your bottom nav's actual height differs. */}
      <div
        className="border-t border-white/10 px-5 pt-5 text-center text-xs text-white/40 sm:px-8"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom) + 64px)" }}
      >
        <span className="sm:hidden" />
        © {new Date().getFullYear()} Swami Tours. A brand of Shree Swami
        Samarth Enterprises. | Developed by{" "}
        <a
          href="https://navkon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white/70"
        >
          Navkon Labs
        </a>
      </div>
      <style>{`
        @media (min-width: 640px) {
          footer > div:last-child {
            padding-bottom: 1.25rem !important;
          }
        }
      `}</style>
    </footer>
  );
}