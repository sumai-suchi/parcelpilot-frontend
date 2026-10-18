"use client";

import { Search, ChevronRight, LifeBuoy } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HelpHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectTag: (tag: string) => void;
}

export default function HelpHero({
  searchQuery,
  onSearchChange,
  onSelectTag,
}: HelpHeroProps) {
  const commonSearches = [
    "Tracking Lifecycle States",
    "COD Payout Schedule",
    "Change Delivery Address",
    "Damaged Parcel Claim",
    "Courier OTP Code",
  ];

  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-28 pb-16 border-b border-border">
      {/* Background Lighting & Radar Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] opacity-[0.03] bg-[size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-muted-foreground text-xs font-mono">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/60">
                <ChevronRight className="size-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-semibold">
                  HELP CENTER & DISPATCH KNOWLEDGE BASE
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary shadow-sm">
            <LifeBuoy className="size-3.5" />
            <span>24/7 LOGISTICS DISPATCH RESOLUTION SYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] font-sans">
            How Can We Assist Your
            <span className="block text-primary">Shipment Today?</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Search our operational knowledge base for answers regarding tracking
            statuses, doorstep OTP verification, COD bank disbursement
            schedules, and insurance claims.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search help topics (e.g., 'OTP', 'COD', 'Refund', 'Address change')..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border border-input rounded-none text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-sm transition-all"
            />
          </div>

          {/* Suggested Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-muted-foreground pt-2">
            <span>Quick Topics:</span>
            {commonSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag(tag)}
                className="px-2.5 py-1 rounded-none bg-muted/40 border border-border hover:border-border/80 text-foreground transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
