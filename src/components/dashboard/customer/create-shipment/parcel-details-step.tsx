"use client";

import {
  Clock,
  FileEdit,
  FileText,
  Flame,
  Layers,
  Package,
  Scale,
  Shirt,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ParcelDetailsStepProps {
  parcelType: string;
  weight: number;
  deliveryType: string;
  description: string;
  onChangeField: (field: string, value: any) => void;
}

const PARCEL_CATEGORIES = [
  {
    id: "Electronics",
    label: "Electronics",
    icon: Package,
    desc: "Gadgets & instruments",
  },
  {
    id: "Documents",
    label: "Documents",
    icon: FileText,
    desc: "Legal papers & contracts",
  },
  { id: "Apparel", label: "Apparel", icon: Shirt, desc: "Garments & textiles" },
  {
    id: "Fragile",
    label: "Fragile",
    icon: Flame,
    desc: "Glassware & precision tools",
  },
];

const WEIGHT_PRESETS = [0.5, 1.0, 2.0, 5.0, 10.0];

const DELIVERY_TIERS = [
  {
    id: "STANDARD",
    name: "Standard Ground",
    time: "2 - 3 business days",
    multiplier: 1.0,
    icon: Truck,
    badge: "ECONOMY",
  },
  {
    id: "EXPRESS",
    name: "Express Priority",
    time: "Next business day",
    multiplier: 1.5,
    icon: Zap,
    badge: "1.5X VELOCITY",
  },
  {
    id: "SAME_DAY",
    name: "Same Day Rush",
    time: "Direct dispatch < 6 hrs",
    multiplier: 2.2,
    icon: Clock,
    badge: "2.2X RUSH",
  },
];

export function ParcelDetailsStep({
  parcelType,
  weight,
  deliveryType,
  description,
  onChangeField,
}: ParcelDetailsStepProps) {
  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs">
      <CardHeader className="border-b border-border/70 p-5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-none border border-primary/20 bg-primary/10 text-primary shrink-0">
            <Package className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-semibold tracking-wider text-primary uppercase">
              STEP 03 / CONSIGNMENT SPECIFICATION
            </div>
            <CardTitle className="font-sans text-base font-bold tracking-tight text-foreground">
              Parcel Details & Delivery Tier
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Select commodity category, scale weight, and transit priority.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* Parcel Category */}
        <div className="space-y-2">
          <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Commodity Category *
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PARCEL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = parcelType === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChangeField("parcelType", cat.id)}
                  className={`flex flex-col items-start rounded-none border p-3.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/40 bg-card hover:bg-muted/30"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-none border ${
                      isSelected
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-2 font-sans text-xs font-bold text-foreground">
                    {cat.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground line-clamp-1">
                    {cat.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Weight Selector */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Consignment Net Weight *
            </label>
            <span className="font-mono text-xs font-bold text-primary">
              {weight.toFixed(1)} KG
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {WEIGHT_PRESETS.map((w) => (
              <Button
                key={w}
                type="button"
                variant={weight === w ? "default" : "outline"}
                size="xs"
                onClick={() => onChangeField("weight", w)}
                className="font-mono text-[11px] uppercase tracking-wider"
              >
                {w} KG
              </Button>
            ))}

            <div className="flex items-center gap-2 ml-auto">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="0.1"
                max="500"
                step="0.1"
                value={weight}
                onChange={(e) =>
                  onChangeField("weight", Number(e.target.value) || 0.1)
                }
                className="w-24 font-mono text-xs text-right"
              />
              <span className="font-mono text-xs text-muted-foreground">
                KG
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Speed Tier */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Transit Speed & Handling Priority *
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {DELIVERY_TIERS.map((tier) => {
              const Icon = tier.icon;
              const isSelected = deliveryType === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => onChangeField("deliveryType", tier.id)}
                  className={`flex flex-col items-start rounded-none border p-3.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/40 bg-card hover:bg-muted/30"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-none border ${
                        isSelected
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase font-semibold px-1.5 py-0.5 border border-border bg-muted text-muted-foreground">
                      {tier.badge}
                    </span>
                  </div>
                  <span className="mt-2.5 font-sans text-xs font-bold text-foreground">
                    {tier.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                    {tier.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Handling Instructions */}
        <div className="space-y-1.5 pt-2 border-t border-border/50">
          <label className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            <FileEdit className="h-3.5 w-3.5" />
            Special Handling Instructions (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Fragile contents, call consignee before delivery, leave with reception if absent."
            value={description}
            onChange={(e) => onChangeField("description", e.target.value)}
            className="w-full rounded-none border border-input bg-transparent px-3 py-2 text-xs font-sans text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-b-ring transition-[color,border-color]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
