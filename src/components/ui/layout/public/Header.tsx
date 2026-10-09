"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  LayoutDashboard,
  LogOut,
  LogIn,
  Home,
  Compass,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import type { UserRole } from "@/types/user.interface";
import { toast } from "../../toast";

export default function Header() {
  const pathname = usePathname();

  const routes = [
    { name: "Home", url: "/", icon: Home },
    { name: "About us", url: "/about-us", icon: Compass },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    CUSTOMER: "/customer",
    COURIER: "/courior",
    HUB_MANAGER: "/hub_manager",
    OPERATIONS_MANAGER: "/operation_manager",
  };

  const { data, isLoading } = useGetMe();
  const role: UserRole = !!data?.data && data?.data.role;

  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged out successfully",
          type: "success",
        });
        queryClient.setQueryData(["user"], null);
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something Went Wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/20 transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Large & Clearly Visible Brand Logo */}
        <Link href="/" className="flex items-center overflow-visible h-16 w-auto group select-none">
          <img
            src="/logo.png"
            alt="Parcelpilot"
            className="h-56 sm:h-64 w-auto object-contain -my-20 sm:-my-24 dark:brightness-0 dark:invert transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.url;
            return (
              <Link
                key={route.url}
                href={route.url}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

          {/* Solid & Prominent Dashboard Button (Not Dim) */}
          {role && (
            <Link
              href={dashboardRoute[role]}
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className:
                  "bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider shadow-md hover:bg-primary/90 transition-all",
              })}
            >
              <LayoutDashboard className="size-3.5 mr-1.5" />
              Dashboard
            </Link>
          )}

          {/* Apply for Role link (when user is logged in) */}
          {data?.data && (
            <Link
              href="/apply-for-role"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/apply-for-role"
                  ? "text-primary font-semibold"
                  : "text-foreground/80"
              }`}
            >
              Apply for Role
            </Link>
          )}

          {/* Auth Controls */}
          <div className="flex items-center gap-3 ml-1">
            {!data && (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "border-border/60 hover:bg-background/60",
                  })}
                >
                  <LogIn className="size-3.5 mr-1.5" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "sm",
                    className:
                      "bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-primary/90",
                  })}
                >
                  Register
                </Link>
              </div>
            )}
            {data && (
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="destructive"
                size="sm"
                className="font-medium text-xs uppercase tracking-wider"
              >
                <LogOut className="size-3.5 mr-1.5" />
                Logout
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger className="p-2 rounded-lg border border-border/40 bg-background/40 hover:bg-muted text-foreground transition-colors cursor-pointer">
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="pb-4 border-b border-border/40">
                <SheetTitle className="text-left">
                  <Link href="/" className="flex items-center overflow-hidden h-14 w-auto">
                    <img
                      src="/logo.png"
                      alt="Parcelpilot"
                      className="h-44 w-auto object-contain -my-14 dark:brightness-0 dark:invert"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-4 px-2">
                {routes.map((route) => {
                  const IconComponent = route.icon;
                  const isActive = pathname === route.url;
                  return (
                    <Link
                      key={route.url}
                      href={route.url}
                      className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-primary ${
                        isActive ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      <IconComponent className="size-4 text-muted-foreground" />
                      <span>{route.name}</span>
                    </Link>
                  );
                })}

                {/* Mobile Dashboard Button */}
                {role && (
                  <Link
                    href={dashboardRoute[role]}
                    className={buttonVariants({
                      variant: "default",
                      className:
                        "w-full bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider shadow-md justify-start mt-2",
                    })}
                  >
                    <LayoutDashboard className="size-4 mr-2" />
                    Dashboard
                  </Link>
                )}

                {/* Mobile Apply for Role */}
                {data?.data && (
                  <Link
                    href="/apply-for-role"
                    className="flex items-center gap-3 text-base font-medium text-primary hover:underline transition-colors mt-1"
                  >
                    <Briefcase className="size-4 text-primary" />
                    <span>Apply for Role</span>
                  </Link>
                )}

                {/* Mobile Auth Controls */}
                <div className="pt-4 border-t border-border/40 mt-2">
                  {!data && (
                    <div className="flex flex-col gap-2.5">
                      <Link
                        href="/login"
                        className={buttonVariants({
                          variant: "outline",
                          className: "w-full justify-center",
                        })}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className={buttonVariants({
                          className:
                            "w-full bg-primary text-primary-foreground justify-center shadow-md",
                        })}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                  {data && (
                    <Button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      variant="destructive"
                      className="w-full justify-center"
                    >
                      <LogOut className="size-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
