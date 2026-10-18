"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radio,
  Building2,
  Clock,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  Headphones,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-28 pb-16 border-b border-border">
      {/* Background Lighting & Radar Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px]"
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
              <BreadcrumbSeparator className="text-muted-foreground/50">
                <ChevronRight className="size-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-semibold">
                  CONTACT DISPATCH & HQ
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-3xl mb-4 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-none border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-mono text-primary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>24/7 ACTIVE DISPATCH TERMINAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Direct Link to Central
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500">
              Operations Control.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whether you are an enterprise merchant seeking custom linehaul
            rates, an individual customer escalating a delayed shipment, or a
            driver applicant, our operations team is on standby.
          </p>
        </div>
      </div>
    </section>
  );
}
