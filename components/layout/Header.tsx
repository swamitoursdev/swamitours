import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Destinations", href: "#destinations" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-moss/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-20 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/assets/swami-logo.jpeg"
            alt="Swami Tours"
            width={52}
            height={52}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight text-ink hidden sm:inline">
            Swami Tours
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-sans text-sm text-ink/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-saffron-dark transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+910000000000"
          className="inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-saffron-dark transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.4 0 .8-.2 1L6.6 10.8Z"
              stroke="white"
              strokeWidth="1.6"
            />
          </svg>
          Call Now
        </a>
      </div>
    </header>
  );
}
