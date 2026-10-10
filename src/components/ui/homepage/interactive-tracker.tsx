"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TelemetryEvent {
  status: string;
  time: string;
  location: string;
  checkpoint: string;
  verifiedBy: string;
  completed: boolean;
  current?: boolean;
}

const SAMPLE_DATA: Record<
  string,
  {
    id: string;
    origin: string;
    destination: string;
    service: string;
    weight: string;
    cod: string;
    eta: string;
    carrier: string;
    events: TelemetryEvent[];
  }
> = {
  "PP-48291": {
    id: "PP-48291",
    origin: "Dhaka (Tejgaon Hub)",
    destination: "Chattogram (Agrabad Hub)",
    service: "Intermodal Priority Express",
    weight: "1.85 kg",
    cod: "৳1,650",
    eta: "Today, 06:30 PM",
    carrier: "Express Linehaul #TRK-8821",
    events: [
      {
        status: "Shipment Created",
        time: "07:15 AM",
        location: "Dhanmondi Merchant Station",
        checkpoint: "Manifest Generated",
        verifiedBy: "System API",
        completed: true,
      },
      {
        status: "Pickup Requested",
        time: "07:45 AM",
        location: "Dhanmondi Pickup Zone",
        checkpoint: "Rider Dispatched",
        verifiedBy: "Dispatch Engine",
        completed: true,
      },
      {
        status: "Courier Assigned",
        time: "08:00 AM",
        location: "Sector 4 Cluster",
        checkpoint: "Courier Accepted",
        verifiedBy: "Rider #1142",
        completed: true,
      },
      {
        status: "Picked Up",
        time: "08:30 AM",
        location: "Merchant Dock",
        checkpoint: "Weight Verified",
        verifiedBy: "Rider #1142",
        completed: true,
      },
      {
        status: "Origin Hub",
        time: "11:15 AM",
        location: "Tejgaon Hub [HUB-01]",
        checkpoint: "Automated Belt Sorting",
        verifiedBy: "Hub Manager M. Kibria",
        completed: true,
      },
      {
        status: "In Transit",
        time: "02:40 PM",
        location: "Highway N1 Corridor",
        checkpoint: "Linehaul Transport",
        verifiedBy: "Fleet Ops Telematics",
        completed: true,
        current: true,
      },
      {
        status: "Destination Hub",
        time: "Est. 05:45 PM",
        location: "Agrabad Hub [HUB-04]",
        checkpoint: "Inbound Scan Scheduled",
        verifiedBy: "Pending",
        completed: false,
      },
      {
        status: "Out for Delivery",
        time: "Est. Tomorrow Morning",
        location: "Chattogram Metropolitan",
        checkpoint: "Local Courier Route",
        verifiedBy: "Pending",
        completed: false,
      },
      {
        status: "Delivered",
        time: "Est. Tomorrow 11:00 AM",
        location: "Consignee Address",
        checkpoint: "OTP Verification Required",
        verifiedBy: "Pending",
        completed: false,
      },
    ],
  },
  "PP-91044": {
    id: "PP-91044",
    origin: "Sylhet (Osmani Hub)",
    destination: "Dhaka (Uttara Hub)",
    service: "Standard Linehaul",
    weight: "3.40 kg",
    cod: "৳3,200",
    eta: "Tomorrow, 10:00 AM",
    carrier: "Regional Transit #VAN-402",
    events: [
      {
        status: "Shipment Created",
        time: "Yesterday 04:00 PM",
        location: "Sylhet Central",
        checkpoint: "Created via Web",
        verifiedBy: "Portal",
        completed: true,
      },
      {
        status: "Picked Up",
        time: "Yesterday 06:30 PM",
        location: "Zindabazar Point",
        checkpoint: "Courier Collected",
        verifiedBy: "Rider #082",
        completed: true,
      },
      {
        status: "Origin Hub",
        time: "Yesterday 09:15 PM",
        location: "Sylhet Hub [HUB-08]",
        checkpoint: "Linehaul Manifest",
        verifiedBy: "Hub Ops",
        completed: true,
      },
      {
        status: "In Transit",
        time: "Today 04:30 AM",
        location: "Dhaka-Sylhet Highway",
        checkpoint: "Linehaul Truck En Route",
        verifiedBy: "GPS Telemetry",
        completed: true,
        current: true,
      },
      {
        status: "Destination Hub",
        time: "Pending",
        location: "Uttara Hub [HUB-02]",
        checkpoint: "Awaiting Arrival",
        verifiedBy: "Pending",
        completed: false,
      },
      {
        status: "Delivered",
        time: "Pending",
        location: "Consignee Doorstep",
        checkpoint: "Delivery Scheduled",
        verifiedBy: "Pending",
        completed: false,
      },
    ],
  },
};

