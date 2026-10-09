"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react";
import { useHubTransfers } from "@/hooks/hub.hook";
import type { HubTransferItem } from "@/types/hub.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardHeader } from "../shared/dashboard-header";
import { StatusBadge } from "../shared/status-badge";
import { HubReceiveTransferModal } from "./hub-receive-transfer-modal";
import { cn } from "@/lib/utils";

type DirectionFilter = "ALL" | "INBOUND" | "OUTBOUND";
type StatusFilter = "ALL" | "IN_TRANSIT" | "RECEIVED" | "DISPATCHED";

export function HubLinehaulsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [receiveTransfer, setReceiveTransfer] = useState<HubTransferItem | null>(null);

  const {
    data: transfersRes,
    isLoading,
    isFetching,
    refetch,
  } = useHubTransfers({ limit: 100 });

  const transfers = useMemo(() => transfersRes?.data || [], [transfersRes]);

  // Metrics
  const metrics = useMemo(() => {
    let inTransit = 0;
    let received = 0;
    let dispatched = 0;

    transfers.forEach((t) => {
      if (t.status === "IN_TRANSIT") inTransit++;
      else if (t.status === "RECEIVED") received++;
      else if (t.status === "DISPATCHED") dispatched++;
    });

    return {
      inTransit,
      received,
      dispatched,
      total: transfers.length,
    };
  }, [transfers]);

  // Filtered transfers
  const filteredTransfers = useMemo(() => {
    return transfers.filter((t) => {
      // Status filter
      if (statusFilter !== "ALL" && t.status !== statusFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTracking = t.shipment?.trackingNumber?.toLowerCase().includes(q);
        const matchType = t.shipment?.parcelType?.toLowerCase().includes(q);
        const matchFromHub = t.fromHub?.name?.toLowerCase().includes(q) || t.fromHub?.code?.toLowerCase().includes(q);
        const matchToHub = t.toHub?.name?.toLowerCase().includes(q) || t.toHub?.code?.toLowerCase().includes(q);
        if (!matchTracking && !matchType && !matchFromHub && !matchToHub) {
          return false;
        }
      }

      return true;
    });
  }, [transfers, statusFilter, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        category="LOGISTICS INTAKE / INTER-TERMINAL CORRIDORS"
        title="Inter-Hub Linehauls & Container Intake."
        description="Verify incoming linehaul freight shipments from remote terminals, conduct intake verification, and audit transit manifests."
        badgeIcon={ArrowRightLeft}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2 font-mono text-xs"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
            <span className="hidden sm:inline">Refresh Linehauls</span>
          </Button>
        }
      />

      {/* Linehaul Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 border border-border bg-card rounded-none">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              In-Transit Linehauls
            </span>
            <Truck className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {metrics.inTransit}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Inter-city trucks actively on transit routes
          </p>
        </div>

        <div className="p-4 border border-border bg-card rounded-none">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              Dispatched Linehauls
            </span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {metrics.dispatched}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Manifest generated and staged for truck pickup
          </p>
        </div>

        <div className="p-4 border border-border bg-card rounded-none">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              Received & Verified
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {metrics.received}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Parcels checked into destination terminal bay
          </p>
        </div>

        <div className="p-4 border border-border bg-card rounded-none">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              Total Recorded
            </span>
            <ArrowRightLeft className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {metrics.total}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Cumulative inter-terminal shipments
          </p>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tracking, origin, destination..."
            className="pl-8 text-xs font-mono h-9 rounded-none border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val as StatusFilter)}
          >
            <SelectTrigger className="h-9 text-xs font-mono rounded-none border-border w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="ALL" className="text-xs font-mono">All Linehaul Statuses</SelectItem>
              <SelectItem value="IN_TRANSIT" className="text-xs font-mono">IN_TRANSIT Only</SelectItem>
              <SelectItem value="DISPATCHED" className="text-xs font-mono">DISPATCHED Only</SelectItem>
              <SelectItem value="RECEIVED" className="text-xs font-mono">RECEIVED Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transfers Ledger Table */}
      <Card className="rounded-none border-border bg-card overflow-hidden">
        <CardHeader className="bg-muted/30 py-3 px-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <CardTitle className="text-xs font-mono uppercase tracking-wider font-semibold">
              Inter-Hub Consignment Manifest ({filteredTransfers.length} records)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-16 text-center space-y-2 font-mono text-xs text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin mx-auto text-primary" />
              <p>Synchronizing linehaul route manifests...</p>
            </div>
          ) : filteredTransfers.length === 0 ? (
            <div className="py-16 text-center space-y-2 font-mono">
              <Package className="h-8 w-8 mx-auto text-muted-foreground stroke-1" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                No linehaul transfers match the selected parameters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
                  <TableRow className="border-border">
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Consignment / Waybill
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
                      Intake Verification
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border/60">
                  {filteredTransfers.map((t) => {
                    const isCompleted = t.status === "RECEIVED";
                    const canReceive =
                      t.status === "DISPATCHED" || t.status === "IN_TRANSIT";

                    return (
                      <TableRow
                        key={t.id}
                        className="hover:bg-muted/40 transition-colors border-border/60"
                      >
                        <TableCell className="py-3 px-4 font-mono text-xs">
                          <span className="font-bold text-foreground block">
                            {t.shipment?.trackingNumber || "N/A"}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase">
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
                              onClick={() => setReceiveTransfer(t)}
                              className="gap-1.5 font-mono text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-none"
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
            </div>
          )}
        </CardContent>
      </Card>

      {/* Receive Linehaul Transfer Modal */}
      <HubReceiveTransferModal
        isOpen={!!receiveTransfer}
        transfer={receiveTransfer}
        onClose={() => setReceiveTransfer(null)}
      />
    </div>
  );
}
