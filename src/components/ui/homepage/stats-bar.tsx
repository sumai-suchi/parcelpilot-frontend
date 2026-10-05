"use client";

import { Package, Users, Truck, CheckCircle2 } from "lucide-react";

const STATS = [
  {
    icon: Package,
    value: "150,000+",
    label: "Parcels Delivered",
    subtext: "Safely handled across all districts",
  },
  {
    icon: CheckCircle2,
    value: "99.4%",
    label: "On-Time Delivery",
    subtext: "Industry-leading SLA fulfillment",
  },
  {
    icon: Truck,
    value: "64",
    label: "Districts Covered",
    subtext: "Nationwide doorstep reach",
  },
  {
    icon: Users,
    value: "2,500+",
    label: "Active Merchants",
    subtext: "Trusting our automated COD",
  },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 -mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-zinc-200/80 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-zinc-200 dark:lg:divide-zinc-800">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex items-center gap-4 px-2 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {stat.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
