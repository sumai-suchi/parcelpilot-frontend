"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bike,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  MapPin,
  Package,
  PackageCheck,
  Radio,
  RefreshCw,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Courier, Hub, OperationsShipment } from "@/types/operations.interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard, MetricGrid } from "../shared/metric-card";
import { cn } from "@/lib/utils";

interface OperationsAnalyticsProps {
  shipments: OperationsShipment[];
  hubs: Hub[];
  couriers: Courier[];
  isLoading?: boolean;
}

export function OperationsAnalytics({
  shipments,
  hubs,
  couriers,
  isLoading,
}: OperationsAnalyticsProps) {
  const [chartMetric, setChartMetric] = useState<"volume" | "freight">("volume");

  // Real-time operations calculations
  const analytics = useMemo(() => {
    const total = shipments.length;

    // Stage counts
    const pendingCount = shipments.filter(
      (s) => s.status === "PENDING_APPROVAL" || s.status === "CREATED"
    ).length;

    const assignedCount = shipments.filter(
      (s) => s.status === "COURIER_ASSIGNED" || s.status === "PICKUP_ASSIGNED"
    ).length;

    const atHubCount = shipments.filter(
      (s) =>
        s.status === "AT_ORIGIN_HUB" ||
        s.status === "RECEIVED_AT_HUB" ||
        s.status === "AT_DESTINATION_HUB"
    ).length;

    const inTransitCount = shipments.filter((s) => s.status === "IN_TRANSIT").length;

    const outForDeliveryCount = shipments.filter(
      (s) => s.status === "OUT_FOR_DELIVERY"
    ).length;

    const deliveredCount = shipments.filter((s) => s.status === "DELIVERED").length;

    const cancelledCount = shipments.filter(
      (s) =>
        s.status === "CANCELLED" ||
        s.status === "REJECTED" ||
        s.status === "RETURNED" ||
        s.status === "DELIVERY_FAILED"
    ).length;

    // Active field execution (dispatched + out for delivery)
    const activeDispatchCount = assignedCount + outForDeliveryCount;

    // Hub transfer linehaul count
    const linehaulTransferCount = atHubCount + inTransitCount;

    // Fulfillment Rate
    const completedOrFailed = deliveredCount + cancelledCount;
    const fulfillmentRate =
      completedOrFailed > 0
        ? ((deliveredCount / completedOrFailed) * 100).toFixed(1)
        : total > 0
          ? ((deliveredCount / total) * 100).toFixed(1)
          : "100.0";

    // Couriers On-Duty
    const totalCouriers = couriers.length;
    const availableCouriers = couriers.filter(
      (c) => (c.availabilityStatus || "").toUpperCase() === "AVAILABLE"
    ).length;
    const busyCouriers = couriers.filter(
      (c) => (c.availabilityStatus || "").toUpperCase() === "BUSY"
    ).length;

    // Service Mode Tiers
    const expressCount = shipments.filter(
      (s) => (s.deliveryType || "").toUpperCase() === "EXPRESS"
    ).length;
    const sameDayCount = shipments.filter(
      (s) =>
        (s.deliveryType || "").toUpperCase().includes("SAME") ||
        (s.deliveryType || "").toUpperCase().includes("DAY")
    ).length;
    const standardCount = total - (expressCount + sameDayCount);

    // 7-Day Timeline Trend data
    const dayMap = new Map<
      string,
      { date: string; dispatched: number; delivered: number; freight: number }
    >();
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dayMap.set(dateKey, { date: dateKey, dispatched: 0, delivered: 0, freight: 0 });
    }

    shipments.forEach((s) => {
      const d = new Date(s.createdAt || Date.now());
      const dateKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (dayMap.has(dateKey)) {
        const item = dayMap.get(dateKey)!;
        item.dispatched += 1;
        item.freight += Number(s.deliveryCharge || 0);
        if (s.status === "DELIVERED") {
          item.delivered += 1;
        }
      }
    });

    // Provide baseline progression curve if dataset is pristine
    let timeSeries = Array.from(dayMap.values());
    const totalTrendDispatched = timeSeries.reduce((acc, curr) => acc + curr.dispatched, 0);
    if (totalTrendDispatched === 0 && shipments.length === 0) {
      timeSeries = [
        { date: "Oct 04", dispatched: 12, delivered: 9, freight: 1440 },
        { date: "Oct 05", dispatched: 19, delivered: 15, freight: 2280 },
        { date: "Oct 06", dispatched: 27, delivered: 22, freight: 3240 },
        { date: "Oct 07", dispatched: 25, delivered: 21, freight: 3000 },
        { date: "Oct 08", dispatched: 34, delivered: 29, freight: 4080 },
        { date: "Oct 09", dispatched: 42, delivered: 36, freight: 5040 },
        { date: "Oct 10", dispatched: 48, delivered: 41, freight: 5760 },
      ];
    }

    return {
      total,
      pendingCount,
      assignedCount,
      atHubCount,
      inTransitCount,
      outForDeliveryCount,
      deliveredCount,
      cancelledCount,
      activeDispatchCount,
      linehaulTransferCount,
      fulfillmentRate,
      totalCouriers,
      availableCouriers,
      busyCouriers,
      expressCount,
      sameDayCount,
      standardCount: standardCount > 0 ? standardCount : 0,
      timeSeries,
    };
  }, [shipments, couriers]);

  const stages = [
    {
      title: "1. Ingestion Review",
      count: analytics.pendingCount,
      status: "PENDING_APPROVAL",
      color: "bg-amber-500",
      textColor: "text-amber-600",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      desc: "Awaiting dispatch review",
    },
    {
      title: "2. Courier Assigned",
      count: analytics.assignedCount,
      status: "COURIER_ASSIGNED",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      desc: "Rider notified for pickup",
    },
    {
      title: "3. Hub Cross-Dock",
      count: analytics.atHubCount,
      status: "AT_ORIGIN_HUB",
      color: "bg-purple-500",
      textColor: "text-purple-600",
      border: "border-purple-500/30",
      bg: "bg-purple-500/10",
      desc: "Terminal intake & sorting",
    },
    {
      title: "4. Linehaul Transit",
      count: analytics.inTransitCount,
      status: "IN_TRANSIT",
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10",
      desc: "Inter-city linehaul transfer",
    },
    {
      title: "5. Last-Mile Out",
      count: analytics.outForDeliveryCount,
      status: "OUT_FOR_DELIVERY",
      color: "bg-cyan-500",
      textColor: "text-cyan-600",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      desc: "Rider executing dropoff",
    },
    {
      title: "6. Fulfilled",
      count: analytics.deliveredCount,
      status: "DELIVERED",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      desc: "Recipient handoff confirmed",
    },
  ];

  const gateways = [
    {
      title: "Pending Approval",
      href: "/operation_manager/pending-approval",
      desc: "Inspect incoming booking requests, verify address data, calculate tariffs, and assign routing nodes.",
      icon: Clock,
      count: `${analytics.pendingCount} Consignments`,
      badge: "Review Queue",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    },
    {
      title: "Active Dispatch",
      href: "/operation_manager/active-dispatch",
      desc: "Supervise active courier riders executing customer doorstep pickups and dropoffs.",
      icon: Truck,
      count: `${analytics.activeDispatchCount} Dispatches`,
      badge: "Field Execution",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    },
    {
      title: "All Shipments Registry",
      href: "/operation_manager/all-shipments",
      desc: "Full searchable waybill ledger across all operational stages with assignment tools.",
      icon: Package,
      count: `${analytics.total} Total Waybills`,
      badge: "Master Ledger",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
    },
    {
      title: "Hub Transfer Monitoring",
      href: "/operation_manager/hub-transfers",
      desc: "Track linehaul cross-dock movements between origin terminals and destination regional nodes.",
      icon: Building2,
      count: `${analytics.linehaulTransferCount} In Transfers`,
      badge: "Cross-Dock Flow",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="size-5 text-primary" />
            <h3 className="text-base font-heading font-black tracking-tight text-foreground uppercase">
              Operations Dispatch SLA & Network Velocity Telemetry
            </h3>
          </div>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">
            Real-time courier fleet dispatch capacity, linehaul cross-dock flow, and consignment lifecycle velocity.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Chart Metric Toggle */}
          <div className="flex items-center border border-border bg-muted/40 p-0.5 rounded-none font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setChartMetric("volume")}
              className={cn(
                "px-2.5 py-1 transition-colors uppercase font-bold cursor-pointer",
                chartMetric === "volume"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dispatch Flow
            </button>
            <button
              type="button"
              onClick={() => setChartMetric("freight")}
              className={cn(
                "px-2.5 py-1 transition-colors uppercase font-bold cursor-pointer",
                chartMetric === "freight"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Freight Volume (৳)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Operations Performance KPIs */}
      <MetricGrid>
        <MetricCard
          label="Pending Queue"
          value={analytics.pendingCount}
          desc="Consignments awaiting review"
          icon={Clock}
          variant="amber"
          highlight={analytics.pendingCount > 0}
          isLoading={isLoading}
        />
        <MetricCard
          label="Active Dispatches"
          value={analytics.activeDispatchCount}
          desc={`${analytics.assignedCount} pickup • ${analytics.outForDeliveryCount} doorstep`}
          icon={Truck}
          variant="primary"
          isLoading={isLoading}
        />
        <MetricCard
          label="Linehaul In Transit"
          value={analytics.linehaulTransferCount}
          desc={`${analytics.inTransitCount} linehauls • ${analytics.atHubCount} cross-dock bays`}
          icon={Building2}
          variant="purple"
          isLoading={isLoading}
        />
        <MetricCard
          label="Fulfillment Success Rate"
          value={`${analytics.fulfillmentRate}%`}
          desc={`${analytics.deliveredCount} confirmed handoffs`}
          icon={CheckCircle2}
          variant="emerald"
          isLoading={isLoading}
        />
      </MetricGrid>

      {/* 3. 7-Day Operations Dispatch & Throughput Flow Chart */}
      <Card className="rounded-none border-border bg-card shadow-xs">
        <CardHeader className="p-5 pb-3 border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                {chartMetric === "volume"
                  ? "7-Day Operations Dispatch vs Fulfillment Velocity"
                  : "7-Day Handled Consignment Freight Value (BDT)"}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {chartMetric === "volume"
                  ? "Daily parcels reviewed and dispatched into the network versus successful customer doorstep completions."
                  : "Daily freight volume generated by consignments moving through active dispatch routes."}
              </CardDescription>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px]">
              {chartMetric === "volume" ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 bg-primary rounded-none inline-block" />
                    <span className="text-muted-foreground">Dispatched</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 bg-emerald-500 rounded-none inline-block" />
                    <span className="text-muted-foreground">Fulfilled</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 bg-primary rounded-none inline-block" />
                  <span className="text-muted-foreground">Freight Volume (BDT)</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.timeSeries}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="opPrimaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="opEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "monospace" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "monospace" }}
                  tickFormatter={(val) => (chartMetric === "freight" ? `৳${val}` : `${val}`)}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-none border border-border bg-card p-3 shadow-lg font-mono text-xs space-y-1.5">
                          <span className="font-bold text-foreground block border-b pb-1">
                            {label}
                          </span>
                          {chartMetric === "volume" ? (
                            <>
                              <div className="flex items-center justify-between gap-4 text-primary">
                                <span>Dispatched:</span>
                                <span className="font-bold">{payload[0]?.value} consignments</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-emerald-600">
                                <span>Fulfilled:</span>
                                <span className="font-bold">{payload[1]?.value} deliveries</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-between gap-4 text-primary">
                              <span>Freight Value:</span>
                              <span className="font-bold">৳{payload[0]?.value?.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {chartMetric === "volume" ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="dispatched"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#opPrimaryGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="delivered"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#opEmeraldGrad)"
                    />
                  </>
                ) : (
                  <Area
                    type="monotone"
                    dataKey="freight"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#opPrimaryGrad)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 4. Operations Command Gateways (Dedicated Sub-Pages) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-heading font-black tracking-tight uppercase text-foreground">
              Operations Command Gateways
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Dedicated management portals for approval queues, courier dispatches, and inter-hub transfers.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] uppercase">
            4 Operational Sub-Portals
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gateways.map((gw) => {
            const GwIcon = gw.icon;
            return (
              <Card
                key={gw.title}
                className="rounded-none border-border bg-card shadow-xs hover:border-primary/50 transition-all group flex flex-col justify-between"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2 rounded-none bg-primary/10 border border-primary/20 text-primary">
                      <GwIcon className="size-4" />
                    </div>
                    <Badge variant="outline" className={cn("text-[9px] font-mono uppercase", gw.badgeColor)}>
                      {gw.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-bold text-foreground mt-2.5 group-hover:text-primary transition-colors">
                    {gw.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {gw.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                  <div className="pt-2.5 border-t border-border/60 flex items-center justify-between font-mono">
                    <span className="text-xs font-bold text-foreground">
                      {gw.count}
                    </span>
                    <Link
                      href={gw.href}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Open</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 5. Operations Stage Lifecycle Funnel */}
      <Card className="rounded-none border-border bg-card shadow-xs">
        <CardHeader className="p-5 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                <Layers className="size-4 text-primary" />
                Consignment Operational Lifecycle Funnel
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Distribution of shipments across the 6 sequential stages from intake to doorstep fulfillment.
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {analytics.total} Active Shipments
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stages.map((st) => {
              const pct = analytics.total > 0 ? ((st.count / analytics.total) * 100).toFixed(0) : "0";
              return (
                <div
                  key={st.title}
                  className={cn("p-3 border font-mono space-y-1.5 transition-all", st.border, st.bg)}
                >
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block truncate">
                    {st.title}
                  </span>
                  <div className="text-xl font-black text-foreground">
                    {st.count}
                  </div>
                  <div className="text-[10px] text-muted-foreground flex justify-between">
                    <span>{pct}% queue</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
