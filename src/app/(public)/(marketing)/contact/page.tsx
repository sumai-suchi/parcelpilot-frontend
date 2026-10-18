import AosInit from "@/components/ui/homepage/aos-init";
import FloatingAssistant from "@/components/ui/homepage/floating-assistant";
import ContactHero from "@/components/ui/contact/contact-hero";
import ContactDispatchConsole from "@/components/ui/contact/contact-dispatch-console";
import ContactHubDirectory from "@/components/ui/contact/contact-hub-directory";

export const metadata = {
  title: "Contact Central Dispatch & HQ | ParcelPilot Logistics Engine",
  description:
    "Direct communications terminal to ParcelPilot operations control, emergency linehaul dispatch hotline, merchant agreement inquiries, and sorting hub directories.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* AOS Scroll Animation Initializer */}
      <AosInit />

      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Interactive Dispatch Transmission Form & HQ Directory */}
      <ContactDispatchConsole />

      {/* 3. Major Sorting Hub Reception Directory */}
      <ContactHubDirectory />

      {/* 4. Floating Logistics Assistant */}
      <FloatingAssistant />
    </div>
  );
}
