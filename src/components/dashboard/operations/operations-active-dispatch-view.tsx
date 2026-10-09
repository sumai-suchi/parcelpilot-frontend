"use client";

import { useMemo, useState } from "react";
import { Bike, CheckCircle2, PackageCheck, RefreshCw, Search, Truck, Zap } from "lucide-react";
import {
  useOperationsCouriers,
  useOperationsHubs,
  useOperationsShipments,
} from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "../shared/dashboard-header";
import { MetricCard, MetricGrid } from "../shared/metric-card";
import { OperationsAssignSheet } from "./operations-assign-sheet";
import { OperationsRejectDialog } from "./operations-reject-dialog";
import { OperationsShipmentsTable } from "./operations-shipments-table";
import { cn } from "@/lib/utils";

export function OperationsActiveDispatchView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dispatchStageFilter, setDispatchStageFilter] = useState("ALL");
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

  // Filter only active dispatch stages
  const activeDispatches = useMemo(() => {
    return allShipments.filter(
      (s) =>
        s.status === "COURIER_ASSIGNED" ||
        s.status === "PICKUP_ASSIGNED" ||
        s.status === "PICKED_UP" ||
        s.status === "OUT_FOR_DELIVERY"
    );
  }, [allShipments]);

  // Dispatch breakdown metrics
  const metrics = useMemo(() => {
    const total = activeDispatches.length;
    const assigned = activeDispatches.filter(
      (s) => s.status === "COURIER_ASSIGNED" || s.status === "PICKUP_ASSIGNED"
    ).length;
    const pickedUp = activeDispatches.filter((s) => s.status === "PICKED_UP").length;
    const outForDelivery = activeDispatches.filter(
      (s) => s.status === "OUT_FOR_DELIVERY"
    ).length;

    return { total, assigned, pickedUp, outForDelivery };
  }, [activeDispatches]);

  // Filtered by search and stage
  const filteredDispatches = useMemo(() => {
    return activeDispatches.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        (s.trackingNumber || "").toLowerCase().includes(q) ||
        (s.customer?.user?.name || "").toLowerCase().includes(q) ||
        (s.customer?.user?.phone || "").toLowerCase().includes(q) ||
        (s.deliveryAddress?.city || "").toLowerCase().includes(q);

      const matchesStage =
        dispatchStageFilter === "ALL" || s.status === dispatchStageFilter;

      return matchesSearch && matchesStage;
    });
  }, [activeDispatches, searchTerm, dispatchStageFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        category="LAST-MILE LOGISTICS / FIELD EXECUTION"
        title="Active Courier Dispatches."
        description="Monitor field courier riders currently executing customer parcel pickups, linehaul dropoffs, and doorstep delivery dropoffs."
        badgeIcon={Truck}
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
            <span className="hidden sm:inline">Refresh Dispatches</span>
          </Button>
        }
      />

      {/* Metrics */}
      <MetricGrid>
        <MetricCard
          label="Active In Flight"
          value={metrics.total}
          desc="Couriers actively executing field tasks"
          icon={Truck}
          variant="primary"
          highlight={metrics.total > 0}
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Pickup Assigned"
          value={metrics.assigned}
          desc="Rider notified & moving to sender address"
          icon={PackageCheck}
          variant="amber"
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Picked Up"
          value={metrics.pickedUp}
          desc="Parcels in rider custody en route to hub"
          icon={Bike}
          variant="purple"
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Out For Delivery"
          value={metrics.outForDelivery}
          desc="Executing final doorstep recipient handoff"
          icon={CheckCircle2}
          variant="emerald"
          highlight={metrics.outForDelivery > 0}
          isLoading={isShipmentsLoading}
        />
      </MetricGrid>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search tracking, rider, customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-8 text-xs font-mono rounded-none"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-xs">
          {[
            { id: "ALL", label: "ALL ACTIVE" },
            { id: "COURIER_ASSIGNED", label: "ASSIGNED" },
            { id: "PICKED_UP", label: "PICKED UP" },
            { id: "OUT_FOR_DELIVERY", label: "OUT FOR DELIVERY" },
          ].map((st) => (
            <Button
              key={st.id}
              size="sm"
              variant={dispatchStageFilter === st.id ? "default" : "outline"}
              onClick={() => setDispatchStageFilter(st.id)}
              className={cn(
                "h-7 px-2.5 text-[10px] uppercase rounded-none cursor-pointer",
                dispatchStageFilter === st.id
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
        shipments={filteredDispatches}
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
