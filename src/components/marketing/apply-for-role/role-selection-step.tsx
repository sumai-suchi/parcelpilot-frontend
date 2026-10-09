"use client";

import { Bike, Building2, CheckCircle2, Compass, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplicationRole } from "@/types/roleApplication.interface";
import { cn } from "@/lib/utils";

export interface RoleOption {
  id: ApplicationRole;
  title: string;
  badge: string;
  description: string;
  icon: typeof Bike;
}

export const ROLES: RoleOption[] = [
  {
    id: "COURIER",
    title: "Courier Partner",
    badge: "Field Delivery",
    description:
      "Deliver packages on assigned routes with real-time status updates and doorstep drop-offs.",
    icon: Bike,
  },
  {
    id: "HUB_MANAGER",
    title: "Hub Manager",
    badge: "Warehouse Ops",
    description:
      "Lead a distribution hub, oversee inward/outward logistics, and supervise local couriers.",
    icon: Building2,
  },
  {
    id: "OPERATIONS_MANAGER",
    title: "Operations Manager",
    badge: "Logistics Lead",
    description:
      "Manage zone routing, monitor regional throughput, and optimize courier network efficiency.",
    icon: Compass,
  },
  {
    id: "ADMIN",
    title: "Platform Admin",
    badge: "Full Control",
    description:
      "Oversee system governance, workforce verification, audit logs, and global platform configuration.",
    icon: Shield,
  },
];

interface RoleSelectionStepProps {
  selectedRole: ApplicationRole;
  onSelectRole: (role: ApplicationRole) => void;
  currentRole?: string;
}

export function RoleSelectionStep({
  selectedRole,
  onSelectRole,
  currentRole,
}: RoleSelectionStepProps) {
  return (
    <Card className="rounded-none border-border bg-card">
      <CardHeader>
        <CardTitle className="font-heading font-black tracking-tight text-xl uppercase">
          1. Select Desired Role
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs font-sans">
          Choose the operational position you wish to apply for within the logistics network.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLES.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            const isAlreadyCurrentRole = currentRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => {
                  if (!isAlreadyCurrentRole) {
                    onSelectRole(role.id);
                  }
                }}
                className={cn(
                  "relative flex flex-col p-4 sm:p-5 rounded-none border transition-all cursor-pointer",
                  isAlreadyCurrentRole
                    ? "opacity-50 cursor-not-allowed border-border/40 bg-muted/30"
                    : isSelected
                    ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40"
                    : "border-border hover:border-primary/40 bg-card",
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "size-10 rounded-none border flex items-center justify-center shrink-0",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-foreground border-border",
                      )}
                    >
                      <IconComponent className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm tracking-tight leading-tight">
                        {role.title}
                      </h3>
                      <Badge
                        variant={isSelected ? "default" : "secondary"}
                        className="rounded-none font-mono text-[10px] uppercase mt-0.5"
                      >
                        {role.badge}
                      </Badge>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {role.description}
                </p>

                {isAlreadyCurrentRole && (
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-2 uppercase">
                    (Currently assigned role)
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
