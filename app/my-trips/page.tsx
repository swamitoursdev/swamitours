//app\my-trips\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import TripsList from "@/components/account/TripsList";

export const metadata: Metadata = {
  title: "My Trips",
  description: "View your past and upcoming trips with Swami Tours.",
  alternates: { canonical: "/my-trips" },
};

export default function Page() {
  return (
    <PageShell eyebrow="Account" title="My Trips">
      <TripsList />
    </PageShell>
  );
}