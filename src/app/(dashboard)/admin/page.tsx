import type { Metadata } from "next";
import { AdminDashboardView } from "@/components/dashboard/admin/admin-dashboard-view";

export const metadata: Metadata = {
  title: "Admin System Governance | ParcelPilot",
  description:
    "Global oversight of users, couriers, hubs, shipments, and Stripe revenue.",
};

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <AdminDashboardView />
    </div>
  );
}
