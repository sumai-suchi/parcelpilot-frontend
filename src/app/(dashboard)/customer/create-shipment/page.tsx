import type { Metadata } from "next";
import { CreateShipmentForm } from "@/components/dashboard/customer/create-shipment-form";
import { Badge } from "@/components/ui/badge";
import { PackagePlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Shipment | ParcelPilot",
  description:
    "Book an on-demand parcel pickup & delivery with real-time tracking.",
};

export default function CreateShipmentPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <PackagePlus className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create New Shipment
              </h1>
              <Badge
                variant="outline"
                className="border-primary/40 text-primary text-[11px] font-semibold"
              >
                Instant Dispatch
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Book doorstep pickup, set delivery destinations, and get instant
              automated courier assignment.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Flow */}
      <CreateShipmentForm />
    </div>
  );
}
