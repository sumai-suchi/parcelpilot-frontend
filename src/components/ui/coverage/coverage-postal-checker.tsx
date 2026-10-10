"use client";

import { useState } from "react";
import { MapPin, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoverageResult {
  zone: string;
  district: string;
  division: string;
  sla: string;
  sameDayAvailable: boolean;
  hub: string;
  status: "FULL_COVERAGE" | "EXTENDED_COVERAGE";
}

const SAMPLE_ZONES: Record<string, CoverageResult> = {
  "1205": {
    zone: "Dhanmondi / New Market",
    district: "Dhaka Metro",
    division: "Dhaka",
    sla: "6 - 12 Hours (Same-Day)",
    sameDayAvailable: true,
    hub: "HUB-DHK-01 (Tejgaon Central)",
    status: "FULL_COVERAGE",
  },
  "1208": {
    zone: "Tejgaon Industrial Area",
    district: "Dhaka Metro",
    division: "Dhaka",
    sla: "6 - 12 Hours (Same-Day)",
    sameDayAvailable: true,
    hub: "HUB-DHK-01 (Tejgaon Central)",
    status: "FULL_COVERAGE",
  },
  "1230": {
    zone: "Uttara Model Town",
    district: "Dhaka Metro",
    division: "Dhaka",
    sla: "6 - 12 Hours (Same-Day)",
    sameDayAvailable: true,
    hub: "HUB-DHK-02 (Uttara Feeder)",
    status: "FULL_COVERAGE",
  },
  "1212": {
    zone: "Gulshan / Banani",
    district: "Dhaka Metro",
    division: "Dhaka",
    sla: "6 - 12 Hours (Same-Day)",
    sameDayAvailable: true,
    hub: "HUB-DHK-01 (Tejgaon Central)",
    status: "FULL_COVERAGE",
  },
  "4100": {
    zone: "Agrabad Commercial",
    district: "Chattogram",
    division: "Chattogram",
    sla: "24 Hours (Next-Day)",
    sameDayAvailable: true,
    hub: "HUB-CTG-01 (Agrabad Port)",
    status: "FULL_COVERAGE",
  },
  "3100": {
    zone: "Sylhet Sadar / Subidbazar",
    district: "Sylhet",
    division: "Sylhet",
    sla: "24 - 48 Hours",
    sameDayAvailable: false,
    hub: "HUB-SYL-01 (Eastern Highlands)",
    status: "FULL_COVERAGE",
  },
  "6000": {
    zone: "Rajshahi Boalia",
    district: "Rajshahi",
    division: "Rajshahi",
    sla: "24 - 48 Hours",
    sameDayAvailable: false,
    hub: "HUB-RAJ-01 (Silk City Hub)",
    status: "FULL_COVERAGE",
  },
  "9100": {
    zone: "Khulna Rupsha / Sadar",
    district: "Khulna",
    division: "Khulna",
    sla: "24 Hours (Next-Day)",
    sameDayAvailable: false,
    hub: "HUB-KHU-01 (Rupsha Terminal)",
    status: "FULL_COVERAGE",
  },
  "8200": {
    zone: "Barishal Sadar / Band Road",
    district: "Barishal",
    division: "Barishal",
    sla: "24 - 48 Hours",
    sameDayAvailable: false,
    hub: "HUB-BAR-01 (Kirtankhola Delta)",
    status: "FULL_COVERAGE",
  },
  "5400": {
    zone: "Rangpur Modern Road",
    district: "Rangpur",
    division: "Rangpur",
    sla: "48 Hours Standard",
    sameDayAvailable: false,
    hub: "HUB-RNG-01 (Frontier Center)",
    status: "FULL_COVERAGE",
  },
};

export default function CoveragePostalChecker() {
  const [query, setQuery] = useState("1205");
  const [result, setResult] = useState<CoverageResult | null>(
    SAMPLE_ZONES["1205"],
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();

    // Check if postal code matches directly
    if (SAMPLE_ZONES[clean]) {
      setResult(SAMPLE_ZONES[clean]);
      setHasSearched(true);
      return;
    }

    // Check if zone/district/division substring matches
    const found = Object.values(SAMPLE_ZONES).find(
      (item) =>
        item.zone.toLowerCase().includes(clean) ||
        item.district.toLowerCase().includes(clean) ||
        item.division.toLowerCase().includes(clean),
    );

    if (found) {
      setResult(found);
    } else {
      // Fallback valid district simulation
      setResult({
        zone: query.trim() || "Local Upazila Area",
        district: "Regional District",
        division: "Bangladesh",
        sla: "48 - 72 Hours Guaranteed",
        sameDayAvailable: false,
        hub: "Nearest Primary District Feeder Hub",
        status: "FULL_COVERAGE",
      });
    }
    setHasSearched(true);
  };

  return (
    <section
      id="postal-checker"
      className="py-20 bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-none border border-border bg-card text-card-foreground p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none border border-primary/30 bg-primary/10 text-primary text-xs font-mono">
              <Zap className="size-3.5" /> Instant Feasibility Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-sans">
              Check Service Availability in Your Area
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Enter your Postal Code, Thana, or District name to verify delivery
              SLA, same-day express feasibility, and nearest sorting depot.
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Try: 1205, Uttara, 4100, Sylhet, Dhanmondi..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-none text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <Button
              type="submit"
              className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider px-6 rounded-none"
            >
              Validate Zone <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>

          {/* Quick preset chips with sharp corners */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-[11px] font-mono text-muted-foreground mb-8">
            <span>Popular queries:</span>
            {[
              "1205 (Dhanmondi)",
              "1230 (Uttara)",
              "4100 (Chattogram)",
              "3100 (Sylhet)",
              "9100 (Khulna)",
            ].map((tag) => {
              const code = tag.split(" ")[0];
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(code);
                    setResult(SAMPLE_ZONES[code] || null);
                  }}
                  className="px-2 py-0.5 rounded-none bg-muted/40 border border-border hover:border-border/80 text-foreground transition-colors"
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Live Result Display with sharp corners */}
          {hasSearched && result && (
            <div className="border border-border bg-muted/30 rounded-none p-6 font-mono text-xs shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    {result.status.replace("_", " ")} ACTIVE
                  </span>
                </div>
                <div className="text-muted-foreground text-[11px]">
                  ZONE:{" "}
                  <strong className="text-foreground">
                    {result.zone} ({result.district})
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                <div className="p-3 bg-card rounded-none border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    DELIVERY SLA COMMITMENT
                  </span>
                  <span className="text-foreground font-bold text-sm block mt-1">
                    {result.sla}
                  </span>
                </div>

                <div className="p-3 bg-card rounded-none border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    SAME-DAY EXPRESS ELIGIBILITY
                  </span>
                  <span
                    className={`font-bold text-sm block mt-1 ${result.sameDayAvailable ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
                  >
                    {result.sameDayAvailable
                      ? "ENABLED (4-6h Delivery)"
                      : "NEXT-DAY (Standard Transit)"}
                  </span>
                </div>

                <div className="p-3 bg-card rounded-none border border-border">
                  <span className="text-muted-foreground text-[10px] block">
                    NEAREST INBOUND HUB
                  </span>
                  <span className="text-primary font-bold text-xs block mt-1">
                    {result.hub}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
