"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useAdminPayments } from "@/hooks/admin.hook";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../shared/status-badge";

export function AdminRevenueMetrics() {
  const { data: paymentsRes, isLoading } = useAdminPayments({ limit: 50 });
  const payments = paymentsRes?.data || [];

  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3 font-mono">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
          <span className="block text-xs uppercase tracking-wider text-muted-foreground">
            Pulling Stripe transaction stream & payment intents...
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
            Stripe Payment Transactions & Settlements
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            Real-time billing ledger of consignment delivery charges, tariffs,
            and gateway settlement receipts.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          TRANSACTIONS:{" "}
          <span className="font-bold text-foreground">{payments.length}</span>
        </div>
      </div>

      {payments.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <CreditCard className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No payment transactions recorded in the settlement ledger yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
              <TableRow className="border-border">
                <TableHead className="font-mono font-bold text-foreground">
                  Stripe Gateway Ref
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Waybill #
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Amount Settled
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Provider Channel
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Ledger Status
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground text-right">
                  Settlement Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {payments.map((p) => (
                <TableRow
                  key={p.id}
                  className="hover:bg-muted/30 transition-colors border-border font-mono text-xs"
                >
                  <TableCell className="py-3.5 font-bold text-foreground">
                    <span className="text-foreground tracking-tight">
                      {p.transactionId || "pi_stripe_pending"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 font-bold text-foreground">
                    {p.shipment?.trackingNumber || "—"}
                  </TableCell>
                  <TableCell className="py-3.5 font-black text-foreground">
                    ৳{Number(p.amount).toFixed(2)}{" "}
                    <span className="text-[10px] text-muted-foreground font-normal">
                      {p.currency?.toUpperCase() || "BDT"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-muted-foreground uppercase text-[11px]">
                    {p.provider || "STRIPE"}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <StatusBadge status={p.status} type="payment" />
                  </TableCell>
                  <TableCell className="py-3.5 text-right text-muted-foreground text-[11px]">
                    {new Date(p.createdAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
