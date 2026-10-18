"use client";

import Link from "next/link";
import {
  Headphones,
  PhoneCall,
  Mail,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function HelpEscalationConsole() {
  return (
    <section className="py-20 bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-none border border-border bg-card p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-none blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-wider">
                <Headphones className="size-3.5" /> High-Priority Dispatch
                Interventions
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Can't find the answer? Speak to Live Dispatch.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                Our central operations desk operates 24/7 to intervene on active
                linehaul routes, resolve courier delivery discrepancies, and
                expedite emergency shipments.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    Avg Escalation Response:{" "}
                    <strong className="text-foreground">&lt; 15 Mins</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Direct Terminal Intercom</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "w-full rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider h-12 shadow-sm",
                })}
              >
                Submit Escalation Ticket <ArrowRight className="ml-2 size-4" />
              </Link>
              <a
                href="tel:+8801700000000"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "w-full rounded-none border-border bg-card hover:bg-muted text-foreground font-mono text-xs uppercase tracking-wider h-12",
                })}
              >
                <PhoneCall className="mr-2 size-4 text-emerald-600 dark:text-emerald-400" />{" "}
                Call Hotline: 16789
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
