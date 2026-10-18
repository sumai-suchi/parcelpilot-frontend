"use client";

import { useState } from "react";
import { Building2, Hash, Loader2, MapPin, Phone, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminZones, useCreateAdminHub } from "@/hooks/admin.hook";
import type { AdminZoneItem } from "@/types/admin.interface";

interface AddHubDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddHubDrawer({ open, onOpenChange }: AddHubDrawerProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { data: zonesRes, isLoading: isZonesLoading } = useAdminZones();
  const zones: AdminZoneItem[] = zonesRes?.data || [];

  const createHubMutation = useCreateAdminHub();

  const handleReset = () => {
    setName("");
    setCode("");
    setZoneId("");
    setAddress("");
    setPhone("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a valid hub name.");
      return;
    }

    if (!code.trim()) {
      toast.error("Please provide a unique hub identification code.");
      return;
    }

    if (!zoneId) {
      toast.error("Please assign this hub to an operational zone.");
      return;
    }

    if (!address.trim()) {
      toast.error("Physical street address is required for waybill routing.");
      return;
    }

    try {
      await createHubMutation.mutateAsync({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        zoneId,
        address: address.trim(),
        phone: phone.trim() || undefined,
      });

      toast.success(`Logistics Hub "${name.trim()}" registered successfully!`);
      handleReset();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create logistics hub.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[500px] sm:max-w-[calc(100vw-2rem)] p-0 flex flex-col h-full max-h-[100dvh] overflow-hidden bg-card text-card-foreground shadow-2xl border-l border-border"
      >
        {/* Fixed Header */}
        <SheetHeader className="shrink-0 border-b border-border/70 p-4 sm:p-6 bg-muted/20">
          <div className="flex items-center gap-2 font-mono text-[11px] text-primary bg-primary/10 border border-primary/20 w-fit px-2 py-0.5 uppercase tracking-widest font-semibold">
            <Building2 className="h-3 w-3" />
            <span>FACILITY PROVISIONING</span>
          </div>
          <SheetTitle className="text-lg sm:text-xl font-heading font-black tracking-tight text-foreground uppercase mt-2">
            Register Logistics Hub
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground font-sans leading-relaxed">
            Add a new physical distribution center, sorting node, or linehaul
            transfer facility to the ParcelPilot network.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form
            id="add-hub-form"
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
            {/* Hub Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="hub-name"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
              >
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>Hub Facility Name *</span>
              </Label>
              <Input
                id="hub-name"
                placeholder="e.g. Dhaka Central Sorting Hub"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-none border-border h-10 w-full font-sans text-xs sm:text-sm"
              />
              <span className="text-[11px] text-muted-foreground block">
                Official operational identifier for regional dispatchers.
              </span>
            </div>

            {/* Hub Code */}
            <div className="space-y-1.5">
              <Label
                htmlFor="hub-code"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
              >
                <Hash className="h-3.5 w-3.5 text-primary" />
                <span>Unique Facility Code *</span>
              </Label>
              <Input
                id="hub-code"
                placeholder="e.g. HUB-DHK-01"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                className="rounded-none border-border h-10 w-full font-mono uppercase tracking-wider text-xs sm:text-sm"
              />
              <span className="text-[11px] text-muted-foreground block">
                Internal alphanumeric code used on waybill manifests
                (auto-capitalized).
              </span>
            </div>

            {/* Operational Zone Selection */}
            <div className="space-y-1.5">
              <Label
                htmlFor="hub-zone"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>Territory Zone *</span>
              </Label>

              {isZonesLoading ? (
                <div className="flex items-center gap-2 p-2.5 border border-border bg-muted/20 font-mono text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span>Loading operational zones...</span>
                </div>
              ) : zones.length === 0 ? (
                <div className="p-3 border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono">
                  No zones found in the database. Please initialize a Zone first
                  or import the pre-populated network.
                </div>
              ) : (
                <select
                  id="hub-zone"
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                  required
                  className="w-full min-w-0 h-10 px-3 bg-card border border-border text-foreground font-mono text-xs rounded-none focus:outline-none focus:border-primary transition-colors cursor-pointer truncate"
                >
                  <option value="" className="bg-card text-muted-foreground">
                    -- Select Geographical Zone --
                  </option>
                  {zones.map((zone) => (
                    <option
                      key={zone.id}
                      value={zone.id}
                      className="bg-card text-foreground"
                    >
                      {zone.name} ({zone.code})
                    </option>
                  ))}
                </select>
              )}
              <span className="text-[11px] text-muted-foreground block">
                Geographic zone responsible for coverage pricing and boundary
                tariffs.
              </span>
            </div>

            {/* Physical Address */}
            <div className="space-y-1.5">
              <Label
                htmlFor="hub-address"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>Physical Warehouse Address *</span>
              </Label>
              <Textarea
                id="hub-address"
                placeholder="e.g. Plot 14, Tejgaon Industrial Area, Dhaka 1208"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="rounded-none border-border font-sans resize-none w-full text-xs sm:text-sm"
              />
              <span className="text-[11px] text-muted-foreground block">
                Accurate physical street address where couriers check in and
                intake shipments.
              </span>
            </div>

            {/* Contact Phone */}
            <div className="space-y-1.5">
              <Label
                htmlFor="hub-phone"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>Contact Hotline (Optional)</span>
              </Label>
              <Input
                id="hub-phone"
                placeholder="e.g. +880 1711-223344"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-none border-border h-10 w-full font-mono text-xs sm:text-sm"
              />
              <span className="text-[11px] text-muted-foreground block">
                Direct phone number for courier desk and hub inquiries.
              </span>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <SheetFooter className="shrink-0 border-t border-border/70 p-4 sm:p-6 bg-muted/10 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleReset();
              onOpenChange(false);
            }}
            disabled={createHubMutation.isPending}
            className="w-full sm:w-1/3 rounded-none font-mono text-xs uppercase tracking-wider h-10 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-hub-form"
            disabled={createHubMutation.isPending}
            className="w-full sm:w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer gap-2"
          >
            {createHubMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Commit Hub to Network</span>
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
