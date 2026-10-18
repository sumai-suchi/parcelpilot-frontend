"use client";

import {
  ShieldCheck,
  DollarSign,
  Wallet,
  Building2,
  FileText,
} from "lucide-react";

export default function PricingSettlementFlow() {
  const steps = [
    {
      step: "01",
      title: "Doorstep Cash & OTP Clearance",
      timing: "Day 0 • Delivery Execution",
      desc: "Courier collects exact parcel value and authenticates recipient with a cryptographic one-time security code. The transaction is instantly timestamped on the courier's hand-terminal.",
      icon: DollarSign,
      status: "COLLECTED",
    },
    {
      step: "02",
      title: "Hub Vault Auditing & Vault Lock",
      timing: "Day 0 • 20:00 PM Hub Inflow",
      desc: "At the end of the shift, the regional sorting hub manager scans the physical cash drop, matching it against the digital waybill manifest. Escrow is secured in the automated ledger.",
      icon: Building2,
      status: "VERIFIED",
    },
    {
      step: "03",
      title: "Automated Fee Reconciliation",
      timing: "Day 1 • 06:00 AM Auto-Batch",
      desc: "ParcelPilot platform subtracts the exact 1% COD fee and delivery freight. Zero hidden maintenance or gateway surcharge deductions. Transparent itemization generated.",
      icon: FileText,
      status: "RECONCILED",
    },
    {
      step: "04",
      title: "Direct Merchant Bank Disbursement",
      timing: "Day 1 • 11:00 AM Payout Execution",
      desc: "Funds are automatically disbursed into your designated corporate bank account (BEFTN/NPSB) or instant MFS wallet with an automated tax invoice and settlement statement.",
      icon: Wallet,
      status: "SETTLED",
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <ShieldCheck className="size-3.5" />
            <span>Financial Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            How Cash On Delivery (COD) Reaches You
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Never wait weeks for your working capital. Our automated escrow
            engine reconciles doorstep cash collections and triggers guaranteed
            next-business-day remittances.
          </p>
        </div>

        {/* Chronological Flow Layout (Sharp corners, not rounded) */}
        <div className="relative border-l border-border ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                {/* Node on the vertical timeline */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1 size-8 rounded-none border border-primary/40 bg-background flex items-center justify-center text-primary font-mono text-xs font-bold group-hover:scale-105 group-hover:border-primary transition-all">
                  {item.step}
                </div>

                <div className="bg-card text-card-foreground border border-border rounded-none p-6 sm:p-7 hover:border-primary/40 transition-all shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-none bg-primary/10 text-primary border border-primary/20">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-muted-foreground">
                        {item.timing}
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-4xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
