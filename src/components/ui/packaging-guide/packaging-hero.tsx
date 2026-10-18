"use client";

import { motion } from "framer-motion";
import {
  PackageCheck,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PackagingHero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-28 pb-16 border-b border-border">
      {/* Background Lighting & Dimension Grid */}
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
                  PACKAGING & CARGO PROTOCOL
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
              <span>ZERO-DAMAGE HANDLING STANDARD v3.1</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] font-sans">
              Engineered to Arrive.
              <span className="block text-primary">Every Single Time.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Proper packaging protects both your goods and your shipping
              budget. Learn how to calculate volumetric weight, execute the
              6-strip H-Taping method, avoid prohibited freight, and secure
              maximum insurance reimbursement.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#volumetric-calculator"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "font-mono text-xs tracking-wider uppercase bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-none",
                })}
              >
                Calculate Volumetric Weight{" "}
                <ArrowRight className="ml-2 size-4" />
              </a>
              <a
                href="#prohibited-manifest"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "font-mono text-xs tracking-wider uppercase border-border bg-background hover:bg-muted text-foreground rounded-none",
                })}
              >
                Prohibited Items List
              </a>
            </div>
          </motion.div>

          {/* Golden Rules Snapshot */}
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
                  <PackageCheck className="size-4 text-primary" /> TRANSIT
                  PROTOCOL STANDARDS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  IATA & ISO 2234
                </span>
              </div>

              <div className="space-y-3.5 py-4">
                <div className="flex items-start gap-3">
                  <span className="size-5 rounded-none bg-primary/10 text-primary border border-primary/25 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-foreground block text-xs">
                      5cm Minimum Internal Cushioning
                    </strong>
                    <span className="text-muted-foreground text-[11px]">
                      Bubble wrap, crumpled kraft paper or air cushions on all 6
                      sides.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="size-5 rounded-none bg-primary/10 text-primary border border-primary/25 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-foreground block text-xs">
                      Double-Wall Corrugated Cartons
                    </strong>
                    <span className="text-muted-foreground text-[11px]">
                      Never ship in single-ply shoe boxes or grocery bags.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="size-5 rounded-none bg-primary/10 text-primary border border-primary/25 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-foreground block text-xs">
                      Flat Barcode Waybill Mounting
                    </strong>
                    <span className="text-muted-foreground text-[11px]">
                      Attach shipping label to top flat face without folding
                      across box edges.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-muted-foreground text-[11px] flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  Compliant packaging guarantees 100% claim eligibility under
                  transit insurance.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
