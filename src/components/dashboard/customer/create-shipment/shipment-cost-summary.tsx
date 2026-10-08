"use client";

import { ArrowRight, Loader2, Receipt, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ShipmentCostSummaryProps {
  weight: number;
  deliveryType: string;
  isSubmitting: boolean;
  onProceedToPayment: () => void;
}

export function ShipmentCostSummary({
  weight,
  deliveryType,
  isSubmitting,
  onProceedToPayment,
}: ShipmentCostSummaryProps) {
  // Pricing breakdown formula matching backend rate rules
  const baseRate =
    deliveryType === "SAME_DAY" ? 200.0 : deliveryType === "EXPRESS" ? 150.0 : 100.0;
  const perKg =
    deliveryType === "SAME_DAY" ? 50.0 : deliveryType === "EXPRESS" ? 35.0 : 20.0;
  const weightSurcharge = Math.max(0, (weight - 1) * perKg);
  const total = (baseRate + weightSurcharge).toFixed(2);

  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest font-semibold">
            <Receipt className="h-3 w-3" />
            <span>ESTIMATE LEDGER</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground uppercase">
            LIVE QUOTE
          </span>
        </div>
        <CardTitle className="text-base font-heading font-black tracking-tight text-foreground uppercase mt-2">
          Waybill Rate Summary
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-sans">
          Automated tariff calculation based on zone distance, tier, and gross
          weight.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-5">
        <div className="space-y-2.5 text-xs font-mono">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Base Freight Rate (first 1.0 kg)</span>
            <span className="font-semibold text-foreground">
              ৳{baseRate.toFixed(2)}
            </span>
          </div>

          {weightSurcharge > 0 && (
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Weight Surcharge (+{(weight - 1).toFixed(1)} kg)</span>
              <span className="font-semibold text-foreground">
                +৳{weightSurcharge.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-muted-foreground">
            <span>Service Speed Tier</span>
            <span className="font-semibold text-primary uppercase">
              {deliveryType}
            </span>
          </div>
        </div>

        <div className="border-t border-border/60 pt-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                Total Chargeable Rate
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                ৳{total}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              BDT NET
            </span>
          </div>
        </div>

        <div className="rounded-none border border-border/70 bg-muted/30 p-3 text-[11px] font-mono text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5 text-foreground font-semibold">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Stripe Encrypted Checkout</span>
          </div>
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Tracking ID & physical dispatch slip are provisioned instantly upon
            confirmation.
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={onProceedToPayment}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-widest text-xs h-11 rounded-none cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Registering Waybill...</span>
            </>
          ) : (
            <>
              <span>Confirm & Pay ৳{total}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
