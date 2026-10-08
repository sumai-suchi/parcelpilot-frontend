"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Package, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useUpdateShipmentDelivered } from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../shared/status-badge";

interface OperationsShipmentsTableProps {
  shipments: OperationsShipment[];
  isLoading: boolean;
  onOpenAssign: (shipment: OperationsShipment) => void;
  onOpenReject: (shipment: OperationsShipment) => void;
}

export function OperationsShipmentsTable({
  shipments,
  isLoading,
  onOpenAssign,
  onOpenReject,
}: OperationsShipmentsTableProps) {
  const [deliveringId, setDeliveringId] = useState<string | null>(null);
  const updateDeliveredMutation = useUpdateShipmentDelivered();

  const handleMarkDelivered = async (shipment: OperationsShipment) => {
    try {
      setDeliveringId(shipment.id);
      await updateDeliveredMutation.mutateAsync({
        shipmentId: shipment.id,
        payload: {
          note: "Delivery confirmed and finalized by Operations Manager following successful recipient OTP verification and courier completion.",
        },
      });
      toast.success(
        `Consignment ${shipment.trackingNumber} confirmed and marked DELIVERED!`,
      );
    } catch (err: any) {
      toast.error(err?.message || "Failed to confirm delivery status.");
    } finally {
      setDeliveringId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3 font-mono">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
          <span className="block text-xs uppercase tracking-wider text-muted-foreground">
            Pulling live operations consignment ledger...
          </span>
        </CardContent>
      </Card>
    );
  }

  if (shipments.length === 0) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3">
          <Package className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            No consignments found in the current operational queue.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
          <TableRow className="border-border">
            <TableHead className="font-mono font-bold text-foreground">
              Consignment #
            </TableHead>
            <TableHead className="font-mono font-bold text-foreground">
              Customer Sender
            </TableHead>
            <TableHead className="font-mono font-bold text-foreground">
              Corridor Route
            </TableHead>
            <TableHead className="font-mono font-bold text-foreground">
              Commodity / Mass
            </TableHead>
            <TableHead className="font-mono font-bold text-foreground">
              Transit State
            </TableHead>
            <TableHead className="font-mono font-bold text-foreground">
              Payment
            </TableHead>
            <TableHead className="font-mono font-bold text-foreground text-right">
              Dispatch Control
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border">
          {shipments.map((s) => {
            const isPending =
              s.status === "PENDING_APPROVAL" || s.status === "CREATED";

            return (
              <TableRow
                key={s.id}
                className="hover:bg-muted/30 transition-colors border-border font-mono text-xs"
              >
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-foreground tracking-tight">
                      {s.trackingNumber}
                    </span>
                    {s.deliveryType !== "STANDARD" && (
                      <span className="border border-primary/30 bg-primary/10 text-primary px-1.5 py-0.2 text-[9px] font-bold">
                        {s.deliveryType}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3.5">
                  <span className="font-sans font-semibold text-foreground block">
                    {s.customer?.user?.name || "Customer"}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                    {s.customer?.user?.phone || s.customer?.user?.email}
                  </span>
                </TableCell>

                <TableCell className="py-3.5">
                  <div className="flex items-center gap-1.5 font-sans font-medium text-foreground">
                    <span>{s.pickupAddress?.area || "Origin"}</span>
                    <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                    <span>{s.deliveryAddress?.area || "Destination"}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                    {s.pickupAddress?.city} → {s.deliveryAddress?.city}
                  </span>
                </TableCell>

                <TableCell className="py-3.5">
                  <span className="text-foreground">{s.parcelType}</span>
                  <span className="text-muted-foreground ml-1.5 text-[11px]">
                    {Number(s.weight).toFixed(1)} kg
                  </span>
                </TableCell>

                <TableCell className="py-3.5">
                  <StatusBadge status={s.status} type="shipment" />
                </TableCell>

                <TableCell className="py-3.5">
                  <StatusBadge status={s.paymentStatus} type="payment" />
                </TableCell>

                <TableCell className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                    {isPending ? (
                      <>
                        <Button
                          type="button"
                          size="xs"
                          variant="default"
                          onClick={() => onOpenAssign(s)}
                          className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold text-[10px] tracking-wider cursor-pointer"
                        >
                          Assign & Route
                        </Button>
                        <Button
                          type="button"
                          size="xs"
                          variant="destructive"
                          onClick={() => onOpenReject(s)}
                          className="rounded-none font-mono uppercase font-bold text-[10px] tracking-wider cursor-pointer"
                        >
                          Reject
                        </Button>
                      </>
                    ) : s.status === "OUT_FOR_DELIVERY" &&
                      s.courierAssignments?.some(
                        (a) => a.status === "COMPLETED",
                      ) ? (
                      <Button
                        type="button"
                        size="xs"
                        variant="default"
                        onClick={() => handleMarkDelivered(s)}
                        disabled={deliveringId === s.id}
                        className="rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase font-bold text-[10px] tracking-wider cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        {deliveringId === s.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        <span>Confirm Delivered</span>
                      </Button>
                    ) : s.status === "OUT_FOR_DELIVERY" ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5">
                          Pending OTP
                        </span>
                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          onClick={() => onOpenAssign(s)}
                          className="rounded-none font-mono uppercase text-[10px] tracking-wider border-border hover:bg-muted cursor-pointer"
                        >
                          Reassign
                        </Button>
                      </div>
                    ) : s.status === "DELIVERED" ? (
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-bold uppercase">
                        Delivered ✓
                      </span>
                    ) : s.status === "AT_ORIGIN_HUB" ||
                      s.status === "AT_DESTINATION_HUB" ? (
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          size="xs"
                          variant="default"
                          onClick={() => onOpenAssign(s)}
                          className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold text-[10px] tracking-wider cursor-pointer"
                        >
                          Dispatch Delivery
                        </Button>
                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          onClick={() => onOpenAssign(s)}
                          className="rounded-none font-mono uppercase text-[10px] tracking-wider border-border hover:bg-muted cursor-pointer"
                        >
                          Reassign
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        onClick={() => onOpenAssign(s)}
                        className="rounded-none font-mono uppercase text-[10px] tracking-wider border-border hover:bg-muted cursor-pointer"
                      >
                        Reassign
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
  );
}
