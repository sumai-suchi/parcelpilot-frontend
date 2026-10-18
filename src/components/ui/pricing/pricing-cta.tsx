"use client";

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function PricingCta() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-none border border-border bg-muted/30 p-8 sm:p-12 overflow-hidden shadow-sm">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-wider">
                <Building2 className="size-3.5" /> High Volume Logistics
                Contracts
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight font-sans">
                Shipping more than 500 parcels every month?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                Unlock tiered volume rebates, dedicated linehaul truck
                scheduling, custom API webhook quotas, and a dedicated hub
                account manager. Let's design a customized commercial rate
                agreement.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider h-12 shadow-sm rounded-none",
                })}
              >
                Request Volume Agreement <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "w-full border-border bg-background hover:bg-muted text-foreground font-mono text-xs uppercase tracking-wider h-12 rounded-none",
                })}
              >
                Sign Up As Standard Merchant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
