import AosInit from "@/components/ui/homepage/aos-init";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import CoverageHero from "@/components/ui/coverage/coverage-hero";
import CoverageHubExplorer from "@/components/ui/coverage/coverage-hub-explorer";
import CoverageLinehaulMatrix from "@/components/ui/coverage/coverage-linehaul-matrix";
import CoveragePostalChecker from "@/components/ui/coverage/coverage-postal-checker";

export const metadata = {
  title: "Coverage Area & Hub Network | ParcelPilot Logistics Engine",
  description:
    "Explore ParcelPilot's nationwide sorting facilities, 64-district delivery coverage, linehaul transit durations, and instant postal zone availability.",
};

export default function CoveragePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animation Initializer */}
      <AosInit />

      {/* 1. Nationwide Coverage Hero & Cluster Metrics */}
      <CoverageHero />

      {/* 2. Interactive Sorting Hub Directory & Telemetry Inspector */}
      <CoverageHubExplorer />

      {/* 3. Inter-District Linehaul Transit SLA Matrix */}
      <CoverageLinehaulMatrix />

      {/* 4. Instant Postal Code / Upazila Coverage Validator */}
      <CoveragePostalChecker />

      {/* 5. Floating Logistics Assistant */}
      <FloatingAssistant />
    </div>
  );
}
