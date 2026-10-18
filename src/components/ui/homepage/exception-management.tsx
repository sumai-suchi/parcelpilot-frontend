"use client";

import { useState } from "react";
import {
  AlertTriangle,
  UserX,
  MapPinOff,
  Bike,
  ShieldAlert,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const SCENARIOS = [
  {
    id: "unavailable",
    title: "Customer Unavailable at Doorstep",
    icon: UserX,
    trigger:
      "Courier arrives at destination; consignee does not answer call after 3 automated ring attempts.",
    steps: [
      {
        step: "01",
        actor: "COURIER APP",
        action:
          "Courier logs 'Consignee Unavailable' with geo-tagged proof-of-attempt photograph.",
      },
      {
        step: "02",
        actor: "SYSTEM AUTOMATION",
        action:
          "Instant SMS & WhatsApp alert sent to recipient with a self-service 1-click reschedule link.",
      },
      {
        step: "03",
        actor: "TRIAGE PROTOCOL",
        action:
          "Package securely returned to regional hub holding vault for secondary morning delivery attempt.",
      },
      {
        step: "04",
        actor: "FALLBACK RTS",
        action:
          "If 3 attempts fail within 72 hours, automated Return-to-Sender (RTS) manifest triggers.",
      },
    ],
  },
  {
    id: "address",
    title: "Incomplete or Ambiguous Address",
    icon: MapPinOff,
    trigger:
      "Delivery address missing building number or located in an uncharted lane cluster.",
    steps: [
      {
        step: "01",
        actor: "GEOCODING ENGINE",
        action:
          "Address flag marked as 'Low Confidence Coordinate' prior to courier morning dispatch.",
      },
      {
        step: "02",
        actor: "OPS DISPATCH",
        action:
          "Automated WhatsApp prompt requests exact live GPS pin from recipient.",
      },
      {
        step: "03",
        actor: "ROUTE ADJUST",
        action:
          "Updated GPS coordinates pushed directly to courier's live turn-by-turn map in real time.",
      },
      {
        step: "04",
        actor: "SUCCESS RATE",
        action:
          "98.4% of address ambiguity exceptions resolved without delivery postponement.",
      },
    ],
  },
  {
    id: "breakdown",
    title: "Courier Vehicle Breakdown En Route",
    icon: Bike,
    trigger:
      "Courier vehicle suffers puncture or mechanical fault with 14 active parcels onboard.",
    steps: [
      {
        step: "01",
        actor: "TELEMETRY SENSOR",
        action:
          "Courier triggers 'Emergency Mechanical Delay' button on field handset.",
      },
      {
        step: "02",
        actor: "PROXIMITY RADAR",
        action:
          "System scans fleet GPS and identifies Rider #109 located 850 meters away.",
      },
      {
        step: "03",
        actor: "CHAIN HANDOVER",
        action:
          "Rider #109 accepts split-manifest and collects priority packages within 9 minutes.",
      },
      {
        step: "04",
        actor: "SLA PRESERVED",
        action:
          "Consignee delivery window preserved with zero breach of guaranteed same-day SLA.",
      },
    ],
  },
];

export default function ExceptionManagement() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  return (
    <section className="py-24 bg-background text-foreground border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>OPERATIONAL RESILIENCE</span>
            <span className="text-muted-foreground">/</span>
            <span>EXCEPTION TRIAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            When delivery doesn't go as planned.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Real logistics requires bulletproof exception protocols. ParcelPilot
            treats failed attempts, bad addresses, and mechanical delays as
            automated state-machine transitions.
          </p>
        </div>

        {/* State Machine Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Exception Scenarios */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground mb-3 tracking-wider font-semibold">
              SELECT EXCEPTION EVENT
            </div>

            {SCENARIOS.map((sc) => {
              const Icon = sc.icon;
              const isSelected = activeScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setActiveScenario(sc)}
                  className={`w-full text-left p-4 rounded-xl border font-mono transition-all flex items-start gap-4 ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 text-foreground shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-amber-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm font-sans text-foreground">
                      {sc.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono mt-1 line-clamp-1">
                      {sc.trigger}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Automated State Machine Decision Flow using Shadcn Card */}
          <div className="lg:col-span-7">
            <Card className="border-border bg-card text-card-foreground shadow-xl">
              {/* Trigger Banner */}
              <CardHeader className="border-b border-border/70 pb-5">
                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 font-mono text-xs">
                  <div className="text-amber-600 dark:text-amber-400 font-bold mb-1 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    <span>EXCEPTION TRIGGER DETECTED</span>
                  </div>
                  <div className="text-foreground font-sans text-sm">
                    {activeScenario.trigger}
                  </div>
                </div>
              </CardHeader>

              {/* Sequential Resolution Stages */}
              <CardContent className="space-y-4 pt-6 font-mono text-xs">
                <div className="text-muted-foreground uppercase tracking-wider text-[11px] font-bold">
                  AUTOMATED RECOVERY STATE MACHINE
                </div>

                <div className="space-y-2.5">
                  {activeScenario.steps.map((step) => (
                    <div
                      key={step.step}
                      className="p-3.5 rounded-lg border border-border/60 bg-muted/30 flex items-start gap-3.5"
                    >
                      <span className="h-6 w-6 rounded bg-muted text-foreground flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {step.step}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase">
                          [{step.actor}]
                        </div>
                        <div className="text-foreground font-sans text-xs sm:text-sm">
                          {step.action}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Resolution Metrics */}
                <div className="pt-4 border-t border-border/70 flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    ● 94.8% RECOVERY WITHOUT SHIPMENT CANCELLATION
                  </span>
                  <span>AUDIT TRAIL: RECORDED</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
