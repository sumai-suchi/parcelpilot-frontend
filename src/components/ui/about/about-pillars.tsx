"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Bike,
  Sliders,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  MapPin,
  Lock,
  Layers,
  Radio,
  FileText,
  Clock,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPillars() {
  return (
    <section id="operational-pillars" className="py-24 bg-muted/30 text-foreground border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Layers className="size-3.5" />
            <span>OPERATIONAL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            The Four Pillars of Deterministic Delivery
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            ParcelPilot does not treat logistics as a simple list of tasks. Every consignment moves through
            an engineered four-stage operational matrix that enforces physical accountability at each boundary.
          </p>
        </div>

        {/* Interactive Tabs */}
        <Tabs defaultValue="hubs" className="w-full space-y-8">
          <div className="flex justify-center">
            <TabsList className="bg-background/80 border border-border p-1.5 rounded-xl shadow-xs flex-wrap max-w-full">
              <TabsTrigger
                value="hubs"
                className="gap-2 px-5 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs uppercase"
              >
                <Building2 className="size-4" />
                <span>01. Hub Topology</span>
              </TabsTrigger>
              <TabsTrigger
                value="couriers"
                className="gap-2 px-5 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs uppercase"
              >
                <Bike className="size-4" />
                <span>02. Courier Grid</span>
              </TabsTrigger>
              <TabsTrigger
                value="operations"
                className="gap-2 px-5 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs uppercase"
              >
                <Sliders className="size-4" />
                <span>03. Ops Control</span>
              </TabsTrigger>
              <TabsTrigger
                value="finance"
                className="gap-2 px-5 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs uppercase"
              >
                <CreditCard className="size-4" />
                <span>04. Settlement</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: HUB TOPOLOGY */}
          <TabsContent value="hubs" className="focus:outline-none">
            <Card className="border-border bg-card shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 text-xs font-mono">
                      PILLAR 01 · INFRASTRUCTURE
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      Multi-Tier Hub Sorting & Inter-District Linehaul
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Rather than relying on ad-hoc point-to-point courier handoffs, ParcelPilot structures all traffic
                      through a hierarchical network of District Induction Centers, Regional Consolidation Hubs, and
                      Highway Linehaul Convoys.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Truck className="size-4 text-primary" />
                        <span>TRANSIT VEHICLE MANIFESTS</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Every inter-hub linehaul transfer generates a digital manifest, preventing cargo discrepancies across routes.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Building2 className="size-4 text-primary" />
                        <span>PALLET CHECK-IN & INDUCTION</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Destination hubs scan inbound consignments in real-time, verifying intact seals and immediately alerting managers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-muted/50 p-6 rounded-xl border border-border space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-mono font-semibold uppercase text-foreground">
                      Hub State Machine Transitions
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">100% AUDITED</span>
                  </div>
                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                      <span className="text-muted-foreground">01. INTAKE</span>
                      <span className="text-primary font-semibold">AT_ORIGIN_HUB</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                      <span className="text-muted-foreground">02. DISPATCH</span>
                      <span className="text-amber-500 font-semibold">IN_TRANSIT (LINEHAUL)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                      <span className="text-muted-foreground">03. ARRIVAL</span>
                      <span className="text-emerald-500 font-semibold">AT_DESTINATION_HUB</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                      <span className="text-muted-foreground">04. FINAL MILE</span>
                      <span className="text-blue-500 font-semibold">OUT_FOR_DELIVERY</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 2: COURIER GRID */}
          <TabsContent value="couriers" className="focus:outline-none">
            <Card className="border-border bg-card shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs font-mono">
                      PILLAR 02 · LAST-MILE EXECUTION
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      Smart Courier Tasks & Cryptographic OTP Delivery
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Couriers operate with a dedicated mobile task deck. Pickups, hub handovers, and doorstep deliveries
                      are geofenced and validated using dynamic 6-digit verification codes generated on the recipient's terminal.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Lock className="size-4 text-emerald-500" />
                        <span>TAMPER-PROOF VERIFICATION</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Deliveries cannot be falsified. The courier must enter the exact recipient OTP before marking the shipment complete.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Bike className="size-4 text-emerald-500" />
                        <span>REJECTION & RETURN REASONS</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Failed attempts require structured rejection notes and immediate dispatcher notification for resolution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-muted/50 p-6 rounded-xl border border-border space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-mono font-semibold uppercase text-foreground">
                      Delivery OTP Protocol
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">ACTIVE LOCK</span>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border text-center space-y-2">
                    <span className="text-xs text-muted-foreground font-mono">RECIPIENT SECURE TOKEN</span>
                    <div className="font-mono text-3xl font-black tracking-widest text-primary">
                      8 4 9 2 0 1
                    </div>
                    <span className="text-[11px] text-muted-foreground block font-sans">
                      Generated at doorstep dispatch · Expires upon completion
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 3: OPERATIONS CONTROL */}
          <TabsContent value="operations" className="focus:outline-none">
            <Card className="border-border bg-card shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-xs font-mono">
                      PILLAR 03 · NETWORK DISPATCH
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      Network Operations Cockpit & Dynamic Triage
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Operations Managers oversee nationwide traffic flow, allocate couriers across high-density zones,
                      monitor SLA compliance thresholds, and intervene immediately when a corridor experiences transit delays.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Sliders className="size-4 text-amber-500" />
                        <span>DYNAMIC REASSIGNMENT</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Single-click courier and driver reassignment when fleet vehicles encounter mechanical issues.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Radio className="size-4 text-amber-500" />
                        <span>HIGHWAY DELAY HEATMAP</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Corridor latency detection identifies traffic bottlenecks before delivery promises are broken.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-muted/50 p-6 rounded-xl border border-border space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-mono font-semibold uppercase text-foreground">
                      Operations Live SLA Monitor
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">NOMINAL</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-background border border-border flex justify-between items-center">
                      <span>AVERAGE PICKUP LATENCY</span>
                      <span className="text-emerald-500 font-bold">24 MIN</span>
                    </div>
                    <div className="p-2.5 rounded bg-background border border-border flex justify-between items-center">
                      <span>INTER-HUB TRANSIT ACCURACY</span>
                      <span className="text-emerald-500 font-bold">99.7%</span>
                    </div>
                    <div className="p-2.5 rounded bg-background border border-border flex justify-between items-center">
                      <span>SLA COMPLIANCE (METRO)</span>
                      <span className="text-primary font-bold">99.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 4: SETTLEMENT */}
          <TabsContent value="finance" className="focus:outline-none">
            <Card className="border-border bg-card shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 text-xs font-mono">
                      PILLAR 04 · FINANCIAL SOVEREIGNTY
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      Integrated Stripe Gateway & Instant Ledger
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Cash flow is the lifeblood of eCommerce merchants. ParcelPilot integrates Stripe Hosted Checkout for
                      frictionless digital card payments and maintains an itemized database ledger for Cash-on-Delivery collections.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <CreditCard className="size-4 text-blue-500" />
                        <span>STRIPE CHECKOUT SESSIONS</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Secure tokenized credit/debit card processing with automated webhook payment status reconciliation.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/60 border border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <FileText className="size-4 text-blue-500" />
                        <span>TRANSPARENT WAYBILL FEES</span>
                      </div>
                      <p className="text-muted-foreground font-sans text-[11px]">
                        Weight-based rate calculations with clear delivery charge breakdowns and zero hidden surcharges.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-muted/50 p-6 rounded-xl border border-border space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-mono font-semibold uppercase text-foreground">
                      Settlement Telemetry
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">RECONCILED</span>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border space-y-3 font-mono text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>BASE DELIVERY CHARGE</span>
                      <span>৳ 100.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>EXPRESS WEIGHT TIER</span>
                      <span>৳ 25.00</span>
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between font-bold text-foreground">
                      <span>TOTAL SETTLEMENT</span>
                      <span className="text-primary">৳ 125.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}
