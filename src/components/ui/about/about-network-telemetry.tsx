"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Activity,
  Globe,
  Radio,
  Building2,
  TrendingUp,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATS = [
  {
    label: "DISTRICT CORRIDORS",
    value: "64",
    unit: "DISTRICTS",
    subtext: "100% Nationwide Reach Across Bangladesh",
    icon: Globe,
    accent: "text-primary",
  },
  {
    label: "TRANSIT HUBS",
    value: "120+",
    unit: "TERMINALS",
    subtext: "Induction, Sorting, & Linehaul Hubs",
    icon: Building2,
    accent: "text-amber-500",
  },
  {
    label: "SLA FULFILLMENT",
    value: "99.4%",
    unit: "ON-TIME",
    subtext: "Guaranteed Next-Day Delivery Threshold",
    icon: TrendingUp,
    accent: "text-emerald-500",
  },
  {
    label: "TELEMETRY LATENCY",
    value: "< 250",
    unit: "MILLISECONDS",
    subtext: "Real-Time State Machine Updates",
    icon: Activity,
    accent: "text-blue-500",
  },
];

const DIVISION_ZONES = [
  {
    zone: "Dhaka Central Metro",
    code: "ZONE-DHK",
    hubs: ["Tejgaon Linehaul Hub", "Uttara Sorting Terminal", "Mirpur Express Hub", "Motijheel Hub"],
    coverage: "High-density same-day & 24h metro delivery",
    status: "OPTIMAL",
  },
  {
    zone: "Chattogram Maritime Port",
    code: "ZONE-CTG",
    hubs: ["Agrabad Commercial Hub", "Nasirabad Terminal", "Cox's Bazar Coastal Hub", "Cumilla Trunk"],
    coverage: "Inter-district trunking & maritime logistics",
    status: "OPTIMAL",
  },
  {
    zone: "Sylhet Highlands",
    code: "ZONE-SYL",
    hubs: ["Amberkhana Central Hub", "Zindabazar Hub", "Sreemangal Hub"],
    coverage: "Regional tea garden & northeastern freight",
    status: "OPTIMAL",
  },
  {
    zone: "Rajshahi & Northern Plains",
    code: "ZONE-RAJ",
    hubs: ["Shaheb Bazar Hub", "Bogura Linehaul Terminal", "Rangpur Division Hub"],
    coverage: "Agricultural & commercial courier grid",
    status: "OPTIMAL",
  },
  {
    zone: "Khulna & Southern Coastal",
    code: "ZONE-KLN",
    hubs: ["Shibbari Central Hub", "Jashore Airport Terminal", "Barishal Riverport"],
    coverage: "Riverine & southern commercial corridors",
    status: "OPTIMAL",
  },
];

export default function AboutNetworkTelemetry() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Radio className="size-3.5" />
            <span>NATIONWIDE PHYSICAL INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Logistics Backbone by the Numbers
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Software is only as good as the physical reality it orchestrates. ParcelPilot connects Bangladesh’s
            major commercial corridors with dedicated regional terminals and verified last-mile couriers.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full border-border bg-card hover:border-primary/40 transition-colors shadow-sm flex flex-col justify-between">
                  <CardHeader className="space-y-1 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                        {stat.label}
                      </span>
                      <IconComponent className={`size-4 ${stat.accent}`} />
                    </div>
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-4xl font-black tracking-tight text-foreground font-mono">
                        {stat.value}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground font-semibold">
                        {stat.unit}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      {stat.subtext}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Division Zone Matrix */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Regional Hub Zones & Linehaul Topologies
              </h3>
              <p className="text-xs text-muted-foreground">
                Strategically positioned sorting terminals bridging urban and inter-district routes.
              </p>
            </div>
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs font-mono">
              <span className="size-2 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse" />
              ALL 5 REGIONAL ZONES ONLINE
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISION_ZONES.map((zone, idx) => (
              <Card
                key={zone.code}
                className="border-border bg-muted/20 hover:bg-muted/40 transition-all shadow-xs flex flex-col justify-between"
              >
                <CardHeader className="space-y-1.5 pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                      {zone.code}
                    </Badge>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">
                      {zone.status}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-foreground">
                    {zone.zone}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {zone.coverage}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-2 space-y-2 border-t border-border">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                    Key Infrastructure Hubs:
                  </span>
                  <div className="space-y-1">
                    {zone.hubs.map((hub) => (
                      <div key={hub} className="flex items-center gap-1.5 text-xs text-foreground/80 font-sans">
                        <MapPin className="size-3 text-primary shrink-0" />
                        <span className="truncate">{hub}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
