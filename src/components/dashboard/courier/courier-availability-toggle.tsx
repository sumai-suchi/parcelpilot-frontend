"use client";

import { Bike, Building2, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  useCourierProfile,
  useUpdateCourierAvailability,
} from "@/hooks/courier.hook";
import type { CourierAvailability } from "@/types/courier.interface";
import { cn } from "@/lib/utils";

export function CourierAvailabilityToggle() {
  const { data: profileRes, isLoading } = useCourierProfile();
  const updateMutation = useUpdateCourierAvailability();

  const profile = profileRes?.data;
  const currentStatus: CourierAvailability =
    profile?.availabilityStatus || "AVAILABLE";

  const handleStatusChange = async (status: CourierAvailability) => {
    try {
      await updateMutation.mutateAsync(status);
      toast.add({
        title: "Availability Updated",
        description: `Your status is now ${status}.`,
        type: "success",
      });
    } catch (err: any) {
      toast.add({
        title: "Status Update Failed",
        description: err?.message || "Could not update availability status.",
        type: "error",
      });
    }
  };

  const statusOptions: Array<{
    status: CourierAvailability;
    label: string;
    dotColor: string;
    variant: "emerald" | "amber" | "outline";
  }> = [
    {
      status: "AVAILABLE",
      label: "Available for Pickups",
      dotColor: "bg-emerald-500",
      variant: "emerald",
    },
    {
      status: "BUSY",
      label: "Busy on Delivery Run",
      dotColor: "bg-amber-500",
      variant: "amber",
    },
    {
      status: "OFFLINE",
      label: "Offline / Off-Duty",
      dotColor: "bg-muted-foreground",
      variant: "outline",
    },
  ];

  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-primary/20 bg-primary/10 text-primary">
            <Bike className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black tracking-tight text-foreground uppercase text-sm">
                {profile?.user?.name || "Field Courier"}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                [{profile?.vehicleType || "Motorcycle"} •{" "}
                {profile?.vehicleNumber || "BD-1234"}]
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>
                Assigned Hub:{" "}
                <strong className="text-foreground">
                  {profile?.hub?.name || "Dhaka Central Hub"}
                </strong>{" "}
                ({profile?.hub?.code || "DAC"})
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {statusOptions.map((opt) => {
            const isSelected = currentStatus === opt.status;
            return (
              <Button
                key={opt.status}
                type="button"
                size="sm"
                variant={isSelected ? "default" : "outline"}
                disabled={updateMutation.isPending || isLoading}
                onClick={() => handleStatusChange(opt.status)}
                className={cn(
                  "rounded-none font-mono text-xs uppercase tracking-wider gap-2 cursor-pointer transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    opt.dotColor,
                    isSelected && "animate-ping opacity-75",
                  )}
                />
                <span>{opt.status}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
