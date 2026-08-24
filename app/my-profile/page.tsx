//app\my-profile\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Profile from "@/components/account/Profile";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Swami Tours account and profile details.",
  alternates: { canonical: "/my-profile" },
};

export default function Page() {
  return (
    <PageShell eyebrow="Account" title="My Profile">
      <Profile />
    </PageShell>
  );
}