"use client";

import {
  AlertTriangle,
  ArrowRight,
  Clock,
  ExternalLink,
  Filter,
  Loader2,
  Package,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCancelShipment, useMyShipments } from "@/hooks/shipment.hook";
import type { CreatedShipmentData } from "@/types/shipment.interface";

export function ShipmentHistoryTable() {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedToCancel, setSelectedToCancel] =
    useState<CreatedShipmentData | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const {
    data: shipmentsRes,
    isLoading,
    refetch,
  } = useMyShipments({
    limit: 50,
    status: filterStatus === "ALL" ? undefined : filterStatus,
  });

  const cancelMutation = useCancelShipment();

  const shipments = shipmentsRes?.data || [];

  const filterTabs = [
    { label: "All Bookings", value: "ALL" },
    { label: "Pending Intake", value: "PENDING_APPROVAL" },
    { label: "In Transit", value: "IN_TRANSIT" },
    { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  const cancellableStatuses = [
    "PENDING_APPROVAL",
    "CREATED",
    "COURIER_ASSIGNED",
    "PICKUP_ASSIGNED",
  ];

  const handleConfirmCancel = async () => {
    if (!selectedToCancel) return;
    try {
      await cancelMutation.mutateAsync({
        id: selectedToCancel.id,
        reason:
          cancelReason.trim() || "Cancelled by customer via shipment table",
      });
      toast.success("Shipment has been cancelled.");
      setSelectedToCancel(null);
      setCancelReason("");
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to cancel shipment.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => (
            <Button
              key={tab.value}
              type="button"
              size="xs"
              variant={filterStatus === tab.value ? "default" : "outline"}
              onClick={() => setFilterStatus(tab.value)}
              className={`rounded-none font-mono text-[11px] uppercase tracking-wider cursor-pointer ${
                filterStatus === tab.value
                  ? "bg-primary text-primary-foreground font-bold"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          RECORDS:{" "}
          <span className="font-bold text-foreground">{shipments.length}</span>
        </div>
      </div>

      {isLoading ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3 font-mono">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              Retrieving ledger records...
            </span>
          </CardContent>
        </Card>
      ) : shipments.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <Package className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No consignments logged under status: {filterStatus}
            </p>
            <Link
              href="/customer/create-shipment"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-none font-mono text-xs uppercase tracking-wider border-border mt-2",
              )}
            >
              Book New Shipment
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
              <TableRow className="border-border">
                <TableHead className="font-mono font-bold text-foreground">
                  Consignment #
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Recipient Corridor
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Commodity / Mass
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Transit State
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Settlement
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Tariff Rate
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground text-right">
                  Waybill Inspection & Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {shipments.map((s) => {
                const isCancellable = cancellableStatuses.includes(s.status);
                return (
                  <TableRow
                    key={s.id}
                    className="hover:bg-muted/30 transition-colors border-border font-mono text-xs"
                  >
                    <TableCell className="font-bold text-foreground py-3.5">
                      <Link
                        href={`/customer/shipments/${s.id}`}
                        className="text-foreground hover:text-primary hover:underline underline-offset-2 tracking-tight flex items-center gap-1 group"
                      >
                        <span>{s.trackingNumber}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="font-sans font-semibold text-foreground">
                        {s.deliveryAddress?.area}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-mono">
                        {s.deliveryAddress?.city}
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="inline-flex items-center gap-1 border border-primary/20 bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold">
                        {s.parcelType}
                      </span>
                      <span className="text-muted-foreground ml-1.5 text-[11px]">
                        {Number(s.weight).toFixed(1)} kg
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                          s.status === "DELIVERED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : s.status === "IN_TRANSIT" ||
                                s.status === "OUT_FOR_DELIVERY"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : s.status === "CANCELLED"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {s.status.replace(/_/g, " ")}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                          s.paymentStatus === "PAID"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {s.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-foreground py-3.5">
                      ৳{Number(s.deliveryCharge).toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        <Link
                          href={`/customer/shipments/${s.id}`}
                          className={cn(
                            buttonVariants({ variant: "default", size: "xs" }),
                            "rounded-none font-mono text-[10px] uppercase tracking-wider inline-flex items-center",
                          )}
                        >
                          Details
                        </Link>

                        <Link
                          href={`/customer/track-shipment?tracking=${s.trackingNumber}`}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "xs" }),
                            "rounded-none font-mono text-[10px] uppercase tracking-wider border-border hover:bg-muted inline-flex items-center",
                          )}
                        >
                          <span>Trace</span>
                        </Link>

                        {isCancellable && (
                          <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => setSelectedToCancel(s)}
                            className="rounded-none font-mono text-[10px] uppercase tracking-wider border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500 inline-flex items-center"
                          >
                            <span>Cancel</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Cancel Confirmation Modal */}
      {selectedToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-mono text-sm font-bold uppercase tracking-wider border-b border-border/70 pb-3">
              <AlertTriangle className="h-5 w-5" />
              <span>Cancel Consignment</span>
            </div>

            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to cancel consignment{" "}
              <span className="font-mono font-bold text-foreground">
                {selectedToCancel.trackingNumber}
              </span>
              ? Courier dispatch and sorting will be stopped.
            </p>

            <div className="space-y-1.5">
              <label
                htmlFor="reason-input"
                className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block"
              >
                Cancellation Reason (optional):
              </label>
              <textarea
                id="reason-input"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancelling delivery..."
                rows={3}
                className="w-full rounded-none border border-border bg-muted/30 p-2.5 font-sans text-xs text-foreground focus:outline-hidden focus:border-primary resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/70">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedToCancel(null)}
                disabled={cancelMutation.isPending}
                className="rounded-none font-mono text-xs uppercase tracking-wider border-border hover:bg-muted"
              >
                Keep
              </Button>
              <Button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelMutation.isPending}
                className="rounded-none bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase font-bold tracking-wider"
              >
                {cancelMutation.isPending ? "Cancelling..." : "Confirm Cancel"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
