"use client";

import Link from "next/link";
import { Store, Bike, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

export default function DualCta() {
  return (
    <section className="py-20 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Merchant CTA */}
          <div
            data-aos="fade-right"
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-orange-50/50 p-8 sm:p-10 shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50 transition-all hover:border-orange-500/40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/30 mb-6">
              <Store className="h-7 w-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 mb-3">
              <TrendingUp className="h-3.5 w-3.5" />
              For Online Businesses & Merchants
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
              Power Your E-Commerce With Reliable Delivery
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Sign up today and get automated next-day Cash on Delivery payout,
              bulk order CSV import, and free doorstep package pickup every
              afternoon.
            </p>

            <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span>Next-day bank and mobile wallet COD transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span>Custom API & webhook integrations for your store</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span>Dedicated account manager & priority helpline</span>
              </li>
            </ul>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Register as Merchant</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 2: Rider / Delivery Hero CTA */}
          <div
            data-aos="fade-left"
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-100 p-8 sm:p-10 shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 transition-all hover:border-zinc-700"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-zinc-800 dark:text-orange-400 shadow-lg shadow-black/20 mb-6">
              <Bike className="h-7 w-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              For Riders & Drivers
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
              Join Our Fleet as a Delivery Hero
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Earn competitive daily earnings with weekly incentive bonuses,
              flexible shifts in your own neighborhood, and free transit
              accidental insurance.
            </p>

            <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Flexible working hours — choose your own shifts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Guaranteed weekly payouts directly to your account</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>
                  Complimentary delivery kit, safety helmet & insurance
                </span>
              </li>
            </ul>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Apply as a Rider</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
