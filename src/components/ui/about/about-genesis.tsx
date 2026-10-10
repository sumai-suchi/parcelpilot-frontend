"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Clock,
  Layers,
  FileQuestion,
  Receipt,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutGenesis() {
  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden border-b border-border">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Sparkles className="size-3.5" />
            <span>ORIGIN STORY & INDUSTRY DIAGNOSIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Moving Beyond the Logistics Black Box
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Domestic eCommerce and regional parcel transport in Bangladesh have
            long suffered from opacity, paper slips, and unaccountable delivery
            drop-offs. ParcelPilot was conceived to replace ambiguity with a
            mathematically deterministic software pipeline.
          </p>
        </div>

        {/* Side-by-side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Legacy Logistics Crisis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full rounded-none border-destructive/20 bg-destructive/[0.02] dark:bg-destructive/[0.04] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-1 bg-destructive/60" />
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-destructive/40 text-destructive bg-destructive/10 text-xs font-mono"
                  >
                    <AlertTriangle className="size-3 mr-1.5" />
                    LEGACY PARADIGM
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    PRE-PARCELPILOT
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  The Opaque Shipping Vacuum
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Traditional couriers rely on manual spreadsheets, untracked
                  drivers, and unverified handovers.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/80 border border-border">
                    <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        Blind Transit Windows
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Parcels disappear between inter-district highways for
                        48+ hours without hub telematics or ETA.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/80 border border-border">
                    <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        Unverified Doorstep Drops
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Reliance on illegible paper signatures leads to endless
                        customer disputes and missing shipments.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/80 border border-border">
                    <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        14-Day Settlement Bottlenecks
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Merchants wait weeks for manual reconciliation of
                        Cash-on-Delivery collections, choking growth.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/80 border border-border">
                    <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        Isolated Communication Silos
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Couriers, hub supervisors, and merchants operate in
                        fragmented WhatsApp groups without audit logs.
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: The ParcelPilot Architecture */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full rounded-none border-primary/30 bg-primary/[0.03] shadow-md relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-primary/40 text-primary bg-primary/10 text-xs font-mono"
                  >
                    <Sparkles className="size-3 mr-1.5" />
                    PARCELPILOT ENGINE
                  </Badge>
                  <span className="text-xs font-mono text-primary font-semibold">
                    THE NEW STANDARD
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  The Deterministic Logistics Network
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Every consignment is modeled as an immutable state machine
                  with end-to-end cryptographic integrity.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/90 border border-primary/20 shadow-xs">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        Granular Checkpoint Telemetry
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Every handoff from Merchant Pickup → Origin Hub →
                        Linehaul Transit → Destination Hub is tracked live.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/90 border border-primary/20 shadow-xs">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        6-Digit OTP Custody Verification
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Deliveries can only be marked completed once the courier
                        inputs the recipient's secure time-limited token.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/90 border border-primary/20 shadow-xs">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        Automated Stripe Gateway & Next-Day Reconciliation
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Instant digital checkout or automated financial tracking
                        with transparent itemized delivery fees.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-none bg-background/90 border border-primary/20 shadow-xs">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase font-mono tracking-wider">
                        Unified 5-Role Control Plane
                      </strong>
                      <span className="text-muted-foreground text-xs">
                        Dedicated role-tailored consoles for Merchants,
                        Couriers, Hub Managers, Operations Managers, and Admins.
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
