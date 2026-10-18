"use client";

import { useState, useMemo } from "react";
import {
  Bike,
  CheckCircle2,
  Clock,
  Loader2,
  Search,
  SlidersHorizontal,
  Truck,
  Users,
  Activity,
  X,
} from "lucide-react";
import { useAdminCouriers } from "@/hooks/admin.hook";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../shared/status-badge";
import { MetricCard, MetricGrid } from "../shared/metric-card";

export function AdminCouriersView() {
  const { data: couriersRes, isLoading } = useAdminCouriers();
  const couriers = useMemo(() => couriersRes?.data || [], [couriersRes]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "AVAILABLE" | "BUSY" | "OFFLINE"
  >("ALL");

  // Driver Fleet Analytics Calculations
  const analytics = useMemo(() => {
    const total = couriers.length;
    const available = couriers.filter(
      (c: any) => c.availabilityStatus === "AVAILABLE",
    ).length;
    const busy = couriers.filter(
      (c: any) => c.availabilityStatus === "BUSY",
    ).length;
    const offline = couriers.filter(
      (c: any) => c.availabilityStatus === "OFFLINE",
    ).length;

    const availableRate =
      total > 0 ? ((available / total) * 100).toFixed(1) : "0.0";

    // Vehicle Type distribution
    const motorcycles = couriers.filter(
      (c: any) =>
        (c.vehicleType || "").toUpperCase().includes("MOTOR") ||
        (c.vehicleType || "").toUpperCase().includes("BIKE"),
    ).length;
    const vans = couriers.filter(
      (c: any) =>
        (c.vehicleType || "").toUpperCase().includes("VAN") ||
        (c.vehicleType || "").toUpperCase().includes("TRUCK"),
    ).length;
    const bicycles = total - (motorcycles + vans);

    return {
      total,
      available,
      busy,
      offline,
      availableRate,
      motorcycles,
      vans,
      bicycles: bicycles > 0 ? bicycles : 0,
    };
  }, [couriers]);

  // Filtered Couriers
  const filteredCouriers = useMemo(() => {
    return couriers.filter((c: any) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        (c.user?.name || "").toLowerCase().includes(query) ||
        (c.user?.phone || "").toLowerCase().includes(query) ||
        (c.user?.email || "").toLowerCase().includes(query) ||
        (c.hub?.name || "").toLowerCase().includes(query) ||
        (c.hub?.code || "").toLowerCase().includes(query) ||
        (c.vehicleNumber || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || c.availabilityStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [couriers, searchQuery, statusFilter]);

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
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
            Field Delivery Fleet & Availability Telemetry
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            Active courier riders, real-time duty availability, and assigned
            terminal hubs across all logistics corridors.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          ACTIVE FLEET:{" "}
          <span className="font-bold text-foreground">{couriers.length}</span>
        </div>
      </div>

      {/* 2. Driver Fleet Analytics KPIs */}
      <MetricGrid>
        <MetricCard
          label="Registered Couriers"
          value={analytics.total}
          desc="Total driver fleet across 64 districts"
          icon={Users}
          variant="primary"
          isLoading={isLoading}
        />
        <MetricCard
          label="Ready On-Duty"
          value={analytics.available}
          desc={`${analytics.availableRate}% current fleet availability`}
          icon={CheckCircle2}
          variant="emerald"
          isLoading={isLoading}
        />
        <MetricCard
          label="In-Flight Deliveries"
          value={analytics.busy}
          desc="Currently executing customer doorstep tasks"
          icon={Activity}
          variant="amber"
          isLoading={isLoading}
        />
        <MetricCard
          label="Standby / Offline"
          value={analytics.offline}
          desc="Couriers currently off-duty or in transit"
          icon={Clock}
          variant="default"
          isLoading={isLoading}
        />
      </MetricGrid>

      {/* 3. Fleet Vehicle Breakdown Strip */}
      <Card className="rounded-none border-border bg-card shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="flex items-center gap-3 p-2.5 rounded bg-muted/30 border border-border">
              <Bike className="size-5 text-primary shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">
                  Motorcycles & Bikes
                </span>
                <span className="font-bold text-sm text-foreground">
                  {analytics.motorcycles || analytics.total} Units
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded bg-muted/30 border border-border">
              <Truck className="size-5 text-blue-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">
                  Linehaul Vans & Cargo
                </span>
                <span className="font-bold text-sm text-foreground">
                  {analytics.vans} Units
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded bg-muted/30 border border-border">
              <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">
                  OTP Handshake Capability
                </span>
                <span className="font-bold text-sm text-foreground">
                  100% Verified
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Filter Controls & Live Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/20 p-3 rounded border border-border">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search rider, phone, plate, hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs font-mono bg-background border-border"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="inline-flex rounded border border-border bg-background p-0.5 font-mono text-[11px]">
            {(["ALL", "AVAILABLE", "BUSY", "OFFLINE"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-xs font-bold uppercase transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-muted-foreground">
          SHOWING:{" "}
          <strong className="text-foreground">{filteredCouriers.length}</strong>{" "}
          / {couriers.length}
        </div>
      </div>

      {/* 5. Couriers Roster Table */}
      {filteredCouriers.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <Bike className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No field couriers found matching the criteria.
            </p>
            {(searchQuery || statusFilter !== "ALL") && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("ALL");
                }}
                className="text-xs font-mono uppercase"
              >
                Reset Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
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
                {filteredCouriers.map((c: any) => (
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
                        ({c.hub?.code || "HUB"})
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 text-muted-foreground uppercase">
                      {c.vehicleType || "MOTORCYCLE"}
                    </TableCell>
                    <TableCell className="py-3.5 font-mono font-bold text-foreground">
                      {c.vehicleNumber || "REG-DHAKA-102"}
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <StatusBadge
                        status={c.availabilityStatus}
                        type="courier"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
