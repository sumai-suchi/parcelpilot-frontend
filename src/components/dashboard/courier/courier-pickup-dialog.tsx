"use client";

import { useState } from "react";
import { Check, MapPin, Package, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePickupShipment } from "@/hooks/courier.hook";
import type { CourierTask } from "@/types/courier.interface";

interface CourierPickupDialogProps {
  task: CourierTask | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourierPickupDialog({
  task,
  isOpen,
  onClose,
}: CourierPickupDialogProps) {
  const [note, setNote] = useState("");
  const pickupMutation = usePickupShipment();

  if (!isOpen || !task) return null;

  const handleConfirmPickup = async () => {
    try {
      await pickupMutation.mutateAsync({
        shipmentId: task.shipment.id,
        note: note.trim() || undefined,
      });

      toast.add({
        title: "Pickup Confirmed",
        description: `Parcel ${task.shipment.trackingNumber} successfully picked up from customer.`,
        type: "success",
      });
      onClose();
    } catch (err: any) {
      toast.add({
        title: "Pickup Failed",
        description: err?.message || "Failed to record pickup.",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 text-primary">
            <Package className="h-4 w-4" />
            <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
              Confirm Doorstep Pickup
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Consignment Info */}
        <div className="rounded-none border border-border/60 bg-muted/30 p-3 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">
              Tracking #
            </span>
            <span className="font-mono font-bold text-foreground">
              {task.shipment.trackingNumber}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">
              Parcel Type / Weight
            </span>
            <span className="font-mono text-foreground">
              {task.shipment.parcelType} ({Number(task.shipment.weight).toFixed(1)} kg)
            </span>
          </div>
          <div className="pt-1 border-t border-border/40 text-[11px] text-muted-foreground flex items-start gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              {task.shipment.pickupAddress?.addressLine}, {task.shipment.pickupAddress?.area}, {task.shipment.pickupAddress?.city}
            </span>
          </div>
        </div>

        {/* Note Field */}
        <div className="space-y-2">
          <Label htmlFor="pickup-note" className="text-xs uppercase font-mono tracking-wider">
            Operational Note (Optional)
          </Label>
          <Input
            id="pickup-note"
            placeholder="e.g. Package inspected, barcode scan complete"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-none font-mono text-xs h-9 bg-background border-border"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-none font-mono text-xs uppercase tracking-wider"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={pickupMutation.isPending}
            onClick={handleConfirmPickup}
            className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            {pickupMutation.isPending ? "Confirming..." : "Confirm Pickup"}
          </Button>
        </div>
      </div>
    </div>
  );
}
