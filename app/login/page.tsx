import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Swami Tours account.",
  alternates: { canonical: "/login" },
};

export default function Page() {
  return <div>Login</div>;
}
