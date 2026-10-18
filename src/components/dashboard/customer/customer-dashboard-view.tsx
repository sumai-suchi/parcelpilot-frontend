"use client";

import { Package } from "lucide-react";
import { useMyShipments } from "@/hooks/shipment.hook";
import { DashboardHeader } from "../shared/dashboard-header";
import { CustomerQuickActions } from "./customer-quick-actions";
import { CustomerRecentShipments } from "./customer-recent-shipments";
import { CustomerStatsCards } from "./customer-stats-cards";

export function CustomerDashboardView() {
  const { data: shipmentsRes, isLoading } = useMyShipments({ limit: 20 });
  const shipments = shipmentsRes?.data || [];

  const totalShipments = shipments.length;
  const activeShipments = shipments.filter(
    (s) =>
      s.status !== "DELIVERED" &&
      s.status !== "CANCELLED" &&
      s.status !== "RETURNED",
  ).length;
  const completedShipments = shipments.filter(
    (s) => s.status === "DELIVERED",
  ).length;
  const totalSpent = shipments.reduce(
    (acc, curr) => acc + (Number(curr.deliveryCharge) || 0),
    0,
  );

  return (
    <div className="space-y-8">
      {/* Telemetry Header */}
      <DashboardHeader
        category="CUSTOMER LOGISTICS COCKPIT / LIVE OVERVIEW"
        title="Welcome back."
        description="Manage your active door-to-door consignments, inspect real-time chain of custody, and schedule priority dispatches across the ParcelPilot network."
        badgeIcon={Package}
      />

      <CustomerStatsCards
        totalShipments={totalShipments}
        activeShipments={activeShipments}
        completedShipments={completedShipments}
        totalSpent={totalSpent}
        isLoading={isLoading}
      />

      <CustomerQuickActions />

      <CustomerRecentShipments shipments={shipments} isLoading={isLoading} />
    </div>
  );
}
