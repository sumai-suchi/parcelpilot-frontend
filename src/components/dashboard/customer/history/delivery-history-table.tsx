"use client";

import { ArrowRight, CheckCircle2, Loader2, PackageCheck } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeliveryHistory } from "@/hooks/shipment.hook";

export function DeliveryHistoryTable() {
  const { data: historyRes, isLoading } = useDeliveryHistory({ limit: 50 });
  const records = historyRes?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          COMPLETED ARCHIVE / DELIVERED CONSIGNMENTS
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          ARCHIVED:{" "}
          <span className="font-bold text-foreground">{records.length}</span>
        </div>
      </div>

      {isLoading ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3 font-mono">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              Retrieving delivery archive records...
            </span>
          </CardContent>
        </Card>
      ) : records.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <PackageCheck className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No completed delivery records logged in your archive yet.
            </p>
            <Link
              href="/customer/create-shipment"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-none font-mono text-xs uppercase tracking-wider border-border mt-2",
              )}
            >
              Book New Shipment
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
              <TableRow className="border-border">
                <TableHead className="font-mono font-bold text-foreground">
                  Consignment #
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Recipient Corridor
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Final Settlement
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Delivered Tariff
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Completion Date
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground text-right">
                  Waybill Receipt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {records.map((r) => (
                <TableRow
                  key={r.id}
                  className="hover:bg-muted/30 transition-colors border-border font-mono text-xs"
                >
                  <TableCell className="font-bold text-foreground py-3.5">
                    <Link
                      href={`/customer/shipments/${r.id}`}
                      className="text-foreground hover:text-primary hover:underline underline-offset-2 tracking-tight flex items-center gap-1 group"
                    >
                      <span>{r.trackingNumber}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <div className="font-sans font-semibold text-foreground">
                      {r.deliveryAddress?.area}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {r.deliveryAddress?.city}
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        r.status === "DELIVERED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold text-foreground py-3.5">
                    ৳{Number(r.deliveryCharge).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3.5">
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/customer/shipments/${r.id}`}
                        className={cn(
                          buttonVariants({ variant: "default", size: "xs" }),
                          "rounded-none font-mono text-[10px] uppercase tracking-wider inline-flex items-center",
                        )}
                      >
                        Details
                      </Link>
                      <Link
                        href={`/customer/track-shipment?tracking=${r.trackingNumber}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "xs" }),
                          "rounded-none font-mono text-[10px] uppercase tracking-wider border-border hover:bg-muted inline-flex items-center",
                        )}
                      >
                        <span>Trace</span>
                        <ArrowRight className="h-3 w-3 ml-1 text-primary" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
