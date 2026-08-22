import Link from "next/link";
import { states, slugify } from "@/lib/cab-routes";

const services = [
  "India", "Outstation", "Airport", "Local", "One Way Cab", "Round Trip Cab",
  "Car Rental", "Monthly Car Rental", "Best City Tour Taxi Service",
  "Corporate Car Rental", "Tempo Traveller", "Ashtavinayak Darshan",
  "Jyotirlinga Darshan", "Shirdi - Shani Shingnapur Darshan",
  "Kokan Darshan", "Sharing Cab",
];

export default function AvailabilityStrip() {
  return (
    <section className="bg-ink py-8">
      <div className="w-full px-5 sm:px-8 lg:px-12 space-y-6 text-xs">
        <div>
          <div className="flex items-center justify-between text-white/50">
            <p className="uppercase tracking-wide">Available in States</p>
            <p>{states.length} States</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {states.map((state) => (
              <Link
                key={state}
                href={`/cab-service-in-${slugify(state)}`}
                className="rounded-full border border-white/15 px-3 py-1 text-white/60 hover:text-saffron hover:border-saffron/40"
              >
                {state}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-white/50">
            <p className="uppercase tracking-wide">Available Services</p>
            <p>{services.length} Services</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((service) => (
              <span key={service} className="rounded-full border border-white/15 px-3 py-1 text-white/60">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}