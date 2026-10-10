"use client";

import { Route, Clock, ArrowRight } from "lucide-react";

export default function CoverageLinehaulMatrix() {
  const corridors = [
    {
      origin: "Dhaka Central",
      destination: "Chattogram Port",
      distance: "248 km",
      highway: "N1 Expressway",
      transitTime: "12 - 14 Hours",
      departure: "22:00 Nightly",
      sla: "Next-Day Morning",
    },
    {
      origin: "Dhaka Central",
      destination: "Sylhet Highlands",
      distance: "240 km",
      highway: "N2 Trunk Route",
      transitTime: "14 - 16 Hours",
      departure: "21:30 Nightly",
      sla: "Next-Day Midday",
    },
    {
      origin: "Dhaka Central",
      destination: "Rajshahi Silk City",
      distance: "256 km",
      highway: "N5 / Bangabandhu Bridge",
      transitTime: "16 - 18 Hours",
      departure: "21:00 Nightly",
      sla: "Next-Day Afternoon",
    },
    {
      origin: "Dhaka Central",
      destination: "Khulna Rupsha",
      distance: "210 km",
      highway: "N8 / Padma Bridge Arterial",
      transitTime: "10 - 12 Hours",
      departure: "22:30 Nightly",
      sla: "Next-Day Morning",
    },
    {
      origin: "Dhaka Central",
      destination: "Barishal Coastal",
      distance: "190 km",
      highway: "N8 / Padma Express",
      transitTime: "11 - 13 Hours",
      departure: "22:00 Nightly",
      sla: "Next-Day Midday",
    },
    {
      origin: "Dhaka Central",
      destination: "Rangpur Frontier",
      distance: "310 km",
      highway: "N502 North Corridor",
      transitTime: "18 - 20 Hours",
      departure: "20:30 Nightly",
      sla: "Day 2 Morning",
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Route className="size-3.5" />
            <span>Topological Corridor Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Inter-District Linehaul Transit SLAs
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            All regional linehaul trucks depart on fixed cryptographic dispatch
            manifests. Inspect our arterial route transit durations, daily
            departures, and guaranteed arrival windows.
          </p>
        </div>

        {/* Technical Corridor Table (Responsive with sharp corners) */}
        <div className="border border-border rounded-none bg-card text-card-foreground overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50 font-mono text-xs">
                  <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[200px]">
                    LINEHAUL ROUTE
                  </th>
                  <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[140px]">
                    DISTANCE & HIGHWAY
                  </th>
                  <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[140px]">
                    LINEHAUL TRANSIT
                  </th>
                  <th className="py-4 px-5 text-muted-foreground font-semibold uppercase tracking-wider min-w-[130px]">
                    DISPATCH TIME
                  </th>
                  <th className="py-4 px-5 text-primary font-bold uppercase tracking-wider min-w-[150px]">
                    CUSTOMER SLA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-xs">
                {corridors.map((c, idx) => (
                  <tr
                    key={`${c.origin}-${c.destination}`}
                    className={
                      idx % 2 === 0
                        ? "bg-muted/10 hover:bg-muted/30"
                        : "bg-transparent hover:bg-muted/30"
                    }
                  >
                    {/* Origin & Destination */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-foreground font-sans flex items-center gap-2">
                        <span>{c.origin}</span>
                        <ArrowRight className="size-3 text-primary shrink-0" />
                        <span>{c.destination}</span>
                      </div>
                    </td>

                    {/* Distance & Highway */}
                    <td className="py-4 px-5 text-foreground">
                      <div>{c.distance}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {c.highway}
                      </div>
                    </td>

                    {/* Transit Duration */}
                    <td className="py-4 px-5 text-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3 text-amber-600 dark:text-amber-400" />
                        <span>{c.transitTime}</span>
                      </div>
                    </td>

                    {/* Departure Window */}
                    <td className="py-4 px-5 text-muted-foreground">
                      <span>{c.departure}</span>
                    </td>

                    {/* Delivery SLA */}
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-none bg-primary/10 text-primary border border-primary/25 font-bold">
                        {c.sla}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-muted/30 border-t border-border text-[11px] font-mono text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              * GPS telemetry active across 100% of linehaul vehicles with
              active engine sensor feeds.
            </span>
            <span className="text-foreground font-semibold">
              AVERAGE TRANSIT ADHERENCE: 99.1%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
