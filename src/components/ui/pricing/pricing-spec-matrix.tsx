"use client";

import { Check, Minus, Layers } from "lucide-react";

export default function PricingSpecMatrix() {
  const specs = [
    {
      feature: "Guaranteed SLA Window",
      description: "Maximum delivery turn-around time",
      standard: "48 - 72 Hours",
      express: "24 Hours Guaranteed",
      enterprise: "Same-Day (6-12h) / Custom",
    },
    {
      feature: "Base Freight Tariff (0 - 1kg)",
      description: "Standard city baseline charge",
      standard: "৳60",
      express: "৳100",
      enterprise: "Custom Volume Tier",
    },
    {
      feature: "Weight Increment Rate",
      description: "Additional charge per kilogram",
      standard: "৳20 / kg",
      express: "৳25 / kg",
      enterprise: "৳12 - ৳15 / kg",
    },
    {
      feature: "First-Mile Pickup Cutoff",
      description: "Latest daily request dispatch time",
      standard: "3:00 PM",
      express: "6:00 PM",
      enterprise: "9:00 PM + On-Demand",
    },
    {
      feature: "COD Disbursement Schedule",
      description: "Bank transfer payout timeline",
      standard: "Weekly (Every Mon)",
      express: "T+2 Business Days",
      enterprise: "Next-Day T+1 / Instant Wallet",
    },
    {
      feature: "Return-To-Origin (RTO) Fee",
      description: "Fee on undelivered/rejected parcels",
      standard: "50% Base Freight",
      express: "50% Base Freight",
      enterprise: "Subsidized (30%)",
    },
    {
      feature: "Transit Loss Shield Limit",
      description: "Included compensation per waybill",
      standard: "Up to ৳3,000",
      express: "Up to ৳10,000",
      enterprise: "Full Invoiced Value",
    },
    {
      feature: "Automated API & Webhooks",
      description: "Real-time state event streaming",
      standard: false,
      express: true,
      enterprise: true,
    },
    {
      feature: "Dedicated Dispatch Coordinator",
      description: "Assigned hub contact manager",
      standard: false,
      express: false,
      enterprise: true,
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Layers className="size-3.5" />
            <span>Operational Service Level Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Comprehensive Tier Specifications
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Directly compare features, delivery thresholds, and settlement
            policies across our logistics tiers. Built with zero ambiguity for
            transparent merchant operations.
          </p>
        </div>

        {/* Technical Data Matrix Table (Responsive wrapper with sharp corners) */}
        <div className="border border-border rounded-none bg-card text-card-foreground overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50 font-mono text-xs">
                  <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[200px]">
                    SPECIFICATION / CAPABILITY
                  </th>
                  <th className="py-4 px-5 text-foreground font-semibold uppercase tracking-wider min-w-[150px]">
                    STANDARD LOGISTICS
                  </th>
                  <th className="py-4 px-5 text-primary font-bold uppercase tracking-wider min-w-[160px] bg-primary/5">
                    PRIORITY EXPRESS
                  </th>
                  <th className="py-4 px-5 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider min-w-[170px]">
                    ENTERPRISE MERCHANT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-xs">
                {specs.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={
                      idx % 2 === 0
                        ? "bg-muted/10 hover:bg-muted/30"
                        : "bg-transparent hover:bg-muted/30"
                    }
                  >
                    {/* Feature & Description */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-foreground font-sans">
                        {row.feature}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                        {row.description}
                      </div>
                    </td>

                    {/* Standard */}
                    <td className="py-4 px-5 text-foreground">
                      {typeof row.standard === "boolean" ? (
                        row.standard ? (
                          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Minus className="size-4 text-muted-foreground/60" />
                        )
                      ) : (
                        <span>{row.standard}</span>
                      )}
                    </td>

                    {/* Express (Highlighted) */}
                    <td className="py-4 px-5 text-primary bg-primary/5 font-semibold">
                      {typeof row.express === "boolean" ? (
                        row.express ? (
                          <Check className="size-4 text-primary" />
                        ) : (
                          <Minus className="size-4 text-muted-foreground/60" />
                        )
                      ) : (
                        <span className="text-primary">{row.express}</span>
                      )}
                    </td>

                    {/* Enterprise */}
                    <td className="py-4 px-5 text-amber-600 dark:text-amber-400 font-medium">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="size-4 text-amber-600 dark:text-amber-400" />
                        ) : (
                          <Minus className="size-4 text-muted-foreground/60" />
                        )
                      ) : (
                        <span>{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Note */}
          <div className="p-4 bg-muted/30 border-t border-border text-[11px] font-mono text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              * All tariffs subject to local regulatory VAT where applicable.
              Volume rebates credited on 1st of each month.
            </span>
            <span className="text-foreground font-semibold">
              SLA COMPLIANCE GUARANTEE: 99.4% ON-TIME
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
