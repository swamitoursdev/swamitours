"use client";

import { useState } from "react";
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

const socialLinks = [
  {
    label: "Google",
    href: "https://share.google/yrT03B0kqfd7DGpAf",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.52 12.273c0-.851-.076-1.67-.219-2.455H12v4.645h6.462a5.53 5.53 0 01-2.397 3.63v3.017h3.878c2.27-2.09 3.578-5.168 3.578-8.837z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.956-1.075 7.943-2.91l-3.878-3.017c-1.075.72-2.45 1.147-4.065 1.147-3.126 0-5.77-2.112-6.715-4.948H1.28v3.113C3.257 21.31 7.31 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.285 14.272A7.213 7.213 0 014.909 12c0-.788.136-1.553.376-2.272V6.615H1.28A11.986 11.986 0 000 12c0 1.936.464 3.769 1.28 5.385l4.005-3.113z"
        />
        <path
          fill="#EA4335"
          d="M12 4.773c1.762 0 3.344.606 4.588 1.796l3.442-3.442C17.951 1.19 15.236 0 12 0 7.31 0 3.257 2.69 1.28 6.615l4.005 3.113C6.23 6.885 8.874 4.773 12 4.773z"
        />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/swamitours001",
    icon: (
      <svg viewBox="0 0 24 24" fill="#FFFFFF" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/swamitours001/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <defs>
          <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#FFDD55" />
            <stop offset="10%" stopColor="#FFDD55" />
            <stop offset="50%" stopColor="#FF543E" />
            <stop offset="100%" stopColor="#C837AB" />
          </radialGradient>
        </defs>
        <path
          fill="url(#ig-gradient)"
          d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 011.771 1.153 4.9 4.9 0 011.153 1.77c.248.639.415 1.364.465 2.43.05 1.065.06 1.404.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 01-1.153 1.771 4.9 4.9 0 01-1.77 1.153c-.639.248-1.364.415-2.43.465-1.065.05-1.404.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 01-1.771-1.153 4.9 4.9 0 01-1.153-1.77c-.248-.639-.415-1.364-.465-2.43C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428A4.9 4.9 0 013.678 3.68a4.9 4.9 0 011.77-1.153c.639-.248 1.364-.415 2.43-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.467.182-.8.399-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.059 1.372-.059 4.041 0 2.669.01 2.986.059 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.059 4.041.059 2.67 0 2.987-.01 4.041-.059.976-.045 1.505-.207 1.858-.344a3.1 3.1 0 001.15-.748c.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.05-1.055.059-1.372.059-4.041 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 00-.748-1.15 3.1 3.1 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.05-1.372-.059-4.041-.059zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-1.997a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592017187892",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1877F2" className="h-4 w-4" aria-hidden="true">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.196 2.238.196v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shree-swami-samarth-enterprises/",
    icon: (
      <svg viewBox="0 0 24 24" fill="#0A66C2" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState("/SwamitoursQR.svg");

  const handleSocialClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const newWindow = window.open(href, "_blank", "noopener,noreferrer");
    // Best-effort: ask the new tab to yield focus back to this one.
    // Browsers vary in whether they honor this, and mobile browsers
    // generally ignore it entirely — see conversation notes.
    newWindow?.blur();
    window.focus();
  };

  return (
    <footer id="contact" className="bg-ink text-white/70">
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-x-8 gap-y-10 px-5 py-14 sm:grid-cols-3 sm:px-8 sm:py-16 lg:grid-cols-7 lg:px-14 xl:px-20">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:pr-8 max-sm:text-center">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsLogoOpen(true)}
              aria-label="View Swami Tours logo"
              className="rounded-full transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <Image
                src="/assets/swami-logo.jpeg"
                alt="Swami Tours"
                width={72}
                height={72}
                className="h-16 w-16 rounded-full object-cover sm:h-10 sm:w-10"
              />
            </button>
            <span className="font-display text-lg font-semibold text-white">
              Swami Tours
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed max-sm:mx-auto">
            Local cabs, outstation trips and pilgrimage tour packages based in
            CBD Belapur, Navi Mumbai.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-saffron">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.287 3.958c.299.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.837-.197-1.538-1.118l1.286-3.958a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
            5.0 on Google (2 reviews)
          </p>

          <div className="mt-5 flex items-center gap-3 max-sm:justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleSocialClick(e, social.href)}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20"
              >
                {social.icon}
              </a>
            ))}
          </div>
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

        {/* QR code — on desktop this sits in its own column at the same
           level as the rest, centered within that column; on mobile it
           spans the full row and centers to the screen, independent of the
           left-aligned Hours text next to it. */}
        <div className="col-span-2 flex flex-col items-center text-center sm:col-span-3 lg:col-span-1">
          <button
            type="button"
            onClick={() => setIsQrOpen(true)}
            aria-label="View larger QR code"
            className="rounded-lg transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            <Image
              src={qrSrc}
              alt="Scan to chat with Swami Tours on WhatsApp"
              width={144}
              height={144}
              unoptimized
              onError={() => setQrSrc("/SwamiToursQR.png")}
              className="h-32 w-32 rounded-lg bg-white p-2"
            />
          </button>
          <p className="mt-2 text-xs text-white/50">Scan to chat with us</p>
        </div>
      </div>

      {/* Copyright — extra bottom padding on mobile so this clears the fixed
         bottom nav bar; that bar sits ~64px tall plus the safe-area inset on
         devices with a home indicator, so we pad for both. Adjust the 64px
         figure if your bottom nav's actual height differs. Not needed from
         sm upward, since the bottom nav bar is mobile-only. */}
      <div
        className="border-t border-white/10 px-10 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom)+64px)] text-center text-xs text-white/40 sm:px-8 sm:pb-5"
      >
        © {new Date().getFullYear()} Swami Tours.
        <br className="sm:hidden" />
        <span className="sm:before:content-['_']">A brand of Shree Swami Samarth Enterprises.</span>
        <span className="hidden sm:inline"> | </span>
        <br className="sm:hidden" />
        Digital services by{" "}
        <a
          href="https://navkon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white/70"
        >
          Navkon Labs
        </a>
      </div>

      {/* Logo modal */}
      {isLogoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Swami Tours logo"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
          onClick={() => setIsLogoOpen(false)}
        >
          <div
            className="relative flex max-w-xs flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLogoOpen(false)}
              aria-label="Close"
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
            <Image
              src="/assets/swami-logo.jpeg"
              alt="Swami Tours"
              width={280}
              height={280}
              className="h-56 w-56 rounded-full object-cover shadow-2xl"
            />
            <span className="mt-4 font-display text-lg font-semibold text-white">
              Swami Tours
            </span>
          </div>
        </div>
      )}

      {/* QR modal */}
      {isQrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Swami Tours WhatsApp QR code"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
          onClick={() => setIsQrOpen(false)}
        >
          <div
            className="relative flex max-w-xs flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQrOpen(false)}
              aria-label="Close"
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
            <Image
              src={qrSrc}
              alt="Scan to chat with Swami Tours on WhatsApp"
              width={280}
              height={280}
              unoptimized
              onError={() => setQrSrc("/SwamiToursQR.png")}
              className="h-64 w-64 rounded-lg bg-white p-3 shadow-2xl"
            />
            <span className="mt-4 font-display text-lg font-semibold text-white">
              Scan to chat with us
            </span>
          </div>
        </div>
      )}
    </footer>
  );
}