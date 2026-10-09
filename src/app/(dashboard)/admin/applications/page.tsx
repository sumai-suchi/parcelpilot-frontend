import type { Metadata } from "next";
import { AdminApplicationsView } from "@/components/dashboard/admin/admin-applications-view";

export const metadata: Metadata = {
  title: "Role Upgrade Applications | ParcelPilot",
  description:
    "Review and verify personnel applications for Courier, Hub Manager, and Operations Manager promotions.",
};

export default function AdminApplicationsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <AdminApplicationsView />
    </div>
  );
}
