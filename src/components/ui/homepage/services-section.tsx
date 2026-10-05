"use client";

import {
  ShoppingBag,
  Send,
  Truck,
  Zap,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: ShoppingBag,
    title: "E-Commerce Fulfillment",
    desc: "Seamless order import, parcel pickup from your warehouse, automated COD collection, and next-day payout.",
    badge: "Most Popular",
    color: "orange",
  },
  {
    icon: Send,
    title: "Person-to-Person (P2P)",
    desc: "Fast, door-to-door delivery for personal gifts, confidential documents, and everyday essentials.",
    badge: "Doorstep Pickup",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Same-Day Rush Express",
    desc: "Urgent metropolitan deliveries dispatched within minutes and delivered in 4 to 6 hours guaranteed.",
    badge: "Ultra Fast",
    color: "amber",
  },
  {
    icon: Truck,
    title: "Bulk & Heavy Cargo",
    desc: "Dedicated container trucks and inter-district freight solutions for commercial and industrial supply chains.",
    badge: "Full Truckload",
    color: "emerald",
  },
  {
    icon: RotateCcw,
    title: "Reverse Logistics & Returns",
    desc: "Streamlined return pick-up from customer homes, item quality checks, and safe return back to your warehouse.",
    badge: "Hassle-Free",
    color: "rose",
  },
  {
    icon: ShieldAlert,
    title: "Fragile & High-Value Care",
    desc: "Specialized shockproof bubble wrap, tamper-evident security tape, and dedicated priority handling.",
    badge: "Extra Insured",
    color: "purple",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
            Comprehensive Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tailored Logistics Services
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Engineered to handle individual packages, growing e-commerce stores, and enterprise supply chains.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-500/20 dark:text-orange-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2.5">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
