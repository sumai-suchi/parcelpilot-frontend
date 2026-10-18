import AosInit from "@/components/ui/homepage/aos-init";
import ExceptionManagement from "@/components/ui/homepage/exception-management";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import HeroSection from "@/components/ui/homepage/hero-section";
import InteractiveTracker from "@/components/ui/homepage/interactive-tracker";
import LifecycleScroll from "@/components/ui/homepage/lifecycle-scroll";
import NetworkMap from "@/components/ui/homepage/network-map";
import OperationalAnalytics from "@/components/ui/homepage/operational-analytics";
import ProductCta from "@/components/ui/homepage/product-cta";
import RoleMatrix from "@/components/ui/homepage/role-matrix";
import RouteJourney from "@/components/ui/homepage/route-journey";
import ShipmentLedger from "@/components/ui/homepage/shipment-ledger";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animation Initializer */}
      <AosInit />

      {/* 1. Hero Section: Active Logistics Control UI + Preserved Dimming Background */}
      <HeroSection />

      {/* 2. Continuous Route Journey: How a Parcel Moves */}
      <RouteJourney />

      {/* 3. Interactive Tracking Cockpit: Live Telemetry & Checkpoints */}
      <InteractiveTracker />

      {/* 4. One System, Every Role: Interconnected Operational Matrix */}
      <RoleMatrix />

      {/* 5. Logistics Network: Stylized Topological Corridor */}
      <NetworkMap />

      {/* 6. Exception Management: Operational State Machine Decision Tree */}
      <ExceptionManagement />

      {/* 7. Operational Analytics: Real-time Telemetry Dashboard */}
      <OperationalAnalytics />

      {/* 8. Shipment Ledger: Itemized Waybill & Stripe Settlement */}
      <ShipmentLedger />

      {/* 9. Product Experience: Inside ParcelPilot Lifecycle Simulation */}
      <LifecycleScroll />

      {/* 10. Final Product CTA */}
      <ProductCta />

      {/* 11. Discreet Floating Assistant (Ask ParcelPilot) */}
      <FloatingAssistant />
    </div>
  );
}
