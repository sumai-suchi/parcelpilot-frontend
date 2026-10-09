"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface DashboardHeaderProps {
  category: string;
  title: string;
  description: string;
  badgeIcon?: LucideIcon;
  actions?: ReactNode;
  liveIndicator?: boolean;
}

export function DashboardHeader({
  category,
  title,
  description,
  badgeIcon: BadgeIcon,
  actions,
  liveIndicator = true,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
          {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
          <span>{category}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground font-sans">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
