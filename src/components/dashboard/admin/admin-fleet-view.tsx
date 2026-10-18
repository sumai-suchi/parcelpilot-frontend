"use client";

import { Bike } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header";
import { AdminCouriersView } from "./admin-couriers-view";

export function AdminFleetView() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        category="FLEET LOGISTICS / LAST-MILE EXECUTION"
        title="Delivery Fleet Governance."
        description="Monitor real-time courier availability, vehicle allocations, active doorstep deliveries, and rider deployments across all 64 district corridors."
        badgeIcon={Bike}
      />
      <AdminCouriersView />
    </div>
  );
}
