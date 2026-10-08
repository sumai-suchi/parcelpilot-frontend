"use client";

import {
  ArrowRight,
  ArrowRightLeft,
  Bike,
  Loader2,
  Package,
} from "lucide-react";
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

interface HubParcelsTableProps {
  parcels: OperationsShipment[];
  isLoading: boolean;
  onDispatchTransfer: (shipment: OperationsShipment) => void;
  onAssignDelivery: (shipment: OperationsShipment) => void;
}

export function HubParcelsTable({
  parcels,
  isLoading,
  onDispatchTransfer,
  onAssignDelivery,
}: HubParcelsTableProps) {
  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3 font-mono">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
          <span className="block text-xs uppercase tracking-wider text-muted-foreground">
            Auditing hub sorting bay inventory...
          </span>
        </CardContent>
      </Card>
    );
  }

  if (parcels.length === 0) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3">
          <Package className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            No parcels currently docked at this hub. All linehauls and local
            dispatches are clear.
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
              Waybill Tracking #
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Bay Status
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Routing (Origin → Destination)
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Cargo Specs
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
              Destination Area
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-muted-foreground text-right">
              Hub Dispatch Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border/60">
          {parcels.map((p) => {
            const isAtOriginHub = p.status === "AT_ORIGIN_HUB";
            const needsTransfer =
              isAtOriginHub &&
              p.originHubId &&
              p.destinationHubId &&
              p.originHubId !== p.destinationHubId;

            return (
              <TableRow
                key={p.id}
                className="hover:bg-muted/40 transition-colors border-border/60"
              >
                <TableCell className="py-3 px-4">
                  <div className="font-mono text-xs font-bold text-foreground">
                    {p.trackingNumber}
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">
                    ID: {p.id.slice(0, 8)}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <StatusBadge status={p.status} />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="font-semibold text-foreground">
                      {p.originHub?.name || "Origin Hub"}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="font-semibold text-foreground">
                      {p.destinationHub?.name || "Destination Hub"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  <span className="text-foreground font-medium uppercase">
                    {p.parcelType}
                  </span>
                  {" • "}
                  <span>{Number(p.weight).toFixed(1)} kg</span>
                </TableCell>
                <TableCell className="py-3 px-4 text-xs text-muted-foreground max-w-xs truncate font-sans">
                  {p.deliveryAddress?.area}, {p.deliveryAddress?.city}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  {needsTransfer ? (
                    <Button
                      type="button"
                      variant="default"
                      size="xs"
                      onClick={() => onDispatchTransfer(p)}
                      className="gap-1.5 font-mono text-xs"
                    >
                      <ArrowRightLeft className="h-3 w-3" />
                      Dispatch Linehaul
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => onAssignDelivery(p)}
                      className="gap-1.5 font-mono text-xs hover:border-primary hover:text-primary"
                    >
                      <Bike className="h-3 w-3" />
                      Dispatch Final Mile
                    </Button>
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
