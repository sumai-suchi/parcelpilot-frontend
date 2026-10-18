"use client";

import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { useReceiveHubTransfer } from "@/hooks/hub.hook";
import type { HubTransferItem } from "@/types/hub.interface";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../shared/status-badge";

interface HubReceiveTransferModalProps {
  transfer: HubTransferItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HubReceiveTransferModal({
  transfer,
  isOpen,
  onClose,
}: HubReceiveTransferModalProps) {
  const [note, setNote] = useState("");
  const receiveMutation = useReceiveHubTransfer();

  if (!isOpen || !transfer) return null;

  const handleConfirmReceive = async () => {
    try {
      await receiveMutation.mutateAsync({
        transferId: transfer.id,
        payload: { note: note.trim() || undefined },
      });

      toast.success(
        `Consignment ${transfer.shipment?.trackingNumber || ""} received and checked into ${transfer.toHub.name}! Status: AT_DESTINATION_HUB.`,
      );
      setNote("");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to receive transfer.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
            <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
              Receive Incoming Linehaul
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

        {/* Transfer Overview */}
        <div className="rounded-none border border-border/80 bg-muted/30 p-3.5 text-xs font-mono space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Waybill Tracking:
            </span>
            <span className="font-bold text-foreground">
              {transfer.shipment?.trackingNumber || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Origin Dispatch:
            </span>
            <span className="font-semibold text-foreground">
              {transfer.fromHub?.name} ({transfer.fromHub?.code})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Receiving Terminal:
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {transfer.toHub?.name} ({transfer.toHub?.code})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Status:
            </span>
            <StatusBadge status={transfer.status} />
          </div>
        </div>

        {/* Inspection & Intake Note */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Inspection & Bay Intake Note
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Scanned into sorting bay A3. Package condition inspected and intact..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-none border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono resize-none transition-colors"
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
            disabled={receiveMutation.isPending}
            onClick={handleConfirmReceive}
            className="w-1/2 gap-1.5 font-mono text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {receiveMutation.isPending ? "Checking in..." : "Confirm Intake"}
          </Button>
        </div>
      </div>
    </div>
  );
}
