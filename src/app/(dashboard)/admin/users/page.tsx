import type { Metadata } from "next";
import { AdminWorkforceView } from "@/components/dashboard/admin/admin-workforce-view";

export const metadata: Metadata = {
  title: "Workforce & Users Management | ParcelPilot",
  description:
    "Administer customer profiles, courier credentials, staff authorizations, and account statuses.",
};

export default function AdminUsersPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <AdminWorkforceView />
    </div>
  );
}
