"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BellRing,
  UserCheck,
  Package,
  Building,
  Truck,
  Warehouse,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STAGES = [
  {
    step: "01",
    name: "Create Shipment",
    role: "CUSTOMER",
    location: "Online Portal / API",
    time: "T+00m",
    icon: FileText,
    desc: "Sender inputs package specs, delivery addresses, and declared COD amount. Barcode label generated instantly.",
  },
  {
    step: "02",
    name: "Pickup Requested",
    role: "SYSTEM DISPATCH",
    location: "Dispatch Routing Engine",
    time: "T+04m",
    icon: BellRing,
    desc: "Automated geofence dispatch matches the closest active fleet courier within 1.5km of the pickup origin.",
  },
  {
    step: "03",
    name: "Courier Assigned",
    role: "COURIER HERO",
    location: "Field Courier App",
    time: "T+12m",
    icon: UserCheck,
    desc: "Assigned courier accepts manifest task and navigates with optimized turn-by-turn route to sender location.",
  },
  {
    step: "04",
    name: "Picked Up & Scanned",
    role: "COURIER",
    location: "Merchant Doorstep",
    time: "T+35m",
    icon: Package,
    desc: "Package weighed, physical condition verified, barcode scanned, and handover receipt triggered via SMS.",
  },
  {
    step: "05",
    name: "Origin Hub Induction",
    role: "HUB MANAGER",
    location: "Tejgaon Hub [HUB-01]",
    time: "T+2h 10m",
    icon: Building,
    desc: "Security scan, automated belt sorting, and consolidation into high-capacity linehaul container truck.",
  },
  {
    step: "06",
    name: "In Transit Linehaul",
    role: "OPERATIONS",
    location: "Inter-District Highway N1",
    time: "T+4h 30m",
    icon: Truck,
    desc: "Intermodal freight transit monitored by telematics, GPS geofencing, and speed-compliance sensors.",
  },
  {
    step: "07",
    name: "Destination Hub Sorting",
    role: "HUB MANAGER",
    location: "Agrabad Hub [HUB-04]",
    time: "T+8h 15m",
    icon: Warehouse,
    desc: "De-palletizing, inbound scan, and bin allocation to local last-mile courier riders for morning dispatch.",
  },
  {
    step: "08",
    name: "Delivered & Reconciled",
    role: "RECIPIENT & COURIER",
    location: "Consignee Doorstep",
    time: "T+10h 40m",
    icon: CheckCircle2,
    desc: "OTP code verification, cash-on-delivery collection, digital signature, and immediate bank ledger reconciliation.",
  },
];

export default function RouteJourney() {
  return (
    <section className="py-24 bg-background text-foreground border-t border-border relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <span>CHAIN OF CUSTODY</span>
            <span className="text-muted-foreground">/</span>
            <span>END-TO-END WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            How a parcel moves through ParcelPilot.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            One continuous operational route. Every transfer of custody is timestamped, 
            geolocated, and assigned to a specific role in real time.
          </p>
        </div>

        {/* Continuous Route Architecture */}
        <div className="relative">
          {/* Continuous Line (Desktop) */}
          <div className="hidden lg:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-muted-foreground/40 to-emerald-500 z-0" />

          {/* Sequential Checkpoints List using Shadcn Card */}
          <div className="space-y-4 lg:space-y-6">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="border-border/70 bg-card hover:border-primary/40 transition-colors">
                    <CardContent className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                      {/* Step ID & Indicator */}
                      <div className="lg:col-span-3 flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 font-mono text-sm font-bold text-primary shadow-inner">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-mono text-xs text-primary font-semibold tracking-wider">
                            STAGE {stage.step}
                          </div>
                          <div className="text-base font-bold text-foreground font-sans">
                            {stage.name}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground mt-0.5">
                            {stage.time}
                          </div>
                        </div>
                      </div>

                      {/* Metadata: Role & Coordinates */}
                      <div className="lg:col-span-4 space-y-1.5 border-t lg:border-t-0 lg:border-l border-border/60 pt-3 lg:pt-0 lg:pl-6 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">ACTOR:</span>
                          <span className="px-2 py-0.5 rounded bg-muted text-foreground font-semibold text-[11px]">
                            [{stage.role}]
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">NODE:</span>
                          <span className="text-foreground font-medium truncate">{stage.location}</span>
                        </div>
                      </div>

                      {/* Explanation Description */}
                      <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-border/60 pt-3 lg:pt-0 lg:pl-6 text-sm text-muted-foreground leading-relaxed">
                        {stage.desc}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
