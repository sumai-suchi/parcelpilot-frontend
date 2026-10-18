import type { Metadata } from "next";
import { AdminRevenueView } from "@/components/dashboard/admin/admin-revenue-view";

export const metadata: Metadata = {
  title: "Revenue & Payments Telemetry | ParcelPilot",
  description:
    "Comprehensive financial analytics, Stripe payment stream, escrow monitoring, and settlement ledger.",
};

export default function AdminRevenuePage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <AdminRevenueView />
    </div>
  );
}
