"use client";

import { Coins } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header";
import { AdminRevenueMetrics } from "./admin-revenue-metrics";

export function AdminRevenueView() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        category="FINANCIAL SETTLEMENT / LEDGER AUDIT"
        title="Revenue & Payments."
        description="Live multi-channel cashflow analytics, Stripe checkout reconciliation, escrow pipeline telemetry, and itemized billing waybills."
        badgeIcon={Coins}
      />
      <AdminRevenueMetrics />
    </div>
  );
}
