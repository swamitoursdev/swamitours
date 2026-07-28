import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read travel tips, guides and news from Swami Tours.",
  alternates: { canonical: "/blogs" },
};

export default function Page() {
  return <div>Blogs</div>;
}
