"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck, Truck, Box } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const DIVISIONS = [
  "Dhaka Metro",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const TIERS = [
  {
    id: "standard",
    label: "Standard Logistics",
    sla: "48 - 72 Hours",
    base: 60,
    perKg: 20,
  },
  {
    id: "priority",
    label: "Priority Express",
    sla: "24 Hours SLA",
    base: 100,
    perKg: 25,
  },
  {
    id: "flash",
    label: "Same-Day Flash",
    sla: "6 - 10 Hours",
    base: 150,
    perKg: 35,
  },
  {
    id: "freight",
    label: "Heavy Bulk Freight",
    sla: "72 Hours SLA",
    base: 220,
    perKg: 15,
  },
];

export default function PricingSimulator() {
  const [origin, setOrigin] = useState("Dhaka Metro");
  const [destination, setDestination] = useState("Chattogram");
  const [selectedTier, setSelectedTier] = useState("standard");
  const [weight, setWeight] = useState(1.5);
  const [codAmount, setCodAmount] = useState(1200);
  const [enableCod, setEnableCod] = useState(true);
  const [enableInsurance, setEnableInsurance] = useState(true);

  const activeTier = TIERS.find((t) => t.id === selectedTier) || TIERS[0];
  const isInterDistrict = origin !== destination;
  const interDistrictMultiplier = isInterDistrict ? 1.35 : 1.0;

  // Cost Computations
  const baseRate = Math.round(activeTier.base * interDistrictMultiplier);
  const additionalWeightKg = Math.max(0, weight - 1);
  const weightCharge = Math.round(additionalWeightKg * activeTier.perKg);
  const codFee = enableCod ? Math.max(10, Math.round(codAmount * 0.01)) : 0;
  const insuranceFee = enableInsurance ? 15 : 0;
  const fuelSecurityFee = 10;
  const totalTariff =
    baseRate + weightCharge + codFee + insuranceFee + fuelSecurityFee;

  return (
    <section
      id="simulator"
      className="py-20 bg-background text-foreground border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Calculator className="size-3.5" />
            <span>Interactive Operational Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Live Waybill & Freight Fee Estimator
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Test real-world routing variables before scheduling your shipment.
            Adjust weight, inter-hub corridors, and delivery speeds to see exact
            itemized charges.
          </p>
        </div>

        {/* Unique Split Interactive Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Flight Controls & Sliders */}
          <div className="lg:col-span-7 bg-card text-card-foreground border border-border rounded-none p-6 sm:p-8 space-y-7 shadow-sm">
            {/* Origin & Destination Route Pair */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Truck className="size-3.5 text-primary" /> Corridor Routing
                </label>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-none border ${
                    isInterDistrict
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {isInterDistrict
                    ? "INTER-DISTRICT LINEHAUL"
                    : "INTRA-CITY METRO ROUTE"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-mono text-muted-foreground block mb-1.5">
                    FROM (PICKUP HUB)
                  </span>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-background border border-input rounded-none px-3.5 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={`orig-${d}`} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-muted-foreground block mb-1.5">
                    TO (DELIVERY HUB)
                  </span>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-background border border-input rounded-none px-3.5 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={`dest-${d}`} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Delivery Service Level Selector (Non-card pill buttons with sharp corners) */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-foreground block mb-3">
                Service Level Agreement (SLA Tier)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-3 rounded-none border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground shadow-sm ring-1 ring-primary/40 font-bold"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-border/80 hover:text-foreground"
                      }`}
                    >
                      <div className="font-semibold text-xs text-foreground">
                        {tier.label}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground mt-1">
                        {tier.sla}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package Weight Parameter Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Box className="size-3.5 text-primary" /> Billable Weight (KG)
                </label>
                <div className="font-mono text-sm font-bold text-primary">
                  {weight.toFixed(1)} KG
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5">
                <span>0.5 kg (Document / Mini)</span>
                <span>5.0 kg (Standard Box)</span>
                <span>25.0 kg (Heavy Bulk)</span>
              </div>
            </div>

            {/* Value-Added Services (COD & Insurance) */}
            <div className="pt-2 border-t border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="cod-toggle"
                    checked={enableCod}
                    onChange={(e) => setEnableCod(e.target.checked)}
                    className="size-4 accent-primary rounded-none cursor-pointer"
                  />
                  <label
                    htmlFor="cod-toggle"
                    className="text-xs text-foreground cursor-pointer"
                  >
                    Enable Cash on Delivery (COD Collection)
                  </label>
                </div>
                {enableCod && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      Target Value: ৳
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="100000"
                      value={codAmount}
                      onChange={(e) => setCodAmount(Number(e.target.value))}
                      className="w-28 bg-background border border-input rounded-none px-2 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="insurance-toggle"
                  checked={enableInsurance}
                  onChange={(e) => setEnableInsurance(e.target.checked)}
                  className="size-4 accent-primary rounded-none cursor-pointer"
                />
                <label
                  htmlFor="insurance-toggle"
                  className="text-xs text-foreground cursor-pointer flex items-center gap-2"
                >
                  <span>
                    Include Transit Loss & Damage Insurance Shield (+৳15)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-none border border-emerald-500/20">
                    RECOMMENDED
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Unique Itemized Digital Waybill Docket */}
          <div className="lg:col-span-5 bg-card text-card-foreground border border-border rounded-none p-6 sm:p-7 relative shadow-sm font-mono text-xs">
            {/* Top Barcode Aesthetic */}
            <div className="flex items-center justify-between border-b border-dashed border-border pb-4 mb-5">
              <div>
                <span className="text-[10px] text-muted-foreground block">
                  ESTIMATION DOCKET
                </span>
                <span className="text-foreground font-bold text-sm tracking-wider">
                  EST-PP-482910
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground block">
                  STATUS
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1 justify-end">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  SIMULATED
                </span>
              </div>
            </div>

            {/* Route Summary Tag */}
            <div className="bg-muted/40 rounded-none p-3 border border-border mb-5 flex items-center justify-between text-[11px]">
              <div>
                <span className="text-muted-foreground block text-[10px]">
                  CORRIDOR
                </span>
                <span className="text-foreground font-semibold">
                  {origin} → {destination}
                </span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block text-[10px]">
                  ESTIMATED WINDOW
                </span>
                <span className="text-primary font-bold">{activeTier.sla}</span>
              </div>
            </div>

            {/* Itemized Line Items */}
            <div className="space-y-3 pb-5 border-b border-dashed border-border">
              <div className="flex justify-between items-center text-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-1 bg-muted-foreground rounded-none" />{" "}
                  Base Freight ({selectedTier.toUpperCase()})
                </span>
                <span className="font-bold text-foreground">৳{baseRate}</span>
              </div>

              <div className="flex justify-between items-center text-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-1 bg-muted-foreground rounded-none" />{" "}
                  Weight Surcharge ({weight.toFixed(1)} kg)
                </span>
                <span className="font-bold text-foreground">
                  ৳{weightCharge}
                </span>
              </div>

              {enableCod && (
                <div className="flex justify-between items-center text-foreground">
                  <span className="flex items-center gap-2">
                    <span className="size-1 bg-muted-foreground rounded-none" />{" "}
                    COD Handling (1% of ৳{codAmount})
                  </span>
                  <span className="font-bold text-foreground">৳{codFee}</span>
                </div>
              )}

              {enableInsurance && (
                <div className="flex justify-between items-center text-foreground">
                  <span className="flex items-center gap-2">
                    <span className="size-1 bg-muted-foreground rounded-none" />{" "}
                    Transit Loss Shield
                  </span>
                  <span className="font-bold text-foreground">
                    ৳{insuranceFee}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-muted-foreground text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="size-1 bg-muted-foreground/50 rounded-none" />{" "}
                  Fuel & Automated Sorting
                </span>
                <span>৳{fuelSecurityFee}</span>
              </div>
            </div>

            {/* Total Tariff Calculation */}
            <div className="pt-5 pb-5">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-muted-foreground font-bold uppercase tracking-wider text-xs">
                  Estimated Total
                </span>
                <div className="text-right">
                  <span className="text-3xl font-black text-foreground">
                    ৳{totalTariff}
                  </span>
                  <span className="text-muted-foreground text-[10px] block">
                    BDT (ALL TAXES INCLUDED)
                  </span>
                </div>
              </div>
            </div>

            {/* CTA action inside receipt */}
            <div className="space-y-3 pt-2">
              <Link
                href="/register"
                className={buttonVariants({
                  className:
                    "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider h-11 rounded-none",
                })}
              >
                Lock Rate & Create Shipment{" "}
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <p className="text-[10px] text-muted-foreground text-center leading-relaxed font-sans">
                No credit card required. Registered merchants get automated
                monthly credit billing.
              </p>
            </div>

            {/* Decorative bottom barcode */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-muted-foreground">
              <span className="text-[9px] font-mono">
                PARCELPILOT RATE PROTOCOL
              </span>
              <div className="flex gap-1 h-5 items-center opacity-60">
                <div className="w-0.5 h-full bg-foreground" />
                <div className="w-1 h-full bg-foreground" />
                <div className="w-0.5 h-full bg-foreground" />
                <div className="w-1.5 h-full bg-foreground" />
                <div className="w-0.5 h-full bg-foreground" />
                <div className="w-1 h-full bg-foreground" />
                <div className="w-2 h-full bg-foreground" />
                <div className="w-0.5 h-full bg-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
