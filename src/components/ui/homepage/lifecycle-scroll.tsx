"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  UserCheck,
  Package,
  Building,
  Truck,
  Warehouse,
  Bike,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SCENES = [
  {
    num: "01",
    title: "Create Shipment",
    tagline: "Instant consignment ingestion and digital barcode generation.",
    icon: FileText,
    terminal: "SENDER PORTAL // API INGESTION",
    data: {
      status: "MANIFEST_CREATED",
      action: "Sender generates consignment PP-48291. Weight: 1.85kg. Declared value: ৳1,650.",
      telemetry: "Barcode 8840291048291 generated · Webhook emitted to dispatch engine.",
    },
  },
  {
    num: "02",
    title: "Courier Receives Assignment",
    tagline: "Automated geofence proximity matching under 4.2 seconds.",
    icon: UserCheck,
    terminal: "DISPATCH RADAR // FLEET MATCH",
    data: {
      status: "COURIER_ASSIGNED",
      action: "Rider #1142 located 850m away accepts pickup task via courier handset.",
      telemetry: "Driver ETA: 7 minutes · Vehicle: Yamaha FZS #DHK-HA-4412.",
    },
  },
  {
    num: "03",
    title: "Package is Picked Up",
    tagline: "Doorstep physical inspection, weight lock, and SMS receipt.",
    icon: Package,
    terminal: "MERCHANT DOCK // CUSTODY HANDOVER",
    data: {
      status: "PICKED_UP",
      action: "Barcode scanned at doorstep. Electronic scale confirms 1.85 kg. Custody transfer logged.",
      telemetry: "Digital signature captured · SMS pickup confirmation pushed to recipient.",
    },
  },
  {
    num: "04",
    title: "Reaches Origin Hub",
    tagline: "High-speed conveyor sorting belt and container consolidation.",
    icon: Building,
    terminal: "TEJGAON HUB-01 // BELT INDUCTION",
    data: {
      status: "ORIGIN_SORTED",
      action: "Automated optical barcode scan sorts parcel into Chattogram Trunk Bin #04.",
      telemetry: "Belt scan speed: 0.4s · Palletized into Secure Linehaul Container #C-902.",
    },
  },
  {
    num: "05",
    title: "Moves Through Network",
    tagline: "Inter-district linehaul transit with continuous telematics.",
    icon: Truck,
    terminal: "HIGHWAY CORRIDOR N1 // LINEHAUL",
    data: {
      status: "IN_TRANSIT",
      action: "Container truck en route from Dhaka to Chattogram via Highway N1 corridor.",
      telemetry: "Speed: 64 km/h · Geo-fenced corridor locked · GPS telemetry synced every 15s.",
    },
  },
  {
    num: "06",
    title: "Destination Hub Inbound",
    tagline: "De-palletizing, security seal verification, and rider bin sorting.",
    icon: Warehouse,
    terminal: "AGRABAD HUB-04 // INBOUND SCAN",
    data: {
      status: "DESTINATION_SORTED",
      action: "Container unloaded, digital seal verified, and parcel routed to Agrabad local dispatch bin.",
      telemetry: "Hub inbound timestamp: 05:45 AM · Assigned to Last-Mile Fleet Batch #02.",
    },
  },
  {
    num: "07",
    title: "Out for Delivery",
    tagline: "Courier initiates morning route with turn-by-turn navigation.",
    icon: Bike,
    terminal: "LAST-MILE FLEET // DISPATCH RUN",
    data: {
      status: "OUT_FOR_DELIVERY",
      action: "Courier departs hub for consignee address with 2-hour delivery window alert.",
      telemetry: "Recipient notified with live map link · Contact masking active for privacy.",
    },
  },
  {
    num: "08",
    title: "Delivered & Reconciled",
    tagline: "OTP verification, doorstep COD collection, and bank settlement.",
    icon: CheckCircle2,
    terminal: "CONSIGNEE DOORSTEP // COMPLETE",
    data: {
      status: "DELIVERED_SUCCESS",
      action: "4-digit recipient OTP verified, ৳1,650 cash collected, and receipt signed digitally.",
      telemetry: "Chain of custody closed · Merchant ledger credited for tomorrow's bank run.",
    },
  },
];

export default function LifecycleScroll() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeScene = SCENES[activeIdx];
  const Icon = activeScene.icon;

  const nextScene = () => {
    setActiveIdx((prev) => (prev + 1) % SCENES.length);
  };

  const prevScene = () => {
    setActiveIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  };

  return (
    <section className="py-24 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <span>OPERATIONAL SIMULATION</span>
            <span className="text-muted-foreground">/</span>
            <span>INSIDE PARCELPILOT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Travel with the parcel.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Step through all 8 operational handoffs to experience how ParcelPilot eliminates 
            friction and blind spots across the complete shipment lifecycle.
          </p>
        </div>

        {/* Interactive Experience Monitor using Shadcn Card */}
        <Card className="border-border bg-card text-card-foreground shadow-xl overflow-hidden">
          
          {/* Top Stage Tracker Bar */}
          <div className="grid grid-cols-4 sm:grid-cols-8 border-b border-border/70 font-mono text-xs">
            {SCENES.map((sc, idx) => (
              <button
                key={sc.num}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`py-3 px-2 text-center transition-colors border-r border-border/60 last:border-r-0 ${
                  activeIdx === idx
                    ? "bg-primary/15 text-primary font-bold border-b-2 border-b-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <div>SCENE {sc.num}</div>
                <div className="text-[10px] truncate hidden md:block mt-0.5">{sc.title}</div>
              </button>
            ))}
          </div>

          {/* Scene Stage Display */}
          <CardContent className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Column: Visual Icon & Technical Spec */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div>
                    <div className="font-mono text-xs text-primary font-bold">
                      STAGE {activeScene.num} OF 08
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground font-sans mt-1">
                      {activeScene.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-2">
                      {activeScene.tagline}
                    </CardDescription>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={prevScene}
                      aria-label="Previous scene"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      onClick={nextScene}
                      className="bg-primary text-primary-foreground font-semibold text-xs font-mono"
                    >
                      <span>ADVANCE TO SCENE {SCENES[(activeIdx + 1) % SCENES.length].num}</span>
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

                {/* Right Column: Active Terminal Monitor */}
                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-border bg-muted/30 p-6 font-mono text-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/70 text-muted-foreground">
                      <span className="text-primary font-bold">{activeScene.terminal}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">STATUS: {activeScene.data.status}</span>
                    </div>

                    <div className="space-y-3 text-foreground">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
                          OPERATIONAL ACTION
                        </div>
                        <div className="text-sm font-sans font-medium text-foreground">
                          {activeScene.data.action}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-card border border-border text-muted-foreground">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
                          TELEMETRY & LOGISTICS EVENT LOG
                        </div>
                        <div className="text-xs text-primary font-mono font-medium">
                          &gt; {activeScene.data.telemetry}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>VALIDATION: AUTOMATED SHA256 HASH</span>
                      <span>SYSTEM RESPONSE: 42ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>

        </Card>

      </div>
    </section>
  );
}
