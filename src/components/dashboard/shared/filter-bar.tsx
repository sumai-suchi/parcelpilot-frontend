"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FilterTabOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterBarProps {
  tabs: FilterTabOption[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  rightSlot?: ReactNode;
  className?: string;
}

export function FilterBar({
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search records...",
  rightSlot,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border/60 pb-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <Button
              key={tab.value}
              type="button"
              size="xs"
              variant={isActive ? "default" : "outline"}
              onClick={() => onTabChange(tab.value)}
              className={cn(
                "rounded-none font-mono text-[11px] uppercase tracking-wider cursor-pointer whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "ml-1.5 px-1 py-0.2 text-[9px] font-mono",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Search and Extra Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {onSearchChange !== undefined && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-none pl-9 font-mono text-xs h-8 bg-background border-border w-full placeholder:text-muted-foreground/70"
            />
          </div>
        )}

        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>
    </div>
  );
}
