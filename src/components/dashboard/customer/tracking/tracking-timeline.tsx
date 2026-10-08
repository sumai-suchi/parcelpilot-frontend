"use client";

import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TimelineEvent {
  id: string;
  status: string;
  location?: string | null;
  note?: string | null;
  createdAt: string;
}

interface DeliveryAttempt {
  attemptNumber: number;
  status: string;
  failureReason?: string | null;
  notes?: string | null;
  attemptedAt: string;
}

interface TrackingTimelineProps {
  timeline: TimelineEvent[];
  deliveryAttempts?: DeliveryAttempt[];
}

export function TrackingTimeline({
  timeline = [],
  deliveryAttempts = [],
}: TrackingTimelineProps) {
  return (
    <Card className="rounded-none border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest font-semibold mb-1">
              <Activity className="h-3 w-3" />
              <span>CHAIN OF CUSTODY LEDGER</span>
            </div>
            <CardTitle className="text-lg font-heading font-black tracking-tight text-foreground uppercase">
              Sequential Waypoint Events
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>TELEMETRY SYNCHRONIZED</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {timeline.length === 0 ? (
          <div className="py-8 text-center font-mono text-xs text-muted-foreground uppercase tracking-wider">
            No chain of custody events logged for this consignment yet.
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {timeline.map((event, idx) => {
              const isLatest = idx === timeline.length - 1;
              const isDelivered = event.status === "DELIVERED";
              const isFailed = event.status === "DELIVERY_FAILED";

              return (
                <div
                  key={event.id || idx}
                  className={`p-3.5 rounded-none border transition-colors ${
                    isLatest
                      ? "border-primary/50 bg-primary/5 text-foreground"
                      : isDelivered
                        ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                        : "border-border/60 bg-muted/20 text-foreground"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-border/40 pb-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-5 w-5 rounded-none flex items-center justify-center shrink-0 text-[10px] border ${
                          isDelivered
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : isFailed
                              ? "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
                              : isLatest
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border text-muted-foreground bg-muted"
                        }`}
                      >
                        {isDelivered ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : isFailed ? (
                          <AlertCircle className="h-3.5 w-3.5" />
                        ) : isLatest ? (
                          <span className="animate-pulse font-bold">●</span>
                        ) : (
                          "✓"
                        )}
                      </div>

                      <span className="font-bold uppercase tracking-wider text-foreground text-xs">
                        {event.status.replace(/_/g, " ")}
                      </span>

                      {isLatest && (
                        <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.2 uppercase font-semibold">
                          CURRENT STAGE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(event.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] mb-1">
                      <MapPin className="h-3 w-3 text-primary shrink-0" />
                      <span>
                        Checkpoint Waypoint:{" "}
                        <strong className="text-foreground">
                          {event.location}
                        </strong>
                      </span>
                    </div>
                  )}

                  {event.note && (
                    <p className="mt-1 text-[11px] text-muted-foreground bg-background border border-border/60 p-2 rounded-none leading-relaxed">
                      {event.note}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Failed Attempts Section if any */}
        {deliveryAttempts && deliveryAttempts.length > 0 && (
          <div className="mt-6 border-t border-border/60 pt-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-destructive flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Consignee Delivery Exception History</span>
            </h4>
            <div className="space-y-2">
              {deliveryAttempts.map((att, i) => (
                <div
                  key={i}
                  className="rounded-none border border-destructive/30 bg-destructive/10 p-3 text-xs font-mono flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-destructive uppercase">
                      Attempt #{att.attemptNumber} - {att.status}
                    </span>
                    {att.failureReason && (
                      <p className="text-destructive/90 text-[11px]">
                        Exception Reason: {att.failureReason}
                      </p>
                    )}
                    {att.notes && (
                      <p className="text-muted-foreground text-[11px]">
                        {att.notes}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">
                    {new Date(att.attemptedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
