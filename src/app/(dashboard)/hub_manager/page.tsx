import type { Metadata } from "next";
import { HubDashboardView } from "@/components/dashboard/hub-manager/hub-dashboard-view";

export const metadata: Metadata = {
  title: "Hub Operations & Linehauls | ParcelPilot",
  description:
    "Manage sorting hub parcel movements, intake, and inter-hub container transfers.",
};

export default function HubManagerDashboardPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <HubDashboardView />
    </div>
  );
}
