"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Building2, MapPin, RefreshCw, Search, Truck } from "lucide-react";
import {
  useOperationsCouriers,
  useOperationsHubs,
  useOperationsShipments,
} from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "../shared/dashboard-header";
import { MetricCard, MetricGrid } from "../shared/metric-card";
import { OperationsAssignSheet } from "./operations-assign-sheet";
import { OperationsRejectDialog } from "./operations-reject-dialog";
import { OperationsShipmentsTable } from "./operations-shipments-table";
import { cn } from "@/lib/utils";

export function OperationsHubTransfersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transferStageFilter, setTransferStageFilter] = useState("ALL");
  const [selectedShipmentForAssign, setSelectedShipmentForAssign] =
    useState<OperationsShipment | null>(null);
  const [selectedShipmentForReject, setSelectedShipmentForReject] =
    useState<OperationsShipment | null>(null);

  const {
    data: shipmentsRes,
    isLoading: isShipmentsLoading,
    isFetching,
    refetch: refetchShipments,
  } = useOperationsShipments({
    limit: 100,
    searchTerm: searchTerm.trim() || undefined,
  });

  const { data: hubsRes } = useOperationsHubs();
  const { data: couriersRes } = useOperationsCouriers();

  const allShipments = useMemo(() => shipmentsRes?.data || [], [shipmentsRes]);
  const hubs = useMemo(() => hubsRes?.data || [], [hubsRes]);
  const couriers = useMemo(() => couriersRes?.data || [], [couriersRes]);

  // Filter only hub transfer and linehaul stages
  const transferShipments = useMemo(() => {
    return allShipments.filter(
      (s) =>
        s.status === "AT_ORIGIN_HUB" ||
        s.status === "IN_TRANSIT" ||
        s.status === "AT_DESTINATION_HUB" ||
        s.status === "RECEIVED_AT_HUB"
    );
  }, [allShipments]);

  // Hub transfer metrics
  const metrics = useMemo(() => {
    const total = transferShipments.length;
    const originHub = transferShipments.filter(
      (s) => s.status === "AT_ORIGIN_HUB"
    ).length;
    const inTransit = transferShipments.filter(
      (s) => s.status === "IN_TRANSIT"
    ).length;
    const destHub = transferShipments.filter(
      (s) => s.status === "AT_DESTINATION_HUB" || s.status === "RECEIVED_AT_HUB"
    ).length;

    return { total, originHub, inTransit, destHub };
  }, [transferShipments]);

  // Filtered by search and stage
  const filteredTransfers = useMemo(() => {
    return transferShipments.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        (s.trackingNumber || "").toLowerCase().includes(q) ||
        (s.originHub?.name || "").toLowerCase().includes(q) ||
        (s.destinationHub?.name || "").toLowerCase().includes(q) ||
        (s.originHub?.code || "").toLowerCase().includes(q) ||
        (s.destinationHub?.code || "").toLowerCase().includes(q);

      const matchesStage =
        transferStageFilter === "ALL" || s.status === transferStageFilter;

      return matchesSearch && matchesStage;
    });
  }, [transferShipments, searchTerm, transferStageFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        category="LINEHAUL LOGISTICS / CROSS-DOCK TRANSFER"
        title="Inter-Hub Transfer Monitoring."
        description="Supervise linehaul movements between origin hubs and destination sorting centers across regional zones."
        badgeIcon={Building2}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchShipments()}
            disabled={isFetching}
            className="gap-2 cursor-pointer font-mono text-xs uppercase"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", isFetching && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh Transfers</span>
          </Button>
        }
      />

      {/* Metrics */}
      <MetricGrid>
        <MetricCard
          label="Total In Transfers"
          value={metrics.total}
          desc="Consignments in cross-dock transit"
          icon={Truck}
          variant="primary"
          highlight={metrics.total > 0}
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Origin Hub Sorting"
          value={metrics.originHub}
          desc="Inducted at departure sorting terminal"
          icon={Building2}
          variant="amber"
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Inter-City Linehaul"
          value={metrics.inTransit}
          desc="Moving on trunk highway corridors"
          icon={Truck}
          variant="purple"
          highlight={metrics.inTransit > 0}
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Destination Arrival"
          value={metrics.destHub}
          desc="Arrived at delivery terminal hub"
          icon={MapPin}
          variant="emerald"
          isLoading={isShipmentsLoading}
        />
      </MetricGrid>

      {/* Active Hub Network Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-3 border border-border/70 bg-card flex items-center justify-between">
          <span className="text-muted-foreground uppercase">Operational Hubs</span>
          <span className="font-bold text-foreground">{hubs.length} Facilities</span>
        </div>
        <div className="p-3 border border-border/70 bg-card flex items-center justify-between">
          <span className="text-muted-foreground uppercase">Courier Fleet Attached</span>
          <span className="font-bold text-primary">{couriers.length} Couriers</span>
        </div>
        <div className="p-3 border border-border/70 bg-card flex items-center justify-between">
          <span className="text-muted-foreground uppercase">Transfer Velocity</span>
          <span className="font-bold text-emerald-600">Active Cross-Dock</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search tracking, hub code, facility..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-8 text-xs font-mono rounded-none"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-xs">
          {[
            { id: "ALL", label: "ALL TRANSFERS" },
            { id: "AT_ORIGIN_HUB", label: "AT ORIGIN" },
            { id: "IN_TRANSIT", label: "IN LINEHAUL" },
            { id: "AT_DESTINATION_HUB", label: "AT DESTINATION" },
          ].map((st) => (
            <Button
              key={st.id}
              size="sm"
              variant={transferStageFilter === st.id ? "default" : "outline"}
              onClick={() => setTransferStageFilter(st.id)}
              className={cn(
                "h-7 px-2.5 text-[10px] uppercase rounded-none cursor-pointer",
                transferStageFilter === st.id
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {st.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Shipments Table */}
      <OperationsShipmentsTable
        shipments={filteredTransfers}
        isLoading={isShipmentsLoading}
        onOpenAssign={(s) => setSelectedShipmentForAssign(s)}
        onOpenReject={(s) => setSelectedShipmentForReject(s)}
      />

      {/* Assignment Sheet */}
      <OperationsAssignSheet
        isOpen={!!selectedShipmentForAssign}
        shipment={selectedShipmentForAssign}
        onClose={() => setSelectedShipmentForAssign(null)}
        hubs={hubs}
        couriers={couriers}
      />

      {/* Rejection Modal */}
      <OperationsRejectDialog
        isOpen={!!selectedShipmentForReject}
        shipment={selectedShipmentForReject}
        onClose={() => setSelectedShipmentForReject(null)}
      />
    </div>
  );
}
