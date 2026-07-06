import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Fleet from "@/components/home/Fleet";
import Destinations from "@/components/home/Destinations";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Fleet />
        <Destinations />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}