"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string | null | undefined;
  className?: string;
  type?: "shipment" | "role" | "account" | "payment" | "courier";
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) return null;

  const normalized = status.toUpperCase().trim();

  // Role style mapping
  const roleStyles: Record<string, string> = {
    ADMIN: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    OPERATIONS_MANAGER: "bg-primary/10 text-primary border-primary/30",
    HUB_MANAGER:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    COURIER:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    CUSTOMER:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  };

  // Account status mapping
  const accountStyles: Record<string, string> = {
    ACTIVE:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    INACTIVE: "bg-muted text-muted-foreground border-border",
    SUSPENDED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
  };

  // Payment status mapping
  const paymentStyles: Record<string, string> = {
    PAID: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    UNPAID:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    PENDING:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    FAILED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
  };

  // Courier availability mapping
  const courierStyles: Record<string, string> = {
    AVAILABLE:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    BUSY: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    OFFLINE: "bg-muted text-muted-foreground border-border",
  };

  // Shipment transit status mapping
  const shipmentStyles: Record<string, string> = {
    CREATED: "bg-muted text-muted-foreground border-border",
    PENDING_APPROVAL:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    COURIER_ASSIGNED: "bg-primary/10 text-primary border-primary/30",
    PICKUP_ASSIGNED: "bg-primary/10 text-primary border-primary/30",
    PICKED_UP: "bg-primary/10 text-primary border-primary/30",
    AT_ORIGIN_HUB:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    IN_TRANSIT: "bg-primary/15 text-primary border-primary/40",
    DISPATCHED:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    AT_DESTINATION_HUB:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    OUT_FOR_DELIVERY: "bg-primary/15 text-primary border-primary/40 font-bold",
    DELIVERED:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    RECEIVED:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    CANCELLED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    RETURNED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
  };

  const badgeClass =
    roleStyles[normalized] ||
    accountStyles[normalized] ||
    paymentStyles[normalized] ||
    courierStyles[normalized] ||
    shipmentStyles[normalized] ||
    "bg-muted/40 text-muted-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-2 py-0.5 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
        badgeClass,
        className,
      )}
    >
      {normalized.replace(/_/g, " ")}
    </span>
  );
}
