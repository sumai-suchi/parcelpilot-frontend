"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import Link from "next/link";
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
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];
  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    CUSTOMER: "/customer",
    COURIER: "/courior",
    HUB_MANAGER: "/hub_manager",
    OPERATIONS_MANAGER: "/operation_manager",
  };

  const { data, isLoading } = useGetMe();

  console.log("data", data, isLoading);

  const role: UserRole = !!data?.data && data?.data.role;

  const { mutate: logout } = useLogout();
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
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="w-auto h-auto ">
          <img src="/logo.png" alt="Percelpilot" className="h-60 w-50" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {route.name}
            </Link>
          ))}
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
          {data?.data && (
            <Link
              href="/apply-for-role"
              className="text-sm font-medium text-primary hover:underline transition-colors"
            >
              Apply for Role
            </Link>
          )}

          <div>
            {!data && (
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            )}
            {data && (
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-4 px-4">
                {routes.map((route) => (
                  <Link
                    key={route.url}
                    href={route.url}
                    className="text-base font-medium transition-colors hover:text-primary"
                  >
                    {route.name}
                  </Link>
                ))}
                 {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
                 {data?.data && (
                   <Link
                     href="/apply-for-role"
                     className="text-base font-medium text-primary hover:underline transition-colors"
                   >
                     Apply for Role
                   </Link>
                 )}

                <div>
                  {!data && (
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Login
                    </Link>
                  )}
                  {data && (
                    <Button onClick={handleLogout} variant="destructive">
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
