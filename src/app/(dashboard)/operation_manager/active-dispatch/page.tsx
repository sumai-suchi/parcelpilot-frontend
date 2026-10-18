import type { Metadata } from "next";
import { OperationsActiveDispatchView } from "@/components/dashboard/operations/operations-active-dispatch-view";

export const metadata: Metadata = {
  title: "Active Courier Dispatches | ParcelPilot",
  description:
    "Monitor field courier riders executing customer pickups and doorstep deliveries.",
};

export default function OperationsActiveDispatchPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <OperationsActiveDispatchView />
    </div>
  );
}
