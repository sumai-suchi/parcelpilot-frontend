"use client";

import { Bookmark, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { SavedAddress } from "@/types/shipment.interface";
import { ZoneLocationPicker } from "./zone-location-picker";

interface PickupAddressStepProps {
  savedAddresses: SavedAddress[];
  useSaved: boolean;
  selectedAddressId: string;
  onSelectSaved: (id: string) => void;
  onToggleUseSaved: (useSaved: boolean) => void;
  addressLine: string;
  city: string;
  area: string;
  postalCode: string;
  label: string;
  onChangeField: (field: string, value: string) => void;
}

export function PickupAddressStep({
  savedAddresses,
  useSaved,
  selectedAddressId,
  onSelectSaved,
  onToggleUseSaved,
  addressLine,
  city,
  area,
  postalCode,
  label,
  onChangeField,
}: PickupAddressStepProps) {
  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs w-full min-w-0">
      <CardHeader className="border-b border-border/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-none border border-primary/20 bg-primary/10 text-primary shrink-0">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-semibold tracking-wider text-primary uppercase">
              STEP 01 / SENDER INDUCTION
            </div>
            <CardTitle className="font-sans text-base font-bold tracking-tight text-foreground truncate">
              Pickup Terminal & Address
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground truncate">
              Where should our courier rider collect the consignment?
            </CardDescription>
          </div>
        </div>

        {savedAddresses.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={() => onToggleUseSaved(!useSaved)}
            className="text-[11px] font-semibold tracking-wider uppercase shrink-0"
          >
            <Bookmark className="h-3 w-3 mr-1" />
            {useSaved ? "Manual Address" : "Saved Addresses"}
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {useSaved && savedAddresses.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => onSelectSaved(addr.id)}
                className={`cursor-pointer rounded-none border p-3.5 transition-all min-w-0 overflow-hidden ${
                  selectedAddressId === addr.id
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border hover:border-primary/40 bg-card hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <span className="font-sans text-xs font-bold text-foreground truncate">
                    {addr.label || "Saved Terminal"}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-primary font-semibold px-1.5 py-0.5 bg-primary/10 border border-primary/20 shrink-0">
                    {addr.city}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-1 font-sans break-words">
                  {addr.addressLine}
                </p>
                <span className="font-mono text-[11px] text-muted-foreground block mt-1 truncate">
                  Area: {addr.area}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full min-w-0">
            <div className="sm:col-span-2 space-y-1.5 min-w-0">
              <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
                Location Label / Identifier
              </label>
              <Input
                type="text"
                placeholder="e.g. Warehouse 01, Main Office, Central Store"
                value={label}
                onChange={(e) => onChangeField("label", e.target.value)}
                className="font-sans text-xs w-full"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5 min-w-0">
              <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
                Street Address & Building Premises *
              </label>
              <Input
                type="text"
                required
                placeholder="House #12, Road #4, Sector 7"
                value={addressLine}
                onChange={(e) => onChangeField("addressLine", e.target.value)}
                className="font-sans text-xs w-full"
              />
            </div>

            {/* Cascading Dropdowns for City / Division and Area / Thana */}
            <div className="sm:col-span-2 w-full min-w-0">
              <ZoneLocationPicker
                city={city}
                area={area}
                onChangeCity={(val) => onChangeField("city", val)}
                onChangeArea={(val) => onChangeField("area", val)}
                accent="primary"
                cityLabel="Pickup City / Region *"
                areaLabel="Pickup Area / District Thana *"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Postal Code
              </label>
              <Input
                type="text"
                placeholder="1213"
                value={postalCode}
                onChange={(e) => onChangeField("postalCode", e.target.value)}
                className="font-mono text-xs max-w-xs"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
