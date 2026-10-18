"use client";

import { ShieldCheck, Layers, QrCode, Droplets } from "lucide-react";

export default function PackagingBlueprint() {
  const steps = [
    {
      num: "01",
      title: "Carton Selection & 5cm Clearance",
      rule: "STRUCTURAL INTEGRITY",
      desc: "Use corrugated cardboard boxes with intact flaps. Ensure at least 5cm of clearance between the item and all interior carton walls, filled completely with dense bubble wrap, honeycomb paper, or packing peanuts.",
      icon: Layers,
    },
    {
      num: "02",
      title: "The 6-Strip 'H-Taping' Method",
      rule: "PRESSURE RESISTANCE",
      desc: "Apply pressure-sensitive adhesive tape (minimum 48mm / 2-inch width) along the center seam, followed by both edge seams on the top and bottom. This forms an 'H' shape preventing flap puncture during sorting conveyor belts.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Unobstructed Barcode Waybill Mounting",
      rule: "OPTICAL SCANNING COMPLIANCE",
      desc: "Place the shipping label flat on the largest surface of the carton. Avoid wrapping labels around box corners or taping over the barcode. Automated sorters scan barcodes at 3.5 m/s; clear labels prevent sorting reroutes.",
      icon: QrCode,
    },
    {
      num: "04",
      title: "Liquid & Fragile Secondary Containment",
      rule: "SPILL & SHOCK PREVENTION",
      desc: "Bottles and liquids must have screw-top seals taped shut and placed inside a hermetically sealed zip-top bag. Fragile glass or ceramics require rigid wooden or double-box crating with prominent 'THIS WAY UP' orientation markers.",
      icon: Droplets,
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Layers className="size-3.5" />
            <span>Standard Operating Procedure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            The 4-Step Packaging Blueprint
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Follow our verified logistics packaging standard to ensure seamless
            automated sorting, prevent shock damage during linehaul transit, and
            preserve full insurance coverage.
          </p>
        </div>

        {/* Technical Flow Layout (Responsive with sharp corners) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-card text-card-foreground border border-border rounded-none p-6 sm:p-7 relative overflow-hidden group hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-none bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                      {s.num}
                    </span>
                    <span className="text-muted-foreground font-semibold">
                      {s.rule}
                    </span>
                  </div>
                  <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 font-sans">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
