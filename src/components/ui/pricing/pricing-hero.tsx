"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Coins, ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-28 pb-16 border-b border-border">
      {/* Background Lighting & Subtle Tech Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[120px]" />
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
                  PRICING & TARIFFS
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>ZERO SURPRISE TARIFF ENGINE v2.4</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] font-sans">
              Predictable Rates.
              <span className="block text-primary">
                Transparent Settlements.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Every taka accounted for. From same-city express runs to
              cross-district linehauls, ParcelPilot calculates base freight,
              volumetric weight, and COD remittances in real time with
              guaranteed zero hidden surcharges.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#simulator"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "font-mono text-xs tracking-wider uppercase bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-none",
                })}
              >
                Calculate Rates <ArrowRight className="ml-2 size-4" />
              </a>
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "font-mono text-xs tracking-wider uppercase border-border bg-background hover:bg-muted text-foreground rounded-none",
                })}
              >
                Open Merchant Account
              </Link>
            </div>
          </motion.div>

          {/* Quick Metrics Console */}
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
                  <Coins className="size-4 text-primary" /> TARIFF BENCHMARKS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  UPDATED HOURLY
                </span>
              </div>

              <div className="divide-y divide-border">
                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-foreground font-semibold">
                      City Express Baseline
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      Up to 1.0 kg within metro
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-foreground">
                      ৳60
                    </span>
                    <span className="text-muted-foreground text-[10px] block">
                      FLAT BASE
                    </span>
                  </div>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-foreground font-semibold">
                      Nationwide Linehaul
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      Inter-district 64 districts
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-foreground">
                      ৳110
                    </span>
                    <span className="text-muted-foreground text-[10px] block">
                      STANDARD SLA
                    </span>
                  </div>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-foreground font-semibold">
                      Cash On Delivery (COD) Fee
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      Automatic escrow & disbursement
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                      1.0%
                    </span>
                    <span className="text-muted-foreground text-[10px] block">
                      0% ON PREPAID
                    </span>
                  </div>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-foreground font-semibold">
                      Return To Origin (RTO)
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      Failed delivery reverse flow
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-primary">
                      50% OF BASE
                    </span>
                    <span className="text-muted-foreground text-[10px] block">
                      SUBSIDIZED
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border text-muted-foreground text-[11px] flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-primary shrink-0" />
                <span>
                  All settlements covered by ParcelPilot Transit Insurance
                  Protocol.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
