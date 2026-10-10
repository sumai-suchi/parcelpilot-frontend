"use client";

import {
  Banknote,
  LayoutDashboard,
  Code2,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const PERKS = [
  {
    icon: Banknote,
    title: "Next-Day Guaranteed COD Settlement",
    desc: "Never suffer from cashflow bottlenecks. All cash collected by our riders is disbursed directly to your bank account or bKash within 24 hours.",
  },
  {
    icon: LayoutDashboard,
    title: "Intelligent Merchant Dashboard",
    desc: "Bulk parcel upload via CSV, real-time analytics, automated parcel status tracking, and downloadable financial reports.",
  },
  {
    icon: Code2,
    title: "Instant E-Commerce Integrations",
    desc: "Plug-and-play REST APIs and plugins for WooCommerce, Shopify, and custom tech stacks with automated tracking webhooks.",
  },
  {
    icon: Headphones,
    title: "Dedicated Key Account Manager",
    desc: "Direct access to support agents and priority resolution for any delayed deliveries or customer disputes.",
  },
];

export default function MerchantPerks() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-200/70 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value List */}
          <div className="lg:col-span-6 space-y-6" data-aos="fade-right">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
              For Online Sellers & Brands
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Scale Your Online Business With Fast Courier Fulfillment
            </h2>

            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We treat your customers as our own. Cut down return rates,
              automate dispatch, and receive your revenues faster than any
              conventional courier service.
            </p>

            <div className="space-y-4 pt-2">
              {[
                "0% return fee on select high-volume merchant tiers",
                "Free SMS notifications sent to your customers upon dispatch",
                "Automated barcode generation for shipping labels",
                "Partial delivery & parcel exchange supported at doorstep",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Create Merchant Account</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Perks Grid */}
          <div
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
            data-aos="fade-left"
          >
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 shadow-sm transition-all hover:border-orange-500/30 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:bg-zinc-900"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
