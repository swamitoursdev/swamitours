import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Swami Tours, our mission and our fleet of reliable cabs.",
  alternates: { canonical: "/about-us" },
};

export default function Page() {
  return <div>About Us</div>;
}
