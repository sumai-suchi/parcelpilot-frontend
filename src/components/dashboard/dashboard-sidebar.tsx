"use client";

import { IconInnerShadowTop } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetMe } from "@/hooks/auth.hook";
import { adminRoutes } from "@/routes/admin.route";
import { couriorRoutes } from "@/routes/courior.route";
import { customerRoutes } from "@/routes/customer.route";
import { hubManagerRoutes } from "@/routes/hub_manager.route";
import { operationManagerRoutes } from "@/routes/operation_manager.route";
import type { SidebarItems } from "@/types/sidebar.interface";
import type { UserRole } from "@/types/user.interface";
import { NavUser } from "./nav-user";

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  ADMIN: adminRoutes,
  CUSTOMER: customerRoutes,
  COURIER: couriorRoutes,
  HUB_MANAGER: hubManagerRoutes,
  OPERATIONS_MANAGER: operationManagerRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];
  const { data: userRes } = useGetMe();
  const user = userRes?.data;

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border">
      <SidebarHeader className="border-b border-border/70">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <IconInnerShadowTop className="size-5! text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">
                  ParcelPilot
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {role.replace("_", " ")}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        className="font-medium text-xs rounded-none transition-colors"
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/70 p-2">
        <NavUser
          user={
            user
              ? {
                  name: user.name,
                  email: user.email,
                  avatar: user.profilePicture || user.avatar,
                  role: user.role,
                }
              : null
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}
