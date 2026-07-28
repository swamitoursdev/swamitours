"use client";

import { useEffect, useState, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const anchorIconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  "aria-hidden": true as const,
};

// In-page section anchors — only meaningful on the home page ("/").
// Rendered as a bottom nav bar on mobile, and as a horizontal nav on desktop.
const navLinks = [
  {
    label: "Home",
    href: "/#home",
    id: "home",
    icon: (
      <svg {...anchorIconProps}>
        <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h3v-5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5h3a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "/#services",
    id: "services",
    icon: (
      <svg {...anchorIconProps}>
        <path
          d="M14.7 6.3a3.5 3.5 0 0 1-4.6 4.6l-5.4 5.4a1.5 1.5 0 0 0 2.1 2.1l5.4-5.4a3.5 3.5 0 0 1 4.6-4.6l-2.1 2.1-1.5-.4-.4-1.5 2.1-2.1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Fleet",
    href: "/#fleet",
    id: "fleet",
    icon: (
      <svg {...anchorIconProps}>
        <path d="M4 16.5v-3l1.8-4.6A2 2 0 0 1 7.7 7.5h8.6a2 2 0 0 1 1.9 1.4l1.8 4.6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="16.5" width="18" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7.5" cy="16.5" r="1.4" fill="currentColor" />
        <circle cx="16.5" cy="16.5" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Destinations",
    href: "/#destinations",
    id: "destinations",
    icon: (
      <svg {...anchorIconProps}>
        <path
          d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/#contact",
    id: "contact",
    icon: (
      <svg {...anchorIconProps}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

type PageLink = {
  label: string;
  href: string;
  icon: ReactElement;
};

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  "aria-hidden": true as const,
};

// Links to the actual app pages (as opposed to the in-page anchor links above)
const pageLinks: PageLink[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg {...iconProps}>
        <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h3v-5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5h3a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "About Us",
    href: "/about-us",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 11v5.5M12 8v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Book a Ride",
    href: "/book-a-ride",
    icon: (
      <svg {...iconProps}>
        <path d="M4 16.5v-3l1.8-4.6A2 2 0 0 1 7.7 7.5h8.6a2 2 0 0 1 1.9 1.4l1.8 4.6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="16.5" width="18" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7.5" cy="16.5" r="1.4" fill="currentColor" />
        <circle cx="16.5" cy="16.5" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "My Profile",
    href: "/my-profile",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 19.5c1.4-3.2 4-4.8 7-4.8s5.6 1.6 7 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "My Trips",
    href: "/my-trips",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 9.5h16M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Earnings",
    href: "/earnings",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Travel Points",
    href: "/travel-points",
    icon: (
      <svg {...iconProps}>
        <path
          d="m12 3.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Careers",
    href: "/careers",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="7.5" width="16" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 7.5v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 13h16" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: (
      <svg {...iconProps}>
        <path d="M6 4h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8.5 12h7M8.5 15.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // page-links drawer
  const [logoModalOpen, setLogoModalOpen] = useState(false); // logo preview modal
  const [activeSection, setActiveSection] = useState("home"); // scroll-spy for bottom nav
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Scroll-spy: highlight whichever section is currently in view on the home page.
  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur border-b border-moss/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setLogoModalOpen(true)}
          aria-haspopup="dialog"
          aria-label="View Swami Tours logo"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/swami-logo-nobg.png"
            alt="Swami Tours"
            width={52}
            height={52}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight text-ink hidden sm:inline">
            Swami Tours
          </span>
        </button>

        {/* Desktop nav — section anchors, only meaningful on the home page */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm text-ink/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-saffron-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <a
            href="tel:+919324378802"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-saffron-dark transition-colors"
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

          {/* Only menu button now — opens the drawer with links to the app pages */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="page-nav-drawer"
            aria-label="Open pages menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink hover:bg-sand transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="5" width="16" height="2.2" rx="1.1" fill="currentColor" />
              <rect x="4" y="10.9" width="10" height="2.2" rx="1.1" fill="currentColor" />
              <rect x="4" y="16.8" width="16" height="2.2" rx="1.1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

    </header>

      {/* Backdrop for the pages drawer — rendered outside <header> so backdrop-blur's
          containing-block effect doesn't hijack this element's fixed positioning */}
      <div
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-in drawer with links to the app pages */}
      <aside
        id="page-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Pages navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink/10 bg-sand/60 px-5">
          <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <Image
              src="/assets/swami-logo-nobg.png"
              alt="Swami Tours"
              width={34}
              height={34}
              className="rounded-full object-cover"
            />
            <span className="font-display text-base font-semibold text-ink">Swami Tours</span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-8 w-8 items-center justify-center text-ink/60 hover:text-ink transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <Link
          href="/login"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center justify-center bg-moss py-3.5 text-sm font-medium text-white hover:bg-moss-dark transition-colors"
        >
          Login
        </Link>

        <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {pageLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 border-b border-ink/10 px-5 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-sand text-saffron-dark font-medium"
                    : "text-ink/80 hover:bg-sand hover:text-saffron-dark"
                }`}
              >
                <span className="text-ink/60">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* NEW: bottom nav bar — replaces the old mobile anchor-dropdown. Home page + mobile only. */}
      {isHome && (
        <nav
          aria-label="Section navigation"
          className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-moss/10 bg-white/40 backdrop-blur pb-[env(safe-area-inset-bottom)]"
        >
          <div className="flex items-stretch justify-between px-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] transition-colors ${
                    isActive ? "text-saffron-dark" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {link.icon}
                  <span className={isActive ? "font-medium" : ""}>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Logo preview modal — opens when the header logo is tapped */}
      <div
        onClick={() => setLogoModalOpen(false)}
        aria-hidden={!logoModalOpen}
        className={`fixed inset-0 z-60 flex items-center justify-center bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          logoModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Swami Tours logo"
          onClick={(e) => e.stopPropagation()}
          className={`relative transition-transform duration-300 ${
            logoModalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <button
            type="button"
            onClick={() => setLogoModalOpen(false)}
            aria-label="Close"
            className="absolute -top-3 -right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink/60 shadow-md hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <Image
            src="/assets/swami-logo-nobg.png"
            alt="Swami Tours"
            width={240}
            height={240}
            className="h-auto w-56 max-w-[60vw] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </>
  );
}