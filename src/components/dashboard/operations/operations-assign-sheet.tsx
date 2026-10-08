"use client";

import { useState } from "react";
import { AlertCircle, Check, Loader2, Truck, User, X } from "lucide-react";
import { toast } from "sonner";
import { useAssignHubAndCourier } from "@/hooks/operations.hook";
import type {
  CourierListItem,
  HubListItem,
  OperationsShipment,
} from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../shared/status-badge";
import { cn } from "@/lib/utils";

interface OperationsAssignSheetProps {
  shipment: OperationsShipment | null;
  isOpen: boolean;
  onClose: () => void;
  hubs: HubListItem[];
  couriers: CourierListItem[];
}

export function OperationsAssignSheet({
  shipment,
  isOpen,
  onClose,
  hubs,
  couriers,
}: OperationsAssignSheetProps) {
  const [originHubId, setOriginHubId] = useState("");
  const [destinationHubId, setDestinationHubId] = useState("");
  const [courierId, setCourierId] = useState("");
  const [note, setNote] = useState("");

  const assignMutation = useAssignHubAndCourier();

  if (!isOpen || !shipment) return null;

  const availableCouriers = couriers.filter(
    (c) => c.availabilityStatus === "AVAILABLE",
  );

  const handleAssign = async () => {
    if (!originHubId) {
      toast.error("Please select an Origin Induction Hub.");
      return;
    }
    if (!courierId) {
      toast.error("Please select an available Courier Rider.");
      return;
    }

    try {
      await assignMutation.mutateAsync({
        shipmentId: shipment.id,
        payload: {
          originHubId,
          destinationHubId: destinationHubId || originHubId,
          courierId,
          note: note || undefined,
        },
      });

      toast.success(
        `Shipment ${shipment.trackingNumber} approved and dispatched!`,
      );
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to assign shipment.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="flex h-full w-full sm:max-w-md lg:max-w-lg flex-col bg-card text-card-foreground p-5 sm:p-6 shadow-2xl border-l border-border overflow-y-auto rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest font-semibold mb-1">
              <Truck className="h-3 w-3" />
              <span>ROUTING & INDUCTION CONTROL</span>
            </div>
            <h3 className="text-base font-heading font-black tracking-tight text-foreground uppercase">
              Courier & Terminal Routing
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              WAYBILL:{" "}
              <span className="font-bold text-foreground">
                {shipment.trackingNumber}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-none p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shipment Details Preview Box */}
        <div className="my-4 rounded-none border border-border/80 bg-muted/30 p-3.5 text-xs font-mono space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[10px] uppercase">
              Customer:
            </span>
            <span className="font-semibold text-foreground">
              {shipment.customer?.user?.name || "Customer"}{" "}
              <span className="text-muted-foreground font-normal">
                ({shipment.customer?.user?.phone || "No phone"})
              </span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[10px] uppercase">
              Pickup Origin:
            </span>
            <span className="text-foreground text-right truncate max-w-[220px]">
              {shipment.pickupAddress?.area}, {shipment.pickupAddress?.city}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[10px] uppercase">
              Destination:
            </span>
            <span className="text-foreground text-right truncate max-w-[220px]">
              {shipment.deliveryAddress?.area}, {shipment.deliveryAddress?.city}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-border/40">
            <span className="text-muted-foreground text-[10px] uppercase">
              Commodity / Mass:
            </span>
            <span className="text-foreground font-bold">
              {shipment.parcelType} • {Number(shipment.weight).toFixed(1)} kg •{" "}
              {shipment.deliveryType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[10px] uppercase">
              Payment Settlement:
            </span>
            <StatusBadge status={shipment.paymentStatus} type="payment" />
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-bold">
              Origin Induction Hub *
            </label>
            <select
              value={originHubId}
              onChange={(e) => setOriginHubId(e.target.value)}
              className="w-full rounded-none border border-input bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Select Origin Hub</option>
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.code}) - {hub.address}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-bold">
              Destination Distribution Hub (Optional for Local)
            </label>
            <select
              value={destinationHubId}
              onChange={(e) => setDestinationHubId(e.target.value)}
              className="w-full rounded-none border border-input bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Same as Origin Hub (Local Direct)</option>
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.code}) - {hub.address}
                </option>
              ))}
            </select>
          </div>

          {/* Courier Selection */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-bold">
                Assign Pickup Courier Rider *
              </label>
              <span className="text-[11px] font-mono text-primary font-semibold">
                {availableCouriers.length} riders available
              </span>
            </div>

            {availableCouriers.length === 0 && (
              <div className="rounded-none border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-mono text-amber-600 dark:text-amber-400 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  No courier riders currently in AVAILABLE status. All riders
                  are either on active runs or offline.
                </span>
              </div>
            )}

            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
              {couriers.map((c) => {
                const isAvail = c.availabilityStatus === "AVAILABLE";
                const isSelected = courierId === c.id;

                return (
                  <div
                    key={c.id}
                    onClick={() => isAvail && setCourierId(c.id)}
                    className={cn(
                      "flex items-center justify-between rounded-none border p-3 text-xs transition-all",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-xs"
                        : isAvail
                          ? "border-border hover:border-primary/40 cursor-pointer bg-card"
                          : "border-border/60 bg-muted/30 text-muted-foreground opacity-60 cursor-not-allowed",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-none border shrink-0",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : isAvail
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-muted text-muted-foreground border-border",
                        )}
                      >
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-foreground font-mono block">
                          {c.user?.name || "Courier"}
                        </span>
                        <p className="text-[11px] text-muted-foreground font-mono">
                          {c.vehicleType} • {c.vehicleNumber} (
                          {c.hub?.code || "Hub"})
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={c.availabilityStatus} type="courier" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-bold">
              Dispatch Operational Instructions / Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Inducted for early morning pickup run. Contact sender prior to dispatch."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-none border border-input bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-6 flex gap-2 border-t border-border/60">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-1/3 rounded-none font-mono uppercase text-xs h-10 border-border cursor-pointer hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!originHubId || !courierId || assignMutation.isPending}
            onClick={handleAssign}
            className="w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer"
          >
            {assignMutation.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                <span>Inducting Route...</span>
              </>
            ) : (
              <span>Confirm & Dispatch</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
