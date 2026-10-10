"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  FileText,
  Key,
  MapPin,
  Package,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  useCreateCheckoutSession,
  useVerifyCheckoutSession,
} from "@/hooks/payment.hook";
import { useCancelShipment, useShipmentDetails } from "@/hooks/shipment.hook";
import { cn } from "@/lib/utils";
import type { DetailedShipmentData } from "@/types/shipment.interface";

interface ShipmentDetailsViewProps {
  shipmentId: string;
}

export function ShipmentDetailsView({ shipmentId }: ShipmentDetailsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: res, isLoading, refetch } = useShipmentDetails(shipmentId);
  const cancelMutation = useCancelShipment();
  const createCheckoutSessionMutation = useCreateCheckoutSession();
  const verifyCheckoutSessionMutation = useVerifyCheckoutSession();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const hasVerifiedRef = useRef(false);

  const paymentParam = searchParams.get("payment");
  const sessionIdParam = searchParams.get("session_id");

  useEffect(() => {
    if (
      paymentParam === "success" &&
      sessionIdParam &&
      !hasVerifiedRef.current
    ) {
      hasVerifiedRef.current = true;
      toast.loading("Verifying Stripe payment confirmation...", {
        id: "stripe-verify",
      });
      verifyCheckoutSessionMutation.mutate(
        {
          shipmentId,
          sessionId: sessionIdParam,
        },
        {
          onSuccess: () => {
            toast.success(
              "Payment completed successfully via Stripe! Waybill updated.",
              { id: "stripe-verify" },
            );
            refetch();
            router.replace(`/customer/shipments/${shipmentId}`);
          },
          onError: (err: any) => {
            toast.error(
              err?.message || "Failed to verify Stripe payment confirmation.",
              { id: "stripe-verify" },
            );
          },
        },
      );
    } else if (paymentParam === "cancelled" && !hasVerifiedRef.current) {
      hasVerifiedRef.current = true;
      toast.info("Stripe checkout was cancelled. You may retry when ready.", {
        id: "stripe-verify",
      });
      router.replace(`/customer/shipments/${shipmentId}`);
    }
  }, [
    paymentParam,
    sessionIdParam,
    shipmentId,
    verifyCheckoutSessionMutation,
    refetch,
    router,
  ]);

  const handlePayWithStripe = async () => {
    try {
      toast.info("Connecting to Stripe...", {
        description: "Redirecting to Stripe secure hosted checkout",
      });
      const sessionRes = await createCheckoutSessionMutation.mutateAsync({
        shipmentId,
      });
      if (sessionRes?.data?.url) {
        window.location.href = sessionRes.data.url;
      } else {
        throw new Error("Stripe checkout URL was not returned by gateway.");
      }
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to initiate Stripe payment checkout.",
      );
    }
  };

  const shipment: DetailedShipmentData | undefined = res?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-3">
        <Spinner />
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Loading waybill & consignment records...
        </span>
      </div>
    );
  }

  if (!shipment) {
    return (
      <Card className="rounded-none border-border bg-card p-12 text-center max-w-xl mx-auto space-y-4">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
        <h3 className="font-sans text-lg font-bold text-foreground">
          Consignment Not Found
        </h3>
        <p className="font-sans text-xs text-muted-foreground">
          The requested shipment record could not be located or you do not have
          clearance to view this waybill.
        </p>
        <Link
          href="/customer/shipment-history"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-none font-mono text-xs uppercase tracking-wider border-border mt-2",
          )}
        >
          Return to Shipment History
        </Link>
      </Card>
    );
  }

  const isPaid = shipment.paymentStatus === "PAID";
  const isCancelled = shipment.status === "CANCELLED";

  // Eligible statuses for customer cancellation prior to courier pickup
  const cancellableStatuses = [
    "PENDING_APPROVAL",
    "CREATED",
    "COURIER_ASSIGNED",
    "PICKUP_ASSIGNED",
  ];
  const isCancellable =
    !isCancelled && cancellableStatuses.includes(shipment.status);

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(shipment.trackingNumber);
    setCopied(true);
    toast.success("Tracking number copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp);
    setCopiedOtp(true);
    toast.success("Delivery verification OTP copied to clipboard");
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleCancelShipment = async () => {
    try {
      await cancelMutation.mutateAsync({
        id: shipment.id,
        reason: cancelReason.trim() || "Cancelled by customer via portal",
      });
      toast.success("Shipment has been successfully cancelled.");
      setIsCancelModalOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(
        err?.message ||
          "Failed to cancel shipment. The parcel might have already been picked up.",
      );
    }
  };

  const handlePaymentSuccess = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="rounded-none font-mono text-xs uppercase tracking-wider border-border hover:bg-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back
          </Button>
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
              <Link href="/customer" className="hover:text-foreground">
                Dashboard
              </Link>
              <span>/</span>
              <Link
                href="/customer/shipment-history"
                className="hover:text-foreground"
              >
                Shipments
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold">
                {shipment.trackingNumber}
              </span>
            </div>
            <h1 className="font-heading font-black text-xl sm:text-2xl tracking-tight text-foreground uppercase mt-0.5">
              Waybill Details
            </h1>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Stripe Pay Button */}
          {!isPaid && !isCancelled && (
            <Button
              type="button"
              onClick={handlePayWithStripe}
              disabled={
                createCheckoutSessionMutation.isPending ||
                verifyCheckoutSessionMutation.isPending
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase font-bold tracking-wider rounded-none cursor-pointer flex items-center gap-1.5"
            >
              {createCheckoutSessionMutation.isPending ? (
                <>
                  <Spinner className="h-3.5 w-3.5" />
                  <span>Redirecting...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Pay with Stripe</span>
                </>
              )}
            </Button>
          )}

          {/* Cancel Delivery Button */}
          {isCancellable && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCancelModalOpen(true)}
              className="border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500 font-mono text-xs uppercase font-bold tracking-wider rounded-none cursor-pointer flex items-center gap-1.5"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Cancel Delivery</span>
            </Button>
          )}

          {/* Track Live */}
          <Link
            href={`/customer/track-shipment?tracking=${shipment.trackingNumber}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-none font-mono text-xs uppercase tracking-wider border-border hover:bg-muted flex items-center gap-1.5",
            )}
          >
            <Truck className="h-3.5 w-3.5 text-primary" />
            <span>Track Live</span>
          </Link>

          {/* Print Waybill */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="rounded-none font-mono text-xs uppercase tracking-wider border-border hover:bg-muted flex items-center gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </Button>
        </div>
      </div>

      {/* Payment Verification Banner */}
      {verifyCheckoutSessionMutation.isPending && (
        <div className="rounded-none border border-emerald-500/40 bg-emerald-500/10 p-4 flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-mono text-xs">
          <Spinner className="h-4 w-4 shrink-0" />
          <span className="font-bold uppercase tracking-wider">
            Verifying payment with Stripe and synchronizing consignment
            record...
          </span>
        </div>
      )}

      {/* Critical Status Alerts */}
      {isCancelled && (
        <div className="rounded-none border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3 text-red-600 dark:text-red-400 font-mono text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold uppercase tracking-wider">
              SHIPMENT CANCELLED
            </div>
            <p className="font-sans text-xs mt-0.5 opacity-90">
              This shipment request was cancelled. Dispatch operations and
              courier pickups have been terminated.
            </p>
          </div>
        </div>
      )}

      {!isPaid && !isCancelled && (
        <div className="rounded-none border border-amber-500/40 bg-amber-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-700 dark:text-amber-400 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <CreditCard className="h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider">
                PAYMENT PENDING: ৳{Number(shipment.deliveryCharge).toFixed(2)}{" "}
                BDT
              </span>
              <p className="font-sans text-xs opacity-90">
                Settle now using secure Stripe Card Payment or digital wallet to
                accelerate final line-haul release.
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handlePayWithStripe}
            disabled={
              createCheckoutSessionMutation.isPending ||
              verifyCheckoutSessionMutation.isPending
            }
            className="bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs uppercase font-bold tracking-wider rounded-none shrink-0"
          >
            {createCheckoutSessionMutation.isPending
              ? "Connecting..."
              : "Settle with Stripe"}
          </Button>
        </div>
      )}

      {/* Receiver Delivery Handover OTP Security Card */}
      {shipment.deliveryOtp && !isCancelled && (
        <Card className="rounded-none border-primary/40 bg-primary/5 text-card-foreground shadow-xs">
          <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  Receiver Handover Verification OTP
                </span>
                {shipment.status === "DELIVERED" ? (
                  <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.2 font-bold uppercase">
                    Handover Confirmed ✓
                  </span>
                ) : (
                  <span className="font-mono text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.2 font-bold uppercase">
                    Active Code
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Provide this 6-digit Security OTP to your courier rider upon
                arrival to confirm physical receipt of your package.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-lg sm:text-xl font-black tracking-widest bg-background border border-border px-3.5 py-1.5 text-foreground shadow-xs">
                <Key className="h-4 w-4 text-primary mr-1" />
                <span>{shipment.deliveryOtp}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopyOtp(shipment.deliveryOtp!)}
                className="rounded-none font-mono text-xs uppercase tracking-wider border-border hover:bg-muted cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                <span>{copiedOtp ? "COPIED" : "COPY"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Waybill Master Header Card */}
      <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                CONSIGNMENT IDENTIFIER
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-black text-foreground tracking-wider">
                  {shipment.trackingNumber}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleCopyTracking}
                  className="rounded-none font-mono text-[10px] uppercase tracking-wider h-7 gap-1 border-border"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <span className="text-muted-foreground">BOOKED:</span>
                <span className="text-foreground font-semibold">
                  {new Date(shipment.createdAt).toLocaleString()}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">SERVICE:</span>
                <span className="text-primary font-bold uppercase">
                  {shipment.deliveryType} SPEED
                </span>
              </div>
            </div>

            {/* Badges Matrix */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="border border-border/80 bg-muted/40 p-3 text-center min-w-[120px]">
                <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block">
                  TRANSIT STATUS
                </span>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border ${
                    shipment.status === "DELIVERED"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : shipment.status === "CANCELLED"
                        ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                        : "bg-primary/10 text-primary border-primary/20"
                  }`}
                >
                  {shipment.status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="border border-border/80 bg-muted/40 p-3 text-center min-w-[120px]">
                <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block">
                  PAYMENT STATE
                </span>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border ${
                    isPaid
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  }`}
                >
                  {shipment.paymentStatus}
                </span>
              </div>

              <div className="border border-border/80 bg-muted/40 p-3 text-center min-w-[120px]">
                <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block">
                  DELIVERY CHARGE
                </span>
                <span className="block mt-1 text-base font-mono font-black text-foreground">
                  ৳{Number(shipment.deliveryCharge).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Corridor & Addresses (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Corridor Addresses Card */}
          <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
            <CardHeader className="border-b border-border/70 p-4">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Transit Corridor & Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Address */}
              <div className="border border-border/80 p-4 space-y-3 bg-muted/20">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                    ORIGIN / PICKUP POINT
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 border border-border bg-muted text-muted-foreground uppercase">
                    {shipment.pickupAddress?.label || "Sender"}
                  </span>
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="font-semibold text-foreground text-sm">
                    {shipment.pickupAddress?.addressLine}
                  </div>
                  <div className="text-muted-foreground font-mono">
                    {shipment.pickupAddress?.area},{" "}
                    {shipment.pickupAddress?.city}
                  </div>
                  {shipment.pickupAddress?.postalCode && (
                    <div className="text-muted-foreground font-mono text-[11px]">
                      Postal Code: {shipment.pickupAddress.postalCode}
                    </div>
                  )}
                  {shipment.scheduledPickupAt && (
                    <div className="pt-2 text-primary font-mono text-[11px] flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        Pickup Slotted:{" "}
                        {new Date(shipment.scheduledPickupAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border border-border/80 p-4 space-y-3 bg-muted/20">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    DESTINATION / DELIVERY
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 border border-border bg-muted text-muted-foreground uppercase">
                    {shipment.deliveryAddress?.label || "Recipient"}
                  </span>
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="font-semibold text-foreground text-sm">
                    {shipment.deliveryAddress?.addressLine}
                  </div>
                  <div className="text-muted-foreground font-mono">
                    {shipment.deliveryAddress?.area},{" "}
                    {shipment.deliveryAddress?.city}
                  </div>
                  {shipment.deliveryAddress?.postalCode && (
                    <div className="text-muted-foreground font-mono text-[11px]">
                      Postal Code: {shipment.deliveryAddress.postalCode}
                    </div>
                  )}
                </div>
              </div>

              {/* Logistics Hubs Info */}
              {(shipment.originHub || shipment.destinationHub) && (
                <div className="md:col-span-2 border border-border/70 p-4 bg-muted/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                      ORIGIN HUB
                    </span>
                    <span className="font-sans font-bold text-xs text-foreground mt-0.5 block">
                      {shipment.originHub?.name || "Routing Inbound"}
                    </span>
                    {shipment.originHub?.code && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        Code: {shipment.originHub.code}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                      DESTINATION HUB
                    </span>
                    <span className="font-sans font-bold text-xs text-foreground mt-0.5 block">
                      {shipment.destinationHub?.name || "Sorting Target"}
                    </span>
                    {shipment.destinationHub?.code && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        Code: {shipment.destinationHub.code}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Telemetry Checkpoints Timeline */}
          <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
            <CardHeader className="border-b border-border/70 p-4 flex flex-row items-center justify-between">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Audit Trail & Status History
              </CardTitle>
              <span className="font-mono text-[11px] text-muted-foreground">
                EVENTS: {shipment.statusHistory?.length || 1}
              </span>
            </CardHeader>
            <CardContent className="p-5">
              {!shipment.statusHistory ||
              shipment.statusHistory.length === 0 ? (
                <div className="font-mono text-xs text-muted-foreground py-4 text-center">
                  Consignment created. Initial intake recorded.
                </div>
              ) : (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                  {shipment.statusHistory.map((item, idx) => (
                    <div key={item.id || idx} className="relative group">
                      <div className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-none border border-primary bg-background flex items-center justify-center">
                        <div className="h-1.5 w-1.5 bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-foreground uppercase tracking-tight">
                            {item.status.replace(/_/g, " ")}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                          {item.location && (
                            <span className="font-mono text-[10px] px-1.5 py-0.2 border border-border bg-muted text-muted-foreground uppercase">
                              {item.location}
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Parcel Specs, Billing, Payment (1 Col) */}
        <div className="space-y-6">
          {/* Parcel Specifications Card */}
          <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
            <CardHeader className="border-b border-border/70 p-4">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Commodity Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">PARCEL CATEGORY</span>
                <span className="font-bold text-foreground uppercase">
                  {shipment.parcelType}
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">DECLARED MASS</span>
                <span className="font-bold text-foreground">
                  {Number(shipment.weight).toFixed(2)} KG
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">SERVICE TIER</span>
                <span className="font-bold text-primary uppercase">
                  {shipment.deliveryType}
                </span>
              </div>
              {shipment.description && (
                <div className="pt-1">
                  <span className="text-muted-foreground block text-[10px] uppercase mb-1">
                    PACKAGE DESCRIPTION / INSTRUCTIONS:
                  </span>
                  <p className="font-sans text-xs text-foreground bg-muted/30 p-2.5 border border-border/60">
                    {shipment.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Billing & Stripe Settlement Card */}
          <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
            <CardHeader className="border-b border-border/70 p-4">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Billing & Stripe Settlement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 font-mono text-xs">
              <div className="space-y-2.5">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">FREIGHT TARIFF</span>
                  <span className="font-bold text-foreground">
                    ৳{Number(shipment.deliveryCharge).toFixed(2)} BDT
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">
                    GATEWAY PROVIDER
                  </span>
                  <span className="font-bold text-foreground">
                    {shipment.payment?.provider || "Stripe"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">
                    SETTLEMENT STATE
                  </span>
                  <span
                    className={`font-bold ${
                      isPaid
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {shipment.paymentStatus}
                  </span>
                </div>
                {shipment.payment?.transactionId && (
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">TX IDENTIFIER</span>
                    <span className="font-mono text-[10px] text-foreground font-bold truncate max-w-[150px]">
                      {shipment.payment.transactionId}
                    </span>
                  </div>
                )}
                {shipment.payment?.paidAt && (
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">SETTLED AT</span>
                    <span className="font-mono text-[10px] text-foreground">
                      {new Date(shipment.payment.paidAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {!isPaid && !isCancelled && (
                <Button
                  type="button"
                  onClick={handlePayWithStripe}
                  disabled={
                    createCheckoutSessionMutation.isPending ||
                    verifyCheckoutSessionMutation.isPending
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase font-bold tracking-wider text-xs h-9 rounded-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {createCheckoutSessionMutation.isPending ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      <span>Connecting to Stripe...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      <span>Settle Freight with Stripe</span>
                    </>
                  )}
                </Button>
              )}

              {isPaid && (
                <div className="border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5 font-bold uppercase text-[11px]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Tariff Paid in Full</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cancellation Info / Policy */}
          <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
            <CardHeader className="border-b border-border/70 p-4">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-primary" />
                Dispatch & Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 font-sans text-xs text-muted-foreground leading-relaxed">
              <p>
                Consignments can be cancelled prior to physical courier pickup
                scan (when in{" "}
                <span className="font-mono text-foreground font-semibold">
                  PENDING APPROVAL
                </span>{" "}
                or{" "}
                <span className="font-mono text-foreground font-semibold">
                  COURIER ASSIGNED
                </span>{" "}
                state).
              </p>
              {isCancellable ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCancelModalOpen(true)}
                  className="w-full border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500 font-mono text-xs uppercase font-bold tracking-wider rounded-none cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Cancel This Consignment</span>
                </Button>
              ) : (
                <div className="font-mono text-[11px] p-2 bg-muted/40 border border-border/60 text-muted-foreground text-center">
                  {isCancelled
                    ? "Consignment is already cancelled"
                    : "Cancellation locked: Parcel has progressed past pickup scan"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancel Shipment Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-mono text-sm font-bold uppercase tracking-wider border-b border-border/70 pb-3">
              <AlertTriangle className="h-5 w-5" />
              <span>Confirm Consignment Cancellation</span>
            </div>

            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to cancel shipment{" "}
              <span className="font-mono font-bold text-foreground">
                {shipment.trackingNumber}
              </span>
              ? Once confirmed, rider dispatch and hub sorting assignments will
              be stopped immediately.
            </p>

            <div className="space-y-1.5">
              <label
                htmlFor="cancel-reason"
                className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block"
              >
                Reason for cancellation (optional):
              </label>
              <textarea
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Changed recipient address, ordered in error, etc."
                rows={3}
                className="w-full rounded-none border border-border bg-muted/30 p-2.5 font-sans text-xs text-foreground focus:outline-hidden focus:border-primary resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/70">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCancelModalOpen(false)}
                disabled={cancelMutation.isPending}
                className="rounded-none font-mono text-xs uppercase tracking-wider border-border hover:bg-muted"
              >
                Keep Shipment
              </Button>
              <Button
                type="button"
                onClick={handleCancelShipment}
                disabled={cancelMutation.isPending}
                className="rounded-none bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase font-bold tracking-wider"
              >
                {cancelMutation.isPending ? "Cancelling..." : "Confirm Cancel"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
