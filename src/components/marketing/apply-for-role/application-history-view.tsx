"use client";

import { Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoleApplication } from "@/types/roleApplication.interface";

interface ApplicationHistoryViewProps {
  applications: RoleApplication[];
}

export function ApplicationHistoryView({
  applications,
}: ApplicationHistoryViewProps) {
  if (applications.length === 0) return null;

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <FileText className="size-4 text-primary" />
        <h2 className="font-heading font-black tracking-tight text-lg uppercase text-foreground">
          Application Submission History
        </h2>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="rounded-none border-border bg-card">
            <CardContent className="p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-sm uppercase text-foreground">
                      {app.desiredRole.replace(/_/g, " ")}
                    </h4>
                    <Badge
                      variant={
                        app.status === "APPROVED"
                          ? "default"
                          : app.status === "PENDING"
                          ? "secondary"
                          : "destructive"
                      }
                      className="rounded-none font-mono text-[10px] uppercase font-bold"
                    >
                      {app.status}
                    </Badge>
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                    Filed on{" "}
                    {new Date(app.createdAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>

                {app.reviewedAt && (
                  <div className="font-mono text-[10px] text-muted-foreground text-left sm:text-right">
                    Reviewed:{" "}
                    {new Date(app.reviewedAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-muted-foreground">
                {app.hub && (
                  <p>
                    <span className="text-foreground font-semibold">Assigned Hub:</span>{" "}
                    {app.hub.name} ({app.hub.code})
                  </p>
                )}
                {app.vehicleType && (
                  <p>
                    <span className="text-foreground font-semibold">Vehicle:</span>{" "}
                    {app.vehicleType} [{app.vehicleNumber || "BD-REG"}]
                  </p>
                )}
                {app.experience && (
                  <p className="sm:col-span-2">
                    <span className="text-foreground font-semibold">Experience:</span>{" "}
                    {app.experience}
                  </p>
                )}
                {app.rejectionReason && (
                  <p className="sm:col-span-2 text-destructive">
                    <span className="font-bold">Review Feedback:</span>{" "}
                    {app.rejectionReason}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PendingApplicationBanner({
  application,
}: {
  application: RoleApplication;
}) {
  return (
    <Card className="mb-8 rounded-none border-amber-500/40 bg-amber-500/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-amber-500" />
          <CardTitle className="font-heading font-black text-base text-foreground uppercase tracking-tight">
            Role Application Under Review
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-sans text-xs">
          You applied for the{" "}
          <strong className="text-foreground uppercase font-mono">
            {application.desiredRole.replace(/_/g, " ")}
          </strong>{" "}
          role on{" "}
          {new Date(application.createdAt).toLocaleDateString(undefined, {
            dateStyle: "medium",
          })}
          . Administrators are reviewing your submitted credentials.
        </CardDescription>
      </CardHeader>
      <CardContent className="font-mono text-xs space-y-1 text-muted-foreground">
        {application.hub && (
          <p>
            Target Hub: <strong className="text-foreground">{application.hub.name}</strong> ({application.hub.code})
          </p>
        )}
        {application.vehicleType && (
          <p>
            Vehicle: <strong className="text-foreground">{application.vehicleType}</strong>{" "}
            [{application.vehicleNumber || "Unassigned"}]
          </p>
        )}
        {application.notes && (
          <p>
            Statement: <span className="text-foreground">{application.notes}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
