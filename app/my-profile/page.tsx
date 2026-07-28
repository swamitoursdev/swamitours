import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Swami Tours account and profile details.",
  alternates: { canonical: "/my-profile" },
};

export default function Page() {
  return <div>My Profile</div>;
}
