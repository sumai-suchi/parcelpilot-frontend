import type { Metadata } from "next";
import { AdminFleetView } from "@/components/dashboard/admin/admin-fleet-view";

export const metadata: Metadata = {
  title: "Driver Fleet & Courier Telemetry | ParcelPilot",
  description:
    "Real-time courier fleet deployment, vehicle availability status, and terminal assignments.",
};

export default function AdminFleetPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <AdminFleetView />
    </div>
  );
}
