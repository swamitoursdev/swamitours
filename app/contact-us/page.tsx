import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Swami Tours team for support and queries.",
  alternates: { canonical: "/contact-us" },
};

export default function Page() {
  return <div>Contact Us</div>;
}
