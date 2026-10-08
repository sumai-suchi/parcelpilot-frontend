import type { Metadata } from "next";
import { OperationsDashboardView } from "@/components/dashboard/operations/operations-dashboard-view";

export const metadata: Metadata = {
  title: "Operations Hub & Command Center | ParcelPilot",
  description:
    "Review, approve, and dispatch shipments with automated route induction.",
};

export default function OperationsManagerPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <OperationsDashboardView />
    </div>
  );
}
