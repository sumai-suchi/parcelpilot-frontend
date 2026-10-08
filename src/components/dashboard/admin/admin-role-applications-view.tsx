"use client";

import { useState } from "react";
import {
  Bike,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck2,
  Filter,
  Loader2,
  Search,
  Shield,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAllApplications,
  useReviewRoleApplication,
} from "@/hooks/roleApplication.hook";
import type {
  ApplicationRole,
  ApplicationStatus,
  RoleApplication,
} from "@/types/roleApplication.interface";
import { cn } from "@/lib/utils";

export function AdminRoleApplicationsView() {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<RoleApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isRejectMode, setIsRejectMode] = useState<boolean>(false);

  const queryParams = {
    ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
    ...(searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {}),
  };

  const { data: appsRes, isLoading, refetch } = useGetAllApplications(queryParams);
  const applications = appsRes?.data || [];

  const reviewMutation = useReviewRoleApplication();

  const handleApprove = async (appId: string) => {
    try {
      await reviewMutation.mutateAsync({
        id: appId,
        payload: {
          status: "APPROVED",
        },
      });
      toast.success("Application approved! User role has been updated.");
      setSelectedApp(null);
      setIsRejectMode(false);
      refetch();
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to approve application.",
      );
    }
  };

  const handleReject = async (appId: string) => {
    try {
      await reviewMutation.mutateAsync({
        id: appId,
        payload: {
          status: "REJECTED",
          rejectionReason: rejectionReason.trim() || undefined,
        },
      });
      toast.success("Application rejected.");
      setSelectedApp(null);
      setIsRejectMode(false);
      setRejectionReason("");
      refetch();
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to reject application.",
      );
    }
  };

  const getRoleIcon = (role: ApplicationRole) => {
    switch (role) {
      case "COURIER":
        return Bike;
      case "HUB_MANAGER":
        return Building2;
      case "OPERATIONS_MANAGER":
        return Compass;
      case "ADMIN":
        return Shield;
      default:
        return FileCheck2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((st) => (
            <Button
              key={st}
              size="sm"
              variant={statusFilter === st ? "default" : "outline"}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "text-xs font-mono tracking-wider uppercase h-8 px-3",
                statusFilter === st
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : applications.length === 0 ? (
        <Card className="border-dashed p-10 text-center">
          <FileCheck2 className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-base font-semibold">No Applications Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {statusFilter !== "ALL"
              ? `There are no ${statusFilter.toLowerCase()} applications matching your query.`
              : "No user has submitted a role upgrade application yet."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app) => {
            const RoleIcon = getRoleIcon(app.desiredRole);

            return (
              <Card
                key={app.id}
                className="overflow-hidden border transition-all hover:border-primary/40 shadow-xs"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Applicant Profile */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <Avatar className="size-12 shrink-0 border">
                        {app.user.profilePicture ? (
                          <AvatarImage
                            src={app.user.profilePicture}
                            alt={app.user.name}
                          />
                        ) : null}
                        <AvatarFallback className="font-bold text-sm bg-muted text-foreground">
                          {app.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-base text-foreground truncate">
                            {app.user.name}
                          </h4>
                          <Badge variant="outline" className="text-[10px] uppercase">
                            Current: {app.user.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {app.user.email}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Submitted:{" "}
                          {new Date(app.createdAt).toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Applied Role & Details */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-2.5 bg-muted/50 px-3.5 py-2 rounded-lg border border-border/60">
                        <RoleIcon className="size-5 text-primary shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                            Desired Position
                          </span>
                          <span className="text-sm font-bold tracking-tight">
                            {app.desiredRole.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Status & Review CTA */}
                      <div className="flex items-center gap-2.5 justify-between sm:justify-end">
                        <Badge
                          variant={
                            app.status === "APPROVED"
                              ? "default"
                              : app.status === "PENDING"
                                ? "secondary"
                                : "destructive"
                          }
                          className="capitalize text-xs px-2.5 py-1"
                        >
                          {app.status.toLowerCase()}
                        </Badge>

                        {app.status === "PENDING" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedApp(app);
                              setIsRejectMode(false);
                            }}
                            className="text-xs h-8 cursor-pointer font-medium"
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional preview info */}
                  {(app.hub || app.vehicleType || app.experience) && (
                    <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                      {app.hub && (
                        <span>
                          <strong className="text-foreground">Hub:</strong>{" "}
                          {app.hub.name} ({app.hub.code})
                        </span>
                      )}
                      {app.vehicleType && (
                        <span>
                          <strong className="text-foreground">Vehicle:</strong>{" "}
                          {app.vehicleType} - {app.vehicleNumber || "N/A"}
                        </span>
                      )}
                      {app.experience && (
                        <span className="truncate max-w-md">
                          <strong className="text-foreground">Exp:</strong>{" "}
                          {app.experience}
                        </span>
                      )}
                    </div>
                  )}

                  {app.rejectionReason && (
                    <div className="mt-2 text-xs text-destructive">
                      <strong>Rejection Reason:</strong> {app.rejectionReason}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Review Modal Dialog */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card text-card-foreground p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="size-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Review Role Application
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null);
                  setIsRejectMode(false);
                }}
                className="text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded-sm"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Applicant Summary */}
            <div className="flex items-center gap-4 p-3.5 rounded-lg bg-muted/40 border">
              <Avatar className="size-14 border">
                {selectedApp.user.profilePicture ? (
                  <AvatarImage
                    src={selectedApp.user.profilePicture}
                    alt={selectedApp.user.name}
                  />
                ) : null}
                <AvatarFallback className="font-bold text-base">
                  {selectedApp.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <h4 className="font-bold text-base">{selectedApp.user.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {selectedApp.user.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  Current Role:{" "}
                  <span className="font-semibold text-foreground">
                    {selectedApp.user.role}
                  </span>
                </p>
              </div>
            </div>

            {/* Target Role & Inputs Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1.5 border-b">
                <span className="text-muted-foreground font-medium">
                  Applying For:
                </span>
                <Badge className="font-bold text-xs">
                  {selectedApp.desiredRole.replace("_", " ")}
                </Badge>
              </div>

              {selectedApp.hub && (
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-muted-foreground font-medium">
                    Requested Hub:
                  </span>
                  <span className="font-semibold">
                    {selectedApp.hub.name} ({selectedApp.hub.code})
                  </span>
                </div>
              )}

              {selectedApp.vehicleType && (
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-muted-foreground font-medium">
                    Vehicle Spec:
                  </span>
                  <span className="font-semibold">
                    {selectedApp.vehicleType} ({selectedApp.vehicleNumber || "N/A"})
                  </span>
                </div>
              )}

              {selectedApp.experience && (
                <div className="space-y-1 py-1.5 border-b">
                  <span className="text-muted-foreground font-medium block">
                    Experience & Background:
                  </span>
                  <p className="text-xs bg-muted/30 p-2.5 rounded-md text-foreground">
                    {selectedApp.experience}
                  </p>
                </div>
              )}

              {selectedApp.notes && (
                <div className="space-y-1 py-1.5 border-b">
                  <span className="text-muted-foreground font-medium block">
                    Applicant Notes:
                  </span>
                  <p className="text-xs bg-muted/30 p-2.5 rounded-md text-foreground">
                    {selectedApp.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Reject Mode Form */}
            {isRejectMode && (
              <div className="space-y-2 pt-2 animate-in fade-in">
                <label
                  htmlFor="rejection-reason"
                  className="text-xs font-semibold text-destructive block"
                >
                  Reason for Rejection (Optional)
                </label>
                <Textarea
                  id="rejection-reason"
                  rows={2}
                  placeholder="E.g., Incomplete vehicle verification, no vacancy in requested hub..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="text-xs"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t">
              {!isRejectMode ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRejectMode(true)}
                    disabled={reviewMutation.isPending}
                    className="w-full sm:w-auto text-destructive hover:bg-destructive/10 border-destructive/30"
                  >
                    <UserX className="size-4 mr-1.5" />
                    Reject Application
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleApprove(selectedApp.id)}
                    disabled={reviewMutation.isPending}
                    className="w-full sm:w-auto"
                  >
                    {reviewMutation.isPending ? (
                      <Loader2 className="size-4 animate-spin mr-1.5" />
                    ) : (
                      <UserCheck className="size-4 mr-1.5" />
                    )}
                    Approve & Promote User
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRejectMode(false)}
                    disabled={reviewMutation.isPending}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleReject(selectedApp.id)}
                    disabled={reviewMutation.isPending}
                    className="w-full sm:w-auto"
                  >
                    {reviewMutation.isPending ? (
                      <Loader2 className="size-4 animate-spin mr-1.5" />
                    ) : (
                      <UserX className="size-4 mr-1.5" />
                    )}
                    Confirm Rejection
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
