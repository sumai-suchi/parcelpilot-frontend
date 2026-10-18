"use client";

import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Package,
  Plus,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { CreatedShipmentData } from "@/types/shipment.interface";

interface CustomerRecentShipmentsProps {
  shipments: CreatedShipmentData[];
  isLoading: boolean;
}

export function CustomerRecentShipments({
  shipments,
  isLoading,
}: CustomerRecentShipmentsProps) {
  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs p-12 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <Spinner />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Querying active consignments...
          </span>
        </div>
      </Card>
    );
  }

  if (shipments.length === 0) {
    return (
      <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none border border-border bg-muted/50 text-muted-foreground">
          <Truck className="h-6 w-6" />
        </div>
        <h4 className="mt-4 font-sans text-base font-bold text-foreground">
          No shipments booked yet
        </h4>
        <p className="mt-1 font-sans text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Create your first door-to-door courier dispatch with real-time
          telemetry, hub sorting, and Stripe settlement.
        </p>
        <div className="mt-6">
          <Link
            href="/customer/create-shipment"
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "gap-2 text-xs font-semibold uppercase tracking-wider",
            })}
          >
            <Plus className="h-3.5 w-3.5" />
            Book Shipment Now
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 flex flex-row items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-primary uppercase tracking-wider">
            <span>DISPATCH LOG</span>
            <span>•</span>
            <span>LATEST 5 ENTRIES</span>
          </div>
          <CardTitle className="font-sans text-base font-bold tracking-tight text-foreground mt-0.5">
            Recent Consignments
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Live movement records and status changes
          </CardDescription>
        </div>
        <Link
          href="/customer/shipment-history"
          className={buttonVariants({
            variant: "outline",
            size: "xs",
            className: "gap-1 text-xs font-semibold uppercase tracking-wider",
          })}
        >
          <span>View All</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <div className="divide-y divide-border/60">
        {shipments.slice(0, 5).map((shipment) => {
          const isPaid = shipment.paymentStatus === "PAID";
          return (
            <div
              key={shipment.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4.5 gap-4 hover:bg-muted/30 transition-colors"
            >
              <Link
                href={`/customer/shipments/${shipment.id}`}
                className="group/item flex items-start gap-3.5 hover:opacity-90 transition-opacity cursor-pointer flex-1"
              >
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-none border border-border bg-muted/40 text-foreground shrink-0 group-hover/item:border-primary/50 group-hover/item:text-primary transition-colors">
                  <Package className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-foreground tracking-tight group-hover/item:text-primary group-hover/item:underline underline-offset-2 transition-colors">
                      {shipment.trackingNumber}
                    </span>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 border border-primary/20 bg-primary/10 text-primary uppercase">
                      {shipment.parcelType}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-border bg-muted text-muted-foreground">
                      {Number(shipment.weight).toFixed(1)} KG
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    To:{" "}
                    <span className="text-foreground font-medium">
                      {shipment.deliveryAddress?.area || "Destination"}
                    </span>
                    {shipment.deliveryAddress?.city
                      ? `, ${shipment.deliveryAddress.city}`
                      : ""}
                  </p>
                </div>
              </Link>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50 shrink-0">
                <div className="text-left sm:text-right space-y-1">
                  <div className="flex items-center gap-1.5 sm:justify-end">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-semibold px-2 py-0.5 border ${
                        isPaid
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      {isPaid ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <CreditCard className="h-3 w-3" />
                      )}
                      {isPaid ? "PAID" : "UNPAID"}
                    </span>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 border border-border bg-muted text-foreground uppercase">
                      {shipment.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <span className="block font-mono text-xs font-bold text-foreground">
                    ৳{Number(shipment.deliveryCharge).toFixed(2)} BDT
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/customer/shipments/${shipment.id}`}
                    className={buttonVariants({
                      variant: "default",
                      size: "xs",
                      className:
                        "font-mono text-[11px] uppercase tracking-wider",
                    })}
                  >
                    Details
                  </Link>
                  <Link
                    href={`/customer/track-shipment?tracking=${shipment.trackingNumber}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "xs",
                      className:
                        "font-mono text-[11px] uppercase tracking-wider hover:border-primary/50",
                    })}
                  >
                    Track
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
