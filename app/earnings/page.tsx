import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earnings",
  description: "Track your driver earnings with Swami Tours.",
  alternates: { canonical: "/earnings" },
};

export default function Page() {
  return <div>Earnings</div>;
}
