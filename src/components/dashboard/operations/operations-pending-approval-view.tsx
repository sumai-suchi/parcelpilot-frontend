"use client";

import { useMemo, useState } from "react";
import { Clock, RefreshCw, Search, Zap, AlertCircle } from "lucide-react";
import {
  useOperationsCouriers,
  useOperationsHubs,
  useOperationsShipments,
} from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "../shared/dashboard-header";
import { MetricCard, MetricGrid } from "../shared/metric-card";
import { OperationsAssignSheet } from "./operations-assign-sheet";
import { OperationsRejectDialog } from "./operations-reject-dialog";
import { OperationsShipmentsTable } from "./operations-shipments-table";
import { cn } from "@/lib/utils";

export function OperationsPendingApprovalView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceTierFilter, setServiceTierFilter] = useState("ALL");
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
    status: "PENDING_APPROVAL",
    searchTerm: searchTerm.trim() || undefined,
  });

  const { data: hubsRes } = useOperationsHubs();
  const { data: couriersRes } = useOperationsCouriers();

  const allPendingShipments = useMemo(
    () => shipmentsRes?.data || [],
    [shipmentsRes],
  );
  const hubs = useMemo(() => hubsRes?.data || [], [hubsRes]);
  const couriers = useMemo(() => couriersRes?.data || [], [couriersRes]);

  // Priority analytics
  const metrics = useMemo(() => {
    const total = allPendingShipments.length;
    const express = allPendingShipments.filter(
      (s) => (s.deliveryType || "").toUpperCase() === "EXPRESS",
    ).length;
    const sameDay = allPendingShipments.filter(
      (s) =>
        (s.deliveryType || "").toUpperCase().includes("SAME") ||
        (s.deliveryType || "").toUpperCase().includes("DAY"),
    ).length;
    const standard = total - (express + sameDay);

    return { total, express, sameDay, standard: standard > 0 ? standard : 0 };
  }, [allPendingShipments]);

  // Filtered shipments
  const filteredShipments = useMemo(() => {
    return allPendingShipments.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        (s.trackingNumber || "").toLowerCase().includes(q) ||
        (s.customer?.user?.name || "").toLowerCase().includes(q) ||
        (s.customer?.user?.phone || "").toLowerCase().includes(q) ||
        (s.deliveryAddress?.city || "").toLowerCase().includes(q);

      const matchesTier =
        serviceTierFilter === "ALL" ||
        (s.deliveryType || "").toUpperCase() === serviceTierFilter;

      return matchesSearch && matchesTier;
    });
  }, [allPendingShipments, searchTerm, serviceTierFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        category="DISPATCH INTAKE / PENDING VERIFICATION"
        title="Pending Consignment Approvals."
        description="Review newly created customer shipments, verify delivery addresses, calculate freight charges, and assign routing nodes."
        badgeIcon={Clock}
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
            <span className="hidden sm:inline">Refresh Queue</span>
          </Button>
        }
      />

      {/* Queue Metrics */}
      <MetricGrid>
        <MetricCard
          label="Total In Queue"
          value={metrics.total}
          desc="Consignments awaiting operations routing"
          icon={Clock}
          variant="amber"
          highlight={metrics.total > 0}
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Same-Day Urgent"
          value={metrics.sameDay}
          desc="Strict 6-12h delivery window"
          icon={AlertCircle}
          variant="purple"
          highlight={metrics.sameDay > 0}
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Express Priority"
          value={metrics.express}
          desc="24h expedited linehaul SLA"
          icon={Zap}
          variant="primary"
          isLoading={isShipmentsLoading}
        />
        <MetricCard
          label="Standard Routine"
          value={metrics.standard}
          desc="48-72h standard delivery"
          icon={Clock}
          variant="default"
          isLoading={isShipmentsLoading}
        />
      </MetricGrid>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search tracking, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-8 text-xs font-mono rounded-none"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-xs">
          {["ALL", "SAME_DAY", "EXPRESS", "STANDARD"].map((tier) => (
            <Button
              key={tier}
              size="sm"
              variant={serviceTierFilter === tier ? "default" : "outline"}
              onClick={() => setServiceTierFilter(tier)}
              className={cn(
                "h-7 px-2.5 text-[10px] uppercase rounded-none cursor-pointer",
                serviceTierFilter === tier
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tier.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Shipments Table */}
      <OperationsShipmentsTable
        shipments={filteredShipments}
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
