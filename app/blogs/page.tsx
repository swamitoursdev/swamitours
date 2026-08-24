//app\blogs\page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read travel tips, guides and news from Swami Tours.",
  alternates: { canonical: "/blogs" },
};

const posts = [
  {
    title: "5 Must-Visit Pilgrimage Spots Near Mumbai",
    excerpt: "A quick guide to temple towns you can cover in a weekend trip.",
    date: "Jun 2026",
  },
  {
    title: "Local vs Outstation: Choosing the Right Cab",
    excerpt: "How trip type affects pricing, vehicle choice and travel time.",
    date: "May 2026",
  },
  {
    title: "Airport Transfers: Tips for a Stress-Free Ride",
    excerpt: "Simple steps to make sure you never miss a flight again.",
    date: "Apr 2026",
  },
];

export default function Page() {
  return (
    <PageShell
      eyebrow="Stories & guides"
      title="From the Swami Tours blog"
      description="Travel tips, route guides and updates from our team."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-xl border border-ink/10 bg-white p-5"
          >
            <p className="font-mono text-xs text-saffron-dark">{post.date}</p>
            <h2 className="mt-2 font-display text-lg font-semibold text-ink">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-ink/70">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
