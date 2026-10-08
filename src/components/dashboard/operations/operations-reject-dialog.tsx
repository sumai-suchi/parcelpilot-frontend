"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import { useRejectShipment } from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../shared/status-badge";

interface OperationsRejectDialogProps {
  shipment: OperationsShipment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OperationsRejectDialog({
  shipment,
  isOpen,
  onClose,
}: OperationsRejectDialogProps) {
  const [reason, setReason] = useState("");
  const rejectMutation = useRejectShipment();

  if (!isOpen || !shipment) return null;

  const handleConfirmReject = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    try {
      await rejectMutation.mutateAsync({
        shipmentId: shipment.id,
        payload: { reason: reason.trim() },
      });

      toast.success(
        `Shipment ${shipment.trackingNumber} rejected and cancelled.`,
      );
      setReason("");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to reject shipment.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
              Reject Consignment Request
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
              Consignor / Sender:
            </span>
            <span className="text-foreground truncate max-w-[200px]">
              {shipment.customer?.user?.name || "Client"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Current Status:
            </span>
            <StatusBadge status={shipment.status} />
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Rejecting consignment{" "}
          <span className="font-mono font-semibold text-foreground">
            {shipment.trackingNumber}
          </span>{" "}
          will permanently abort delivery routing, notify the customer, and set
          status to CANCELLED.
        </p>

        {/* Reason Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>Reason for Rejection *</span>
            <span className="text-[10px] text-destructive">Mandatory</span>
          </label>
          <textarea
            rows={3}
            required
            placeholder="e.g. Prohibited hazardous cargo, out of serviceable territory, unverified address..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-none border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive font-mono resize-none transition-colors"
          />
        </div>

        {/* Actions */}
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
            variant="destructive"
            size="sm"
            disabled={!reason.trim() || rejectMutation.isPending}
            onClick={handleConfirmReject}
            className="w-1/2"
          >
            {rejectMutation.isPending ? "Rejecting..." : "Confirm Reject"}
          </Button>
        </div>
      </div>
    </div>
  );
}
