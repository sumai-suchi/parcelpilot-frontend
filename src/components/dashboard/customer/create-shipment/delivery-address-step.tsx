"use client";

import { Bookmark, MapPin, Phone, User } from "lucide-react";
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

interface DeliveryAddressStepProps {
  savedAddresses: SavedAddress[];
  useSaved: boolean;
  selectedAddressId: string;
  onSelectSaved: (id: string) => void;
  onToggleUseSaved: (useSaved: boolean) => void;
  recipientName: string;
  recipientPhone: string;
  addressLine: string;
  city: string;
  area: string;
  postalCode: string;
  onChangeField: (field: string, value: string) => void;
}

export function DeliveryAddressStep({
  savedAddresses,
  useSaved,
  selectedAddressId,
  onSelectSaved,
  onToggleUseSaved,
  recipientName,
  recipientPhone,
  addressLine,
  city,
  area,
  postalCode,
  onChangeField,
}: DeliveryAddressStepProps) {
  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-xs w-full min-w-0">
      <CardHeader className="border-b border-border/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-none border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shrink-0">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-semibold tracking-wider text-emerald-500 uppercase">
              STEP 02 / DESTINATION CONSIGNEE
            </div>
            <CardTitle className="font-sans text-base font-bold tracking-tight text-foreground truncate">
              Recipient & Delivery Point
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground truncate">
              Who is receiving this consignment and at what address?
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
        {/* Recipient Personal Info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full min-w-0">
          <div className="space-y-1.5 min-w-0">
            <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
              Recipient Full Name *
            </label>
            <div className="relative w-full">
              <User className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={recipientName}
                onChange={(e) => onChangeField("recipientName", e.target.value)}
                className="pl-9 font-sans text-xs w-full"
              />
            </div>
          </div>

          <div className="space-y-1.5 min-w-0">
            <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
              Recipient Contact Phone *
            </label>
            <div className="relative w-full">
              <Phone className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="tel"
                required
                placeholder="+880 1712 345678"
                value={recipientPhone}
                onChange={(e) =>
                  onChangeField("recipientPhone", e.target.value)
                }
                className="pl-9 font-mono text-xs w-full"
              />
            </div>
          </div>
        </div>

        {useSaved && savedAddresses.length > 0 ? (
          <div className="pt-2 w-full min-w-0">
            <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block mb-2 truncate">
              Select Destination From Saved Addresses
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => onSelectSaved(addr.id)}
                  className={`cursor-pointer rounded-none border p-3.5 transition-all min-w-0 overflow-hidden ${
                    selectedAddressId === addr.id
                      ? "border-emerald-500 bg-emerald-500/5 shadow-xs"
                      : "border-border hover:border-emerald-500/40 bg-card hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <span className="font-sans text-xs font-bold text-foreground truncate">
                      {addr.label || "Saved Terminal"}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-emerald-500 font-semibold px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 shrink-0">
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
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 border-t border-border/50 w-full min-w-0">
            <div className="sm:col-span-2 space-y-1.5 min-w-0">
              <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
                Delivery Street & Building Address *
              </label>
              <Input
                type="text"
                required
                placeholder="Apartment 4B, Silver Tower, Gulshan-2"
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
                accent="emerald"
                cityLabel="Delivery City / Region *"
                areaLabel="Delivery Area / District Thana *"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Postal Code
              </label>
              <Input
                type="text"
                placeholder="1212"
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
