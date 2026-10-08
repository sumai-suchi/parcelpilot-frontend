"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import { useLogout } from "@/hooks/auth.hook";

export interface NavUserProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  } | null;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "PP";

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged Out",
          description: "You have signed out successfully.",
          type: "success",
        });
        queryClient.setQueryData(["user"], null);
        router.push("/login");
      },
      onError: () => {
        toast.add({
          title: "Logout Error",
          description: "Something went wrong during sign out.",
          type: "error",
        });
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar className="size-8 rounded-none border border-border">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="rounded-none font-mono text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-xs leading-tight">
              <span className="truncate font-semibold text-foreground">
                {user.name}
              </span>
              <span className="truncate font-mono text-[10px] text-muted-foreground">
                {user.role?.replace("_", " ")}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-none"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-none border border-border">
                    {user.avatar && (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    )}
                    <AvatarFallback className="rounded-none font-mono text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      {user.name}
                    </span>
                    <span className="truncate font-mono text-[10px] text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/")}
                className="cursor-pointer gap-2"
              >
                <User className="size-4" />
                <span>Go to Homepage</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/apply-for-role")}
                className="cursor-pointer gap-2"
              >
                <ShieldCheck className="size-4" />
                <span>Apply for Role</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
