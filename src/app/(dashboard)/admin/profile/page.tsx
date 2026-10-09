import type { Metadata } from "next";
import { UserProfileView } from "@/components/dashboard/shared/user-profile-view";

export const metadata: Metadata = {
  title: "Admin Profile & Credentials | ParcelPilot",
  description: "View verified administrator credentials and system authorizations.",
};

export default function AdminProfilePage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <UserProfileView />
    </div>
  );
}
