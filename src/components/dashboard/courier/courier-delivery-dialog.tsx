"use client";

import { useState } from "react";
import { AlertCircle, Check, Clock, PackageCheck, RotateCcw, ShieldCheck, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCompleteDelivery,
  useRecordDeliveryFailed,
  useRescheduleDelivery,
} from "@/hooks/courier.hook";
import type { CourierTask } from "@/types/courier.interface";
import { cn } from "@/lib/utils";

interface CourierDeliveryDialogProps {
  task: CourierTask | null;
  isOpen: boolean;
  onClose: () => void;
}

const FAILURE_REASONS = [
  "Customer unavailable / No response",
  "Incorrect or incomplete address",
  "Recipient refused acceptance",
  "Unable to reach location / Security restriction",
  "Cash on Delivery unpaid",
  "Other operational impediment",
];

export function CourierDeliveryDialog({
  task,
  isOpen,
  onClose,
}: CourierDeliveryDialogProps) {
  const [outcome, setOutcome] = useState<"SUCCESS" | "FAILED" | "RESCHEDULE">("SUCCESS");

  // Success fields
  const [recipientName, setRecipientName] = useState(
    task?.shipment?.customer?.user?.name || "",
  );
  const [recipientPhone, setRecipientPhone] = useState(
    task?.shipment?.customer?.user?.phone || "+880 ",
  );
  const [otp, setOtp] = useState("");
  const [notes, setNotes] = useState("");

  // Failure fields
  const [failureReason, setFailureReason] = useState(FAILURE_REASONS[0]);
  const [failureNotes, setFailureNotes] = useState("");

  // Reschedule fields
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("Customer requested later delivery");

  const completeMutation = useCompleteDelivery();
  const failedMutation = useRecordDeliveryFailed();
  const rescheduleMutation = useRescheduleDelivery();

  if (!isOpen || !task) return null;

  const handleSubmit = async () => {
    try {
      if (outcome === "SUCCESS") {
        if (!recipientName.trim()) {
          toast.add({
            title: "Validation Error",
            description: "Please enter the receiving party's name.",
            type: "error",
          });
          return;
        }

        if (!otp.trim()) {
          toast.add({
            title: "Validation Error",
            description: "Please enter the 6-digit receiver security OTP.",
            type: "error",
          });
          return;
        }

        await completeMutation.mutateAsync({
          shipmentId: task.shipment.id,
          payload: {
            recipientName: recipientName.trim(),
            recipientPhone: recipientPhone.trim() || "N/A",
            otp: otp.trim(),
            notes: notes.trim() || undefined,
          },
        });

        toast.add({
          title: "Receiver OTP Verified",
          description: `Consignment ${task.shipment.trackingNumber} handover verified! Courier assignment marked COMPLETED. Pending Operations Manager final delivery sign-off.`,
          type: "success",
        });
      } else if (outcome === "FAILED") {
        await failedMutation.mutateAsync({
          shipmentId: task.shipment.id,
          payload: {
            failureReason,
            notes: failureNotes.trim() || undefined,
          },
        });

        toast.add({
          title: "Delivery Failed Logged",
          description: `Attempt marked as failed (${failureReason}).`,
          type: "info",
        });
      } else if (outcome === "RESCHEDULE") {
        if (!rescheduleDate) {
          toast.add({
            title: "Validation Error",
            description: "Please select a scheduled delivery date.",
            type: "error",
          });
          return;
        }

        await rescheduleMutation.mutateAsync({
          shipmentId: task.shipment.id,
          payload: {
            scheduledAt: new Date(rescheduleDate).toISOString(),
            reason: rescheduleReason,
          },
        });

        toast.add({
          title: "Delivery Rescheduled",
          description: `Consignment ${task.shipment.trackingNumber} rescheduled.`,
          type: "info",
        });
      }

      onClose();
    } catch (err: any) {
      toast.add({
        title: "Action Failed",
        description: err?.message || "Could not record delivery outcome.",
        type: "error",
      });
    }
  };

  const isSubmitting =
    completeMutation.isPending ||
    failedMutation.isPending ||
    rescheduleMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4 text-primary" />
            <div>
              <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
                Record Delivery Outcome
              </h3>
              <p className="font-mono text-[10px] text-muted-foreground">
                Consignment: <strong className="text-foreground">{task.shipment.trackingNumber}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Outcome Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5">
          <Button
            type="button"
            size="sm"
            variant={outcome === "SUCCESS" ? "default" : "outline"}
            onClick={() => setOutcome("SUCCESS")}
            className={cn(
              "rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer",
              outcome === "SUCCESS" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Check className="h-3.5 w-3.5" />
            <span>Delivered</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={outcome === "FAILED" ? "default" : "outline"}
            onClick={() => setOutcome("FAILED")}
            className={cn(
              "rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer",
              outcome === "FAILED" && "bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90",
            )}
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Failed</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={outcome === "RESCHEDULE" ? "default" : "outline"}
            onClick={() => setOutcome("RESCHEDULE")}
            className={cn(
              "rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer",
              outcome === "RESCHEDULE" && "bg-amber-600 hover:bg-amber-700 text-white font-bold",
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reschedule</span>
          </Button>
        </div>

        {/* Form Body */}
        {outcome === "SUCCESS" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="recipientName" className="text-[11px] uppercase tracking-wider">
                Recipient Signee Name *
              </Label>
              <Input
                id="recipientName"
                placeholder="Full name of person receiving package"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="rounded-none h-9 bg-background border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="recipientPhone" className="text-[11px] uppercase tracking-wider">
                Recipient Contact Phone
              </Label>
              <Input
                id="recipientPhone"
                placeholder="+880 1XXXXXXXXX"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="rounded-none h-9 bg-background border-border"
              />
            </div>

            {/* Receiver Security Handover OTP */}
            <div className="space-y-1.5 p-3 border border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="otp"
                  className="text-[11px] uppercase tracking-wider font-bold text-primary flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Receiver Delivery Security OTP *
                </Label>
                <span className="text-[10px] text-muted-foreground uppercase">
                  6-Digit Handover Code
                </span>
              </div>
              <Input
                id="otp"
                maxLength={6}
                placeholder="Enter 6-digit OTP provided by customer"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="rounded-none h-10 bg-background border-primary/40 font-mono text-sm tracking-widest font-bold text-foreground text-center"
              />
              <p className="text-[10px] text-muted-foreground">
                Ask the recipient for their 6-digit confirmation code shown on their tracking dashboard.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="deliveryNotes" className="text-[11px] uppercase tracking-wider">
                Handover Notes (Optional)
              </Label>
              <Input
                id="deliveryNotes"
                placeholder="e.g. Received at reception, ID verified"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-none h-9 bg-background border-border"
              />
            </div>
          </div>
        )}

        {outcome === "FAILED" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="failureReason" className="text-[11px] uppercase tracking-wider">
                Impediment Reason *
              </Label>
              <select
                id="failureReason"
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
                className="w-full h-9 rounded-none border border-border bg-background px-3 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                {FAILURE_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="failureNotes" className="text-[11px] uppercase tracking-wider">
                Field Evidence / Notes (Optional)
              </Label>
              <Input
                id="failureNotes"
                placeholder="e.g. Called customer 3 times, gate locked"
                value={failureNotes}
                onChange={(e) => setFailureNotes(e.target.value)}
                className="rounded-none h-9 bg-background border-border"
              />
            </div>
          </div>
        )}

        {outcome === "RESCHEDULE" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="rescheduleDate" className="text-[11px] uppercase tracking-wider">
                New Target Delivery Date *
              </Label>
              <Input
                id="rescheduleDate"
                type="datetime-local"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="rounded-none h-9 bg-background border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rescheduleReason" className="text-[11px] uppercase tracking-wider">
                Rescheduling Reason
              </Label>
              <Input
                id="rescheduleReason"
                placeholder="e.g. Customer out of town until tomorrow"
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                className="rounded-none h-9 bg-background border-border"
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
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
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            {isSubmitting ? "Recording..." : "Record Outcome"}
          </Button>
        </div>
      </div>
    </div>
  );
}
