import type { Metadata } from "next";
import { CustomerDashboardView } from "@/components/dashboard/customer/customer-dashboard-view";

export const metadata: Metadata = {
  title: "Customer Portal | ParcelPilot",
  description:
    "Manage, create, and track your parcels and deliveries with ParcelPilot.",
};

export default function CustomerDashboardPage() {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      <CustomerDashboardView />
    </div>
  );
}
