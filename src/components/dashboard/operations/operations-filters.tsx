"use client";

import { FilterBar } from "../shared/filter-bar";

interface OperationsFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  totalCount?: number;
}

export function OperationsFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
}: OperationsFiltersProps) {
  const tabs = [
    { label: "All Items", value: "ALL" },
    { label: "Pending Approval", value: "PENDING_APPROVAL" },
    { label: "Assigned", value: "COURIER_ASSIGNED" },
    { label: "In Transit", value: "IN_TRANSIT" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <FilterBar
      tabs={tabs}
      activeTab={statusFilter}
      onTabChange={onStatusFilterChange}
      searchValue={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search tracking, phone, customer..."
      rightSlot={
        typeof totalCount === "number" ? (
          <div className="font-mono text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
            QUEUE:{" "}
            <span className="font-bold text-foreground">{totalCount}</span>
          </div>
        ) : undefined
      }
    />
  );
}
