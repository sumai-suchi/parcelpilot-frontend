"use client";

import Link from "next/link";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

export default function ProductCta() {
  const scrollToTracking = () => {
    const el = document.getElementById("tracking-cockpit");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-background text-foreground border-t border-border relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Live Indicator */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>ALL 64 LOGISTICS HUBS SYNCHRONIZED</span>
        </div>

        {/* Real Product Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground font-sans leading-tight">
            Your next delivery shouldn't be a black box.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed">
            Track every shipment. Coordinate every handoff. Deliver with
            confidence.
          </p>
        </div>

        {/* Action Buttons using Shadcn Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className={buttonVariants({
              size: "lg",
              className:
                "bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25",
            })}
          >
            Start Shipping
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={scrollToTracking}
            className="font-bold text-xs uppercase tracking-wider"
          >
            <Search className="h-4 w-4 mr-2" />
            Track a Shipment
          </Button>
        </div>

        {/* Technical Subtext */}
        <div className="pt-8 border-t border-border flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>NO MINIMUM VOLUME REQUIRED</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>NEXT-DAY COD SETTLEMENT</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>INSTANT STRIPE INTEGRATION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
