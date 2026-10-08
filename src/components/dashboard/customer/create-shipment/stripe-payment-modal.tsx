"use client";

import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Receipt,
  ShieldAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useConfirmPayment,
  useCreatePaymentIntent,
} from "@/hooks/payment.hook";

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentId: string;
  trackingNumber: string;
  amount: number | string;
  currency?: string;
  onPaymentSuccess: () => void;
}

export function StripePaymentModal({
  isOpen,
  onClose,
  shipmentId,
  trackingNumber,
  amount,
  currency = "BDT",
  onPaymentSuccess,
}: StripePaymentModalProps) {
  const [step, setStep] = useState<"card_input" | "processing" | "succeeded">(
    "card_input",
  );
  const [cardHolder, setCardHolder] = useState("Demo Customer");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("123");
  const [transactionId, setTransactionId] = useState("");

  const createPaymentIntentMutation = useCreatePaymentIntent();
  const confirmPaymentMutation = useConfirmPayment();

  if (!isOpen) return null;

  const handlePayNow = async () => {
    try {
      setStep("processing");

      // 1. Create PaymentIntent on Stripe via backend
      const intentRes = await createPaymentIntentMutation.mutateAsync({
        shipmentId,
        payload: { currency: currency.toLowerCase() },
      });

      const paymentIntentId = intentRes.data?.paymentIntentId;

      if (!paymentIntentId) {
        throw new Error("Unable to initialize Stripe PaymentIntent");
      }

      // 2. Confirm Payment on backend with test payment method
      await confirmPaymentMutation.mutateAsync({
        shipmentId,
        payload: {
          paymentIntentId,
          paymentMethodId: "pm_card_visa", // Default test card provided by Stripe
        },
      });

      setTransactionId(paymentIntentId);
      setStep("succeeded");
      toast.success("Payment confirmed successfully via Stripe!");
      onPaymentSuccess();
    } catch (err: any) {
      setStep("card_input");
      toast.error(err?.message || "Stripe payment processing failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-none p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "card_input" && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest font-semibold mb-2">
                <CreditCard className="h-3 w-3" />
                <span>STRIPE SETTLEMENT GATEWAY</span>
              </div>
              <h3 className="text-lg font-heading font-black tracking-tight text-foreground uppercase">
                Consignment Payment
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                WAYBILL:{" "}
                <span className="font-bold text-foreground">
                  {trackingNumber}
                </span>
              </p>
            </div>

            <div className="rounded-none border border-border/80 bg-muted/30 p-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Chargeable Balance
                </span>
                <span className="text-2xl font-mono font-black text-foreground">
                  ৳{Number(amount).toFixed(2)}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {currency.toUpperCase()}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                <Lock className="h-3 w-3 shrink-0" />
                <span>256-Bit TLS End-To-End Encrypted Stripe Protocol</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                  Cardholder Legal Name
                </label>
                <Input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="rounded-none font-mono text-xs h-9 bg-background border-border"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                  Card Number (Visa / Mastercard Test)
                </label>
                <Input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="rounded-none font-mono text-xs h-9 bg-background border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Expiry (MM/YY)
                  </label>
                  <Input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="rounded-none font-mono text-xs h-9 bg-background border-border"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Security Code (CVC)
                  </label>
                  <Input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="rounded-none font-mono text-xs h-9 bg-background border-border"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-1/3 rounded-none font-mono uppercase text-xs h-10 border-border cursor-pointer hover:bg-muted"
              >
                Pay Later
              </Button>
              <Button
                type="button"
                onClick={handlePayNow}
                className="w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer"
              >
                Authorize ৳{Number(amount).toFixed(2)}
              </Button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="py-10 text-center space-y-4 font-mono">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Authorizing Transaction...
              </h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Validating card cryptographic token on Stripe network and
                setting waybill status to PAID.
              </p>
            </div>
          </div>
        )}

        {step === "succeeded" && (
          <div className="py-6 text-center space-y-5 font-mono">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-base font-black uppercase tracking-tight text-foreground">
                Settlement Confirmed
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Receipt recorded for ৳{Number(amount).toFixed(2)}{" "}
                {currency.toUpperCase()}.
              </p>
            </div>

            <div className="rounded-none border border-border/70 bg-muted/30 p-3.5 text-left text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase text-muted-foreground">
                  Stripe Reference:
                </span>
                <span className="font-bold text-foreground truncate max-w-[200px]">
                  {transactionId || "pi_test_stripe"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase text-muted-foreground">
                  Ledger Status:
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  PAID IN FULL
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer"
            >
              Continue to Manifest View
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
