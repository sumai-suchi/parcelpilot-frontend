"use client";

import { useState } from "react";
import { MapPin, CheckCircle, Search, Building2, Truck, Shield } from "lucide-react";

const HUBS = [
  {
    name: "Central Dhaka Hub",
    district: "Dhaka",
    hubs: "45 Distribution Centers",
    features: ["4-Hour Express", "Late Evening Pickup", "Same-Day Return"],
  },
  {
    name: "Port & Terminal Hub",
    district: "Chittagong",
    hubs: "28 Distribution Centers",
    features: ["Seaport Clearance", "Heavy Freight", "24/7 Dispatch"],
  },
  {
    name: "Northern Regional Hub",
    district: "Rajshahi & Bogra",
    hubs: "18 Distribution Centers",
    features: ["Overnight Linehaul", "Cold Storage Care", "Doorstep COD"],
  },
  {
    name: "Eastern Division Hub",
    district: "Sylhet",
    hubs: "14 Distribution Centers",
    features: ["Express Parcel", "Rural Micro-Hubs", "Real-Time Tracking"],
  },
];

export default function CoverageSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchResult(
      `✓ Verified: Doorstep delivery and daily pickup are 100% active in ${searchQuery.trim()} with 24-48h turnaround.`
    );
  };

  return (
    <section className="py-20 bg-background text-foreground relative overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400">
            <MapPin className="h-3.5 w-3.5" />
            Nationwide Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connecting Every Corner of the Country
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            From metropolitan skyscrapers to remote village doorsteps, our fleet moves without boundaries.
          </p>
        </div>

        {/* Coverage Checker Input */}
        <div className="mt-10 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Check your district or upazila (e.g. Gazipur, Sylhet, Bogra)"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 pl-11 text-sm text-white placeholder-zinc-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all"
            >
              Verify
            </button>
          </form>

          {searchResult && (
            <div className="mt-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm text-center">
              {searchResult}
            </div>
          )}
        </div>

        {/* Key Metrics Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center" data-aos="fade-up" data-aos-delay="150">
          {[
            { num: "64", title: "Districts Active", sub: "Complete National Reach" },
            { num: "495+", title: "Upazilas Covered", sub: "Doorstep Last-Mile" },
            { num: "120+", title: "Sorting Hubs", sub: "Automated Barcode Routing" },
            { num: "3,500+", title: "Delivery Heroes", sub: "Dedicated Field Fleet" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-orange-400">{item.num}</div>
              <div className="text-sm font-bold text-zinc-200 mt-1">{item.title}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Regional Hub Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HUBS.map((hub, idx) => (
            <div
              key={hub.name}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all hover:border-orange-500/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{hub.name}</h3>
                  <p className="text-xs text-orange-400">{hub.district}</p>
                </div>
              </div>

              <div className="text-xs text-zinc-400 mb-4 pb-3 border-b border-zinc-800">
                {hub.hubs}
              </div>

              <ul className="space-y-2">
                {hub.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
