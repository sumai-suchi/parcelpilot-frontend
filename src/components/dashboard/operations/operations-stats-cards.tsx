"use client";

import { CheckCircle2, Clock, PackageCheck, Truck } from "lucide-react";
import type { OperationsShipment } from "@/types/operations.interface";
import { MetricCard, MetricGrid } from "../shared/metric-card";

interface OperationsStatsCardsProps {
  shipments: OperationsShipment[];
}

export function OperationsStatsCards({ shipments }: OperationsStatsCardsProps) {
  const pendingCount = shipments.filter(
    (s) => s.status === "PENDING_APPROVAL" || s.status === "CREATED",
  ).length;

  const assignedCount = shipments.filter(
    (s) => s.status === "COURIER_ASSIGNED" || s.status === "PICKUP_ASSIGNED",
  ).length;

  const inTransitCount = shipments.filter(
    (s) =>
      s.status === "PICKED_UP" ||
      s.status === "AT_ORIGIN_HUB" ||
      s.status === "IN_TRANSIT" ||
      s.status === "AT_DESTINATION_HUB" ||
      s.status === "OUT_FOR_DELIVERY",
  ).length;

  const deliveredCount = shipments.filter(
    (s) => s.status === "DELIVERED",
  ).length;

  return (
    <MetricGrid>
      <MetricCard
        label="Pending Approvals"
        value={pendingCount}
        desc="Awaiting dispatch review"
        icon={Clock}
        variant="amber"
        highlight={pendingCount > 0}
      />
      <MetricCard
        label="Assigned for Pickup"
        value={assignedCount}
        desc="Courier rider notified"
        icon={PackageCheck}
        variant="primary"
      />
      <MetricCard
        label="Active In Network"
        value={inTransitCount}
        desc="Hubs & linehaul transit"
        icon={Truck}
        variant="purple"
      />
      <MetricCard
        label="Fulfilled Consignments"
        value={deliveredCount}
        desc="Successfully delivered"
        icon={CheckCircle2}
        variant="emerald"
      />
    </MetricGrid>
  );
}
