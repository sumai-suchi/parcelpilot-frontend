import type { Metadata } from "next";
import { HubSortingView } from "@/components/dashboard/hub-manager/hub-sorting-view";

export const metadata: Metadata = {
  title: "Sorting Operations & Conveyor Queues | ParcelPilot Hub",
  description:
    "Classify, sort, and route terminal parcels by weight, destination, priority, and physical conveyor lanes.",
};

export default function HubSortingPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <HubSortingView />
    </div>
  );
}
