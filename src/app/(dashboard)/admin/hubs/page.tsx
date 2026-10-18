import type { Metadata } from "next";
import { AdminHubManagementView } from "@/components/dashboard/admin/hubs/admin-hub-management-view";

export const metadata: Metadata = {
  title: "Logistics Hub Management | ParcelPilot",
  description:
    "Administer physical distribution centers, regional sorting nodes, and linehaul terminals.",
};

export default function AdminHubsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <AdminHubManagementView />
    </div>
  );
}
