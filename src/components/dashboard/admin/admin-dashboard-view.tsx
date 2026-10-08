"use client";

import { useState } from "react";
import {
  Bike,
  Building2,
  ClipboardCheck,
  Coins,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useAdminOverview } from "@/hooks/admin.hook";
import type { AdminUserItem } from "@/types/admin.interface";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../shared/dashboard-header";
import { AdminCouriersView } from "./admin-couriers-view";
import { AdminHubsView } from "./admin-hubs-view";
import { AdminOverviewStats } from "./admin-overview-stats";
import { AdminRevenueMetrics } from "./admin-revenue-metrics";
import { AdminRoleApplicationsView } from "./admin-role-applications-view";
import { AdminUserManagementTable } from "./admin-user-management-table";
import { AdminUserStatusDialog } from "./admin-user-status-dialog";
import { cn } from "@/lib/utils";

type AdminTab = "users" | "applications" | "fleet" | "hubs" | "revenue";

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<AdminTab>("users");
  const [selectedUserForStatus, setSelectedUserForStatus] =
    useState<AdminUserItem | null>(null);

  const { data: overviewRes, isLoading: isOverviewLoading } =
    useAdminOverview();
  const overview = overviewRes?.data;

  const tabs: Array<{
    id: AdminTab;
    label: string;
    icon: typeof Users;
  }> = [
    { id: "users", label: "Workforce & Users", icon: Users },
    { id: "applications", label: "Role Applications", icon: ClipboardCheck },
    { id: "fleet", label: "Delivery Fleet", icon: Bike },
    { id: "hubs", label: "Logistics Hubs", icon: Building2 },
    { id: "revenue", label: "Revenue & Payments", icon: Coins },
  ];

  return (
    <div className="space-y-8">
      {/* Reusable Dashboard Header */}
      <DashboardHeader
        category="SYSTEM GOVERNANCE / PLATFORM CONTROL"
        title="Executive Administration."
        description="Real-time platform governance across user identity registry, field courier fleet, physical hub infrastructure, and financial revenue."
        badgeIcon={ShieldAlert}
      />

      {/* Top 4 Metrics Overview */}
      <AdminOverviewStats overview={overview} isLoading={isOverviewLoading} />

      {/* Responsive Section Navigation Tabs */}
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

      {/* Tab Panels */}
      <div>
        {activeTab === "users" && (
          <AdminUserManagementTable
            onSelectUserForStatus={(u) => setSelectedUserForStatus(u)}
          />
        )}

        {activeTab === "applications" && <AdminRoleApplicationsView />}

        {activeTab === "fleet" && <AdminCouriersView />}

        {activeTab === "hubs" && <AdminHubsView />}

        {activeTab === "revenue" && <AdminRevenueMetrics />}
      </div>

      {/* Account Status Management Dialog */}
      <AdminUserStatusDialog
        isOpen={!!selectedUserForStatus}
        user={selectedUserForStatus}
        onClose={() => setSelectedUserForStatus(null)}
      />
    </div>
  );
}
