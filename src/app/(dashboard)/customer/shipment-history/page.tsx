import type { Metadata } from "next";
import { ShipmentHistoryTable } from "@/components/dashboard/customer/history/shipment-history-table";
import { History } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipment History | ParcelPilot",
  description: "View all booked shipments, payment records, and statuses",
};

export default function ShipmentHistoryPage() {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Telemetry Header */}
      <div className="space-y-2 border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
          <History className="h-3.5 w-3.5" />
          <span>CONSIGNMENT ARCHIVE</span>
          <span className="text-muted-foreground">/</span>
          <span>WAYBILL LEDGER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
          Shipment History.
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Complete archive of all consignments, live transit progression,
          payment settlements, and waybill records.
        </p>
      </div>

      <ShipmentHistoryTable />
    </div>
  );
}
