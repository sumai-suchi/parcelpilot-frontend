"use client";

import {
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CreatedShipmentData } from "@/types/shipment.interface";

interface ShipmentSuccessModalProps {
  shipment: CreatedShipmentData;
  onOpenPayment: () => void;
  onReset: () => void;
  isRedirecting?: boolean;
}

export function ShipmentSuccessModal({
  shipment,
  onOpenPayment,
  onReset,
  isRedirecting = false,
}: ShipmentSuccessModalProps) {

  const [copied, setCopied] = useState(false);
  const isPaid = shipment.paymentStatus === "PAID";

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(shipment.trackingNumber);
    setCopied(true);
    toast.success("Tracking identifier copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-lg max-w-xl mx-auto">
      <CardHeader className="border-b border-border/60 pb-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-2">
          <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
        </div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-none uppercase tracking-widest font-semibold mx-auto">
          <span>WAYBILL GENERATED</span>
          <span className="text-muted-foreground">/</span>
          <span>DISPATCH SCHEDULED</span>
        </div>
        <CardTitle className="text-2xl font-heading font-black tracking-tight text-foreground uppercase mt-2">
          Consignment Registered
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
          Your shipment has entered the ParcelPilot network and forwarded to
          Regional Hub Operations for automated transit intake.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {/* Tracking Code Highlight Box - Clickable to Details */}
        <Link
          href={`/customer/shipments/${shipment.id}`}
          className="group block rounded-none border border-border/80 bg-muted/30 p-4 space-y-3 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
              WAYBILL TRACKING ID (CLICK FOR DETAILS)
            </span>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCopyTracking();
              }}
              className="rounded-none font-mono text-[10px] uppercase tracking-wider h-7 gap-1.5 border-border cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>COPY ID</span>
                </>
              )}
            </Button>
          </div>
          <div className="font-mono text-xl sm:text-2xl font-black text-foreground tracking-wider group-hover:text-primary transition-colors flex items-center justify-between">
            <span>{shipment.trackingNumber}</span>
            <span className="text-xs font-mono font-normal uppercase text-muted-foreground group-hover:text-primary">
              View Details →
            </span>
          </div>
        </Link>

        {/* Telemetry Summary Grid - Clickable to Details */}
        <Link
          href={`/customer/shipments/${shipment.id}`}
          className="group block"
        >
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="border border-border/70 p-3 bg-muted/20 group-hover:border-primary/50 transition-colors">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                Consignment Status
              </span>
              <span className="inline-block mt-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5">
                {shipment.status || "PENDING_APPROVAL"}
              </span>
            </div>

            <div className="border border-border/70 p-3 bg-muted/20 group-hover:border-primary/50 transition-colors">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                Payment State
              </span>
              <span
                className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 border ${
                  isPaid
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                }`}
              >
                {shipment.paymentStatus}
              </span>
            </div>

            <div className="col-span-2 border border-border/70 p-3 bg-muted/20 flex justify-between items-center group-hover:border-primary/50 transition-colors">
              <div>
                <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                  Total Freight Rate
                </span>
                <span className="text-base font-bold text-foreground">
                  ৳{Number(shipment.deliveryCharge).toFixed(2)} BDT
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Waybill Insured</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-2 border-t border-border/60">
        <Link
          href={`/customer/shipments/${shipment.id}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none flex items-center justify-center gap-2",
          )}
        >
          <span>View Shipment Details</span>
        </Link>

        {!isPaid && (
          <Button
            type="button"
            onClick={onOpenPayment}
            disabled={isRedirecting}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer flex items-center justify-center gap-2"
          >
            {isRedirecting ? (
              <>
                <Spinner className="h-4 w-4" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Pay with Stripe</span>
              </>
            )}
          </Button>
        )}


        <Link
          href={`/customer/track-shipment?tracking=${shipment.trackingNumber}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex-1 border-border font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none flex items-center justify-center gap-2 hover:bg-muted",
          )}
        >
          <Truck className="h-4 w-4" />
          <span>Track Live</span>
        </Link>

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="border-border font-mono uppercase font-semibold tracking-wider text-xs h-10 rounded-none cursor-pointer flex items-center justify-center gap-2 hover:bg-muted"
        >
          <Plus className="h-4 w-4" />
          <span>Book Another</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
