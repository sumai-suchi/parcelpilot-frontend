"use client";

import { Building2, Coins, Package, Users } from "lucide-react";
import type { AdminDashboardOverview } from "@/types/admin.interface";
import { MetricCard, MetricGrid } from "../shared/metric-card";

interface AdminOverviewStatsProps {
  overview: AdminDashboardOverview | undefined;
  isLoading: boolean;
}

export function AdminOverviewStats({
  overview,
  isLoading,
}: AdminOverviewStatsProps) {
  const totalRevenue = overview?.totalRevenue || 0;
  const totalShipments = overview?.totalShipments || 0;
  const activeHubs = overview?.infrastructure?.activeHubs || 0;
  const usersByRole = overview?.usersByRole || {};
  const totalUsers = Object.values(usersByRole).reduce((a, b) => a + b, 0);

  return (
    <MetricGrid>
      <MetricCard
        label="Platform Revenue"
        value={`৳${totalRevenue.toLocaleString()}`}
        desc="Processed via Stripe settlements"
        icon={Coins}
        variant="emerald"
        isLoading={isLoading}
      />
      <MetricCard
        label="Global Shipments"
        value={totalShipments.toLocaleString()}
        desc="Total network consignments"
        icon={Package}
        variant="primary"
        isLoading={isLoading}
      />
      <MetricCard
        label="Registered Users"
        value={totalUsers.toLocaleString()}
        desc={`${usersByRole.CUSTOMER || 0} customers • ${usersByRole.COURIER || 0} couriers`}
        icon={Users}
        variant="purple"
        isLoading={isLoading}
      />
      <MetricCard
        label="Active Sorting Hubs"
        value={activeHubs}
        desc={`${overview?.infrastructure?.activeZones || 0} geographic regional zones`}
        icon={Building2}
        variant="amber"
        isLoading={isLoading}
      />
    </MetricGrid>
  );
}
