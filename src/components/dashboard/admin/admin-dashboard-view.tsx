"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bike,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Coins,
  FileText,
  Layers,
  MapPin,
  Package,
  Shield,
  ShieldAlert,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useAdminOverview } from "@/hooks/admin.hook";
import type { AdminUserItem } from "@/types/admin.interface";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "../shared/dashboard-header";
import { StatusBadge } from "../shared/status-badge";
import { AdminCouriersView } from "./admin-couriers-view";
import { AdminHubsView } from "./admin-hubs-view";
import { AdminOverviewStats } from "./admin-overview-stats";
import { AdminRevenueMetrics } from "./admin-revenue-metrics";
import { AdminRoleApplicationsView } from "./admin-role-applications-view";
import { AdminShipmentAnalytics } from "./admin-shipment-analytics";
import { AdminUserManagementTable } from "./admin-user-management-table";
import { AdminUserStatusDialog } from "./admin-user-status-dialog";
import { cn } from "@/lib/utils";

type AdminTab =
  | "overview"
  | "shipments"
  | "users"
  | "applications"
  | "fleet"
  | "hubs"
  | "revenue";

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedUserForStatus, setSelectedUserForStatus] =
    useState<AdminUserItem | null>(null);

  const { data: overviewRes, isLoading: isOverviewLoading } =
    useAdminOverview();
  const overview = overviewRes?.data;

  const totalUsers = overview?.usersByRole
    ? Object.values(overview.usersByRole).reduce((a, b) => a + b, 0)
    : 0;

  const tabs: Array<{
    id: AdminTab;
    label: string;
    icon: typeof ShieldAlert;
    url?: string;
  }> = [
    { id: "overview", label: "Executive Overview", icon: ShieldAlert },
    {
      id: "shipments",
      label: "Shipment Analytics",
      icon: Package,
    },
    {
      id: "users",
      label: "Workforce & Users",
      icon: Users,
      url: "/admin/users",
    },
    {
      id: "fleet",
      label: "Delivery Fleet",
      icon: Bike,
      url: "/admin/fleet",
    },
    {
      id: "hubs",
      label: "Logistics Hubs",
      icon: Building2,
      url: "/admin/hubs",
    },
    {
      id: "revenue",
      label: "Revenue & Payments",
      icon: Coins,
      url: "/admin/revenue",
    },
    {
      id: "applications",
      label: "Role Applications",
      icon: ClipboardCheck,
      url: "/admin/applications",
    },
  ];

  const modules = [
    {
      title: "Workforce & Users",
      description:
        "Manage customer accounts, couriers, hub managers, and operations staff with role access controls.",
      icon: Users,
      href: "/admin/users",
      metricLabel: "Total Accounts",
      metricValue: `${totalUsers.toLocaleString()} Users`,
      badge: "Governance",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
    {
      title: "Driver Fleet Telemetry",
      description:
        "Live courier roster, duty availability status, vehicle classification, and delivery execution.",
      icon: Bike,
      href: "/admin/fleet",
      metricLabel: "Registered Fleet",
      metricValue: `${overview?.usersByRole?.COURIER || 0} Couriers`,
      badge: "Last-Mile",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    {
      title: "Hub Network Management",
      description:
        "Physical sorting hubs, regional distribution nodes, and multi-district linehaul terminals.",
      icon: Building2,
      href: "/admin/hubs",
      metricLabel: "Infrastructure",
      metricValue: `${overview?.infrastructure?.activeHubs || 0} Active Hubs`,
      badge: "Logistics",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      title: "Revenue & Payments",
      description:
        "Live Stripe multi-channel cashflow analytics, escrow pipeline monitoring, and financial audit ledger.",
      icon: Coins,
      href: "/admin/revenue",
      metricLabel: "Platform Volume",
      metricValue: `৳${(overview?.totalRevenue || 0).toLocaleString()}`,
      badge: "Settlement",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    {
      title: "Role Upgrade Applications",
      description:
        "Audit and review candidate credential applications for Courier, Hub Manager, or Operations roles.",
      icon: ClipboardCheck,
      href: "/admin/applications",
      metricLabel: "Verification",
      metricValue: "Audit Registry",
      badge: "Personnel",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
  ];

  const shipmentStatuses = overview?.shipmentsByStatus || {};
  const totalShipments = overview?.totalShipments || 0;

  const statusConfigs: Record<
    string,
    { label: string; color: string; border: string; bg: string }
  > = {
    DELIVERED: {
      label: "Delivered",
      color: "text-emerald-600",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
    },
    IN_TRANSIT: {
      label: "In Transit",
      color: "text-blue-600",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
    },
    RECEIVED_AT_HUB: {
      label: "At Sorting Hub",
      color: "text-amber-600",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
    },
    OUT_FOR_DELIVERY: {
      label: "Out For Delivery",
      color: "text-indigo-600",
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10",
    },
    PICKED_UP: {
      label: "Picked Up",
      color: "text-cyan-600",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
    },
    PENDING: {
      label: "Pending Pickup",
      color: "text-muted-foreground",
      border: "border-border",
      bg: "bg-muted/40",
    },
    CANCELLED: {
      label: "Cancelled",
      color: "text-rose-600",
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
    },
    RETURNED: {
      label: "Returned",
      color: "text-orange-600",
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
    },
  };

  return (
    <div className="space-y-8">
      {/* Reusable Dashboard Header */}
      <DashboardHeader
        category="SYSTEM GOVERNANCE / PLATFORM CONTROL"
        title="Overview & Analytics."
        description="Unified command center monitoring live network telemetry, shipment pipelines, workforce capacity, and financial cashflow."
        badgeIcon={ShieldAlert}
      />

      {/* Top 4 Metrics Overview */}
      <AdminOverviewStats overview={overview} isLoading={isOverviewLoading} />

      {/* Navigation View Switcher */}
      <div className="border-b border-border/70 pb-3">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                type="button"
                size="sm"
                variant={isActive ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer whitespace-nowrap transition-colors gap-2",
                  isActive
                    ? "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* 1. EXECUTIVE OVERVIEW (DEFAULT TAB) */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in-50 duration-200">
          {/* Dedicated Sub-Page Module Quick Launchers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-heading font-black tracking-tight uppercase text-foreground">
                  Platform Governance Modules
                </h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Direct navigation to dedicated operational management portals.
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-[10px] uppercase">
                5 Operational Sub-Pages
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((mod) => {
                const ModIcon = mod.icon;
                return (
                  <Card
                    key={mod.title}
                    className="rounded-none border-border bg-card shadow-xs hover:border-primary/50 transition-all group flex flex-col justify-between"
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="p-2.5 rounded-none bg-primary/10 border border-primary/20 text-primary">
                          <ModIcon className="size-5" />
                        </div>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] font-mono uppercase", mod.badgeColor)}
                        >
                          {mod.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-bold text-foreground mt-3 group-hover:text-primary transition-colors">
                        {mod.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {mod.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 mt-auto">
                      <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                            {mod.metricLabel}
                          </span>
                          <span className="font-mono text-xs font-bold text-foreground">
                            {mod.metricValue}
                          </span>
                        </div>
                        <Link
                          href={mod.href}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Open</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Dedicated Shipment Analytics & Consignment Velocity */}
          <AdminShipmentAnalytics
            overviewShipmentsCount={totalShipments}
            overviewStatusMap={shipmentStatuses}
          />

          {/* Workforce Capacity & Logistics Infrastructure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Workforce Composition */}
            <Card className="rounded-none border-border bg-card shadow-xs">
              <CardHeader className="p-5 border-b border-border/60">
                <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  Workforce Composition
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Distribution across user and staff credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {overview?.usersByRole &&
                  Object.entries(overview.usersByRole).map(([role, count]) => {
                    const pct =
                      totalUsers > 0
                        ? ((count / totalUsers) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <div
                        key={role}
                        className="p-3 border border-border/60 bg-muted/20 space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-bold text-foreground">
                            {role.replace("_", " ")}
                          </span>
                          <span className="text-muted-foreground">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted overflow-hidden rounded-none">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                <div className="pt-2">
                  <Link
                    href="/admin/users"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 border border-border bg-card hover:bg-muted font-mono text-xs uppercase font-bold text-foreground transition-colors"
                  >
                    <span>Manage User Accounts</span>
                    <ArrowRight className="size-3.5 text-primary" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Logistics Infrastructure Telemetry */}
            <Card className="rounded-none border-border bg-card shadow-xs flex flex-col justify-between">
              <CardHeader className="p-5 border-b border-border/60">
                <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                  <Building2 className="size-4 text-primary" />
                  Logistics Network Infrastructure
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Active physical sorting facilities and operational zones.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3 font-mono text-xs flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3.5 border border-border/60 bg-muted/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block">
                        Operational Sorting Hubs
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {overview?.infrastructure?.activeHubs || 0} Distribution Facilities
                      </span>
                    </div>
                    <Building2 className="size-5 text-primary/70" />
                  </div>
                  <div className="p-3.5 border border-border/60 bg-muted/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block">
                        Geographic Coverage Zones
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {overview?.infrastructure?.activeZones || 0} Regional Zones (64 Districts)
                      </span>
                    </div>
                    <MapPin className="size-5 text-amber-500/70" />
                  </div>
                </div>
                <div className="pt-2 mt-auto">
                  <Link
                    href="/admin/hubs"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 border border-border bg-card hover:bg-muted font-mono text-xs uppercase font-bold text-foreground transition-colors"
                  >
                    <span>Manage Hub Infrastructure</span>
                    <ArrowRight className="size-3.5 text-primary" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Operational Audit Activity Log */}
          <Card className="rounded-none border-border bg-card shadow-xs">
            <CardHeader className="p-5 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                  <Activity className="size-4 text-primary" />
                  Live Operational Activity & Audit Telemetry
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Real-time lifecycle mutations across consignments, hub routing, and dispatch staff.
                </CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs w-fit">
                {(overview?.recentActivities || []).length} Logged Events
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              {overview?.recentActivities && overview.recentActivities.length > 0 ? (
                <div className="divide-y divide-border/60">
                  {overview.recentActivities.slice(0, 8).map((act) => (
                    <div
                      key={act.id}
                      className="p-4 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {act.shipment?.trackingNumber && (
                            <span className="font-bold text-foreground bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px]">
                              {act.shipment.trackingNumber}
                            </span>
                          )}
                          <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                            {act.status.replace("_", " ")}
                          </Badge>
                          {act.updater && (
                            <span className="text-muted-foreground text-[11px]">
                              by <strong className="text-foreground">{act.updater.name}</strong> ({act.updater.role})
                            </span>
                          )}
                        </div>
                        {act.note && (
                          <p className="text-xs font-sans text-muted-foreground">
                            {act.note}
                          </p>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground shrink-0 sm:text-right">
                        {new Date(act.createdAt).toLocaleString(undefined, {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs font-mono text-muted-foreground">
                  No recent activity logged in the telemetry stream.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. SUB-VIEW TABS (For inline inspection if navigated via tab bar) */}
      {activeTab === "shipments" && (
        <AdminShipmentAnalytics
          overviewShipmentsCount={totalShipments}
          overviewStatusMap={shipmentStatuses}
        />
      )}

      {activeTab === "users" && (
        <AdminUserManagementTable
          onSelectUserForStatus={(u) => setSelectedUserForStatus(u)}
        />
      )}

      {activeTab === "applications" && <AdminRoleApplicationsView />}

      {activeTab === "fleet" && <AdminCouriersView />}

      {activeTab === "hubs" && <AdminHubsView />}

      {activeTab === "revenue" && <AdminRevenueMetrics />}

      {/* Account Status Management Dialog */}
      <AdminUserStatusDialog
        isOpen={!!selectedUserForStatus}
        user={selectedUserForStatus}
        onClose={() => setSelectedUserForStatus(null)}
      />
    </div>
  );
}
