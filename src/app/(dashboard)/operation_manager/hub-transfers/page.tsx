import type { Metadata } from "next";
import { OperationsHubTransfersView } from "@/components/dashboard/operations/operations-hub-transfers-view";

export const metadata: Metadata = {
  title: "Inter-Hub Transfer Monitoring | ParcelPilot",
  description: "Supervise linehaul movements between origin hubs and destination sorting centers.",
};

export default function OperationsHubTransfersPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <OperationsHubTransfersView />
    </div>
  );
}
