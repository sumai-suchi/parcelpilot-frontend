import AosInit from "@/components/ui/homepage/aos-init";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import AboutHero from "@/components/ui/about/about-hero";
import AboutGenesis from "@/components/ui/about/about-genesis";
import AboutPillars from "@/components/ui/about/about-pillars";
import AboutNetworkTelemetry from "@/components/ui/about/about-network-telemetry";
import AboutTechStack from "@/components/ui/about/about-tech-stack";
import AboutValues from "@/components/ui/about/about-values";
import AboutRoles from "@/components/ui/about/about-roles";
import AboutCta from "@/components/ui/about/about-cta";

export const metadata = {
  title: "About Us | ParcelPilot Logistics Engine",
  description:
    "Learn about ParcelPilot's nationwide logistics operating system, our mission to eliminate delivery black boxes, our multi-tier hub infrastructure, and our deterministic supply chain network.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animations Initializer */}
      <AosInit />

      {/* 1. Hero Section: Strategic Objective & Live Telemetry Cockpit */}
      <AboutHero />

      {/* 2. The Genesis: The Logistics Black Box Dilemma vs. ParcelPilot Standard */}
      <AboutGenesis />

      {/* 3. Operational Pillars: Interactive Tabs for Hubs, Couriers, Operations, Finance */}
      <AboutPillars />

      {/* 4. Network Telemetry: Nationwide Key Metrics & Division Hub Matrix */}
      <AboutNetworkTelemetry />

      {/* 5. Engineering Rigor: Architectural Foundation & Reliability Stack */}
      <AboutTechStack />

      {/* 6. Operating Creed: The 4 Core Principles of ParcelPilot */}
      <AboutValues />

      {/* 7. Ecosystem Roles: Dedicated Consoles for Customers, Couriers, Hubs, and Ops */}
      <AboutRoles />

      {/* 8. Call to Action: Merchant Induction & Fleet Onboarding */}
      <AboutCta />

      {/* 9. Discreet Floating Logistics Assistant */}
      <FloatingAssistant />
    </div>
  );
}
