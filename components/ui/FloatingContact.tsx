/**
 * Fixed WhatsApp + Call buttons for mobile only — the desktop header already
 * has a persistent "Call Now" button, so this stays hidden at md and up.
 */
export default function FloatingContact() {
  return (
    <div className="md:hidden fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
      <a
        href="tel:+919324378802"
        aria-label="Call Swami Tours"
        className="fab-in flex h-12 w-12 items-center justify-center rounded-full bg-saffron text-white shadow-lg shadow-ink/25"
        style={{ animationDelay: "550ms" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.4 0 .8-.2 1L6.6 10.8Z"
            stroke="white"
            strokeWidth="1.6"
          />
        </svg>
      </a>

      <a
        href="https://wa.me/919324378802"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Swami Tours on WhatsApp"
        className="fab-in relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/25"
        style={{ animationDelay: "200ms" }}
      >
        <span
          className="fab-pulse absolute inset-0 rounded-full bg-[#25D366]"
          aria-hidden="true"
        />
        <svg width="26" height="26" viewBox="0 0 32 32" fill="white" className="relative z-10" aria-hidden="true">
          <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.68 4.55 1.86 6.4L4.4 28l6.75-1.77a11.9 11.9 0 0 0 4.87 1.03h.01c6.63 0 12.02-5.4 12.02-12.03C28.05 8.4 22.65 3 16.02 3Zm0 21.8h-.01a9.7 9.7 0 0 1-4.94-1.35l-.35-.2-3.68.96.98-3.58-.23-.37a9.72 9.72 0 0 1-1.5-5.24c0-5.38 4.38-9.76 9.76-9.76 2.6 0 5.05 1.02 6.89 2.86a9.68 9.68 0 0 1 2.86 6.9c0 5.38-4.4 9.78-9.78 9.78Zm5.36-7.32c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.14-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.14-.14.31-.36.46-.54.15-.19.2-.32.3-.53.1-.2.05-.39-.04-.54-.1-.15-.7-1.7-.96-2.33-.25-.6-.5-.52-.7-.53-.18-.01-.4-.01-.6-.01-.2 0-.53.08-.81.38-.28.29-1.07 1.05-1.07 2.55 0 1.5 1.1 2.95 1.25 3.15.15.19 2.04 3.13 5 4.27 2.42.94 2.91.75 3.44.7.53-.05 1.73-.7 1.97-1.39.24-.68.24-1.26.17-1.39-.07-.13-.26-.2-.55-.36Z" />
        </svg>
      </a>
    </div>
  );
}
