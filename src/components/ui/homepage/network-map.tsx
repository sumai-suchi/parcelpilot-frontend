"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const NODES = [
  { id: "rajshahi", name: "Rajshahi Hub", code: "HUB-06", type: "Northern Sorting Terminal", x: 22, y: 26, status: "Active", throughput: "1,420 pk/hr" },
  { id: "dhaka", name: "Central Dhaka Hub", code: "HUB-01", type: "Central Linehaul Master", x: 48, y: 44, status: "High Velocity", throughput: "6,890 pk/hr" },
  { id: "narayanganj", name: "Narayanganj Hub", code: "HUB-02", type: "Industrial Distribution", x: 54, y: 52, status: "Active", throughput: "2,150 pk/hr" },
  { id: "comilla", name: "Comilla Waypoint", code: "HUB-03", type: "Inter-Hub Relay Station", x: 64, y: 60, status: "Optimal", throughput: "1,880 pk/hr" },
  { id: "chattogram", name: "Chattogram Hub", code: "HUB-04", type: "Maritime Terminal Hub", x: 80, y: 78, status: "High Velocity", throughput: "4,620 pk/hr" },
  { id: "khulna", name: "Khulna Hub", code: "HUB-05", type: "Southwestern Gateway", x: 34, y: 72, status: "Active", throughput: "1,290 pk/hr" },
];

export default function NetworkMap() {
  return (
    <section className="py-24 bg-background text-foreground border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>TOPOLOGICAL CORRIDOR</span>
            <span className="text-muted-foreground">/</span>
            <span>NATIONAL HUB GRID</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Your entire logistics network, connected.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            High-throughput trunk corridors and automated distribution waypoints. 
            Real-time inter-hub manifests move synchronized on dedicated highway networks.
          </p>
        </div>

        {/* Abstract Vector Logistics Grid using Shadcn Card Frame */}
        <Card className="border-border bg-card text-card-foreground shadow-xl">
          
          {/* Top Status Bar */}
          <CardHeader className="border-b border-border/70 pb-5">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs text-muted-foreground gap-4">
              <div className="flex items-center gap-4">
                <CardTitle className="text-sm font-bold text-foreground">GRID TOPOLOGY: 64 ACTIVE NODES</CardTitle>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● 100% ROUTE AVAILABILITY</span>
              </div>
              <div className="flex items-center gap-4">
                <span>LATENCY: 12ms</span>
                <span>GPS SYNC: SAT-LOCK 99.8%</span>
              </div>
            </div>
          </CardHeader>

          {/* Interactive Vector Canvas: Clean, No Square Grid */}
          <CardContent className="space-y-6 pt-6">
            <div className="relative w-full h-[400px] sm:h-[460px] bg-muted/40 rounded-xl border border-border/80 overflow-hidden">
              
              {/* SVG Connecting Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Line 1: Rajshahi to Dhaka */}
                <line x1="22%" y1="26%" x2="48%" y2="44%" stroke="currentColor" className="text-primary" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                {/* Line 2: Dhaka to Narayanganj */}
                <line x1="48%" y1="44%" x2="54%" y2="52%" stroke="currentColor" className="text-primary" strokeWidth="2" opacity="0.8" />
                {/* Line 3: Narayanganj to Comilla */}
                <line x1="54%" y1="52%" x2="64%" y2="60%" stroke="currentColor" className="text-primary" strokeWidth="2" opacity="0.8" />
                {/* Line 4: Comilla to Chattogram */}
                <line x1="64%" y1="60%" x2="80%" y2="78%" stroke="currentColor" className="text-primary" strokeWidth="2" opacity="0.8" />
                {/* Line 5: Dhaka to Khulna */}
                <line x1="48%" y1="44%" x2="34%" y2="72%" stroke="currentColor" className="text-primary" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

                {/* Animated Moving Packet Indicators */}
                <motion.circle
                  r="5"
                  fill="currentColor"
                  className="text-foreground"
                  initial={{ cx: "48%", cy: "44%" }}
                  animate={{ cx: ["48%", "64%", "80%"], cy: ["44%", "60%", "78%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  r="5"
                  fill="currentColor"
                  className="text-primary"
                  initial={{ cx: "22%", cy: "26%" }}
                  animate={{ cx: ["22%", "48%"], cy: ["26%", "44%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              {/* Render Nodes */}
              {NODES.map((node) => (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                >
                  {/* Node Ring */}
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-2 border-background" />
                  </div>

                  {/* Node Label Card */}
                  <div className="mt-2 -translate-x-1/4 rounded-md border border-border bg-card/95 px-2.5 py-1 text-left shadow-lg backdrop-blur-md whitespace-nowrap font-mono">
                    <div className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                      <span>{node.name}</span>
                      <span className="text-[9px] text-primary bg-primary/10 px-1 rounded font-semibold">{node.code}</span>
                    </div>
                    <div className="text-[9px] text-muted-foreground">{node.throughput}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Node Summary Grid using Shadcn Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
              {NODES.map((n) => (
                <div key={n.id} className="p-3 rounded-lg border border-border bg-muted/30">
                  <div className="text-primary font-bold">{n.code}</div>
                  <div className="text-foreground font-sans font-bold text-xs truncate mt-0.5">{n.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{n.status}</div>
                </div>
              ))}
            </div>
          </CardContent>

        </Card>

      </div>
    </section>
  );
}
