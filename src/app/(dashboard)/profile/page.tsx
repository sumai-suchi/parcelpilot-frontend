"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/auth.hook";
import { Loader2 } from "lucide-react";
import { UserProfileView } from "@/components/dashboard/shared/user-profile-view";

export default function ProfileRedirectPage() {
  const { data: userRes, isLoading } = useGetMe();
  const user = userRes?.data;
  const router = useRouter();

  useEffect(() => {
    if (user?.role) {
      const rolePrefixMap: Record<string, string> = {
        ADMIN: "/admin",
        OPERATIONS_MANAGER: "/operation_manager",
        HUB_MANAGER: "/hub_manager",
        COURIER: "/courior",
        CUSTOMER: "/customer",
      };
      const prefix = rolePrefixMap[user.role] || "/customer";
      router.replace(`${prefix}/profile`);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <UserProfileView />
    </div>
  );
}
