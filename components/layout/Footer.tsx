import Image from "next/image";
import Link from "next/link";

const quickLinks = ["Home", "Services", "Fleet", "Destinations", "Contact"];

const policyLinks = [
  { label: "Terms And Conditions", href: "/Policy/terms-and-conditions" },
  { label: "Privacy Policy", href: "/Policy/privacy-policy" },
  { label: "Cancellation Policy", href: "/Policy/cancellation-policy" },
  { label: "Return And Refund Policy", href: "/Policy/return-and-refund-policy" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white/70">
      <div className="w-full px-5 sm:px-8 lg:px-12 py-14 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-x-10 gap-y-10">
        <div className="w-full sm:w-auto sm:max-w-xs">
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
            CBD Belapur, Navi Mumbai.
          </p>
          <p className="mt-3 font-mono text-xs text-saffron">
            ★ 5.0 on Google (2 reviews)
          </p>
        </div>

        <div className="w-full sm:w-auto">
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

        <div className="w-full sm:w-auto">
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Our Policies
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {policyLinks.map((policy) => (
              <li key={policy.href}>
                <Link href={policy.href} className="hover:text-white">
                  {policy.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full sm:w-auto">
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              D1/03, New Green Valley CHS, Sector 8B, CBD Belapur,
              Navi Mumbai — 400614
              <br />
              <a
                href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwi4mMy__L2VAxUAAAAAHQAAAAAQCA..i&sca_esv=2fa727a4d830487c&udm=1&pvq=Cg0vZy8xMW5xeG55dGp5IhEKC3N3YW1pIHRvdXJzEAIYAw&lqi=Cgtzd2FtaSB0b3Vyc0idzLvK27SAgAhaFRAAEAEYABgBIgtzd2FtaSB0b3Vyc5IBEWNhcl9yZW50YWxfYWdlbmN5&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7c3baa3d1adbd:0x91ed20f6c76f79c3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron hover:text-white"
              >
                Get directions →
              </a>
            </li>
            <li>+91 93243 78802</li>
            <li>swamitours001@gmail.com</li>
          </ul>
        </div>

        <div className="w-full sm:w-auto">
          <p className="font-mono text-xs uppercase tracking-wide text-saffron">
            Hours
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Open 24 hours</li>
            <li>Booking desk: 24×7</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Swami Tours. A brand of Shree Swami
        Samarth Enterprises. | Developed by{" "}
        <a
          href="https://navkon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/70"
        >
          Navkon Labs
        </a>
      </div>
    </footer>
  );
}