"use client";

import { useState } from "react";
import { Box, Scale, Sparkles } from "lucide-react";

export default function PackagingVolumetricCalculator() {
  const [length, setLength] = useState<number>(30); // cm
  const [width, setWidth] = useState<number>(25); // cm
  const [height, setHeight] = useState<number>(20); // cm
  const [actualWeight, setActualWeight] = useState<number>(2.0); // kg

  // Formula: (L x W x H) / 5000
  const cubicVolume = length * width * height;
  const volumetricWeight = Number((cubicVolume / 5000).toFixed(2));
  const billableWeight = Math.max(actualWeight, volumetricWeight);
  const isVolumetricHigher = volumetricWeight > actualWeight;

  return (
    <section
      id="volumetric-calculator"
      className="py-20 bg-background text-foreground border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Scale className="size-3.5" />
            <span>Dimensional Freight Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Volumetric vs. Actual Weight Calculator
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            A courier vehicle has limited cubic space. If a parcel is large but
            lightweight (e.g., winter jackets or pillows), logistics carriers
            charge by dimensional weight. Use this tool to determine your exact
            billable weight.
          </p>
        </div>

        {/* Split Calculator Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dimensions & Actual Weight Inputs */}
          <div className="lg:col-span-7 bg-card text-card-foreground border border-border rounded-none p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Box className="size-4 text-primary" /> Carton Dimensions
                (Centimeters)
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Formula: (L × W × H) ÷ 5000
              </span>
            </div>

            {/* Dimension Sliders & Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
                  <span>LENGTH (L)</span>
                  <span className="text-foreground font-bold">{length} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
                  <span>WIDTH (W)</span>
                  <span className="text-foreground font-bold">{width} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
                  <span>HEIGHT (H)</span>
                  <span className="text-foreground font-bold">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-none cursor-pointer"
                />
              </div>
            </div>

            {/* Actual Weight Parameter */}
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Scale className="size-3.5 text-primary" /> Actual Physical
                  Scale Weight
                </label>
                <span className="font-mono text-sm font-bold text-primary">
                  {actualWeight.toFixed(1)} KG
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="30"
                step="0.2"
                value={actualWeight}
                onChange={(e) => setActualWeight(parseFloat(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5">
                <span>0.2 kg (Light Polymail)</span>
                <span>15 kg (Heavy Box)</span>
                <span>30 kg (Max Courier Limit)</span>
              </div>
            </div>

            {/* Quick Sizing Presets */}
            <div className="pt-3 border-t border-border">
              <span className="text-[11px] font-mono text-muted-foreground block mb-2">
                COMMON CARRIER PRESETS:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {[
                  { name: "Small Flyer Bag", l: 20, w: 15, h: 5, weight: 0.5 },
                  { name: "Medium Shoe Box", l: 32, w: 20, h: 12, weight: 1.2 },
                  { name: "Apparel Carton", l: 45, w: 35, h: 25, weight: 3.0 },
                  {
                    name: "Large Electronics",
                    l: 60,
                    w: 45,
                    h: 40,
                    weight: 7.5,
                  },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setLength(preset.l);
                      setWidth(preset.w);
                      setHeight(preset.h);
                      setActualWeight(preset.weight);
                    }}
                    className="px-2.5 py-1 rounded-none bg-muted/40 border border-border hover:border-border/80 text-foreground transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mathematical Analysis & Billable Verdict */}
          <div className="lg:col-span-5 bg-card text-card-foreground border border-border rounded-none p-6 sm:p-7 shadow-sm font-mono text-xs relative">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-muted-foreground uppercase tracking-wider">
                WEIGHT ANALYSIS DOCKET
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-none bg-muted border border-border text-foreground">
                IATA STANDARD
              </span>
            </div>

            {/* Comparison Metrics */}
            <div className="py-5 space-y-4 border-b border-dashed border-border">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    ACTUAL SCALE WEIGHT
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {actualWeight.toFixed(2)} KG
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block text-[11px]">
                    VOLUMETRIC WEIGHT
                  </span>
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {volumetricWeight.toFixed(2)} KG
                  </span>
                </div>
              </div>

              <div className="p-3 bg-muted/40 rounded-none border border-border text-[11px] text-muted-foreground">
                <span>Cubic Volume: </span>
                <strong className="text-foreground">
                  {length} × {width} × {height} = {cubicVolume.toLocaleString()}{" "}
                  cm³
                </strong>
              </div>
            </div>

            {/* Billable Verdict */}
            <div className="py-5">
              <span className="text-[10px] text-muted-foreground block mb-1">
                BILLABLE CHARGEABLE WEIGHT
              </span>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-black text-foreground">
                  {billableWeight.toFixed(2)} KG
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-none border ${
                    isVolumetricHigher
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                  }`}
                >
                  {isVolumetricHigher
                    ? "VOLUMETRIC PREVAILS"
                    : "SCALE WEIGHT PREVAILS"}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isVolumetricHigher
                  ? `Because the parcel volume exceeds its physical density, ParcelPilot bills by the ${volumetricWeight.toFixed(2)} kg volumetric threshold.`
                  : `Your parcel is sufficiently dense. You will be billed by the actual scale weight of ${actualWeight.toFixed(2)} kg.`}
              </p>
            </div>

            {/* Optimization Recommendation */}
            <div className="pt-4 border-t border-border text-[11px] text-muted-foreground flex items-start gap-2 font-sans">
              <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Cost-Saving Tip:</strong> If volumetric weight is
                higher, trim empty carton headspace or switch to vacuum-sealed
                polymailers to reduce billable weight by up to 35%.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
