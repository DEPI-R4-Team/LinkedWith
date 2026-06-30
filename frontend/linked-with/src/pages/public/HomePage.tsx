import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustStrip } from "@/components/home/TrustStrip";

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
