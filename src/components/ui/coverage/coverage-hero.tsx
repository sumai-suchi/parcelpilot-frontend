"use client";

import { motion } from "framer-motion";
import { Radio, ArrowRight, ChevronRight, Route } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CoverageHero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-28 pb-16 border-b border-border">
      {/* Background Lighting & Radar Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] opacity-[0.03] bg-[size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-muted-foreground text-xs font-mono">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/60">
                <ChevronRight className="size-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-semibold">
                  COVERAGE & HUB NETWORK
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>64 DISTRICTS • ZERO BLIND SPOTS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] font-sans">
              Every Upazila.
              <span className="block text-primary">
                Connected in Real Time.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              ParcelPilot links regional sorting facilities, linehaul trucking
              corridors, and last-mile courier stations into a single
              deterministic delivery fabric. Explore our nationwide footprint,
              hub dispatch cutoffs, and inter-city transit commitments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#hub-directory"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "font-mono text-xs tracking-wider uppercase bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-none",
                })}
              >
                Inspect Hub Directory <ArrowRight className="ml-2 size-4" />
              </a>
              <a
                href="#postal-checker"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "font-mono text-xs tracking-wider uppercase border-border bg-background hover:bg-muted text-foreground rounded-none",
                })}
              >
                Check My Postal Zone
              </a>
            </div>
          </motion.div>

          {/* Network Telemetry Status Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="rounded-none border border-border bg-card text-card-foreground p-6 font-mono text-xs shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Radio className="size-4 text-emerald-500 animate-pulse" />{" "}
                  NETWORK TELEMETRY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-none bg-muted text-foreground border border-border">
                  LIVE CLUSTER
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="p-3 rounded-none bg-muted/40 border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    PRIMARY HUBS
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    18
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1">
                    High-Speed Automated
                  </span>
                </div>

                <div className="p-3 rounded-none bg-muted/40 border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    FEEDER STATIONS
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    142
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">
                    Last-Mile Outposts
                  </span>
                </div>

                <div className="p-3 rounded-none bg-muted/40 border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    ACTIVE LINEHAUL VANS
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    380+
                  </span>
                  <span className="text-[10px] text-primary block mt-1">
                    Night Transit Fleet
                  </span>
                </div>

                <div className="p-3 rounded-none bg-muted/40 border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    ON-TIME SLA RATE
                  </span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    99.4%
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">
                    Audited Quarterly
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-muted-foreground text-[11px] flex items-center gap-2">
                <Route className="size-3.5 text-primary shrink-0" />
                <span>
                  Inter-hub transit runs depart nightly at 22:00 sharp across
                  all 8 divisions.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
