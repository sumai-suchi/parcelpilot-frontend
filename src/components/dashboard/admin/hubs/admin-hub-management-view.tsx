"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Building2,
  CheckCircle2,
  FileJson,
  Filter,
  Loader2,
  MapPin,
  Package,
  Phone,
  Plus,
  Search,
  Truck,
  Users,
} from "lucide-react";
import { useAdminHubs } from "@/hooks/admin.hook";
import type { AdminHubItem } from "@/types/admin.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { AddHubDrawer } from "./add-hub-drawer";
import { ImportHubsModal } from "./import-hubs-modal";

export function AdminHubManagementView() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const { data: hubsRes, isLoading } = useAdminHubs();
  const hubs: AdminHubItem[] = hubsRes?.data || [];

  // Metrics calculations
  const stats = useMemo(() => {
    const total = hubs.length;
    const active = hubs.filter((h) => h.isActive).length;
    const totalCouriers = hubs.reduce(
      (sum, h) => sum + (h._count?.couriers || 0),
      0,
    );
    const totalShipmentActivity = hubs.reduce(
      (sum, h) =>
        sum +
        (h._count?.originShipments || 0) +
        (h._count?.destinationShipments || 0),
      0,
    );
    return { total, active, totalCouriers, totalShipmentActivity };
  }, [hubs]);

  // Filtered hubs
  const filteredHubs = useMemo(() => {
    return hubs.filter((hub) => {
      const matchesSearch =
        hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hub.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hub.zone?.name &&
          hub.zone.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && hub.isActive) ||
        (statusFilter === "INACTIVE" && !hub.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [hubs, searchQuery, statusFilter]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <DashboardHeader
        category="FACILITY INFRASTRUCTURE / SYSTEM HUBS"
        title="Logistics Hub Management."
        description="Configure, inspect, and deploy physical distribution centers, regional sorting nodes, and linehaul terminals across all operational zones."
        badgeIcon={Building2}
        actions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsImportModalOpen(true)}
              className="rounded-none border-border bg-card hover:bg-muted text-foreground font-mono uppercase text-xs h-10 px-4 gap-2 cursor-pointer shadow-xs w-full sm:w-auto justify-center"
            >
              <FileJson className="h-4 w-4 text-primary shrink-0" />
              <span>Import JSON</span>
            </Button>
            <Button
              type="button"
              onClick={() => setIsAddDrawerOpen(true)}
              className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 px-5 gap-2 cursor-pointer shadow-xs w-full sm:w-auto justify-center"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span>Add Logistics Hub</span>
            </Button>
          </div>
        }
      />

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-none border-border bg-card shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                Total Hub Terminals
              </span>
              <span className="text-2xl font-bold font-mono text-foreground">
                {isLoading ? "—" : stats.total}
              </span>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-none">
              <Building2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border bg-card shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                Operational Nodes
              </span>
              <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {isLoading ? "—" : stats.active}
              </span>
            </div>
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-none">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border bg-card shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                Stationed Couriers
              </span>
              <span className="text-2xl font-bold font-mono text-foreground">
                {isLoading ? "—" : stats.totalCouriers}
              </span>
            </div>
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-none">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border bg-card shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                Waybill Intake Volume
              </span>
              <span className="text-2xl font-bold font-mono text-foreground">
                {isLoading ? "—" : stats.totalShipmentActivity}
              </span>
            </div>
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-none">
              <Package className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-border/70 pb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by hub name, code, address, or zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-none border-border h-10 font-sans text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Filter className="h-3 w-3" />
            <span>Status:</span>
          </span>
          <div className="flex items-center border border-border">
            {(["ALL", "ACTIVE", "INACTIVE"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hub Listings */}
      {isLoading ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-10 sm:p-16 text-center space-y-3 font-mono">
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-primary" />
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              Retrieving physical sorting hub directory from database...
            </span>
          </CardContent>
        </Card>
      ) : filteredHubs.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-10 sm:p-16 text-center space-y-4">
            <Building2 className="mx-auto h-10 w-10 text-muted-foreground stroke-1" />
            <div className="space-y-1">
              <h3 className="font-heading text-base font-bold text-foreground uppercase tracking-tight">
                No Matching Logistics Hubs
              </h3>
              <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
                {searchQuery || statusFilter !== "ALL"
                  ? "No hubs matched your active search query or filter selection."
                  : "No physical sorting facilities configured in the database yet. Click below to add the first hub."}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setIsAddDrawerOpen(true)}
              className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase text-xs h-9 px-4 gap-2 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add First Logistics Hub</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredHubs.map((hub) => (
            <Card
              key={hub.id}
              className="rounded-none border-border bg-card shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Hub Header with Code & Status */}
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 tracking-wider">
                    {hub.code}
                  </span>
                  <StatusBadge
                    status={hub.isActive ? "ACTIVE" : "INACTIVE"}
                    type="account"
                  />
                </div>

                {/* Hub Title and Details */}
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-foreground font-heading">
                    {hub.name}
                  </h4>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="font-mono text-xs leading-relaxed line-clamp-2">
                      {hub.address}
                    </p>
                  </div>
                </div>

                {/* Zone & Contact telemetry */}
                <div className="p-3 bg-muted/20 border border-border/60 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground uppercase">
                      Assigned Zone:
                    </span>
                    <span className="font-bold text-foreground">
                      {hub.zone?.name || "Unassigned"} ({hub.zone?.code || "—"})
                    </span>
                  </div>

                  {hub.phone && (
                    <div className="flex items-center justify-between pt-1 border-t border-border/40">
                      <span className="text-[11px] text-muted-foreground uppercase">
                        Direct Phone:
                      </span>
                      <span className="text-foreground">{hub.phone}</span>
                    </div>
                  )}
                </div>

                {/* Capacity & Throughput Counter */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/60 text-center font-mono">
                  <div className="p-2 border border-border/40 bg-muted/10">
                    <span className="text-[10px] text-muted-foreground uppercase block">
                      Couriers
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {hub._count?.couriers ?? 0}
                    </span>
                  </div>
                  <div className="p-2 border border-border/40 bg-muted/10">
                    <span className="text-[10px] text-muted-foreground uppercase block">
                      Waybills
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {(hub._count?.originShipments ?? 0) +
                        (hub._count?.destinationShipments ?? 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Hub Slide-over Side Modal */}
      <AddHubDrawer
        open={isAddDrawerOpen}
        onOpenChange={setIsAddDrawerOpen}
      />

      {/* Import Hubs JSON Modal */}
      <ImportHubsModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
      />
    </div>
  );
}
