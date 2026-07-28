import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Points",
  description: "Check and redeem your Swami Tours travel reward points.",
  alternates: { canonical: "/travel-points" },
};

export default function Page() {
  return <div>Travel Points</div>;
}
