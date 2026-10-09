import type { Metadata } from "next";
import { UserProfileView } from "@/components/dashboard/shared/user-profile-view";

export const metadata: Metadata = {
  title: "Customer Profile & Account | ParcelPilot",
  description: "View verified customer shipper profile, contact details, and account status.",
};

export default function CustomerProfilePage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <UserProfileView />
    </div>
  );
}
