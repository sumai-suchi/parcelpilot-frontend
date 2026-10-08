"use client";

import { useMemo, useState } from "react";
import { Loader2, Package, Truck } from "lucide-react";
import type { CourierTask } from "@/types/courier.interface";
import { Card, CardContent } from "@/components/ui/card";
import { FilterBar, type FilterTabOption } from "../shared/filter-bar";
import { CourierTaskCard } from "./courier-task-card";

interface CourierTaskListProps {
  tasks: CourierTask[];
  isLoading: boolean;
  onOpenPickup: (task: CourierTask) => void;
  onOpenDelivery: (task: CourierTask) => void;
  onOpenReject: (task: CourierTask) => void;
}

export function CourierTaskList({
  tasks,
  isLoading,
  onOpenPickup,
  onOpenDelivery,
  onOpenReject,
}: CourierTaskListProps) {
  const [filterTab, setFilterTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const activeCount = tasks.filter(
    (t) =>
      t.status === "ACCEPTED" &&
      t.shipment?.status !== "DELIVERED" &&
      t.shipment?.status !== "CANCELLED",
  ).length;
  const completedCount = tasks.filter(
    (t) => t.shipment?.status === "DELIVERED" || t.status === "COMPLETED",
  ).length;
  const failedCount = tasks.filter(
    (t) =>
      t.shipment?.status === "DELIVERY_FAILED" ||
      t.status === "REJECTED",
  ).length;

  const tabs: FilterTabOption[] = [
    { label: "All Tasks", value: "ALL", count: tasks.length },
    { label: "Pending", value: "PENDING", count: pendingCount },
    { label: "Active", value: "ACTIVE", count: activeCount },
    { label: "Delivered", value: "COMPLETED", count: completedCount },
    { label: "Failed", value: "FAILED", count: failedCount },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filterTab === "PENDING" && task.status !== "PENDING") return false;
      if (
        filterTab === "ACTIVE" &&
        !(
          task.status === "ACCEPTED" &&
          task.shipment?.status !== "DELIVERED" &&
          task.shipment?.status !== "CANCELLED"
        )
      ) {
        return false;
      }
      if (
        filterTab === "COMPLETED" &&
        task.shipment?.status !== "DELIVERED" &&
        task.status !== "COMPLETED"
      ) {
        return false;
      }
      if (
        filterTab === "FAILED" &&
        task.shipment?.status !== "DELIVERY_FAILED" &&
        task.status !== "REJECTED"
      ) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const tracking = task.shipment?.trackingNumber?.toLowerCase() || "";
        const customerName = task.shipment?.customer?.user?.name?.toLowerCase() || "";
        const city = task.shipment?.deliveryAddress?.city?.toLowerCase() || "";
        return (
          tracking.includes(query) ||
          customerName.includes(query) ||
          city.includes(query)
        );
      }

      return true;
    });
  }, [tasks, filterTab, searchTerm]);

  return (
    <div className="space-y-4">
      {/* Unified Base-Sera FilterBar */}
      <FilterBar
        tabs={tabs}
        activeTab={filterTab}
        onTabChange={setFilterTab}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Filter tasks by tracking, recipient, area..."
      />

      {isLoading ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3 font-mono">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              Loading courier task queue & route manifests...
            </span>
          </CardContent>
        </Card>
      ) : filteredTasks.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3 font-mono">
            <Truck className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <h4 className="text-xs uppercase tracking-wider text-foreground font-semibold">
              No tasks found in this view
            </h4>
            <p className="text-[11px] text-muted-foreground font-sans max-w-sm mx-auto">
              {searchTerm
                ? "No delivery assignments match your search query."
                : "All current delivery manifests are up to date."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <CourierTaskCard
              key={task.id}
              task={task}
              onOpenPickup={onOpenPickup}
              onOpenDelivery={onOpenDelivery}
              onOpenReject={onOpenReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
