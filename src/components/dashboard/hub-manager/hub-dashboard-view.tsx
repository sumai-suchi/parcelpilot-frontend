"use client";

import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Boxes,
  Building2,
  RefreshCw,
  Search,
} from "lucide-react";
import { useHubShipments, useHubTransfers } from "@/hooks/hub.hook";
import { useOperationsHubs } from "@/hooks/operations.hook";
import type { HubTransferItem } from "@/types/hub.interface";
import type { OperationsShipment } from "@/types/operations.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "../shared/dashboard-header";
import { HubDispatchTransferModal } from "./hub-dispatch-transfer-modal";
import { HubParcelsTable } from "./hub-parcels-table";
import { HubReceiveTransferModal } from "./hub-receive-transfer-modal";
import { HubStatsCards } from "./hub-stats-cards";
import { HubTransfersTable } from "./hub-transfers-table";
import { cn } from "@/lib/utils";

type HubTab = "parcels" | "transfers";

export function HubDashboardView() {
  const [activeTab, setActiveTab] = useState<HubTab>("parcels");
  const [searchTerm, setSearchTerm] = useState("");
  const [dispatchShipment, setDispatchShipment] =
    useState<OperationsShipment | null>(null);
  const [receiveTransfer, setReceiveTransfer] =
    useState<HubTransferItem | null>(null);

  const {
    data: shipmentsRes,
    isLoading: isShipmentsLoading,
    isFetching: isShipmentsFetching,
    refetch: refetchShipments,
  } = useHubShipments({ limit: 100 });

  const {
    data: transfersRes,
    isLoading: isTransfersLoading,
    isFetching: isTransfersFetching,
    refetch: refetchTransfers,
  } = useHubTransfers({ limit: 100 });

  const { data: hubsRes } = useOperationsHubs();

  const allShipments = useMemo(() => shipmentsRes?.data || [], [shipmentsRes]);
  const transfers = useMemo(() => transfersRes?.data || [], [transfersRes]);
  const hubs = useMemo(() => hubsRes?.data || [], [hubsRes]);

  // Parcels currently docked at this hub sorting facility
  const parcelsAtHub = useMemo(
    () =>
      allShipments.filter(
        (s) =>
          s.status === "AT_ORIGIN_HUB" ||
          s.status === "AT_DESTINATION_HUB" ||
          s.status === "PICKED_UP",
      ),
    [allShipments],
  );

  // Search filtered items
  const filteredParcels = useMemo(() => {
    if (!searchTerm.trim()) return parcelsAtHub;
    const q = searchTerm.toLowerCase();
    return parcelsAtHub.filter(
      (p) =>
        p.trackingNumber.toLowerCase().includes(q) ||
        p.parcelType.toLowerCase().includes(q) ||
        p.deliveryAddress?.area?.toLowerCase().includes(q) ||
        p.deliveryAddress?.city?.toLowerCase().includes(q) ||
        p.originHub?.name?.toLowerCase().includes(q) ||
        p.destinationHub?.name?.toLowerCase().includes(q),
    );
  }, [parcelsAtHub, searchTerm]);

  const filteredTransfers = useMemo(() => {
    if (!searchTerm.trim()) return transfers;
    const q = searchTerm.toLowerCase();
    return transfers.filter(
      (t) =>
        t.shipment?.trackingNumber?.toLowerCase().includes(q) ||
        t.fromHub?.name?.toLowerCase().includes(q) ||
        t.fromHub?.code?.toLowerCase().includes(q) ||
        t.toHub?.name?.toLowerCase().includes(q) ||
        t.toHub?.code?.toLowerCase().includes(q),
    );
  }, [transfers, searchTerm]);

  const isRefreshing = isShipmentsFetching || isTransfersFetching;

  const handleRefreshAll = () => {
    refetchShipments();
    refetchTransfers();
  };

  const tabs: Array<{
    id: HubTab;
    label: string;
    icon: typeof Boxes;
    count: number;
  }> = [
    {
      id: "parcels",
      label: "Parcels In Bay Inventory",
      icon: Boxes,
      count: parcelsAtHub.length,
    },
    {
      id: "transfers",
      label: "Inter-Hub Linehauls",
      icon: ArrowRightLeft,
      count: transfers.length,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Reusable Base-Sera Dashboard Header */}
      <DashboardHeader
        category="LOGISTICS INTAKE / HUB RECONCILIATION"
        title="Hub Operations Command."
        description="Monitor physical parcel movements through sorting facilities, dispatch inter-hub transfers, and verify incoming linehaul shipments."
        badgeIcon={Building2}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshAll}
            disabled={isRefreshing}
            className="gap-2 font-mono text-xs"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh Terminal Ledger</span>
          </Button>
        }
      />

      {/* Telemetry Metric Grid */}
      <HubStatsCards parcelsAtHub={parcelsAtHub} transfers={transfers} />

      {/* Navigation Tabs and Quick Search Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="xs"
                onClick={() => setActiveTab(tab.id)}
                className="gap-2 font-mono text-xs"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "ml-1 px-1.5 py-0.5 rounded-none text-[10px] font-mono",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground font-bold"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tracking, hub, area..."
            className="pl-8 text-xs font-mono h-8 rounded-none border-border"
          />
        </div>
      </div>

      {/* Subviews */}
      {activeTab === "parcels" ? (
        <HubParcelsTable
          parcels={filteredParcels}
          isLoading={isShipmentsLoading}
          onDispatchTransfer={(s) => setDispatchShipment(s)}
        />
      ) : (
        <HubTransfersTable
          transfers={filteredTransfers}
          isLoading={isTransfersLoading}
          onReceiveTransfer={(t) => setReceiveTransfer(t)}
        />
      )}

      {/* Inter-Hub Linehaul Dispatch Modal */}
      <HubDispatchTransferModal
        isOpen={!!dispatchShipment}
        shipment={dispatchShipment}
        onClose={() => setDispatchShipment(null)}
        hubs={hubs}
      />

      {/* Receive Linehaul Transfer Modal */}
      <HubReceiveTransferModal
        isOpen={!!receiveTransfer}
        transfer={receiveTransfer}
        onClose={() => setReceiveTransfer(null)}
      />
    </div>
  );
}
