import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCTA } from "@/components/home/FinalCTA";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
