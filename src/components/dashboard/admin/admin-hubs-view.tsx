"use client";

import { useState } from "react";
import { Building2, Loader2, MapPin, Phone, Plus } from "lucide-react";
import { useAdminHubs } from "@/hooks/admin.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "../shared/status-badge";
import { AddHubDrawer } from "./hubs/add-hub-drawer";

export function AdminHubsView() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const { data: hubsRes, isLoading } = useAdminHubs();
  const hubs = hubsRes?.data || [];

  if (isLoading) {
    return (
      <Card className="rounded-none border-border bg-card">
        <CardContent className="p-12 text-center space-y-3 font-mono">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
          <span className="block text-xs uppercase tracking-wider text-muted-foreground">
            Indexing physical hub network infrastructure...
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <h3 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
            Distribution & Linehaul Sorting Nodes
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            Active physical terminals facilitating container intake, automated
            sorting, and inter-hub transfers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-muted-foreground">
            OPERATIONAL NODES:{" "}
            <span className="font-bold text-foreground">{hubs.length}</span>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() => setIsAddDrawerOpen(true)}
            className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold text-xs h-8 px-3 gap-1.5 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Hub</span>
          </Button>
        </div>
      </div>

      {hubs.length === 0 ? (
        <Card className="rounded-none border-border bg-card">
          <CardContent className="p-12 text-center space-y-3">
            <Building2 className="mx-auto h-8 w-8 text-muted-foreground stroke-1" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              No sorting hubs configured in the system.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubs.map((hub) => (
            <Card
              key={hub.id}
              className="rounded-none border-border bg-card shadow-sm hover:border-primary/40 transition-colors flex flex-col justify-between"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5">
                    {hub.code}
                  </span>
                  <StatusBadge
                    status={hub.isActive ? "ACTIVE" : "INACTIVE"}
                    type="account"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">
                    {hub.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed line-clamp-2">
                    {hub.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{hub.zone?.name || "Regional Zone"}</span>
                  </span>
                  {hub.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{hub.phone}</span>
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Hub Drawer */}
      <AddHubDrawer
        open={isAddDrawerOpen}
        onOpenChange={setIsAddDrawerOpen}
      />
    </div>
  );
}
