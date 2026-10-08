"use client";

import {
  Building2,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Truck,
  User,
  X,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import {
  useAcceptAssignment,
  useDeliverToHub,
  useStartDelivery,
} from "@/hooks/courier.hook";
import type { CourierTask } from "@/types/courier.interface";
import { StatusBadge } from "../shared/status-badge";

interface CourierTaskCardProps {
  task: CourierTask;
  onOpenPickup: (task: CourierTask) => void;
  onOpenDelivery: (task: CourierTask) => void;
  onOpenReject: (task: CourierTask) => void;
}

export function CourierTaskCard({
  task,
  onOpenPickup,
  onOpenDelivery,
  onOpenReject,
}: CourierTaskCardProps) {
  const acceptMutation = useAcceptAssignment();
  const deliverToHubMutation = useDeliverToHub();
  const startDeliveryMutation = useStartDelivery();

  const isAssignmentPending = task.status === "PENDING";
  const shipment = task.shipment;
  const shipmentStatus = shipment?.status || "";

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(task.id);
      toast.add({
        title: "Assignment Accepted",
        description: `Shipment ${shipment.trackingNumber} added to your active manifest.`,
        type: "success",
      });
    } catch (err: any) {
      toast.add({
        title: "Acceptance Failed",
        description: err?.message || "Could not accept task.",
        type: "error",
      });
    }
  };

  const handleDeliverToHub = async () => {
    try {
      const isTransit = shipmentStatus === "IN_TRANSIT";
      await deliverToHubMutation.mutateAsync({
        shipmentId: shipment.id,
        note: isTransit
          ? `Delivered to destination hub (${shipment.destinationHub?.name || "Destination Hub"}) by transit driver.`
          : "Delivered to origin hub and checked in by courier rider.",
      });
      toast.add({
        title: isTransit ? "Arrived at Destination Hub" : "Delivered to Hub",
        description: isTransit
          ? `Shipment ${shipment.trackingNumber} successfully checked into destination hub.`
          : `Parcel ${shipment.trackingNumber} successfully checked in.`,
        type: "success",
      });
    } catch (err: any) {
      toast.add({
        title: "Check-in Failed",
        description: err?.message || "Could not check parcel into hub.",
        type: "error",
      });
    }
  };

  const handleStartDelivery = async () => {
    try {
      await startDeliveryMutation.mutateAsync({
        shipmentId: shipment.id,
        note: "Rider is en route to recipient address.",
      });
      toast.add({
        title: "Out for Delivery",
        description: `Shipment ${shipment.trackingNumber} is now en route to destination.`,
        type: "success",
      });
    } catch (err: any) {
      toast.add({
        title: "Dispatch Failed",
        description: err?.message || "Could not update status.",
        type: "error",
      });
    }
  };

  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs flex flex-col justify-between hover:border-primary/50 transition-colors">
      <CardHeader className="p-4 sm:p-5 border-b border-border/60 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-foreground">
                {shipment.trackingNumber}
              </span>
              <Badge
                variant="outline"
                className="rounded-none font-mono text-[10px] uppercase border-primary/30 text-primary bg-primary/5"
              >
                {shipment.parcelType}
              </Badge>
              <span className="font-mono text-[10px] text-muted-foreground">
                {Number(shipment.weight).toFixed(1)} kg
              </span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Assigned: {new Date(task.assignedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge
              variant="outline"
              className={`rounded-none font-mono text-[10px] uppercase tracking-wider font-bold ${
                isAssignmentPending
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                  : task.status === "COMPLETED"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                  : task.status === "REJECTED"
                  ? "border-destructive/40 bg-destructive/10 text-destructive"
                  : "border-primary/40 bg-primary/10 text-primary"
              }`}
            >
              Task: {task.status}
            </Badge>
            <StatusBadge status={shipmentStatus} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3 flex-1">
        {/* Addresses Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-muted/30 border border-border/60">
          {/* Pickup Address */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              <MapPin className="h-3 w-3 text-primary" />
              <span>Pickup (Sender)</span>
            </div>
            <p className="text-xs font-semibold text-foreground truncate">
              {shipment.pickupAddress?.area}, {shipment.pickupAddress?.city}
            </p>
            <p className="text-[11px] text-muted-foreground line-clamp-1 font-mono">
              {shipment.pickupAddress?.addressLine}
            </p>
            {shipment.customer?.user && (
              <p className="text-[11px] text-primary flex items-center gap-1 font-mono">
                <Phone className="h-3 w-3" />
                {shipment.customer.user.phone || shipment.customer.user.email}
              </p>
            )}
          </div>

          {/* Delivery Address */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              <MapPin className="h-3 w-3 text-emerald-500" />
              <span>Delivery (Recipient)</span>
            </div>
            <p className="text-xs font-semibold text-foreground truncate">
              {shipment.deliveryAddress?.area}, {shipment.deliveryAddress?.city}
            </p>
            <p className="text-[11px] text-muted-foreground line-clamp-1 font-mono">
              {shipment.deliveryAddress?.addressLine}
            </p>
            {shipment.deliveryAddress?.label && (
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                <User className="h-3 w-3" />
                <span>Contact: {shipment.deliveryAddress.label}</span>
              </p>
            )}
          </div>
        </div>

        {/* Inter-Hub Transit Route Corridor */}
        {shipmentStatus === "IN_TRANSIT" && (
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 text-xs font-mono">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                Origin Hub
              </span>
              <span className="font-bold text-foreground">
                {shipment.originHub?.name || "Origin Hub"}
              </span>
            </div>
            <Truck className="h-4 w-4 text-primary shrink-0" />
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                Destination Hub
              </span>
              <span className="font-bold text-foreground">
                {shipment.destinationHub?.name || "Destination Hub"}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 sm:p-5 pt-0 border-t border-border/40 flex items-center justify-between gap-2 flex-wrap">
        {isAssignmentPending ? (
          <div className="flex items-center gap-2 w-full">
            <Button
              size="sm"
              variant="default"
              disabled={acceptMutation.isPending}
              onClick={handleAccept}
              className="flex-1 rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              Accept Task
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenReject(task)}
              className="rounded-none font-mono text-xs uppercase tracking-wider text-destructive border-destructive/40 hover:bg-destructive/10 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Decline
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full justify-end flex-wrap">
            {/* Step 1: Pickup from sender */}
            {(shipmentStatus === "PICKUP_ASSIGNED" ||
              shipmentStatus === "COURIER_ASSIGNED") && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onOpenPickup(task)}
                className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                Confirm Pickup
              </Button>
            )}

            {/* Step 2: Inward deliver to origin sorting hub */}
            {shipmentStatus === "PICKED_UP" && (
              <Button
                size="sm"
                variant="default"
                disabled={deliverToHubMutation.isPending}
                onClick={handleDeliverToHub}
                className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
              >
                <Building2 className="h-3.5 w-3.5" />
                Deliver to Hub
              </Button>
            )}

            {/* Step 2.5: In transit truck driver drop-off at destination hub */}
            {shipmentStatus === "IN_TRANSIT" && (
              <Button
                size="sm"
                variant="default"
                disabled={deliverToHubMutation.isPending}
                onClick={handleDeliverToHub}
                className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Building2 className="h-3.5 w-3.5" />
                Deliver to Destination Hub
              </Button>
            )}

            {/* Step 3: Out for delivery from destination hub */}
            {shipmentStatus === "AT_DESTINATION_HUB" && (
              <Button
                size="sm"
                variant="default"
                disabled={startDeliveryMutation.isPending}
                onClick={handleStartDelivery}
                className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
              >
                <Truck className="h-3.5 w-3.5" />
                Start Delivery Run
              </Button>
            )}

            {/* Step 4: Final delivery confirmation or failure recording */}
            {shipmentStatus === "OUT_FOR_DELIVERY" && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onOpenDelivery(task)}
                className="rounded-none font-mono text-xs uppercase tracking-wider gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Record Outcome
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
