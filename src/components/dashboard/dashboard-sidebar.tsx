"use client";

import { IconInnerShadowTop, IconX } from "@tabler/icons-react";
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
  useSidebar,
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
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border">
      <SidebarHeader className="border-b border-border/70 p-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            onClick={() => {
              if (isMobile) setOpenMobile(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-none hover:bg-sidebar-accent transition-colors"
          >
            <IconInnerShadowTop className="size-5.5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground">
                ParcelPilot
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {role.replace("_", " ")}
              </span>
            </div>
          </Link>

          {/* Close / cut option for mobile devices */}
          <button
            type="button"
            onClick={() => setOpenMobile(false)}
            className="flex md:hidden size-8 items-center justify-center rounded-none border border-border/60 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <IconX className="size-4" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold px-3 py-1.5">
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
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                        className="font-medium text-sm rounded-none transition-colors h-9.5 px-3"
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
