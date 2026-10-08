"use client";

import { ArrowRightLeft, Boxes, CheckCircle2, Truck } from "lucide-react";
import type { HubTransferItem } from "@/types/hub.interface";
import type { OperationsShipment } from "@/types/operations.interface";
import { MetricCard, MetricGrid } from "../shared/metric-card";

interface HubStatsCardsProps {
  parcelsAtHub: OperationsShipment[];
  transfers: HubTransferItem[];
}

export function HubStatsCards({ parcelsAtHub, transfers }: HubStatsCardsProps) {
  const atHubCount = parcelsAtHub.length;
  const inTransitTransfers = transfers.filter(
    (t) => t.status === "IN_TRANSIT" || t.status === "DISPATCHED",
  ).length;
  const receivedTransfers = transfers.filter(
    (t) => t.status === "RECEIVED",
  ).length;

  return (
    <MetricGrid>
      <MetricCard
        label="Docked In Sorting Bay"
        value={atHubCount}
        desc="In storage & sorting bay"
        icon={Boxes}
        variant="primary"
        highlight={atHubCount > 0}
      />
      <MetricCard
        label="Linehauls In Transit"
        value={inTransitTransfers}
        desc="Moving between hub terminals"
        icon={Truck}
        variant="purple"
      />
      <MetricCard
        label="Received Linehauls"
        value={receivedTransfers}
        desc="Scanned & verified intake"
        icon={CheckCircle2}
        variant="emerald"
      />
      <MetricCard
        label="Total Hub Transfers"
        value={transfers.length}
        desc="Cumulative route transfers"
        icon={ArrowRightLeft}
        variant="amber"
      />
    </MetricGrid>
  );
}
