/**
 * Signature element: a dashed "yatra route" line with a waypoint leaf,
 * echoing the leaf mark in the Swami Tours logo and the idea of a journey.
 * Reused as a section divider throughout the page instead of a plain <hr>.
 */
export default function RouteDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        className="w-full h-6"
      >
        <path className="route-line" d="M0 12 C 100 -4, 140 28, 200 12 S 320 -4, 400 12" />
        <circle cx="200" cy="12" r="4" fill="var(--color-saffron)" />
      </svg>
    </div>
  );
}
