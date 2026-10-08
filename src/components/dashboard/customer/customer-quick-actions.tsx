"use client";

import { cn } from "cn";
import { ArrowRight, Clock, FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function CustomerQuickActions() {
  const actions = [
    {
      title: "Book New Shipment",
      desc: "Instant door-to-door courier pickup",
      href: "/customer/create-shipment",
      icon: Plus,
      isPrimary: true,
      tag: "PRIORITY DISPATCH",
    },
    {
      title: "Track Consignment",
      desc: "Inspect live telemetry & checkpoints",
      href: "/customer/track-shipment",
      icon: Search,
      isPrimary: false,
      tag: "REAL-TIME GPS",
    },
    {
      title: "Delivery History",
      desc: "Past delivered receipts & invoices",
      href: "/customer/delivery-history",
      icon: Clock,
      isPrimary: false,
      tag: "COMPLETED ARCHIVES",
    },
    {
      title: "Shipment History",
      desc: "All active and historical records",
      href: "/customer/shipment-history",
      icon: FileText,
      isPrimary: false,
      tag: "ALL WAYBILLS",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link key={act.title} href={act.href} className="group block h-full">
            <Card
              className={cn(
                "h-full rounded-none border transition-all duration-200 shadow-xs",
                act.isPrimary
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                  : "border-border bg-card text-card-foreground hover:border-primary/50 hover:bg-muted/30",
              )}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-none border",
                      act.isPrimary
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-muted text-muted-foreground border-border",
                    )}
                  >
                    {act.tag}
                  </span>
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-none border transition-transform group-hover:translate-x-0.5",
                      act.isPrimary
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-muted text-foreground border-border group-hover:border-primary/40 group-hover:text-primary",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 font-sans text-sm font-bold tracking-tight">
                    <span>{act.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed",
                      act.isPrimary
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {act.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
