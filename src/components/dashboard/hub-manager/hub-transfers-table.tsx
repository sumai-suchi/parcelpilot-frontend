"use client";

import { ArrowRight, CheckCircle2, Clock, Loader2, Truck } from "lucide-react";
import type { HubTransferItem } from "@/types/hub.interface";
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

interface HubTransfersTableProps {
  transfers: HubTransferItem[];
  isLoading: boolean;
  onReceiveTransfer: (transfer: HubTransferItem) => void;
}

export function HubTransfersTable({
  transfers,
  isLoading,
  onReceiveTransfer,
}: HubTransfersTableProps) {
  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3 font-mono">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
          <span className="block text-xs uppercase tracking-wider text-muted-foreground">
            Synchronizing inter-hub linehaul manifest...
          </span>
        </CardContent>
      </Card>
    );
  }

  if (transfers.length === 0) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3">
          <Truck className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            No inter-hub linehaul transfers recorded in this cycle.
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
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Waybill / Consignment
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Origin Terminal
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Destination Terminal
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Linehaul Status
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Dispatch Telemetry
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground text-right">
              Intake Reconciliation
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border/60">
          {transfers.map((t) => {
            const isCompleted = t.status === "RECEIVED";
            const canReceive =
              t.status === "DISPATCHED" || t.status === "IN_TRANSIT";

            return (
              <TableRow
                key={t.id}
                className="hover:bg-muted/40 transition-colors border-border/60"
              >
                <TableCell className="py-3 px-4 font-mono text-xs">
                  <span className="font-bold text-foreground">
                    {t.shipment?.trackingNumber || "N/A"}
                  </span>
                  <span className="block text-[10px] text-muted-foreground uppercase">
                    {t.shipment?.parcelType} • {t.shipment?.weight} kg
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4 font-mono text-xs">
                  <span className="font-semibold text-foreground">
                    {t.fromHub?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground block uppercase">
                    CODE: {t.fromHub?.code}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4 font-mono text-xs">
                  <span className="font-semibold text-foreground">
                    {t.toHub?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground block uppercase">
                    CODE: {t.toHub?.code}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <StatusBadge status={t.status} />
                </TableCell>
                <TableCell className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  {t.dispatchedAt ? (
                    <div className="space-y-0.5">
                      <div className="text-foreground">
                        {new Date(t.dispatchedAt).toLocaleDateString()}
                      </div>
                      <div className="text-[10px]">
                        {new Date(t.dispatchedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] uppercase">
                      Awaiting Linehaul
                    </span>
                  )}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  {canReceive ? (
                    <Button
                      type="button"
                      variant="default"
                      size="xs"
                      onClick={() => onReceiveTransfer(t)}
                      className="gap-1.5 font-mono text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Receive At Hub
                    </Button>
                  ) : (
                    <div className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>INTAKE VERIFIED</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
