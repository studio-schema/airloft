import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedEvents } from "@/components/home/featured-events";
import { EventTypesGrid } from "@/components/home/event-types-grid";
import { VenueShowcase } from "@/components/home/venue-showcase";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedEvents />
        <EventTypesGrid />
        <VenueShowcase />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
