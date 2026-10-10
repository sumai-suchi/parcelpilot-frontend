import AosInit from "@/components/ui/homepage/aos-init";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import HelpView from "@/components/ui/help/help-view";

export const metadata = {
  title: "Help Center & Dispatch FAQs | ParcelPilot Logistics Engine",
  description:
    "Find answers to tracking milestones, COD bank settlement timelines, OTP security codes, address updates, and transit insurance claims.",
};

export default function HelpPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animation Initializer */}
      <AosInit />

      {/* Main Interactive Help & Knowledge Base View */}
      <HelpView />

      {/* Floating Logistics Assistant */}
      <FloatingAssistant />
    </div>
  );
}
