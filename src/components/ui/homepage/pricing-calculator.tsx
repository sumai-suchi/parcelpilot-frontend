"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Check, Info } from "lucide-react";

export default function PricingCalculator() {
  const [weight, setWeight] = useState<number>(1);
  const [zone, setZone] = useState<"metro" | "suburb" | "nationwide">("metro");
  const [service, setService] = useState<"standard" | "express">("standard");
  const [codAmount, setCodAmount] = useState<number>(0);

  // Pricing formula
  const getBaseRate = () => {
    if (zone === "metro") return 100;
    if (zone === "suburb") return 130;
    return 160;
  };

  const getWeightCost = () => {
    if (weight <= 1) return 0;
    const extraKg = Math.ceil(weight - 1);
    const ratePerKg = zone === "metro" ? 20 : 25;
    return extraKg * ratePerKg;
  };

  const getServiceMultiplier = () => {
    return service === "express" ? 40 : 0;
  };

  const getCodFee = () => {
    if (codAmount <= 0) return 0;
    return Math.round(codAmount * 0.01); // 1% COD fee
  };

  const baseRate = getBaseRate();
  const weightCost = getWeightCost();
  const expressFee = getServiceMultiplier();
  const codFee = getCodFee();
  const totalCost = baseRate + weightCost + expressFee + codFee;

  const estimatedHours =
    service === "express"
      ? zone === "metro"
        ? "Same-Day (4-6 Hours)"
        : "Next-Day Morning"
      : zone === "metro"
      ? "24 Hours"
      : "48 - 72 Hours";

  return (
    <section className="py-20 bg-white dark:bg-zinc-900 border-y border-zinc-200/70 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
            <Calculator className="h-3.5 w-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Shipping Rate & Delivery Calculator
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Estimate your parcel delivery fees upfront with zero hidden charges.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-14 max-w-4xl mx-auto rounded-3xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-950/70 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Zone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  1. Delivery Destination Zone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "metro", label: "Inside Metro", sub: "Same City" },
                    { id: "suburb", label: "Sub-Urban", sub: "Adjacent Areas" },
                    { id: "nationwide", label: "Nationwide", sub: "All 64 Districts" },
                  ].map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setZone(z.id as any)}
                      className={`p-3 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all ${
                        zone === z.id
                          ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-sm"
                          : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                      }`}
                    >
                      <div className="font-bold">{z.label}</div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">{z.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider & Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    2. Parcel Weight (KG)
                  </label>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {weight} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  <span>0.5 kg (Document)</span>
                  <span>10 kg</span>
                  <span>20 kg (Heavy)</span>
                </div>
              </div>

              {/* Service Speed */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  3. Service Speed
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setService("standard")}
                    className={`p-3.5 rounded-xl text-left border text-xs sm:text-sm transition-all ${
                      service === "standard"
                        ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="font-bold">Standard Delivery</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Regular transit 24-48 hours</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setService("express")}
                    className={`p-3.5 rounded-xl text-left border text-xs sm:text-sm transition-all ${
                      service === "express"
                        ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      <span>Express Priority</span>
                      <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.2 rounded font-bold">FAST</span>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Urgent rush dispatch</div>
                  </button>
                </div>
              </div>

              {/* Optional COD Collection Amount */}
              <div>
                <label htmlFor="codAmount" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  4. Cash On Delivery (COD) Amount (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-500">৳</span>
                  <input
                    id="codAmount"
                    type="number"
                    min="0"
                    value={codAmount || ""}
                    onChange={(e) => setCodAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Enter customer payable amount"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pl-8 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Standard 1% COD handling fee applies on collected cash.
                </p>
              </div>
            </div>

            {/* Price Breakdown Sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-md">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  Fare Summary Breakdown
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Base Shipping:</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">৳{baseRate}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Weight Surcharge ({weight}kg):</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">৳{weightCost}</span>
                  </div>
                  {expressFee > 0 && (
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Express Priority:</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">+৳{expressFee}</span>
                    </div>
                  )}
                  {codFee > 0 && (
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>COD Fee (1%):</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">৳{codFee}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Total Estimated Cost</div>
                      <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                        ৳{totalCost}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">ETA Delivery</div>
                      <div className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        {estimatedHours}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Free pickup from your doorstep</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Live GPS tracking link via SMS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Up to ৳5,000 package transit insurance</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book This Delivery</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
