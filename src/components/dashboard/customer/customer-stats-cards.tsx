"use client";

import { Box, CheckCircle2, Clock, Receipt } from "lucide-react";
import { MetricCard, MetricGrid } from "../shared/metric-card";

interface CustomerStatsCardsProps {
  totalShipments: number;
  activeShipments: number;
  completedShipments: number;
  totalSpent: number;
  isLoading?: boolean;
}

export function CustomerStatsCards({
  totalShipments,
  activeShipments,
  completedShipments,
  totalSpent,
  isLoading = false,
}: CustomerStatsCardsProps) {
  return (
    <MetricGrid>
      <MetricCard
        label="Total Bookings"
        value={totalShipments}
        desc="All lifetime consignments"
        icon={Box}
        variant="default"
        isLoading={isLoading}
      />
      <MetricCard
        label="In Transit & Active"
        value={activeShipments}
        desc="Moving through network"
        icon={Clock}
        variant="amber"
        highlight={activeShipments > 0}
        isLoading={isLoading}
      />
      <MetricCard
        label="Delivered"
        value={completedShipments}
        desc="Successfully received"
        icon={CheckCircle2}
        variant="emerald"
        isLoading={isLoading}
      />
      <MetricCard
        label="Total Spent"
        value={`৳${totalSpent.toLocaleString()}`}
        desc="Paid delivery charges"
        icon={Receipt}
        variant="primary"
        isLoading={isLoading}
      />
    </MetricGrid>
  );
}
