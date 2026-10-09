"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Radio,
  Boxes,
  Zap,
  CheckCircle2,
  Terminal,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-100 pt-28 pb-20 border-b border-border/40">
      {/* Background Radial Glow & Technical Dot Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[350px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-zinc-400 text-xs font-mono">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-zinc-100 transition-colors">
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-600">
                <ChevronRight className="size-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-semibold">
                  ABOUT PARCELPILOT
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission Narrative & Objective */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="tracking-wider uppercase font-semibold">
                LOGISTICS OPERATING SYSTEM · NATIONWIDE CORRIDORS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-sans">
              Engineering <span className="text-primary">Zero-Opacity</span> Logistics Across Bangladesh.
            </h1>

            {/* Mission Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
              ParcelPilot was born from a fundamental frustration with legacy courier services:
              the black box between handover and delivery. We designed an event-driven supply-chain
              operating engine that unites merchants, hub managers, fleet riders, and dispatchers
              into an immutable, high-throughput logistics network.
            </p>

            {/* Core Capability Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-md px-3 py-1.5 text-xs font-mono text-zinc-300">
                <Zap className="size-3.5 text-primary" />
                <span>Sub-Second Telemetry</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-md px-3 py-1.5 text-xs font-mono text-zinc-300">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span>Cryptographic OTP Handoff</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-md px-3 py-1.5 text-xs font-mono text-zinc-300">
                <Boxes className="size-3.5 text-amber-400" />
                <span>64 Inter-Hub Corridors</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#operational-pillars"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all",
                })}
              >
                Explore Platform Architecture
                <ArrowRight className="size-4 ml-2" />
              </a>
              <Link
                href="/apply-for-role"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-bold text-xs uppercase tracking-wider",
                })}
              >
                Join Operating Fleet
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Industrial Command Cockpit Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative accent glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-amber-500/20 blur-xl opacity-75" />

              <Card className="relative bg-zinc-900/90 border-zinc-800/80 text-zinc-100 shadow-2xl backdrop-blur-md overflow-hidden">
                <CardHeader className="border-b border-zinc-800/80 pb-4 bg-zinc-950/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="size-4 text-primary" />
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                        SYSTEM ARCHITECTURE SPEC
                      </span>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-[10px] font-mono px-2 py-0.5">
                      LIVE CORE V1.4
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-white mt-1">
                    ParcelPilot Pipeline
                  </CardTitle>
                  <CardDescription className="text-zinc-400 text-xs">
                    State Machine Lifecycle & Guaranteed Chain of Custody
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-5 space-y-4 text-xs font-mono">
                  {/* Waypoint simulation */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                      <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5 text-emerald-400">
                        <CheckCircle2 className="size-3.5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-200 font-semibold">STAGE 01: INDUCTION</span>
                          <span className="text-zinc-500 text-[10px]">MERCHANT DOCK</span>
                        </div>
                        <p className="text-zinc-400 text-[11px] font-sans">
                          Consignment logged with digital manifest & automated delivery charge validation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                      <div className="rounded-full bg-amber-500/20 p-1 mt-0.5 text-amber-400">
                        <Radio className="size-3.5 animate-pulse" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-200 font-semibold">STAGE 02: INTER-HUB LINEHAUL</span>
                          <span className="text-primary text-[10px]">IN_TRANSIT</span>
                        </div>
                        <p className="text-zinc-400 text-[11px] font-sans">
                          Trunk container transfer sealed via cryptographic manifests across highway trunks.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5 text-primary">
                        <Cpu className="size-3.5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-200 font-semibold">STAGE 03: LAST-MILE OTP HANDOFF</span>
                          <span className="text-zinc-500 text-[10px]">DOORSTEP</span>
                        </div>
                        <p className="text-zinc-400 text-[11px] font-sans">
                          Rider verifies 6-digit one-time code generated directly in customer terminal.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400 text-[11px]">
                    <span>STATUS: ALL 64 HUBS OPERATIONAL</span>
                    <span className="text-emerald-400 font-semibold">SLA: 99.4%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
