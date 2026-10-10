import type { Metadata } from "next";
import { OperationsPendingApprovalView } from "@/components/dashboard/operations/operations-pending-approval-view";

export const metadata: Metadata = {
  title: "Pending Approval Consignments | ParcelPilot",
  description:
    "Review and approve newly submitted shipments, verify addresses, and assign courier routing.",
};

export default function OperationsPendingApprovalPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <OperationsPendingApprovalView />
    </div>
  );
}
