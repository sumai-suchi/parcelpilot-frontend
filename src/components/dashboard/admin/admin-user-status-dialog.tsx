"use client";

import { useState } from "react";
import {
  CheckCircle2,
  UserCog,
  X,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { useUpdateUserStatus } from "@/hooks/admin.hook";
import type { AdminUserItem, UserStatusType } from "@/types/admin.interface";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../shared/status-badge";
import { cn } from "@/lib/utils";

interface AdminUserStatusDialogProps {
  user: AdminUserItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AdminUserStatusDialog({
  user,
  isOpen,
  onClose,
}: AdminUserStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<UserStatusType>(
    user?.status || "ACTIVE",
  );

  const updateMutation = useUpdateUserStatus();

  if (!isOpen || !user) return null;

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync({
        userId: user.id,
        payload: { status: selectedStatus },
      });

      toast.success(`User ${user.name} status updated to ${selectedStatus}!`);
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update user status.");
    }
  };

  const statusOptions: Array<{
    value: UserStatusType;
    label: string;
    desc: string;
    variant: "emerald" | "default" | "destructive";
  }> = [
    {
      value: "ACTIVE",
      label: "Active Account",
      desc: "User has full access to their role capabilities and can create or fulfill tasks.",
      variant: "emerald",
    },
    {
      value: "INACTIVE",
      label: "Inactive / Dormant",
      desc: "User is temporarily deactivated. Logins or assignments will be restricted.",
      variant: "default",
    },
    {
      value: "SUSPENDED",
      label: "Suspended (Compliance Flag)",
      desc: "User is blocked from all system actions due to violations or administrative hold.",
      variant: "destructive",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-none border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <UserCog className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
              Manage Account Governance
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-none p-1 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User Identity Preview */}
        <div className="rounded-none border border-border/80 bg-muted/30 p-3.5 text-xs font-mono space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Legal Name:
            </span>
            <span className="font-bold text-foreground">{user.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground uppercase text-[10px]">
              Email Identity:
            </span>
            <span className="text-foreground">{user.email}</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-border/40">
            <span className="text-muted-foreground uppercase text-[10px]">
              Assigned Role:
            </span>
            <StatusBadge status={user.role} type="role" />
          </div>
        </div>

        {/* Status Option Radios */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
            Select Account Authorization State
          </label>
          <div className="space-y-2">
            {statusOptions.map((opt) => {
              const isSelected = selectedStatus === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => setSelectedStatus(opt.value)}
                  className={cn(
                    "flex flex-col gap-1 p-3 rounded-none border text-xs cursor-pointer transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-xs"
                      : "border-border/70 hover:border-border hover:bg-muted/30",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground font-mono text-[11px] uppercase">
                      {opt.label}
                    </span>
                    <StatusBadge status={opt.value} type="account" />
                  </div>
                  <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-border/60">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-1/3 rounded-none font-mono uppercase text-xs h-10 border-border cursor-pointer hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={updateMutation.isPending}
            onClick={handleUpdate}
            className="w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer"
          >
            {updateMutation.isPending
              ? "Updating State..."
              : "Commit Status Change"}
          </Button>
        </div>
      </div>
    </div>
  );
}
