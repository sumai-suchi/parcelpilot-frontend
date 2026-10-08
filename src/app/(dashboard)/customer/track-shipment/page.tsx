import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomerTrackingView } from "@/components/dashboard/customer/tracking/customer-tracking-view";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Track Shipment | ParcelPilot",
  description: "Live consignment tracking and checkpoint timeline",
};

export default function TrackShipmentPage() {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      <Suspense
        fallback={
          <div className="p-16 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span>Initializing Waybill Telematics...</span>
          </div>
        }
      >
        <CustomerTrackingView />
      </Suspense>
    </div>
  );
}
