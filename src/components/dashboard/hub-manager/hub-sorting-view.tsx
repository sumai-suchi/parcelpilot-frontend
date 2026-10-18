"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownNarrowWide,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpNarrowWide,
  Boxes,
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  Package,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Truck,
  Weight,
  Zap,
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

type SortField =
  | "weight"
  | "createdAt"
  | "priority"
  | "destination"
  | "tracking";
type SortDirection = "asc" | "desc";
type DeliveryFilter = "ALL" | "SAME_DAY" | "EXPRESS" | "STANDARD";
type WeightClass = "ALL" | "LIGHT" | "MEDIUM" | "HEAVY";
type LaneFilter =
  | "ALL"
  | "METRO_SPEED"
  | "LINEHAUL_OUTBOUND"
  | "FINAL_MILE_BAY"
  | "BULK_FREIGHT";

export function HubSortingView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [deliveryFilter, setDeliveryFilter] = useState<DeliveryFilter>("ALL");
  const [destinationHubFilter, setDestinationHubFilter] =
    useState<string>("ALL");
  const [weightClassFilter, setWeightClassFilter] =
    useState<WeightClass>("ALL");
  const [selectedLane, setSelectedLane] = useState<LaneFilter>("ALL");
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

  const rawParcels = useMemo(() => shipmentsRes?.data || [], [shipmentsRes]);

  // Only parcels physically in the hub sorting environment
  const parcelsAtHub = useMemo(
    () =>
      rawParcels.filter(
        (s) =>
          s.status === "AT_ORIGIN_HUB" ||
          s.status === "AT_DESTINATION_HUB" ||
          s.status === "PICKED_UP",
      ),
    [rawParcels],
  );

  const getWeightNumber = (w: number | string) => {
    const n = typeof w === "number" ? w : parseFloat(w);
    return isNaN(n) ? 0 : n;
  };

  // Sorting lane allocation helper
  const getSortingLane = (shipment: OperationsShipment) => {
    const weightNum = getWeightNumber(shipment.weight);
    if (weightNum >= 10) return "BULK_FREIGHT";
    if (
      shipment.deliveryType === "SAME_DAY" ||
      shipment.deliveryType === "EXPRESS"
    )
      return "METRO_SPEED";
    if (shipment.status === "AT_DESTINATION_HUB") return "FINAL_MILE_BAY";
    return "LINEHAUL_OUTBOUND";
  };

  // Metrics for Sorting Lanes
  const laneMetrics = useMemo(() => {
    let metro = 0;
    let linehaul = 0;
    let finalMile = 0;
    let bulk = 0;

    parcelsAtHub.forEach((p) => {
      const lane = getSortingLane(p);
      if (lane === "METRO_SPEED") metro++;
      else if (lane === "LINEHAUL_OUTBOUND") linehaul++;
      else if (lane === "FINAL_MILE_BAY") finalMile++;
      else if (lane === "BULK_FREIGHT") bulk++;
    });

    return { metro, linehaul, finalMile, bulk };
  }, [parcelsAtHub]);

  // Filtering logic
  const filteredParcels = useMemo(() => {
    return parcelsAtHub.filter((p) => {
      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTracking = p.trackingNumber.toLowerCase().includes(q);
        const matchType = p.parcelType.toLowerCase().includes(q);
        const matchArea = p.deliveryAddress?.area?.toLowerCase().includes(q);
        const matchCity = p.deliveryAddress?.city?.toLowerCase().includes(q);
        const matchDestHub = p.destinationHub?.name?.toLowerCase().includes(q);
        const matchOriginHub = p.originHub?.name?.toLowerCase().includes(q);
        if (
          !matchTracking &&
          !matchType &&
          !matchArea &&
          !matchCity &&
          !matchDestHub &&
          !matchOriginHub
        ) {
          return false;
        }
      }

      // Delivery tier filter
      if (deliveryFilter !== "ALL" && p.deliveryType !== deliveryFilter) {
        return false;
      }

      // Destination Hub filter
      if (
        destinationHubFilter !== "ALL" &&
        p.destinationHubId !== destinationHubFilter
      ) {
        return false;
      }

      // Weight class filter
      const w = getWeightNumber(p.weight);
      if (weightClassFilter === "LIGHT" && w >= 3) return false;
      if (weightClassFilter === "MEDIUM" && (w < 3 || w > 10)) return false;
      if (weightClassFilter === "HEAVY" && w <= 10) return false;

      // Lane filter
      if (selectedLane !== "ALL" && getSortingLane(p) !== selectedLane) {
        return false;
      }

      return true;
    });
  }, [
    parcelsAtHub,
    searchTerm,
    deliveryFilter,
    destinationHubFilter,
    weightClassFilter,
    selectedLane,
  ]);

  // Sorting logic
  const sortedParcels = useMemo(() => {
    const list = [...filteredParcels];

    const priorityWeight: Record<string, number> = {
      SAME_DAY: 3,
      EXPRESS: 2,
      STANDARD: 1,
    };

    list.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "weight":
          comparison = getWeightNumber(a.weight) - getWeightNumber(b.weight);
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "priority": {
          const aPriority = priorityWeight[a.deliveryType] || 0;
          const bPriority = priorityWeight[b.deliveryType] || 0;
          comparison = aPriority - bPriority;
          break;
        }
        case "destination": {
          const aDest = a.destinationHub?.name || a.deliveryAddress?.city || "";
          const bDest = b.destinationHub?.name || b.deliveryAddress?.city || "";
          comparison = aDest.localeCompare(bDest);
          break;
        }
        case "tracking":
          comparison = a.trackingNumber.localeCompare(b.trackingNumber);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return list;
  }, [filteredParcels, sortField, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortField("createdAt");
    setSortDirection("desc");
    setDeliveryFilter("ALL");
    setDestinationHubFilter("ALL");
    setWeightClassFilter("ALL");
    setSelectedLane("ALL");
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    deliveryFilter !== "ALL" ||
    destinationHubFilter !== "ALL" ||
    weightClassFilter !== "ALL" ||
    selectedLane !== "ALL";

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        category="LOGISTICS INTAKE / TERMINAL OPERATIONS"
        title="Sorting Operations & Conveyor Lanes."
        description="Multi-factor shipment classification, FIFO queue prioritization, and destination terminal routing for physical bay operations."
        badgeIcon={SlidersHorizontal}
        actions={
          <div className="flex items-center gap-2">
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
              <span className="hidden sm:inline">Refresh Sorting Queue</span>
            </Button>
          </div>
        }
      />

      {/* Sorting Lane Interactive Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() =>
            setSelectedLane(
              selectedLane === "METRO_SPEED" ? "ALL" : "METRO_SPEED",
            )
          }
          className={cn(
            "p-3.5 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between",
            selectedLane === "METRO_SPEED"
              ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary"
              : "border-border bg-card hover:bg-muted/50",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Lane 01 • Metro Priority
            </span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-mono font-bold text-foreground">
              {laneMetrics.metro}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Same-day & Express parcels awaiting priority routing
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedLane(
              selectedLane === "LINEHAUL_OUTBOUND"
                ? "ALL"
                : "LINEHAUL_OUTBOUND",
            )
          }
          className={cn(
            "p-3.5 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between",
            selectedLane === "LINEHAUL_OUTBOUND"
              ? "border-purple-500 bg-purple-500/10 shadow-xs ring-1 ring-purple-500"
              : "border-border bg-card hover:bg-muted/50",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Lane 02 • Inter-Hub Outbound
            </span>
            <ArrowRightLeft className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-mono font-bold text-foreground">
              {laneMetrics.linehaul}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Parcels requiring linehaul transfer to regional hubs
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedLane(
              selectedLane === "FINAL_MILE_BAY" ? "ALL" : "FINAL_MILE_BAY",
            )
          }
          className={cn(
            "p-3.5 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between",
            selectedLane === "FINAL_MILE_BAY"
              ? "border-emerald-500 bg-emerald-500/10 shadow-xs ring-1 ring-emerald-500"
              : "border-border bg-card hover:bg-muted/50",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Lane 03 • Local Destination Bay
            </span>
            <Boxes className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-mono font-bold text-foreground">
              {laneMetrics.finalMile}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Docked at destination hub ready for dispatch
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedLane(
              selectedLane === "BULK_FREIGHT" ? "ALL" : "BULK_FREIGHT",
            )
          }
          className={cn(
            "p-3.5 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between",
            selectedLane === "BULK_FREIGHT"
              ? "border-blue-500 bg-blue-500/10 shadow-xs ring-1 ring-blue-500"
              : "border-border bg-card hover:bg-muted/50",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Lane 04 • Heavy Freight
            </span>
            <Weight className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-mono font-bold text-foreground">
              {laneMetrics.bulk}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Heavy cargo (≥ 10kg) requiring palletized handling
            </p>
          </div>
        </button>
      </div>

      {/* Sorting & Filter Controls Toolbar */}
      <Card className="rounded-none border-border bg-card p-4 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tracking #, city, area, cargo type..."
              className="pl-8 text-xs font-mono h-9 rounded-none border-border"
            />
          </div>

          {/* Primary Sort Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-muted/60 px-2 py-1 border border-border">
              <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
                Sort By:
              </span>
              <Select
                value={sortField}
                onValueChange={(val) => setSortField(val as SortField)}
              >
                <SelectTrigger className="h-7 text-xs font-mono border-0 bg-transparent shadow-none focus:ring-0 w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="createdAt" className="text-xs font-mono">
                    Dock Time (FIFO)
                  </SelectItem>
                  <SelectItem value="weight" className="text-xs font-mono">
                    Weight Class
                  </SelectItem>
                  <SelectItem value="priority" className="text-xs font-mono">
                    Delivery Urgency
                  </SelectItem>
                  <SelectItem value="destination" className="text-xs font-mono">
                    Destination Hub
                  </SelectItem>
                  <SelectItem value="tracking" className="text-xs font-mono">
                    Tracking Number
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="xs"
                onClick={toggleSortDirection}
                className="h-6 w-6 p-0 hover:bg-muted"
                title={`Sort ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
              >
                {sortDirection === "asc" ? (
                  <ArrowUpNarrowWide className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <ArrowDownNarrowWide className="h-3.5 w-3.5 text-primary" />
                )}
              </Button>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="xs"
                onClick={handleResetFilters}
                className="font-mono text-xs text-muted-foreground hover:text-foreground h-7"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* Filter Badges and Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-border/60">
          {/* Delivery Tier Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-muted-foreground font-semibold mb-1">
              Service Tier
            </label>
            <Select
              value={deliveryFilter}
              onValueChange={(val) => setDeliveryFilter(val as DeliveryFilter)}
            >
              <SelectTrigger className="h-8 text-xs font-mono rounded-none border-border">
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="ALL" className="text-xs font-mono">
                  All Service Tiers
                </SelectItem>
                <SelectItem value="SAME_DAY" className="text-xs font-mono">
                  SAME_DAY (Hyperlocal)
                </SelectItem>
                <SelectItem value="EXPRESS" className="text-xs font-mono">
                  EXPRESS (Fast Priority)
                </SelectItem>
                <SelectItem value="STANDARD" className="text-xs font-mono">
                  STANDARD (Regular)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Destination Hub Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-muted-foreground font-semibold mb-1">
              Destination Terminal
            </label>
            <Select
              value={destinationHubFilter}
              onValueChange={(val) => setDestinationHubFilter(val ?? "ALL")}
            >
              <SelectTrigger className="h-8 text-xs font-mono rounded-none border-border">
                <SelectValue placeholder="All Destination Hubs" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="ALL" className="text-xs font-mono">
                  All Destination Terminals
                </SelectItem>
                {hubs.map((hub) => (
                  <SelectItem
                    key={hub.id}
                    value={hub.id}
                    className="text-xs font-mono"
                  >
                    {hub.name} ({hub.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Weight Class Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-muted-foreground font-semibold mb-1">
              Weight Classification
            </label>
            <Select
              value={weightClassFilter}
              onValueChange={(val) => setWeightClassFilter(val as WeightClass)}
            >
              <SelectTrigger className="h-8 text-xs font-mono rounded-none border-border">
                <SelectValue placeholder="All Weight Classes" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="ALL" className="text-xs font-mono">
                  All Weight Classes
                </SelectItem>
                <SelectItem value="LIGHT" className="text-xs font-mono">
                  Light Freight (&lt; 3 kg)
                </SelectItem>
                <SelectItem value="MEDIUM" className="text-xs font-mono">
                  Medium Cargo (3 - 10 kg)
                </SelectItem>
                <SelectItem value="HEAVY" className="text-xs font-mono">
                  Heavy Freight (&gt; 10 kg)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Sorted Shipment Manifest Table */}
      <Card className="rounded-none border-border bg-card overflow-hidden">
        <CardHeader className="bg-muted/30 py-3 px-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <CardTitle className="text-xs font-mono uppercase tracking-wider font-semibold">
              Sorted Bay Manifest ({sortedParcels.length} parcels)
            </CardTitle>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Current Order: {sortField.toUpperCase()} (
            {sortDirection.toUpperCase()})
          </span>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-16 text-center space-y-2 font-mono text-xs text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin mx-auto text-primary" />
              <p>Reconciling terminal sort queues...</p>
            </div>
          ) : sortedParcels.length === 0 ? (
            <div className="py-16 text-center space-y-2 font-mono">
              <Package className="h-8 w-8 mx-auto text-muted-foreground stroke-1" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                No parcels match the current sorting parameters or filter
                criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
                  <TableRow className="border-border">
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Waybill / Cargo Type
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Service Tier
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Routing Terminals
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Weight & Bay Lane
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground">
                      Hub Status
                    </TableHead>
                    <TableHead className="py-3 px-4 font-semibold text-muted-foreground text-right">
                      Sorting Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border/60">
                  {sortedParcels.map((shipment) => {
                    const lane = getSortingLane(shipment);
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
                              "text-[10px] font-mono rounded-none uppercase",
                              shipment.deliveryType === "SAME_DAY" &&
                                "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 font-bold",
                              shipment.deliveryType === "EXPRESS" &&
                                "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold",
                              shipment.deliveryType === "STANDARD" &&
                                "border-border bg-muted text-muted-foreground",
                            )}
                          >
                            {shipment.deliveryType}
                          </Badge>
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
                          <div className="mt-0.5">
                            {lane === "METRO_SPEED" && (
                              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                                Lane 01 (Speed)
                              </span>
                            )}
                            {lane === "LINEHAUL_OUTBOUND" && (
                              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">
                                Lane 02 (Linehaul)
                              </span>
                            )}
                            {lane === "FINAL_MILE_BAY" && (
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                                Lane 03 (Local Bay)
                              </span>
                            )}
                            {lane === "BULK_FREIGHT" && (
                              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                                Lane 04 (Bulk)
                              </span>
                            )}
                          </div>
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
                              Terminal Stored
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
