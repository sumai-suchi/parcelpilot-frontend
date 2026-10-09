import type { Metadata } from "next";
import { OperationsAllShipmentsView } from "@/components/dashboard/operations/operations-all-shipments-view";

export const metadata: Metadata = {
  title: "Master Shipments Registry | ParcelPilot",
  description: "Global consignment ledger across all operational stages and delivery corridors.",
};

export default function OperationsAllShipmentsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <OperationsAllShipmentsView />
    </div>
  );
}
