"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Copy,
  KeyRound,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  UserCheck,
  Building2,
  Bike,
  Package,
  Radio,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useGetMe } from "@/hooks/auth.hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "./dashboard-header";
import { StatusBadge } from "./status-badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function UserProfileView() {
  const { data: userRes, isLoading } = useGetMe();
  const user = userRes?.data;

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "PP";

  const roleDescriptions: Record<
    string,
    { title: string; desc: string; icon: any; permissions: string[] }
  > = {
    ADMIN: {
      title: "Executive System Administrator",
      desc: "Full administrative governance across network infrastructure, workforce credentials, financial settlements, and platform audit logs.",
      icon: ShieldAlert,
      permissions: [
        "Global workforce user account management & role elevations",
        "Financial Stripe revenue stream, escrow balance, and transaction audit",
        "Physical logistics hub network & geographic zone configurations",
        "Personnel credential applications review & authorization",
        "Dynamic shipment tariff pricing rules administration",
      ],
    },
    OPERATIONS_MANAGER: {
      title: "Logistics Operations Command Manager",
      desc: "Real-time dispatch intake, courier rider fleet assignment, inter-hub transfer supervision, and delivery SLA velocity governance.",
      icon: Radio,
      permissions: [
        "New consignment dispatch review, verification, and route approval",
        "Field courier rider allocation and delivery assignment",
        "Inter-hub cross-dock transfer monitoring across district corridors",
        "Operational delivery status updates and exception management",
        "Logistics SLA compliance tracking and dispatch telemetry",
      ],
    },
    HUB_MANAGER: {
      title: "Regional Sorting Facility Hub Manager",
      desc: "On-site distribution center oversight, container intake, bay inventory management, and inter-hub linehaul dispatches.",
      icon: Building2,
      permissions: [
        "Physical package intake, barcode verification, and sorting bay storage",
        "Linehaul manifest creation and cross-dock inter-hub transfers",
        "Terminal courier rider dispatch and field collection",
        "Facility inventory capacity and package retention oversight",
      ],
    },
    COURIER: {
      title: "Field Delivery & Last-Mile Courier Rider",
      desc: "Doorstep parcel pickup, intracity transit execution, and electronic proof-of-delivery handshakes.",
      icon: Bike,
      permissions: [
        "Assigned delivery and pickup execution across assigned hub zones",
        "Real-time duty availability status toggling (Available / Busy / Offline)",
        "Customer doorstep delivery completion with OTP verification",
        "Mobile delivery telemetry and routing map execution",
      ],
    },
    CUSTOMER: {
      title: "Consignment Shipper & Merchant Account",
      desc: "Doorstep courier dispatch booking, multi-package tracking, payment settlement, and delivery history.",
      icon: Package,
      permissions: [
        "Direct parcel consignment creation with weight and parcel type specs",
        "Live 64-district package tracking with automated status alerts",
        "Saved addresses management for fast multi-destination shipping",
        "Secure Stripe payment processing and itemized billing invoices",
      ],
    },
  };

  const roleInfo = user?.role
    ? roleDescriptions[user.role]
    : roleDescriptions.CUSTOMER;
  const RoleIcon = roleInfo?.icon || ShieldCheck;

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <DashboardHeader
        category="ACCOUNT SECURITY & CREDENTIALS"
        title="User Profile & Identity."
        description="Personal account credentials, authorized security permissions, assigned role credentials, and verification registry."
        badgeIcon={UserCheck}
      />

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <Card className="rounded-none border-border bg-card shadow-xs lg:col-span-1 flex flex-col justify-between">
          <CardHeader className="p-6 border-b border-border/60 text-center relative">
            {/* Status Indicator */}
            <div className="absolute top-4 right-4">
              <StatusBadge status={user?.status || "ACTIVE"} type="account" />
            </div>

            {/* Avatar */}
            <div className="mx-auto mb-4 relative">
              <Avatar className="size-24 rounded-none border-2 border-primary mx-auto shadow-md">
                {user?.profilePicture && (
                  <AvatarImage
                    src={user.profilePicture}
                    alt={user?.name || "User"}
                  />
                )}
                <AvatarFallback className="rounded-none font-mono text-2xl font-black bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-1/2 translate-x-8 size-4 rounded-full bg-emerald-500 border-2 border-background ring-1 ring-emerald-500" />
            </div>

            <CardTitle className="text-xl font-black text-foreground font-sans">
              {user?.name || "Verified User"}
            </CardTitle>
            <CardDescription className="text-xs font-mono text-muted-foreground mt-1">
              {user?.email || "user@parcelpilot.com"}
            </CardDescription>

            <div className="mt-3 flex items-center justify-center gap-2">
              <StatusBadge status={user?.role || "CUSTOMER"} type="role" />
              {user?.emailVerified && (
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px] font-mono uppercase"
                >
                  <CheckCircle2 className="size-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4 font-mono text-xs flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Member Since */}
              <div className="flex items-center justify-between p-2.5 bg-muted/20 border border-border/60">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-primary" />
                  Member Since
                </span>
                <span className="font-bold text-foreground">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        year: "numeric",
                      })
                    : "Oct 2026"}
                </span>
              </div>

              {/* Auth Provider */}
              <div className="flex items-center justify-between p-2.5 bg-muted/20 border border-border/60">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <KeyRound className="size-3.5 text-primary" />
                  Auth Provider
                </span>
                <span className="font-bold text-foreground uppercase">
                  {user?.authProvider || "Credentials"}
                </span>
              </div>

              {/* Account ID */}
              <div className="p-2.5 bg-muted/20 border border-border/60 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase">
                  <span>Unique User ID</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(user?.id || "", "User ID")}
                    className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Copy</span>
                    <Copy className="size-2.5" />
                  </button>
                </div>
                <div className="text-[11px] font-mono text-foreground truncate select-all">
                  {user?.id || "N/A"}
                </div>
              </div>
            </div>

            {/* Role Upgrade CTA (if customer) */}
            {user?.role === "CUSTOMER" && (
              <div className="pt-2">
                <Link
                  href="/apply-for-role"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-mono text-xs font-bold uppercase transition-colors"
                >
                  <ShieldCheck className="size-3.5" />
                  <span>Apply For Staff Role</span>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Columns: Credentials & Role Permissions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Account Information */}
          <Card className="rounded-none border-border bg-card shadow-xs">
            <CardHeader className="p-5 border-b border-border/60">
              <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                <User className="size-4 text-primary" />
                Personal Profile & Contact Credentials
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Verified communication handles and legal identification.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {/* Full Name */}
                <div className="p-3 border border-border/60 bg-muted/10 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                    Legal Name
                  </span>
                  <span className="text-sm font-bold text-foreground block">
                    {user?.name || "N/A"}
                  </span>
                </div>

                {/* Email */}
                <div className="p-3 border border-border/60 bg-muted/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase font-semibold">
                    <span>Email Address</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(user?.email || "", "Email")
                      }
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      <Copy className="size-3" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-foreground block truncate">
                    {user?.email || "N/A"}
                  </span>
                </div>

                {/* Phone */}
                <div className="p-3 border border-border/60 bg-muted/10 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                    Contact Phone
                  </span>
                  <span className="text-sm font-bold text-foreground block">
                    {user?.phone || "+880 (Configured on file)"}
                  </span>
                </div>

                {/* Account Status */}
                <div className="p-3 border border-border/60 bg-muted/10 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                    Account Status
                  </span>
                  <div className="pt-0.5">
                    <StatusBadge
                      status={user?.status || "ACTIVE"}
                      type="account"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Authorizations Card */}
          <Card className="rounded-none border-border bg-card shadow-xs">
            <CardHeader className="p-5 border-b border-border/60">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-heading font-black uppercase text-foreground flex items-center gap-2">
                    <RoleIcon className="size-4 text-primary" />
                    {roleInfo?.title || "Role Permissions"}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {roleInfo?.desc}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-xs uppercase"
                >
                  {user?.role?.replace("_", " ") || "USER"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3 font-mono text-xs">
              <span className="text-[11px] font-bold text-foreground block uppercase tracking-wider">
                Authorized Governance Privileges:
              </span>
              <div className="space-y-2">
                {roleInfo?.permissions.map((perm, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-border/60 bg-muted/20 flex items-start gap-2.5 text-foreground leading-relaxed"
                  >
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
