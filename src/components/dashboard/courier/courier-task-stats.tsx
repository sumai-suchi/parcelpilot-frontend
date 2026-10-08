"use client";

import { AlertTriangle, CheckCircle2, Clock, Truck } from "lucide-react";
import type { CourierTask } from "@/types/courier.interface";
import { MetricCard, MetricGrid } from "../shared/metric-card";

interface CourierTaskStatsProps {
  tasks: CourierTask[];
  isLoading?: boolean;
}

export function CourierTaskStats({ tasks, isLoading = false }: CourierTaskStatsProps) {
  const pendingAssignments = tasks.filter((t) => t.status === "PENDING").length;

  const activeDeliveries = tasks.filter(
    (t) =>
      t.status === "ACCEPTED" &&
      t.shipment?.status !== "DELIVERED" &&
      t.shipment?.status !== "CANCELLED" &&
      t.shipment?.status !== "RETURNED",
  ).length;

  const completedDeliveries = tasks.filter(
    (t) => t.status === "COMPLETED" || t.shipment?.status === "DELIVERED",
  ).length;

  const failedDeliveries = tasks.filter(
    (t) =>
      t.shipment?.status === "DELIVERY_FAILED" ||
      t.status === "REJECTED",
  ).length;

  return (
    <MetricGrid>
      <MetricCard
        label="Pending Offers"
        value={pendingAssignments}
        desc="Awaiting rider acceptance"
        icon={Clock}
        variant="amber"
        highlight={pendingAssignments > 0}
        isLoading={isLoading}
      />
      <MetricCard
        label="Active Deliveries"
        value={activeDeliveries}
        desc="On the road or in hand"
        icon={Truck}
        variant="primary"
        isLoading={isLoading}
      />
      <MetricCard
        label="Completed Drops"
        value={completedDeliveries}
        desc="Successfully fulfilled"
        icon={CheckCircle2}
        variant="emerald"
        isLoading={isLoading}
      />
      <MetricCard
        label="Failed / Rescheduled"
        value={failedDeliveries}
        desc="Requires reattempt dispatch"
        icon={AlertTriangle}
        variant="destructive"
        isLoading={isLoading}
      />
    </MetricGrid>
  );
}
