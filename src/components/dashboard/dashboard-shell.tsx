import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { UserRole } from "@/types/user.interface";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  const roleLabel = role.replace(/_/g, " ");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar role={role} />
      <SidebarInset className="min-w-0 flex flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/70 px-4 bg-background/95 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Separator orientation="vertical" className="h-4" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {roleLabel} Console
            </span>
          </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-none uppercase tracking-wider font-semibold">
              Live System
            </span>
        </header>
        <main className="flex-1 w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
