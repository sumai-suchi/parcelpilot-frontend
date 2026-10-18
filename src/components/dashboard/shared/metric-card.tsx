"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string | number;
  desc?: string;
  icon: LucideIcon;
  variant?:
    | "default"
    | "primary"
    | "amber"
    | "emerald"
    | "purple"
    | "destructive";
  highlight?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  desc,
  icon: Icon,
  variant = "default",
  highlight = false,
  isLoading = false,
  className,
}: MetricCardProps) {
  const variantStyles = {
    default: "border-border/80 bg-card",
    primary: "border-primary/40 bg-primary/5",
    amber: "border-amber-500/40 bg-amber-500/5",
    emerald: "border-emerald-500/40 bg-emerald-500/5",
    purple: "border-purple-500/40 bg-purple-500/5",
    destructive: "border-destructive/40 bg-destructive/5",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    amber:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    emerald:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    purple:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Card
      className={cn(
        "rounded-none border shadow-sm transition-all duration-200 hover:border-primary/40",
        variantStyles[variant],
        highlight && "border-primary/60 ring-1 ring-primary/20",
        className,
      )}
    >
      <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            {label}
          </span>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-none border shrink-0",
              iconStyles[variant],
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="font-mono text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {isLoading ? "..." : value}
          </div>
          {desc && (
            <p className="text-[11px] text-muted-foreground font-sans line-clamp-1">
              {desc}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
