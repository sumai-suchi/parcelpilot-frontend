import type { Metadata } from "next";
import { HubInventoryView } from "@/components/dashboard/hub-manager/hub-inventory-view";

export const metadata: Metadata = {
  title: "Bay Inventory & Storage Allocation | ParcelPilot Hub",
  description:
    "Monitor physical terminal bay capacity, rack inventory, and parcel staging before transfer or local delivery dispatch.",
};

export default function HubInventoryPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <HubInventoryView />
    </div>
  );
}
