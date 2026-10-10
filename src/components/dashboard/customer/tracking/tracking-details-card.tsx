"use client";

import {
  Building2,
  Key,
  MapPin,
  Package,
  ShieldCheck,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrackingDetailsCardProps {
  data: any;
}

export function TrackingDetailsCard({ data }: TrackingDetailsCardProps) {
  if (!data) return null;

  return (
    <Card className="rounded-none border-border bg-card shadow-sm">
      {/* Manifest Header */}
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest font-semibold mb-1">
              <span>WAYBILL MANIFEST SPECIFICATION</span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-mono font-black text-foreground tracking-tight">
              {data.trackingNumber}
            </CardTitle>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-block px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider border ${
                data.status === "DELIVERED"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : data.status === "IN_TRANSIT" ||
                      data.status === "OUT_FOR_DELIVERY"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : data.status === "CANCELLED"
                      ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              }`}
            >
              {data.status?.replace(/_/g, " ")}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider border border-border px-2.5 py-1 text-muted-foreground bg-muted/40">
              {data.deliveryType}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-6">
        {/* Origin to Destination Routing Corridor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin Node */}
          <div className="border border-border/80 bg-muted/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
              <MapPin className="h-3.5 w-3.5" />
              <span>ORIGIN INDUCTION NODE</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {data.pickupAddress?.area}, {data.pickupAddress?.city}
              </p>
              {data.pickupAddress?.addressLine && (
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {data.pickupAddress.addressLine}
                </p>
              )}
            </div>
            {data.originHub && (
              <div className="pt-2 border-t border-border/50 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-primary" />
                <span>
                  Inducted Hub:{" "}
                  <strong className="text-foreground">
                    {data.originHub.name}
                  </strong>{" "}
                  ({data.originHub.code})
                </span>
              </div>
            )}
          </div>

          {/* Destination Node */}
          <div className="border border-border/80 bg-muted/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <MapPin className="h-3.5 w-3.5" />
              <span>DESTINATION CONSIGNEE NODE</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {data.deliveryAddress?.area}, {data.deliveryAddress?.city}
              </p>
              {data.deliveryAddress?.addressLine && (
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {data.deliveryAddress.addressLine}
                </p>
              )}
            </div>
            {data.destinationHub && (
              <div className="pt-2 border-t border-border/50 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-emerald-500" />
                <span>
                  Target Hub:{" "}
                  <strong className="text-foreground">
                    {data.destinationHub.name}
                  </strong>{" "}
                  ({data.destinationHub.code})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Telemetry Specs Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/60 pt-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-none border border-border bg-muted/40 text-muted-foreground">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                Consignment Specification
              </span>
              <p className="font-bold text-foreground">
                {data.parcelType} • {data.weight} kg (Gross)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-none border border-border bg-muted/40 text-muted-foreground">
              <User className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                Assigned Logistics Rider
              </span>
              {data.assignedCourier ? (
                <p className="font-bold text-foreground flex items-center gap-2">
                  <span>{data.assignedCourier.name}</span>
                  {data.assignedCourier.phone && (
                    <span className="text-primary font-normal text-[11px]">
                      ({data.assignedCourier.phone})
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-muted-foreground font-normal">
                  Rider pending dispatch assignment
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Receiver Delivery Handover OTP Security Banner */}
        {data.deliveryOtp && data.status !== "CANCELLED" && (
          <div className="border border-primary/30 bg-primary/5 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <div>
                <span className="font-bold text-primary uppercase text-[11px] block">
                  Receiver Handover Security OTP
                </span>
                <p className="text-[11px] text-muted-foreground font-sans">
                  Provide this 6-digit confirmation code to your courier rider
                  upon arrival.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-base font-black tracking-widest bg-background border border-primary/30 px-3 py-1 text-primary shrink-0">
              <Key className="h-3.5 w-3.5" />
              <span>{data.deliveryOtp}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
