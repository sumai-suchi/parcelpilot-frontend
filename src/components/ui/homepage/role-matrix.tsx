"use client";

import { useState } from "react";
import {
  Users,
  Bike,
  Building2,
  Sliders,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Activity,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const ROLES = [
  {
    id: "customer",
    name: "Customer / Merchant",
    icon: Users,
    tagline: "Total parcel transparency and immediate financial control.",
    controls: [
      "Track domestic and cross-zone shipments via live GPS timeline",
      "Instant pickup scheduling from home, store, or warehouse dock",
      "Manage multi-recipient address books and delivery notes",
      "Automated Stripe payment and next-day COD bank disbursement",
    ],
    telemetry: "API Webhooks · Digital Waybills · SMS Notifications",
    activeHandoff: "Hands off parcel to Courier at origin point.",
  },
  {
    id: "courier",
    name: "Field Courier Hero",
    icon: Bike,
    tagline: "Turn-by-turn route dispatch and instant earnings tracking.",
    controls: [
      "Real-time geofenced pickup and delivery task assignments",
      "Mobile barcode scanning and recipient OTP verification",
      "Live trip navigation optimized for density and traffic",
      "Automated per-delivery commission and weekly bonus calculation",
    ],
    telemetry: "Driver Telematics · Battery Status · Digital Signature",
    activeHandoff: "Delivers cargo to Regional Sorting Hub.",
  },
  {
    id: "hub_manager",
    name: "Hub Operations Manager",
    icon: Building2,
    tagline: "Warehouse belt throughput and container linehaul sorting.",
    controls: [
      "Inbound linehaul container verification and de-palletizing",
      "Automated high-speed barcode belt induction and sorting bins",
      "Outgoing vehicle manifest generation and seal locking",
      "Hub capacity monitoring, shift balancing, and delay alerts",
    ],
    telemetry: "Belt Scan Velocity · Sorter Jam Sensors · Seal Hashes",
    activeHandoff: "Dispatches linehaul truck to Destination Hub.",
  },
  {
    id: "operations",
    name: "Network Operations Manager",
    icon: Sliders,
    tagline: "System-wide linehaul visibility and exception intervention.",
    controls: [
      "Real-time 64-district highway network traffic and delay heatmap",
      "One-click dynamic courier reassignment during mechanical delays",
      "Failed delivery triage, address correction, and return overrides",
      "SLA compliance tracking across all 120+ regional distribution hubs",
    ],
    telemetry: "Corridor Flow Latency · Exception Queue · SLA Metrics",
    activeHandoff: "Coordinates cross-hub transfers and emergency routing.",
  },
  {
    id: "admin",
    name: "System Administrator",
    icon: ShieldCheck,
    tagline: "Multi-tenant governance, billing, and system configuration.",
    controls: [
      "Multi-organization logistics configuration and tenant provisioning",
      "Role-based access control (RBAC) and audit log monitoring",
      "Financial ledger audits, Stripe settlement feeds, and tax compliance",
      "System uptime, API rate limiting, and microservice infrastructure",
    ],
    telemetry: "Security Audit Trail · Tenant Quotas · DB Sync Latency",
    activeHandoff: "Governs platform policies and system compliance.",
  },
];

export default function RoleMatrix() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);

  return (
    <section className="py-24 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <span>UNIFIED PERMISSIONS</span>
            <span className="text-muted-foreground">/</span>
            <span>ROLE-BASED GOVERNANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            One system. Every role.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            ParcelPilot unifies all stakeholders into a synchronized operational
            pipeline. No siloed spreadsheets or detached driver apps.
          </p>
        </div>

        {/* Operational Flow Diagram & Interactive Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interconnected Role Selector */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground mb-3 tracking-wider font-semibold">
              SELECT LOGISTICS ROLE (5 UNIFIED ACTORS)
            </div>

            <div className="space-y-2">
              {ROLES.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole.id === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`w-full text-left p-4 rounded-xl border font-mono transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm font-sans text-foreground">
                          {r.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">
                          {isSelected ? "● ACTIVE CONSOLE" : "VIEW CONTROLS"}
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        isSelected
                          ? "text-primary translate-x-1"
                          : "text-muted-foreground/60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Operational Command Console using Shadcn Card */}
          <div className="lg:col-span-7">
            <Card className="border-border bg-card text-card-foreground shadow-xl">
              {/* Role Header */}
              <CardHeader className="border-b border-border/70 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono text-primary font-bold mb-1">
                      ROLE IDENTIFIER // {selectedRole.id.toUpperCase()}
                    </div>
                    <CardTitle className="text-2xl font-bold font-sans text-foreground">
                      {selectedRole.name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {selectedRole.tagline}
                    </CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>

              {/* What This Role Controls */}
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    OPERATIONAL CONTROL STREAMS
                  </div>
                  <div className="space-y-2.5">
                    {selectedRole.controls.map((ctrl) => (
                      <div
                        key={ctrl}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-muted/30 text-xs sm:text-sm text-foreground font-sans"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ctrl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Flow & Handoff Interconnection */}
                <div className="pt-4 border-t border-border/70 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>CHAIN HANDOFF:</span>
                    <span className="text-primary font-bold">
                      {selectedRole.activeHandoff}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>STREAM TELEMETRY:</span>
                    <span className="text-foreground">
                      {selectedRole.telemetry}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
