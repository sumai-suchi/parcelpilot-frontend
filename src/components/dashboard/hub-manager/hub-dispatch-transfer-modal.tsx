"use client";

import { useState } from "react";
import { ArrowRightLeft, Building2, X } from "lucide-react";
import { toast } from "sonner";
import { useCreateHubTransfer } from "@/hooks/hub.hook";
import type {
  HubListItem,
  OperationsShipment,
} from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../shared/status-badge";

interface HubDispatchTransferModalProps {
  shipment: OperationsShipment | null;
  isOpen: boolean;
  onClose: () => void;
  hubs: HubListItem[];
}

export function HubDispatchTransferModal({
  shipment,
  isOpen,
  onClose,
  hubs,
}: HubDispatchTransferModalProps) {
  const [toHubId, setToHubId] = useState("");
  const [note, setNote] = useState("");

  const createTransferMutation = useCreateHubTransfer();

  if (!isOpen || !shipment) return null;

  // Destination hubs excluding current origin hub
  const destinationOptions = hubs.filter((h) => h.id !== shipment.originHubId);

  const handleDispatch = async () => {
    const selectedToHub = toHubId || shipment.destinationHubId;

    if (!selectedToHub) {
      toast.error("Please select a target Destination Hub.");
      return;
    }

    try {
      await createTransferMutation.mutateAsync({
        shipmentId: shipment.id,
        payload: {
          toHubId: selectedToHub,
          note: note.trim() || undefined,
        },
      });

      toast.success(
        `Inter-hub linehaul transfer dispatched for ${shipment.trackingNumber}! Status is now IN_TRANSIT.`,
      );
      setToHubId("");
      setNote("");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to initiate transfer.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 text-primary">
            <ArrowRightLeft className="h-4 w-4" />
            <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
              Dispatch Inter-Hub Linehaul
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-none p-1 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Consignment Overview */}
        <div className="rounded-none border border-border/80 bg-muted/30 p-3.5 text-xs font-mono space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Waybill Tracking:
            </span>
            <span className="font-bold text-foreground">
              {shipment.trackingNumber}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Current Location:
            </span>
            <span className="font-semibold text-foreground">
              {shipment.originHub?.name || "Origin Hub"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Final Delivery Area:
            </span>
            <span className="text-muted-foreground truncate max-w-[200px]">
              {shipment.deliveryAddress?.area}, {shipment.deliveryAddress?.city}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Status:
            </span>
            <StatusBadge status={shipment.status} />
          </div>
        </div>

        {/* Target Destination Hub Select */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>Target Destination Hub *</span>
            <span className="text-[10px] text-primary">Required</span>
          </label>
          <div className="relative">
            <select
              value={toHubId || shipment.destinationHubId || ""}
              onChange={(e) => setToHubId(e.target.value)}
              className="w-full rounded-none border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono transition-colors cursor-pointer"
            >
              <option value="">Select Destination Hub</option>
              {destinationOptions.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.code}) — {h.address}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dispatch Note */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Dispatch Container / Trunk Manifest Note
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Linehaul container #TRK-88 evening schedule, seal intact..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-none border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono resize-none transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-1/2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={createTransferMutation.isPending}
            onClick={handleDispatch}
            className="w-1/2 gap-1.5 font-mono text-xs"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            {createTransferMutation.isPending
              ? "Dispatching..."
              : "Confirm Dispatch"}
          </Button>
        </div>
      </div>
    </div>
  );
}
