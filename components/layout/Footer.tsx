import Image from "next/image";

const quickLinks = ["Home", "Services", "Fleet", "Destinations", "Contact"];

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
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
          <p className="mt-4 text-sm leading-relaxed">
            Local cabs, outstation trips and pilgrimage tour packages based in
            Nashik, Maharashtra.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Placeholder Address, Nashik, MH</li>
            <li>+91 00000 00000</li>
            <li>booking@swamitours.example</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Hours
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Booking desk: 24×7</li>
            <li>Office: 9:00 AM – 9:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Swami Tours. All rights reserved.
      </div>
    </footer>
  );
}
