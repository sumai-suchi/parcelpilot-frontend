"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Sparkles, Building2, Bike } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function AboutCta() {
  return (
    <section className="py-24 bg-zinc-950 text-zinc-100 border-t border-zinc-800 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Live Operational Indicator */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>NATIONWIDE OPERATIONAL NETWORK READY</span>
        </div>

        {/* Headline & Mission Message */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans leading-tight">
            Ready to Experience Logistics Without The Black Box?
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            Whether you are an eCommerce enterprise shipping thousands of parcels daily or a dedicated courier
            looking for transparent route earnings, ParcelPilot provides the infrastructure you need.
          </p>
        </div>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className={buttonVariants({
              size: "lg",
              className: "bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 hover:bg-primary/90 px-8",
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
              className: "border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-bold text-xs uppercase tracking-wider px-8",
            })}
          >
            Apply for Fleet / Operations Role
          </Link>
        </div>

        {/* Technical Guarantee Subtext */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-3.5 text-emerald-400" />
            <span>INSTANT STRIPE INTEGRATION</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-3.5 text-emerald-400" />
            <span>6-DIGIT OTP HANDOFF SECURITY</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-3.5 text-emerald-400" />
            <span>NATIONWIDE 64-DISTRICT HUBS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
