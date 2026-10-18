"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Eye,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VALUES = [
  {
    number: "01",
    title: "Deterministic Visibility",
    subtitle: "ZERO BLACK BOXES",
    icon: Eye,
    description:
      "Every parcel in our network exists in a known, auditable state. We reject ambiguity, missing scans, and estimated guesses in favor of provable physical handoffs.",
    accent: "text-primary",
    borderAccent: "border-primary/20",
  },
  {
    number: "02",
    title: "Courier Dignity & Safety",
    subtitle: "HEROES ON TWO WHEELS",
    icon: HeartHandshake,
    description:
      "Last-mile riders are the backbone of our economy. We engineer route density to reduce fatigue, enforce safe daily task caps, and disburse transparent commission earnings.",
    accent: "text-emerald-500",
    borderAccent: "border-emerald-500/20",
  },
  {
    number: "03",
    title: "Merchant Cash Velocity",
    subtitle: "FINANCIAL TRANSPARENCY",
    icon: TrendingUp,
    description:
      "Merchants should not have to wait weeks to receive revenue from delivered parcels. We automate payment reconciliations and settle COD disbursements on a next-day schedule.",
    accent: "text-blue-500",
    borderAccent: "border-blue-500/20",
  },
  {
    number: "04",
    title: "Fault-Tolerant Resilience",
    subtitle: "ENGINEERED FOR THE ROAD",
    icon: ShieldCheck,
    description:
      "Logistics operates in an imperfect world of highway congestion, weather delays, and vehicle repairs. Our dispatch systems feature one-click rerouting and automated delay triage.",
    accent: "text-amber-500",
    borderAccent: "border-amber-500/20",
  },
];

export default function AboutValues() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Compass className="size-3.5" />
            <span>OPERATING CREED & ETHOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Principles That Direct Every Delivery
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Technology is merely a lever for values. At ParcelPilot, every line
            of code, hub policy, and courier assignment reflects our commitment
            to reliability, fairness, and transparency.
          </p>
        </div>

        {/* 4 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  className={`h-full rounded-none border ${val.borderAccent} bg-card hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between`}
                >
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-wider text-muted-foreground font-semibold">
                        {val.subtitle}
                      </span>
                      <span className="font-mono text-2xl font-black text-muted-foreground/30">
                        {val.number}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-none bg-muted text-foreground">
                        <IconComponent className={`size-6 ${val.accent}`} />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {val.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
