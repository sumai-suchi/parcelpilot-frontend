"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationRole } from "@/types/roleApplication.interface";

interface HubOption {
  id: string;
  name: string;
  code: string;
  address: string;
}

interface RoleSpecificStepProps {
  desiredRole: ApplicationRole;
  vehicleType: string;
  onVehicleTypeChange: (val: string) => void;
  vehicleNumber: string;
  onVehicleNumberChange: (val: string) => void;
  hubId: string;
  onHubIdChange: (val: string) => void;
  experience: string;
  onExperienceChange: (val: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  hubs: HubOption[];
  isHubsLoading: boolean;
  isSubmitting: boolean;
  isUploadingPhoto: boolean;
}

export function RoleSpecificStep({
  desiredRole,
  vehicleType,
  onVehicleTypeChange,
  vehicleNumber,
  onVehicleNumberChange,
  hubId,
  onHubIdChange,
  experience,
  onExperienceChange,
  notes,
  onNotesChange,
  hubs,
  isHubsLoading,
  isSubmitting,
  isUploadingPhoto,
}: RoleSpecificStepProps) {
  const roleName = desiredRole.replace(/_/g, " ");

  return (
    <Card className="rounded-none border-border bg-card">
      <CardHeader>
        <CardTitle className="font-heading font-black tracking-tight text-xl uppercase">
          3. Role-Specific Qualifications
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs font-sans">
          Provide operational credentials and logistics background for the{" "}
          {roleName} position.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Courier specific fields */}
        {desiredRole === "COURIER" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="vehicleType"
                className="font-mono text-xs uppercase tracking-wider"
              >
                Vehicle Type
              </Label>
              <select
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => onVehicleTypeChange(e.target.value)}
                className="w-full h-9 rounded-none border border-border bg-background px-3 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <option value="Motorcycle">Motorcycle</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Delivery Van">Delivery Van</option>
                <option value="Cargo Truck">Cargo Truck</option>
                <option value="Electric Scooter">Electric Scooter</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="vehicleNumber"
                className="font-mono text-xs uppercase tracking-wider"
              >
                Vehicle Reg. / License Plate
              </Label>
              <Input
                id="vehicleNumber"
                placeholder="e.g. DHAKA-METRO-HA-1234"
                value={vehicleNumber}
                onChange={(e) => onVehicleNumberChange(e.target.value)}
                className="rounded-none font-mono text-xs h-9 bg-background border-border"
              />
            </div>
          </div>
        )}

        {/* Hub selection for Courier and Hub Manager */}
        {(desiredRole === "COURIER" || desiredRole === "HUB_MANAGER") && (
          <div className="space-y-2">
            <Label
              htmlFor="hubId"
              className="font-mono text-xs uppercase tracking-wider"
            >
              Preferred Logistics Hub / Station
            </Label>
            {isHubsLoading ? (
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground py-2">
                <Loader2 className="size-4 animate-spin text-primary" />
                Loading distribution hubs registry...
              </div>
            ) : (
              <select
                id="hubId"
                value={hubId}
                onChange={(e) => onHubIdChange(e.target.value)}
                className="w-full h-9 rounded-none border border-border bg-background px-3 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <option value="">
                  -- Select Distribution Hub (Optional) --
                </option>
                {hubs.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.name} ({hub.code}) - {hub.address}
                  </option>
                ))}
              </select>
            )}
            <p className="font-mono text-[11px] text-muted-foreground">
              Optional: specify your preferred terminal node or leave blank for
              open assignment.
            </p>
          </div>
        )}

        {/* Experience */}
        <div className="space-y-2">
          <Label
            htmlFor="experience"
            className="font-mono text-xs uppercase tracking-wider"
          >
            Relevant Experience & Background
          </Label>
          <Textarea
            id="experience"
            rows={3}
            placeholder={
              desiredRole === "COURIER"
                ? "E.g., 2 years experience with express courier deliveries and city route mapping."
                : desiredRole === "HUB_MANAGER"
                  ? "E.g., Warehouse supervisor with inbound/outbound manifest dispatching experience."
                  : "Describe previous operational, management, or technical dispatch capabilities."
            }
            value={experience}
            onChange={(e) => onExperienceChange(e.target.value)}
            className="rounded-none font-mono text-xs bg-background border-border"
          />
        </div>

        {/* Notes / Motivation */}
        <div className="space-y-2">
          <Label
            htmlFor="notes"
            className="font-mono text-xs uppercase tracking-wider"
          >
            Applicant Statement / Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            rows={2}
            placeholder="Share any additional comments or reason for applying to this position."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="rounded-none font-mono text-xs bg-background border-border"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 p-4 sm:p-6 bg-muted/10">
        <p className="font-mono text-[11px] text-muted-foreground order-2 sm:order-1">
          By submitting, you agree to credential review and role verification.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting || isUploadingPhoto}
          className="w-full sm:w-auto order-1 sm:order-2 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Submitting Application...
            </>
          ) : (
            "Submit Role Application"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
