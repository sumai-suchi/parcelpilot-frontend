import type { Metadata } from "next";
import { DeliveryHistoryTable } from "@/components/dashboard/customer/history/delivery-history-table";
import { PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery History | ParcelPilot",
  description: "View delivered shipments and delivery receipts",
};

export default function DeliveryHistoryPage() {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Telemetry Header */}
      <div className="space-y-2 border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
          <PackageCheck className="h-3.5 w-3.5" />
          <span>FULFILLMENT ARCHIVE</span>
          <span className="text-muted-foreground">/</span>
          <span>DELIVERY RECEIPTS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
          Delivery Archive.
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Historical record of successfully executed door-to-door deliveries,
          completed consignments, and proof of fulfillment.
        </p>
      </div>

      <DeliveryHistoryTable />
    </div>
  );
}
