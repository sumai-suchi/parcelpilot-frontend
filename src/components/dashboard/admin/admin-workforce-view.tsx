"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import type { AdminUserItem } from "@/types/admin.interface";
import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header";
import { AdminUserManagementTable } from "./admin-user-management-table";
import { AdminUserStatusDialog } from "./admin-user-status-dialog";

export function AdminWorkforceView() {
  const [selectedUserForStatus, setSelectedUserForStatus] =
    useState<AdminUserItem | null>(null);

  return (
    <div className="space-y-8">
      <DashboardHeader
        category="IDENTITY REGISTRY / USER MANAGEMENT"
        title="Workforce & User Accounts."
        description="Global directory of customer accounts, couriers, hub managers, and operations staff with role access governance and account status controls."
        badgeIcon={Users}
      />

      <AdminUserManagementTable
        onSelectUserForStatus={(u) => setSelectedUserForStatus(u)}
      />

      <AdminUserStatusDialog
        isOpen={!!selectedUserForStatus}
        user={selectedUserForStatus}
        onClose={() => setSelectedUserForStatus(null)}
      />
    </div>
  );
}
