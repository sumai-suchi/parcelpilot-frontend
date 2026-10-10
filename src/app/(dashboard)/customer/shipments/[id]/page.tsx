import type { Metadata } from "next";
import { Suspense } from "react";
import { ShipmentDetailsView } from "@/components/dashboard/customer/details/shipment-details-view";
import { Loader2 } from "lucide-react";

interface ShipmentDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Consignment Waybill Details | ParcelPilot",
  description:
    "Inspect waybill telemetry, make payments, and manage shipment status",
};

export default async function ShipmentDetailsPage({
  params,
}: ShipmentDetailsPageProps) {
  const { id } = await params;

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-20 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Loading waybill & consignment records...
            </span>
          </div>
        }
      >
        <ShipmentDetailsView shipmentId={id} />
      </Suspense>
    </div>
  );
}
