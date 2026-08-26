import Link from "next/link";
import { states, slugify } from "@/lib/cab-routes";

const services = [
  "Airport Transfers", "Local Rentals", "Corporate Travel", "Outstation Trips",
  "Pilgrimage Packages", "24×7 Support", "Wedding & Events", "One Way Drops",
];

export default function AvailabilityStrip() {
  return (
    <section className="bg-ink py-3">
      <div className="w-full px-5 sm:px-8 lg:px-12 space-y-2">
        <div>
          <div className="flex items-center justify-between text-xs">
            <p className="font-mono uppercase tracking-wide text-saffron">
              Available in States
            </p>
            <p className="text-white/50">{states.length} States</p>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/60">
            {states.map((state, i) => (
              <span key={state}>
                <Link
                  href={`/cab-service-in-${slugify(state)}`}
                  className="hover:text-saffron"
                >
                  {state}
                </Link>
                {i < states.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <p className="font-mono uppercase tracking-wide text-saffron">
              Available Services
            </p>
            <p className="text-white/50">{services.length} Services</p>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/60">
            {services.map((service, i) => (
              <span key={service}>
                <a
                  href={`/#service-${slugify(service)}`}
                  className="hover:text-saffron"
                >
                  {service}
                </a>
                {i < services.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}