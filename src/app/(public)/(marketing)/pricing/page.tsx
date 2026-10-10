import AosInit from "@/components/ui/homepage/aos-init";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import PricingHero from "@/components/ui/pricing/pricing-hero";
import PricingSimulator from "@/components/ui/pricing/pricing-simulator";
import PricingSpecMatrix from "@/components/ui/pricing/pricing-spec-matrix";
import PricingSettlementFlow from "@/components/ui/pricing/pricing-settlement-flow";
import PricingCta from "@/components/ui/pricing/pricing-cta";

export const metadata = {
  title: "Pricing & Tariffs | ParcelPilot Logistics Engine",
  description:
    "Real-time shipping rate calculator, inter-district linehaul tariffs, COD remittance schedules, and enterprise volume freight agreements.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animation Initializer */}
      <AosInit />

      {/* 1. Hero Section with Live Rate Benchmarks */}
      <PricingHero />

      {/* 2. Interactive Route & Weight Rate Simulator */}
      <PricingSimulator />

      {/* 3. Comprehensive Service Level Spec Matrix */}
      <PricingSpecMatrix />

      {/* 4. Automated COD Escrow & Settlement Flow */}
      <PricingSettlementFlow />

      {/* 5. Enterprise & Merchant Bulk Agreement Call to Action */}
      <PricingCta />

      {/* 6. Floating Logistics Assistant */}
      <FloatingAssistant />
    </div>
  );
}
