"use client";

import { AlertCircle, Loader2, Radar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTrackShipment } from "@/hooks/shipment.hook";
import { TrackingDetailsCard } from "./tracking-details-card";
import { TrackingSearchBar } from "./tracking-search-bar";
import { TrackingTimeline } from "./tracking-timeline";

export function CustomerTrackingView() {
  const searchParams = useSearchParams();
  const initialTracking = searchParams.get("tracking") || "";

  const [inputVal, setInputVal] = useState(initialTracking);
  const [activeQuery, setActiveQuery] = useState(initialTracking);

  useEffect(() => {
    if (initialTracking) {
      setInputVal(initialTracking);
      setActiveQuery(initialTracking);
    }
  }, [initialTracking]);

  const { data: trackRes, isLoading, error } = useTrackShipment(activeQuery);
  const trackData = trackRes?.data;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Telemetry Header */}
      <div className="space-y-2 border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <Radar className="h-3.5 w-3.5" />
          <span>REAL-TIME TELEMETRY</span>
          <span className="text-muted-foreground">/</span>
          <span>WAYPOINT RADAR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
          Live Consignment Radar.
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Trace physical movements across origin collection hubs, inter-hub
          linehaul corridors, and final mile doorstep delivery in real time.
        </p>
      </div>

      <TrackingSearchBar
        value={inputVal}
        onChange={setInputVal}
        onSearch={() => setActiveQuery(inputVal.trim())}
        isLoading={isLoading}
      />

      {isLoading && (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3 font-mono">
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-primary" />
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              Connecting to telematics stream & synchronizing checkpoints...
            </span>
          </CardContent>
        </Card>
      )}

      {error && !isLoading && (
        <div className="rounded-none border border-destructive/30 bg-destructive/10 p-4 text-xs font-mono text-destructive flex items-center gap-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            Consignment tracking code "{activeQuery}" was not found in active
            telematics index. Please verify your waybill number.
          </span>
        </div>
      )}

      {trackData && !isLoading && (
        <div className="space-y-6">
          <TrackingDetailsCard data={trackData} />
          <TrackingTimeline
            timeline={trackData.timeline}
            deliveryAttempts={trackData.deliveryAttempts}
          />
        </div>
      )}
    </div>
  );
}
