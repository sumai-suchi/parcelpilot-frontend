"use client";

import { useMemo, useState } from "react";
import { Radio, RefreshCw } from "lucide-react";
import {
  useOperationsCouriers,
  useOperationsHubs,
  useOperationsShipments,
} from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../shared/dashboard-header";
import { OperationsAssignSheet } from "./operations-assign-sheet";
import { OperationsFilters } from "./operations-filters";
import { OperationsRejectDialog } from "./operations-reject-dialog";
import { OperationsShipmentsTable } from "./operations-shipments-table";
import { OperationsStatsCards } from "./operations-stats-cards";
import { cn } from "@/lib/utils";

export function OperationsDashboardView() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
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
    status: statusFilter === "ALL" ? undefined : statusFilter,
    searchTerm: searchTerm.trim() || undefined,
  });

  const { data: hubsRes } = useOperationsHubs();
  const { data: couriersRes } = useOperationsCouriers();

  const shipments = useMemo(() => shipmentsRes?.data || [], [shipmentsRes]);
  const hubs = useMemo(() => hubsRes?.data || [], [hubsRes]);
  const couriers = useMemo(() => couriersRes?.data || [], [couriersRes]);

  return (
    <div className="space-y-8">
      {/* Reusable Base-Sera Dashboard Header */}
      <DashboardHeader
        category="OPERATIONS COMMAND / ROUTING ENGINE"
        title="Operations Command Center."
        description="Real-time dispatch intake, field courier rider assignment, and multi-hub consignment routing."
        badgeIcon={Radio}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchShipments()}
            disabled={isFetching}
            className="gap-2"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", isFetching && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh Ledger</span>
          </Button>
        }
      />

      {/* Telemetry Metric Grid */}
      <OperationsStatsCards shipments={shipments} />

      {/* Responsive Filter Bar */}
      <OperationsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalCount={shipments.length}
      />

      {/* Consignments Ledger Table */}
      <OperationsShipmentsTable
        shipments={shipments}
        isLoading={isShipmentsLoading}
        onOpenAssign={(s) => setSelectedShipmentForAssign(s)}
        onOpenReject={(s) => setSelectedShipmentForReject(s)}
      />

      {/* Routing Assignment Drawer Sheet */}
      <OperationsAssignSheet
        isOpen={!!selectedShipmentForAssign}
        shipment={selectedShipmentForAssign}
        onClose={() => setSelectedShipmentForAssign(null)}
        hubs={hubs}
        couriers={couriers}
      />

      {/* Consignment Rejection Governance Modal */}
      <OperationsRejectDialog
        isOpen={!!selectedShipmentForReject}
        shipment={selectedShipmentForReject}
        onClose={() => setSelectedShipmentForReject(null)}
      />
    </div>
  );
}