export default function InteractiveTracker() {
  const [searchQuery, setSearchQuery] = useState("PP-48291");
  const [activeShipment, setActiveShipment] = useState(SAMPLE_DATA["PP-48291"]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.trim().toUpperCase();
    if (SAMPLE_DATA[clean]) {
      setActiveShipment(SAMPLE_DATA[clean]);
      setErrorMsg(null);
    } else {
      setErrorMsg(
        `No active telemetry record for ID "${clean}". Try sample ID: PP-48291 or PP-91044.`,
      );
    }
  };

  const handleSelectSample = (id: string) => {
    setSearchQuery(id);
    setActiveShipment(SAMPLE_DATA[id]);
    setErrorMsg(null);
  };

  return (
    <section
      id="tracking-cockpit"
      className="py-24 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground border-y border-border relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            <span>REAL-TIME TELEMETRY</span>
            <span className="text-muted-foreground">/</span>
            <span>WAYPOINT INSPECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Know where the shipment is. <br />
            <span className="text-muted-foreground">
              Know what happens next.
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Enter a consignment identifier to pull live checkpoint timestamps,
            chain of custody logs, carrier telemetry, and estimated arrival
            windows.
          </p>
        </div>

        {/* Input Bar */}
        <div className="max-w-2xl mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter tracking ID (e.g. PP-48291)"
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 pl-11 font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider"
            >
              Track
            </Button>
          </form>

          {/* Sample ID suggestions */}
          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-muted-foreground">
            <span>PRELOAD SAMPLES:</span>
            {Object.keys(SAMPLE_DATA).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectSample(id)}
                className={`underline hover:text-primary transition-colors ${
                  activeShipment.id === id
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-mono flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Live Shipment Manifest Card with Shadcn Card Frame */}
        <Card className="border-border bg-card text-card-foreground shadow-lg">
          {/* Metadata Top Bar */}
          <CardHeader className="border-b border-border/70 pb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
              <div>
                <div className="text-muted-foreground uppercase tracking-wider">
                  CONSIGNMENT ID
                </div>
                <CardTitle className="text-xl font-bold font-mono tracking-tight text-foreground mt-1">
                  {activeShipment.id}
                </CardTitle>
                <div className="text-[11px] text-primary font-semibold">
                  {activeShipment.service}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-wider">
                  CORRIDOR ROUTE
                </div>
                <div className="text-xs font-bold text-foreground mt-1">
                  {activeShipment.origin}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  → {activeShipment.destination}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-wider">
                  ESTIMATED ARRIVAL
                </div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {activeShipment.eta}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {activeShipment.carrier}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-wider">
                  PACKAGE SPECS
                </div>
                <div className="text-sm font-bold text-foreground mt-1">
                  {activeShipment.weight}
                </div>
                <div className="text-[11px] text-primary font-semibold">
                  COD: {activeShipment.cod} (VERIFIED)
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Sequential Timeline Component */}
          <CardContent className="space-y-4 pt-6">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4 flex items-center justify-between">
              <span>CHAIN OF CUSTODY TIMELINE</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                ● TELEMETRY STREAM SYNCHRONIZED
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {activeShipment.events.map((evt) => (
                <div
                  key={evt.status}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-3.5 rounded-lg border transition-colors ${
                    evt.current
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : evt.completed
                        ? "border-border/60 bg-muted/40 text-foreground"
                        : "border-transparent text-muted-foreground"
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                        evt.current
                          ? "bg-primary text-primary-foreground animate-pulse"
                          : evt.completed
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "border border-border text-muted-foreground"
                      }`}
                    >
                      {evt.completed && !evt.current ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : evt.current ? (
                        "●"
                      ) : (
                        "○"
                      )}
                    </div>
                    <span
                      className={`font-bold ${evt.current ? "text-primary" : "text-foreground"}`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  {/* Location & Node */}
                  <div className="md:col-span-4 text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <span>{evt.location}</span>
                  </div>

                  {/* Checkpoint Detail */}
                  <div className="md:col-span-3 text-muted-foreground truncate">
                    {evt.checkpoint}
                  </div>

                  {/* Timestamp & Signoff */}
                  <div className="md:col-span-2 text-right">
                    <div
                      className={
                        evt.current
                          ? "text-primary font-bold"
                          : "text-foreground font-semibold"
                      }
                    >
                      {evt.time}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {evt.verifiedBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Security & Verification Stamp */}
          <CardFooter className="border-t border-border/70 pt-4 flex flex-wrap items-center justify-between text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>DIGITAL WAYBILL HASH: SHA256:7f8490a2be994</span>
            </div>
            <div>STATUS: TAMPER-SEAL INTACT · CARGO TEMPERATURE 22°C</div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
