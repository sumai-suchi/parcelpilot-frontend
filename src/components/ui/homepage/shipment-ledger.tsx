"use client";

import { CreditCard, Lock, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

export default function ShipmentLedger() {
  return (
    <section className="py-24 bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <CreditCard className="h-3.5 w-3.5" />
            <span>FINANCIAL LEDGER</span>
            <span className="text-muted-foreground">/</span>
            <span>STRIPE SETTLEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Transparent shipping. Automated settlement.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Every shipment generates an auditable waybill invoice. Powered by
            native Stripe integration with automated next-day merchant payouts
            and instant courier split disbursements.
          </p>
        </div>

        {/* Ledger Composition using Shadcn Card */}
        <Card className="max-w-3xl mx-auto border-border bg-card text-card-foreground shadow-2xl font-mono text-xs">
          {/* Ledger Header */}
          <CardHeader className="border-b border-border/70 pb-6 relative">
            <div className="absolute top-6 right-6 text-[10px] text-muted-foreground border border-border rounded px-2 py-0.5">
              WAYBILL #PP-INV-2026-881
            </div>

            <div className="text-primary font-bold text-sm">
              PARCELPILOT WAYBILL LEDGER
            </div>
            <CardTitle className="text-lg font-sans font-bold text-foreground mt-1">
              Consignment: PP-48291
            </CardTitle>
            <CardDescription className="text-xs font-mono">
              Dhaka Central Hub → Chattogram Agrabad Hub · STRIPE CONNECT DIRECT
            </CardDescription>
          </CardHeader>

          {/* Itemized Fee Breakdown */}
          <CardContent className="py-6 space-y-3.5 border-b border-border/70 text-foreground">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                BASE LINEHAUL FREIGHT (1.85 KG)
              </span>
              <span className="font-bold">৳180.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                HUB PROCESSING & SORTING FEE
              </span>
              <span className="font-bold">৳20.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                COMPREHENSIVE TRANSIT INSURANCE (UP TO ৳5,000)
              </span>
              <span className="font-bold">৳10.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                CASH ON DELIVERY (COD) COLLECTION VALUE
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                ৳1,450.00 (PENDING DOORSTEP)
              </span>
            </div>

            {/* Ledger Totals */}
            <div className="pt-6 mt-4 border-t border-border/70 flex items-baseline justify-between">
              <div>
                <div className="text-muted-foreground uppercase tracking-wider text-[11px]">
                  TOTAL DELIVERY FEE PAYABLE
                </div>
                <div className="text-3xl font-black text-foreground font-mono mt-1">
                  ৳210.00
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <Check className="h-3.5 w-3.5" />
                  STRIPE AUTH VERIFIED
                </span>
              </div>
            </div>
          </CardContent>

          {/* Actions & Security Trust */}
          <CardFooter className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>
                256-bit encrypted card billing & mobile wallet settlement
              </span>
            </div>

            <Link
              href="/register"
              className={buttonVariants({
                className:
                  "w-full sm:w-auto bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider",
              })}
            >
              Create Account & Ship
              <ArrowRight className="h-3.5 w-3.5 ml-2" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
