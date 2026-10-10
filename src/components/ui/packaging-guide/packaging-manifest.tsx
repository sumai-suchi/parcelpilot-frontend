"use client";

import { useState } from "react";
import { AlertOctagon, AlertTriangle, XCircle } from "lucide-react";

export default function PackagingManifest() {
  const [activeTab, setActiveTab] = useState<"prohibited" | "restricted">(
    "prohibited",
  );

  const prohibitedItems = [
    {
      category: "Flammables & Explosives",
      examples:
        "Aerosol cans, fireworks, lighter fluid, lithium-battery packs without MSDS certifications.",
      hazard: "Combustion hazard in unpressurized cargo linehauls",
      penalty: "Instant confiscation & permanent merchant account ban",
    },
    {
      category: "Undeclared Currency & Bearer Bonds",
      examples:
        "Physical cash notes (BDT/USD), bullion coins, unregistered bearer cheques.",
      hazard: "Regulatory anti-money laundering compliance violation",
      penalty: "Legal escalation to commercial dispatch authority",
    },
    {
      category: "Perishable Raw Groceries",
      examples:
        "Unfrozen raw fish, unpasteurized dairy, raw meat without cold-chain containers.",
      hazard: "Bacterial contamination and parcel leakage",
      penalty: "Refusal at first-mile hub intake inspection",
    },
    {
      category: "Hazardous Chemical Reagents",
      examples:
        "Industrial acids, chlorine bleach, toxic pesticides, radioactive isotopes.",
      hazard: "Severe health hazard to hub sorting personnel",
      penalty: "Reported to environmental safety administration",
    },
  ];

  const restrictedItems = [
    {
      category: "Consumer Electronics with Batteries",
      examples: "Smartphones, laptops, power banks (under 100Wh).",
      condition:
        "Device must be switched off. Battery must be insulated from terminals. Maximum 2 devices per waybill.",
      declaration: "Mandatory 'Lithium-Ion Inside' waybill sticker required.",
    },
    {
      category: "Cosmetics, Perfumes & Bottled Liquids",
      examples: "Skin lotions, perfume bottles, essential oils.",
      condition:
        "Hermetically sealed screw caps. Minimum 3 layers of 10mm bubble wrap inside a leakproof poly-sleeve.",
      declaration: "Declared as 'Liquid Goods' during booking creation.",
    },
    {
      category: "High-Value Jewelry & Watches",
      examples: "Smartwatches, gold ornaments, luxury eyewear.",
      condition:
        "Tamper-evident security tape on outer carton. Value declaration verified against merchant invoice.",
      declaration: "Requires ParcelPilot Transit Insurance Option (+৳15).",
    },
    {
      category: "Ceramics & Tempered Glass",
      examples: "Glass tableware, framed artworks, ceramic pots.",
      condition:
        "Individual bubble wrapping per piece. Inner carton suspended within an outer corrugated shipping box.",
      declaration: "Flagged with 'FRAGILE - HANDLE WITH CARE' indicator.",
    },
  ];

  return (
    <section
      id="prohibited-manifest"
      className="py-20 bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <AlertOctagon className="size-3.5" />
            <span>Regulatory Cargo Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Prohibited & Restricted Freight Manifest
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Ensure your consignment complies with Bangladeshi domestic carriage
            regulations and ParcelPilot transit safety policies before
            scheduling a courier pickup.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-border mb-8 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("prohibited")}
            className={`flex items-center gap-2 pb-4 px-4 font-bold border-b-2 transition-colors rounded-none ${
              activeTab === "prohibited"
                ? "border-destructive text-destructive"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <XCircle className="size-4 text-destructive" />
            <span>STRICTLY PROHIBITED (ZERO TOLERANCE)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("restricted")}
            className={`flex items-center gap-2 pb-4 px-4 font-bold border-b-2 transition-colors rounded-none ${
              activeTab === "restricted"
                ? "border-amber-500 text-amber-600 dark:text-amber-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlertTriangle className="size-4 text-amber-500" />
            <span>CONDITIONAL & RESTRICTED CARGO</span>
          </button>
        </div>

        {/* Tab Content Table */}
        <div className="border border-border rounded-none bg-card text-card-foreground overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {activeTab === "prohibited" ? (
              <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50 font-mono text-xs">
                    <th className="py-4 px-5 text-destructive font-semibold uppercase tracking-wider min-w-[200px]">
                      RESTRICTED CATEGORY
                    </th>
                    <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[240px]">
                      EXAMPLES
                    </th>
                    <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[220px]">
                      HAZARD JUSTIFICATION
                    </th>
                    <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[180px]">
                      CONSEQUENCE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-xs">
                  {prohibitedItems.map((item, idx) => (
                    <tr
                      key={item.category}
                      className={
                        idx % 2 === 0
                          ? "bg-muted/10 hover:bg-muted/30"
                          : "bg-transparent hover:bg-muted/30"
                      }
                    >
                      <td className="py-4 px-5">
                        <span className="font-bold text-foreground font-sans flex items-center gap-2">
                          <XCircle className="size-3.5 text-destructive shrink-0" />
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-foreground font-sans">
                        {item.examples}
                      </td>
                      <td className="py-4 px-5 text-muted-foreground text-[11px]">
                        {item.hazard}
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-destructive font-semibold text-[11px]">
                          {item.penalty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50 font-mono text-xs">
                    <th className="py-4 px-5 text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider min-w-[200px]">
                      RESTRICTED CATEGORY
                    </th>
                    <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[200px]">
                      EXAMPLES
                    </th>
                    <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[260px]">
                      MANDATORY PACKAGING CONDITION
                    </th>
                    <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[180px]">
                      DECLARATION PROTOCOL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-xs">
                  {restrictedItems.map((item, idx) => (
                    <tr
                      key={item.category}
                      className={
                        idx % 2 === 0
                          ? "bg-muted/10 hover:bg-muted/30"
                          : "bg-transparent hover:bg-muted/30"
                      }
                    >
                      <td className="py-4 px-5">
                        <span className="font-bold text-foreground font-sans flex items-center gap-2">
                          <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-foreground font-sans">
                        {item.examples}
                      </td>
                      <td className="py-4 px-5 text-foreground font-sans text-xs">
                        {item.condition}
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-2 py-1 rounded-none bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-[11px]">
                          {item.declaration}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="p-4 bg-muted/30 border-t border-border text-[11px] font-mono text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              * Unsure about your cargo classification? Contact Dispatch
              Security at security@parcelpilot.com before shipping.
            </span>
            <span className="text-foreground font-semibold">
              100% X-RAY SCAN AT AIR/HUB CORRIDORS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
