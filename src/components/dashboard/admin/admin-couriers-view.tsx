"use client";

import { Bike, Loader2 } from "lucide-react";
import { useAdminCouriers } from "@/hooks/admin.hook";
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

export function AdminCouriersView() {
  const { data: couriersRes, isLoading } = useAdminCouriers();
  const couriers = couriersRes?.data || [];

  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3 font-mono">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
          <span className="block text-xs uppercase tracking-wider text-muted-foreground">
            Synchronizing courier telemetry & availability registry...
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
            Field Delivery Fleet & Availability
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            Active courier riders and real-time operational availability across
            all hub territories.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          ACTIVE FLEET:{" "}
          <span className="font-bold text-foreground">{couriers.length}</span>
        </div>
      </div>

      {couriers.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <Bike className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No field couriers registered in the platform yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
              <TableRow className="border-border">
                <TableHead className="font-mono font-bold text-foreground">
                  Courier Rider
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Inducted Terminal Hub
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Vehicle Mode
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Plate Registration
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground text-right">
                  Duty Availability
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {couriers.map((c) => (
                <TableRow
                  key={c.id}
                  className="hover:bg-muted/30 transition-colors border-border font-mono text-xs"
                >
                  <TableCell className="py-3.5">
                    <span className="font-sans font-semibold text-foreground block">
                      {c.user?.name || "Rider"}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                      {c.user?.phone || c.user?.email}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-foreground font-medium">
                    <span>{c.hub?.name || "Central Hub"}</span>
                    <span className="text-muted-foreground ml-1.5 text-[11px]">
                      ({c.hub?.code || "DAC"})
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-muted-foreground uppercase">
                    {c.vehicleType}
                  </TableCell>
                  <TableCell className="py-3.5 font-mono font-bold text-foreground">
                    {c.vehicleNumber}
                  </TableCell>
                  <TableCell className="py-3.5 text-right">
                    <StatusBadge status={c.availabilityStatus} type="courier" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
