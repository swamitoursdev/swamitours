import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Ride",
  description: "Book a local, outstation or airport cab ride with Swami Tours.",
  alternates: { canonical: "/book-a-ride" },
};

export default function Page() {
  return <div>Book a Ride</div>;
}
