"use client";

import { useMemo, useState } from "react";
import { Bike, RefreshCw } from "lucide-react";
import { useCourierTasks } from "@/hooks/courier.hook";
import type { CourierTask } from "@/types/courier.interface";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../shared/dashboard-header";
import { CourierAvailabilityToggle } from "./courier-availability-toggle";
import { CourierDeliveryDialog } from "./courier-delivery-dialog";
import { CourierPickupDialog } from "./courier-pickup-dialog";
import { CourierRejectDialog } from "./courier-reject-dialog";
import { CourierTaskList } from "./courier-task-list";
import { CourierTaskStats } from "./courier-task-stats";
import { cn } from "@/lib/utils";

export function CourierDashboardView() {
  const {
    data: tasksRes,
    isLoading,
    isFetching,
    refetch,
  } = useCourierTasks({ limit: 100 });
  const tasks = useMemo(() => tasksRes?.data || [], [tasksRes]);

  const [pickupTask, setPickupTask] = useState<CourierTask | null>(null);
  const [deliveryTask, setDeliveryTask] = useState<CourierTask | null>(null);
  const [rejectTask, setRejectTask] = useState<CourierTask | null>(null);

  return (
    <div className="space-y-8">
      {/* Unified Base-Sera Dashboard Header */}
      <DashboardHeader
        category="COURIER LOGISTICS / FIELD MOBILITY CONSOLE"
        title="Field Operations Console."
        description="Manage door-to-door parcel collections, linehaul hub check-ins, and final recipient delivery attempts across your route."
        badgeIcon={Bike}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded-none font-mono text-xs uppercase tracking-wider gap-2 cursor-pointer"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", isFetching && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh Tasks</span>
          </Button>
        }
      />

      {/* Courier Profile & Duty Status Toggle */}
      <CourierAvailabilityToggle />

      {/* Real-time Task Metrics */}
      <CourierTaskStats tasks={tasks} isLoading={isLoading} />

      {/* Searchable, Filterable Manifest Task List */}
      <CourierTaskList
        tasks={tasks}
        isLoading={isLoading}
        onOpenPickup={(t) => setPickupTask(t)}
        onOpenDelivery={(t) => setDeliveryTask(t)}
        onOpenReject={(t) => setRejectTask(t)}
      />

      {/* Doorstep Pickup Modal */}
      <CourierPickupDialog
        isOpen={!!pickupTask}
        task={pickupTask}
        onClose={() => setPickupTask(null)}
      />

      {/* Final Delivery / Reschedule Outcome Modal */}
      <CourierDeliveryDialog
        isOpen={!!deliveryTask}
        task={deliveryTask}
        onClose={() => setDeliveryTask(null)}
      />

      {/* Assignment Decline Governance Modal */}
      <CourierRejectDialog
        isOpen={!!rejectTask}
        task={rejectTask}
        onClose={() => setRejectTask(null)}
      />
    </div>
  );
}
