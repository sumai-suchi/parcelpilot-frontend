import type { Metadata } from "next";
import { UserProfileView } from "@/components/dashboard/shared/user-profile-view";

export const metadata: Metadata = {
  title: "Operations Manager Profile | ParcelPilot",
  description:
    "View verified operations command credentials and dispatch permissions.",
};

export default function OperationManagerProfilePage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <UserProfileView />
    </div>
  );
}
