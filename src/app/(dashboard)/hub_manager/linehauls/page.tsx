import type { Metadata } from "next";
import { HubLinehaulsView } from "@/components/dashboard/hub-manager/hub-linehauls-view";

export const metadata: Metadata = {
  title: "Inter-Hub Linehauls & Container Intake | ParcelPilot Hub",
  description:
    "Manage incoming inter-terminal linehauls, verify container manifests, and confirm inbound shipment intake.",
};

export default function HubLinehaulsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <HubLinehaulsView />
    </div>
  );
}
