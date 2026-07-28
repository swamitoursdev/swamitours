import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import RouteLandingContent from "@/components/seo/RouteLandingContent";
import { routes, routeSlug } from "@/lib/cab-routes";

type Params = Promise<{ route: string }>;

export function generateStaticParams() {
  return routes.map((r) => ({ route: routeSlug(r.from, r.to) }));
}

function findRoute(slug: string) {
  return routes.find((r) => routeSlug(r.from, r.to) === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { route: slug } = await params;
  const route = findRoute(slug);
  if (!route) return {};
  return {
    title: `${route.from} to ${route.to} Cab`,
    description: `Book a reliable, affordable cab from ${route.from} to ${route.to} with Swami Tours.`,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { route: slug } = await params;
  const route = findRoute(slug);
  if (!route) notFound();

  return (
    <>
      <Header />
      <RouteLandingContent from={route.from} to={route.to} />
      <Footer />
      <FloatingContact />
    </>
  );
}