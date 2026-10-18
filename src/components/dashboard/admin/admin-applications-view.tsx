"use client";

import { ClipboardCheck } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header";
import { AdminRoleApplicationsView } from "./admin-role-applications-view";

export function AdminApplicationsView() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        category="IDENTITY REGISTRY / CREDENTIAL AUDIT"
        title="Role Upgrade Applications."
        description="Review incoming requests from verified users seeking Courier, Hub Manager, or Operations leadership credentials across network hubs."
        badgeIcon={ClipboardCheck}
      />
      <AdminRoleApplicationsView />
    </div>
  );
}
