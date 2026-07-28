import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TopOffers from "@/components/home/TopOffers";
import Services from "@/components/home/Services";
import Fleet from "@/components/home/Fleet";
import TaxiPackages from "@/components/home/TaxiPackages";
import Destinations from "@/components/home/Destinations";
import HowItWorks from "@/components/home/HowItWorks";
import TopPlaces from "@/components/home/TopPlaces";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import Faq from "@/components/home/Faq";
import StatesGrid from "@/components/seo/StatesGrid";
import RoutesGrid from "@/components/seo/RoutesGrid";
import AvailabilityStrip from "@/components/layout/AvailabilityStrip";
import FloatingContact from "@/components/ui/FloatingContact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TopOffers />
        <Services />
        <Fleet />
        <TaxiPackages />
        <Destinations />
        <HowItWorks />
        <TopPlaces />
        <Testimonials />
        <CTASection />
        <Faq />
        <StatesGrid />
        <RoutesGrid />
      </main>
      <AvailabilityStrip />
      <Footer />
      <FloatingContact />
    </>
  );
}