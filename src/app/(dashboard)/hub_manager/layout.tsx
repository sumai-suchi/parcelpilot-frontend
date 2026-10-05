import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/auth-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DashboardShell role="HUB_MANAGER">{children}</DashboardShell>
    </AuthGuard>
  );
}
