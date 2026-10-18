"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Boxes,
  Building2,
  CheckCircle2,
  HardDrive,
  Layers,
  Package,
  RefreshCw,
  Search,
  Warehouse,
} from "lucide-react";
import { useHubShipments } from "@/hooks/hub.hook";
import { useOperationsHubs } from "@/hooks/operations.hook";
import type { OperationsShipment } from "@/types/operations.interface";
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
import { HubDispatchTransferModal } from "./hub-dispatch-transfer-modal";
import { cn } from "@/lib/utils";

type BayCategory = "ALL" | "BAY_A" | "BAY_B" | "BAY_C";

export function HubInventoryView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBay, setSelectedBay] = useState<BayCategory>("ALL");
  const [dispatchShipment, setDispatchShipment] =
    useState<OperationsShipment | null>(null);

  const {
    data: shipmentsRes,
    isLoading,
    isFetching,
    refetch,
  } = useHubShipments({ limit: 100 });

  const { data: hubsRes } = useOperationsHubs();
  const hubs = useMemo(() => hubsRes?.data || [], [hubsRes]);

  const allShipments = useMemo(() => shipmentsRes?.data || [], [shipmentsRes]);

  // Parcels located at the hub
  const parcelsInHub = useMemo(
    () =>
      allShipments.filter(
        (s) =>
          s.status === "AT_ORIGIN_HUB" ||
          s.status === "AT_DESTINATION_HUB" ||
          s.status === "PICKED_UP",
      ),
    [allShipments],
  );

  // Classify each parcel into physical storage bays
  const getBaySlot = (
    shipment: OperationsShipment,
  ): {
    code: "BAY_A" | "BAY_B" | "BAY_C";
    label: string;
    shelf: string;
  } => {
    if (shipment.status === "PICKED_UP") {
      return {
        code: "BAY_A",
        label: "Bay A • Inbound Staging & Intake",
        shelf: `Shelf A-${shipment.id.slice(-2).toUpperCase()}`,
      };
    }
    if (shipment.status === "AT_ORIGIN_HUB") {
      return {
        code: "BAY_B",
        label: "Bay B • Outbound Linehaul Staging",
        shelf: `Rack B-${shipment.id.slice(-2).toUpperCase()}`,
      };
    }
    return {
      code: "BAY_C",
      label: "Bay C • Final-Mile Destination Hold",
      shelf: `Pod C-${shipment.id.slice(-2).toUpperCase()}`,
    };
  };

  // Capacity calculations (simulated 50 slots per bay section)
  const bayCapacity = useMemo(() => {
    let bayACount = 0;
    let bayBCount = 0;
    let bayCCount = 0;

    parcelsInHub.forEach((p) => {
      const slot = getBaySlot(p);
      if (slot.code === "BAY_A") bayACount++;
      if (slot.code === "BAY_B") bayBCount++;
      if (slot.code === "BAY_C") bayCCount++;
    });

    return {
      bayA: {
        count: bayACount,
        max: 40,
        percent: Math.min(100, Math.round((bayACount / 40) * 100)),
      },
      bayB: {
        count: bayBCount,
        max: 50,
        percent: Math.min(100, Math.round((bayBCount / 50) * 100)),
      },
      bayC: {
        count: bayCCount,
        max: 60,
        percent: Math.min(100, Math.round((bayCCount / 60) * 100)),
      },
      totalCount: parcelsInHub.length,
      totalMax: 150,
      totalPercent: Math.min(
        100,
        Math.round((parcelsInHub.length / 150) * 100),
      ),
    };
  }, [parcelsInHub]);

  // Filtered parcels
  const filteredParcels = useMemo(() => {
    return parcelsInHub.filter((p) => {
      const slot = getBaySlot(p);

      if (selectedBay !== "ALL" && slot.code !== selectedBay) {
        return false;
      }

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTracking = p.trackingNumber.toLowerCase().includes(q);
        const matchType = p.parcelType.toLowerCase().includes(q);
        const matchArea = p.deliveryAddress?.area?.toLowerCase().includes(q);
        const matchCity = p.deliveryAddress?.city?.toLowerCase().includes(q);
        const matchShelf = slot.shelf.toLowerCase().includes(q);
        if (
          !matchTracking &&
          !matchType &&
          !matchArea &&
          !matchCity &&
          !matchShelf
        ) {
          return false;
        }
      }

      return true;
    });
  }, [parcelsInHub, selectedBay, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        category="WAREHOUSE TELEMETRY / INVENTORY RECONCILIATION"
        title="Bay Inventory & Storage Capacity."
        description="Monitor physical bay floor utilization, rack allocations, and warehouse holding stock before linehaul dispatch or courier handover."
        badgeIcon={Warehouse}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2 font-mono text-xs"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", isFetching && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh Bay Audit</span>
          </Button>
        }
      />

      {/* Storage Bay Occupancy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Bay A */}
        <Card
          onClick={() =>
            setSelectedBay(selectedBay === "BAY_A" ? "ALL" : "BAY_A")
          }
          className={cn(
            "rounded-none border transition-all cursor-pointer",
            selectedBay === "BAY_A"
              ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500"
              : "border-border bg-card hover:bg-muted/40",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Bay Section A
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-mono border-amber-500/40 text-amber-600 dark:text-amber-400"
              >
                INTAKE DOCK
              </Badge>
            </div>
            <CardTitle className="text-sm font-heading font-bold uppercase mt-1">
              Inbound Staging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-xl font-bold text-foreground">
                {bayCapacity.bayA.count}
                <span className="text-xs text-muted-foreground font-normal">
                  {" "}
                  / {bayCapacity.bayA.max} slots
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {bayCapacity.bayA.percent}% utilized
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${bayCapacity.bayA.percent}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-sans">
              Driver drop-offs & incoming pickups undergoing initial check-in.
            </p>
          </CardContent>
        </Card>

        {/* Bay B */}
        <Card
          onClick={() =>
            setSelectedBay(selectedBay === "BAY_B" ? "ALL" : "BAY_B")
          }
          className={cn(
            "rounded-none border transition-all cursor-pointer",
            selectedBay === "BAY_B"
              ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500"
              : "border-border bg-card hover:bg-muted/40",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Bay Section B
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-mono border-purple-500/40 text-purple-600 dark:text-purple-400"
              >
                LINEHAUL
              </Badge>
            </div>
            <CardTitle className="text-sm font-heading font-bold uppercase mt-1">
              Outbound Linehaul Staging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-xl font-bold text-foreground">
                {bayCapacity.bayB.count}
                <span className="text-xs text-muted-foreground font-normal">
                  {" "}
                  / {bayCapacity.bayB.max} slots
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {bayCapacity.bayB.percent}% utilized
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${bayCapacity.bayB.percent}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-sans">
              Sorted parcels staged for containerization and inter-hub trucks.
            </p>
          </CardContent>
        </Card>

        {/* Bay C */}
        <Card
          onClick={() =>
            setSelectedBay(selectedBay === "BAY_C" ? "ALL" : "BAY_C")
          }
          className={cn(
            "rounded-none border transition-all cursor-pointer",
            selectedBay === "BAY_C"
              ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500"
              : "border-border bg-card hover:bg-muted/40",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Bay Section C
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-mono border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              >
                FINAL MILE
              </Badge>
            </div>
            <CardTitle className="text-sm font-heading font-bold uppercase mt-1">
              Destination Hold Bay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-xl font-bold text-foreground">
                {bayCapacity.bayC.count}
                <span className="text-xs text-muted-foreground font-normal">
                  {" "}
                  / {bayCapacity.bayC.max} slots
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {bayCapacity.bayC.percent}% utilized
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${bayCapacity.bayC.percent}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-sans">
              Parcels received from linehauls ready for local delivery courier
              assignment.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tracking, shelf, area..."
            className="pl-8 text-xs font-mono h-9 rounded-none border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedBay}
            onValueChange={(val) => setSelectedBay(val as BayCategory)}
          >
            <SelectTrigger className="h-9 text-xs font-mono rounded-none border-border w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="ALL" className="text-xs font-mono">
                All Bay Sections ({parcelsInHub.length})
              </SelectItem>
              <SelectItem value="BAY_A" className="text-xs font-mono">
                Bay A: Inbound ({bayCapacity.bayA.count})
              </SelectItem>
              <SelectItem value="BAY_B" className="text-xs font-mono">
                Bay B: Linehaul ({bayCapacity.bayB.count})
              </SelectItem>
              <SelectItem value="BAY_C" className="text-xs font-mono">
                Bay C: Destination ({bayCapacity.bayC.count})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bay Item Ledger */}
      <Card className="rounded-none border-border bg-card overflow-hidden">
        <CardHeader className="bg-muted/30 py-3 px-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-primary" />
            <CardTitle className="text-xs font-mono uppercase tracking-wider font-semibold">
              Bay Inventory Ledger ({filteredParcels.length} items docked)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-16 text-center space-y-2 font-mono text-xs text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin mx-auto text-primary" />
              <p>Scanning physical warehouse racks...</p>
            </div>
          ) : filteredParcels.length === 0 ? (
            <div className="py-16 text-center space-y-2 font-mono">
              <Package className="h-8 w-8 mx-auto text-muted-foreground stroke-1" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                No parcels stored in the selected bay section.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
                  <TableRow className="border-border">
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Waybill / Cargo
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Bay Location & Shelf
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Routing Terminals
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Weight & Service
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Terminal Status
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground text-right">
                      Inter-Hub Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border/60">
                  {filteredParcels.map((shipment) => {
                    const slot = getBaySlot(shipment);
                    const canLinehaul =
                      shipment.status === "AT_ORIGIN_HUB" ||
                      shipment.status === "PICKED_UP";

                    return (
                      <TableRow
                        key={shipment.id}
                        className="hover:bg-muted/40 transition-colors border-border/60"
                      >
                        <TableCell className="py-3 px-4 font-mono text-xs">
                          <span className="font-bold text-foreground block">
                            {shipment.trackingNumber}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                            {shipment.parcelType} •{" "}
                            {new Date(shipment.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4 font-mono text-xs">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] font-mono rounded-none uppercase block w-fit mb-0.5",
                              slot.code === "BAY_A" &&
                                "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10",
                              slot.code === "BAY_B" &&
                                "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10",
                              slot.code === "BAY_C" &&
                                "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
                            )}
                          >
                            {slot.shelf}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {slot.label}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4 font-mono text-xs">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <span>
                              {shipment.originHub?.name || "Local Depot"}
                            </span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="font-semibold text-primary">
                              {shipment.destinationHub?.name ||
                                "Destination Hub"}
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground block">
                            {shipment.deliveryAddress?.area},{" "}
                            {shipment.deliveryAddress?.city}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4 font-mono text-xs">
                          <span className="font-bold text-foreground">
                            {shipment.weight} kg
                          </span>
                          <span className="block text-[10px] text-muted-foreground uppercase">
                            {shipment.deliveryType}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <StatusBadge status={shipment.status} />
                        </TableCell>
                        <TableCell className="py-3 px-4 text-right">
                          {canLinehaul ? (
                            <Button
                              type="button"
                              variant="outline"
                              size="xs"
                              onClick={() => setDispatchShipment(shipment)}
                              className="gap-1 font-mono text-xs border-purple-500/40 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 hover:text-purple-600 rounded-none"
                            >
                              <ArrowRightLeft className="h-3 w-3" />
                              Linehaul Dispatch
                            </Button>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-mono text-muted-foreground border-border bg-muted/40 rounded-none uppercase"
                            >
                              Final Mile Hold
                            </Badge>
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

      {/* Inter-Hub Linehaul Dispatch Modal */}
      <HubDispatchTransferModal
        isOpen={!!dispatchShipment}
        shipment={dispatchShipment}
        onClose={() => setDispatchShipment(null)}
        hubs={hubs}
      />
    </div>
  );
}
