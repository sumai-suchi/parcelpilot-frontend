"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRejectAssignment } from "@/hooks/courier.hook";
import type { CourierTask } from "@/types/courier.interface";

interface CourierRejectDialogProps {
  task: CourierTask | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourierRejectDialog({
  task,
  isOpen,
  onClose,
}: CourierRejectDialogProps) {
  const [reason, setReason] = useState("");
  const rejectMutation = useRejectAssignment();

  if (!isOpen || !task) return null;

  const handleConfirmReject = async () => {
    try {
      await rejectMutation.mutateAsync({
        assignmentId: task.id,
        reason: reason.trim() || "Courier unavailable for route",
      });

      toast.add({
        title: "Assignment Declined",
        description: `Task for ${task.shipment.trackingNumber} declined and returned to dispatch pool.`,
        type: "info",
      });
      onClose();
    } catch (err: any) {
      toast.add({
        title: "Decline Failed",
        description: err?.message || "Could not decline assignment.",
        type: "error",
      });
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
              Decline Route Task
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

        <p className="text-xs text-muted-foreground">
          Declining consignment{" "}
          <strong className="font-mono text-foreground">
            {task.shipment.trackingNumber}
          </strong>{" "}
          will return it to the Operations Manager dispatch queue for alternative rider assignment.
        </p>

        {/* Reason Input */}
        <div className="space-y-2 font-mono text-xs">
          <Label htmlFor="reject-reason" className="text-[11px] uppercase tracking-wider">
            Decline Reason (Optional)
          </Label>
          <Input
            id="reject-reason"
            placeholder="e.g. Mechanical breakdown, territory outside route"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="rounded-none h-9 bg-background border-border"
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
            variant="destructive"
            disabled={rejectMutation.isPending}
            onClick={handleConfirmReject}
            className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
          >
            {rejectMutation.isPending ? "Declining..." : "Confirm Decline"}
          </Button>
        </div>
      </div>
    </div>
  );
}
