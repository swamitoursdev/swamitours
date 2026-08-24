//app\book-a-ride\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import BookingWidget from "@/components/home/BookingWidget";

export const metadata: Metadata = {
  title: "Book a Ride",
  description: "Book a local, outstation or airport cab ride with Swami Tours.",
  alternates: { canonical: "/book-a-ride" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Book now"
      title="Book your ride"
      description="Choose your trip type and share your details — our team will confirm your cab shortly."
    >
      <div className="flex justify-center rounded-2xl bg-moss p-6 sm:p-10">
        <BookingWidget />
      </div>
    </PageShell>
  );
}
