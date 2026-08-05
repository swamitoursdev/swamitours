"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";

/**
 * Fixed WhatsApp + Call buttons for mobile only, styled as metal pedals
 * (like a car's clutch/accelerator — see the reference you sent), one
 * anchored bottom-left and one bottom-right. Desktop keeps the header's
 * "Call Now" button, so this stays hidden at md and up.
 *
 * Positioning is derived from Header.tsx's mobile bottom nav:
 *   - it only renders on the home page ("/#..." section nav, isHome-gated)
 *   - its height there ≈ py-2.5 (20px) + 20px icon + gap-1 (4px) +
 *     text-[11px] (~13px) + border-t (1px) ≈ 58px, rounded up to 3.75rem
 * On other pages there's no bottom nav, so the pedals just rest near the
 * screen edge instead of floating in a gap.
 */
const HOME_BOTTOM_NAV_HEIGHT = "3.75rem";
const RESTING_OFFSET = "0.75rem"; // was 0.875rem, nudged 2px lower
const GAP_ABOVE_NAV = "0.5rem"; // was 0.625rem, nudged 2px lower

type PedalButtonProps = {
  href: string;
  external?: boolean;
  ariaLabel: string;
  accent: string; // tint for the pedal's tread/grip dots
  icon: React.ReactNode;
  side: "left" | "right";
  bottom: string;
  delay: string;
  /** "clutch" = short, tapered pedal (left/WhatsApp). "accelerator" = tall, narrow pedal (right/Call). */
  variant: "clutch" | "accelerator";
};

// Tapered clutch-pedal outline: wide rounded top narrowing to a smaller
// rounded bottom, and noticeably shorter than the accelerator.
const CLUTCH_PATH =
  "M32,6 L68,6 Q92,6 92,30 L80,142 Q79,160 61,160 L39,160 Q21,160 20,142 L8,30 Q8,6 32,6 Z";

function PedalButton({ href, external, ariaLabel, accent, icon, side, bottom, delay, variant }: PedalButtonProps) {
  const uid = useId();
  const gradId = `pedal-metal-${uid}`;
  const dotId = `pedal-dots-${uid}`;
  const clipId = `pedal-clip-${uid}`;
  const isClutch = variant === "clutch";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={`fab-in md:hidden fixed z-50 block transition-transform active:scale-95 ${
        side === "left" ? "left-4" : "right-4"
      }`}
      style={{ bottom, animationDelay: delay }}
    >
      <span className="relative block drop-shadow-lg">
        {isClutch ? (
          <svg width="38" height="63" viewBox="0 0 100 166" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id={gradId} x1="15" y1="10" x2="85" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f1f2f4" />
                <stop offset="45%" stopColor="#c3c6cc" />
                <stop offset="100%" stopColor="#787c85" />
              </linearGradient>
              <pattern id={dotId} width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="9" cy="9" r="4.8" fill={accent} />
              </pattern>
              <clipPath id={clipId}>
                <path d={CLUTCH_PATH} />
              </clipPath>
            </defs>

            {/* Pedal pad: tapered, shorter clutch shape */}
            <path d={CLUTCH_PATH} fill={`url(#${gradId})`} stroke="#16181c" strokeWidth="5" />

            {/* Grip dots, tinted with the brand accent, clipped to the tapered outline */}
            <rect x="8" y="38" width="84" height="110" fill={`url(#${dotId})`} opacity="0.92" clipPath={`url(#${clipId})`} />

            {/* Top sheen */}
            <path d="M16 22 Q50 4 84 22" stroke="white" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
        ) : (
          <svg width="38" height="84" viewBox="0 0 100 220" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id={gradId} x1="15" y1="10" x2="85" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f1f2f4" />
                <stop offset="45%" stopColor="#c3c6cc" />
                <stop offset="100%" stopColor="#787c85" />
              </linearGradient>
              <pattern id={dotId} width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="5.4" fill={accent} />
              </pattern>
            </defs>

            {/* Pedal pad: tall, narrow accelerator shape */}
            <rect x="8" y="6" width="84" height="208" rx="24" fill={`url(#${gradId})`} stroke="#16181c" strokeWidth="5" />

            {/* Grip dots, tinted with the brand accent */}
            <rect x="20" y="46" width="60" height="158" rx="10" fill={`url(#${dotId})`} opacity="0.92" />

            {/* Top sheen */}
            <path d="M14 22 Q50 4 86 22" stroke="white" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
        )}

        {/* Icon, no badge/circle */}
        <span className="absolute left-1/2 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center drop-shadow">
          {icon}
        </span>
      </span>
    </a>
  );
}

export default function FloatingContact() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const bottom = isHome
    ? `calc(${HOME_BOTTOM_NAV_HEIGHT} + ${GAP_ABOVE_NAV} + env(safe-area-inset-bottom))`
    : `calc(${RESTING_OFFSET} + env(safe-area-inset-bottom))`;

  return (
    <>
      <PedalButton
        href="https://wa.me/919324378802"
        external
        ariaLabel="Message Swami Tours on WhatsApp"
        accent="#25D366"
        side="left"
        bottom={bottom}
        delay="200ms"
        variant="clutch"
        icon={
          <svg width="18" height="18" viewBox="0 0 32 32" fill="#ffffff" aria-hidden="true">
            <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.68 4.55 1.86 6.4L4.4 28l6.75-1.77a11.9 11.9 0 0 0 4.87 1.03h.01c6.63 0 12.02-5.4 12.02-12.03C28.05 8.4 22.65 3 16.02 3Zm0 21.8h-.01a9.7 9.7 0 0 1-4.94-1.35l-.35-.2-3.68.96.98-3.58-.23-.37a9.72 9.72 0 0 1-1.5-5.24c0-5.38 4.38-9.76 9.76-9.76 2.6 0 5.05 1.02 6.89 2.86a9.68 9.68 0 0 1 2.86 6.9c0 5.38-4.4 9.78-9.78 9.78Zm5.36-7.32c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.14-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.14-.14.31-.36.46-.54.15-.19.2-.32.3-.53.1-.2.05-.39-.04-.54-.1-.15-.7-1.7-.96-2.33-.25-.6-.5-.52-.7-.53-.18-.01-.4-.01-.6-.01-.2 0-.53.08-.81.38-.28.29-1.07 1.05-1.07 2.55 0 1.5 1.1 2.95 1.25 3.15.15.19 2.04 3.13 5 4.27 2.42.94 2.91.75 3.44.7.53-.05 1.73-.7 1.97-1.39.24-.68.24-1.26.17-1.39-.07-.13-.26-.2-.55-.36Z" />
          </svg>
        }
      />

      <PedalButton
        href="tel:+919324378802"
        ariaLabel="Call Swami Tours"
        accent="var(--color-saffron)"
        side="right"
        bottom={bottom}
        delay="260ms"
        variant="accelerator"
        icon={
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.4 0 .8-.2 1L6.6 10.8Z"
              stroke="#ffffff"
              strokeWidth="1.8"
            />
          </svg>
        }
      />
    </>
  );
}