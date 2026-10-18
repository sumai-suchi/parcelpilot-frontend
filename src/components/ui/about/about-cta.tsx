"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Building2,
  Bike,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function AboutCta() {
  return (
    <section className="py-24 bg-background text-foreground border-t border-border relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Live Operational Indicator */}
        <div className="inline-flex items-center gap-2 rounded-none border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>NATIONWIDE OPERATIONAL NETWORK READY</span>
        </div>

        {/* Headline & Mission Message */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans leading-tight">
            Ready to Experience Logistics Without The Black Box?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            Whether you are an eCommerce enterprise shipping thousands of
            parcels daily or a dedicated courier looking for transparent route
            earnings, ParcelPilot provides the infrastructure you need.
          </p>
        </div>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className={buttonVariants({
              size: "lg",
              className:
                "bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-md hover:bg-primary/90 px-8 rounded-none",
            })}
          >
            Create Merchant Account
            <ArrowRight className="size-4 ml-2" />
          </Link>
          <Link
            href="/apply-for-role"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "border-border bg-background hover:bg-muted text-foreground font-bold text-xs uppercase tracking-wider px-8 rounded-none",
            })}
          >
            Apply for Fleet / Operations Role
          </Link>
        </div>

        {/* Technical Guarantee Subtext */}
        <div className="pt-8 border-t border-border flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>INSTANT STRIPE INTEGRATION</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>6-DIGIT OTP HANDOFF SECURITY</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>NATIONWIDE 64-DISTRICT HUBS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
