import type { Metadata } from "next";
import { CourierDashboardView } from "@/components/dashboard/courier/courier-dashboard-view";

export const metadata: Metadata = {
  title: "Courier Field Portal | ParcelPilot",
  description:
    "Field courier task management, pickups, and delivery confirmation.",
};

export default function CourierDashboardPage() {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      <CourierDashboardView />
    </div>
  );
}
