import AosInit from "@/components/ui/homepage/aos-init";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import PackagingHero from "@/components/ui/packaging-guide/packaging-hero";
import PackagingVolumetricCalculator from "@/components/ui/packaging-guide/packaging-volumetric-calculator";
import PackagingBlueprint from "@/components/ui/packaging-guide/packaging-blueprint";
import PackagingManifest from "@/components/ui/packaging-guide/packaging-manifest";

export const metadata = {
  title: "Packaging Guidelines & Cargo Protocol | ParcelPilot",
  description:
    "Learn dimensional volumetric weight calculation, the 4-step H-taping packing blueprint, and prohibited cargo regulations for safe domestic delivery.",
};

export default function PackagingGuidePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animation Initializer */}
      <AosInit />

      {/* 1. Packaging Manifesto & Hero */}
      <PackagingHero />

      {/* 2. Interactive Volumetric vs Actual Weight Calculator */}
      <PackagingVolumetricCalculator />

      {/* 3. The 4-Step Packaging Blueprint */}
      <PackagingBlueprint />

      {/* 4. Prohibited & Restricted Cargo Manifest */}
      <PackagingManifest />

      {/* 5. Floating Logistics Assistant */}
      <FloatingAssistant />
    </div>
  );
}
