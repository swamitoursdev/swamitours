import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Trips",
  description: "View your past and upcoming trips with Swami Tours.",
  alternates: { canonical: "/my-trips" },
};

export default function Page() {
  return <div>My Trips</div>;
}
