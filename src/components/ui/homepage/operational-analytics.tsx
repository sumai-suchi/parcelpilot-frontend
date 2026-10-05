"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const METRICS = [
  { label: "Active In-Flight Consignments", value: "14,892", delta: "+8.4%", sub: "Live across 64 districts" },
  { label: "Hub Turnaround Velocity", value: "38.4m", delta: "-4.1m", sub: "Avg induction-to-dispatch" },
  { label: "First-Attempt Delivery Rate", value: "96.4%", delta: "+1.2%", sub: "Exceeding industry benchmark" },
  { label: "Exception Resolution Rate", value: "94.8%", delta: "+3.6%", sub: "Automated retry & correction" },
];

const HOURLY_FLOW = [
  { hour: "04:00", volume: 1200 },
  { hour: "06:00", volume: 2400 },
  { hour: "08:00", volume: 5600 },
  { hour: "10:00", volume: 9200 },
  { hour: "12:00", volume: 8800 },
  { hour: "14:00", volume: 7900 },
  { hour: "16:00", volume: 11400 },
  { hour: "18:00", volume: 14200 },
  { hour: "20:00", volume: 9800 },
  { hour: "22:00", volume: 6100 },
];

export default function OperationalAnalytics() {
  const maxVol = 15000;

  return (
    <section className="py-24 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <Activity className="h-3.5 w-3.5" />
            <span>OPERATIONAL TELEMETRY</span>
            <span className="text-muted-foreground">/</span>
            <span>SYSTEM DASHBOARD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Real-time operational intelligence.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Monitor consignment velocity, warehouse induction rates, and courier density 
            across your entire delivery footprint in one unified telemetry dashboard.
          </p>
        </div>

        {/* Dashboard Frame using Shadcn Card */}
        <Card className="border-border bg-card text-card-foreground shadow-xl">
          
          {/* Top Key Metrics Strip */}
          <CardHeader className="border-b border-border/70 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {METRICS.map((m) => (
                <div key={m.label} className="space-y-1 font-mono">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</div>
                  <div className="text-3xl font-black text-foreground font-mono flex items-baseline gap-2">
                    <span>{m.value}</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{m.delta}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{m.sub}</div>
                </div>
              ))}
            </div>
          </CardHeader>

          {/* Meaningful Visualization: Network Throughput by Hour */}
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground">
                HOURLY PARCEL THROUGHPUT VELOCITY (24-HOUR RUNTIME)
              </CardTitle>
              <span className="text-primary font-bold">PEAK LOAD: 14,200 PK/HR</span>
            </div>

            {/* Technical Bar Chart: Clean, No Square Grid */}
            <div className="h-44 sm:h-52 w-full flex items-end gap-2 sm:gap-4 pt-6 pb-2 border-b border-border">
              {HOURLY_FLOW.map((bar, idx) => {
                const heightPercent = (bar.volume / maxVol) * 100;
                return (
                  <div key={bar.hour} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full relative flex items-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.05 }}
                        className="w-full rounded-t bg-primary group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground">
                      {bar.hour}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Subtext */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-muted-foreground pt-2">
              <div className="flex items-center gap-4">
                <span>METRICS REFRESH INTERVAL: 5s</span>
                <span>AGGREGATION: CLOUDSTREAM REALTIME</span>
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold">99.98% TELEMETRY AVAILABILITY</div>
            </div>
          </CardContent>

        </Card>

      </div>
    </section>
  );
}
