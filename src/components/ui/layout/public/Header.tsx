"use client";

import { Menu } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="w-auto h-auto ">
          <img
            src="/logo.png"
            alt="Percelpilot"
           className="h-60 w-50"
          />
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

          <Button
            variant="outline"
            render={<Link href="/login" />}
            nativeButton={false}
          >
            Login
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger >
           
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

                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  render={<Link href="/login" />}
                  nativeButton={false}
                >
                  Login
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
