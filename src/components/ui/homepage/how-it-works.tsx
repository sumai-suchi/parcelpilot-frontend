"use client";

import { Laptop, Bike, Cpu, CheckCircle } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Book Online",
    desc: "Create single or bulk shipments in 60 seconds. Print automated barcode labels with one click.",
    icon: Laptop,
    badge: "Instant Setup",
  },
  {
    step: "02",
    title: "Doorstep Pickup",
    desc: "Our assigned delivery hero picks up parcels directly from your home, store, or warehouse.",
    icon: Bike,
    badge: "Within 2 Hours",
  },
  {
    step: "03",
    title: "Smart Hub Sorting",
    desc: "Parcels are scanned and routed through our automated distribution hubs with real-time GPS tracking.",
    icon: Cpu,
    badge: "GPS Tracked",
  },
  {
    step: "04",
    title: "Doorstep Delivery & COD",
    desc: "Fast doorstep handover with OTP verification. Cash collected is disbursed to your bank next day.",
    icon: CheckCircle,
    badge: "Next-Day Settlement",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center max-w-2xl mx-auto space-y-3"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
            Effortless Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How ParcelPilot Works
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            From booking to final doorstep delivery, experience a transparent
            and frictionless logistics journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div>
                  {/* Top Row: Icon & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-500/20 dark:text-orange-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-black tracking-tight text-zinc-300 dark:text-zinc-700 group-hover:text-orange-500/50 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    {step.badge}
                  </span>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <span>Step {step.step} Complete</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
