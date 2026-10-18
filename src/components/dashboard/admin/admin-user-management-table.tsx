"use client";

import { useState } from "react";
import { Loader2, UserCog, Users } from "lucide-react";
import { useAdminUsers } from "@/hooks/admin.hook";
import type { AdminUserItem } from "@/types/admin.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterBar } from "../shared/filter-bar";
import { StatusBadge } from "../shared/status-badge";

interface AdminUserManagementTableProps {
  onSelectUserForStatus: (user: AdminUserItem) => void;
}

export function AdminUserManagementTable({
  onSelectUserForStatus,
}: AdminUserManagementTableProps) {
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: usersRes, isLoading } = useAdminUsers({
    role: roleFilter === "ALL" ? undefined : roleFilter,
    searchTerm: searchTerm.trim() || undefined,
    limit: 50,
  });

  const users = usersRes?.data || [];

  const roleTabs = [
    { label: "All Users", value: "ALL" },
    { label: "Customers", value: "CUSTOMER" },
    { label: "Couriers", value: "COURIER" },
    { label: "Hub Managers", value: "HUB_MANAGER" },
    { label: "Operations", value: "OPERATIONS_MANAGER" },
    { label: "Admins", value: "ADMIN" },
  ];

  return (
    <div className="space-y-4">
      {/* Reusable Filter Bar */}
      <FilterBar
        tabs={roleTabs}
        activeTab={roleFilter}
        onTabChange={setRoleFilter}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, email, phone..."
        rightSlot={
          <div className="font-mono text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
            REGISTRY:{" "}
            <span className="font-bold text-foreground">{users.length}</span>
          </div>
        }
      />

      {isLoading ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3 font-mono">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              Querying platform user accounts...
            </span>
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <Users className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No user accounts found matching current query or role filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40 font-mono text-xs uppercase tracking-wider">
              <TableRow className="border-border">
                <TableHead className="font-mono font-bold text-foreground">
                  User Identity
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Contact Phone
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Assigned Role
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Account State
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground">
                  Registration Date
                </TableHead>
                <TableHead className="font-mono font-bold text-foreground text-right">
                  Governance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {users.map((u) => (
                <TableRow
                  key={u.id}
                  className="hover:bg-muted/30 transition-colors border-border font-mono text-xs"
                >
                  <TableCell className="py-3.5">
                    <span className="font-sans font-semibold text-foreground block">
                      {u.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                      {u.email}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-muted-foreground">
                    {u.phone || "—"}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <StatusBadge status={u.role} type="role" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <StatusBadge status={u.status} type="account" />
                  </TableCell>
                  <TableCell className="py-3.5 text-muted-foreground text-[11px]">
                    {new Date(u.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-3.5 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => onSelectUserForStatus(u)}
                      className="rounded-none font-mono text-[10px] uppercase tracking-wider border-border hover:bg-muted cursor-pointer gap-1.5"
                    >
                      <UserCog className="h-3 w-3 text-primary" />
                      <span>Manage</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
