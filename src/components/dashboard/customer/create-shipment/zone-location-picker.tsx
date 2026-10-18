"use client";

import { useMemo, useState } from "react";
import { Building2, ChevronDown, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BANGLADESH_ZONES, type ZoneRegion } from "@/data/zones.data";

interface ZoneLocationPickerProps {
  city: string;
  area: string;
  onChangeCity: (city: string) => void;
  onChangeArea: (area: string) => void;
  accent?: "primary" | "emerald";
  cityLabel?: string;
  areaLabel?: string;
}

export function ZoneLocationPicker({
  city,
  area,
  onChangeCity,
  onChangeArea,
  accent = "primary",
  cityLabel = "City / Region *",
  areaLabel = "Area / District Thana *",
}: ZoneLocationPickerProps) {
  // Find matching zone if user-selected city matches any Bangladesh predefined zones
  const matchedZone = useMemo<ZoneRegion | undefined>(() => {
    if (!city) return undefined;
    const norm = city.trim().toLowerCase();
    return BANGLADESH_ZONES.find(
      (z) =>
        z.city.toLowerCase() === norm ||
        z.zoneCode.toLowerCase() === norm ||
        z.zoneName.toLowerCase().includes(norm) ||
        norm.includes(z.city.toLowerCase()),
    );
  }, [city]);

  // Track if custom mode is manually engaged
  const [isCustomCitySelected, setIsCustomCitySelected] = useState<boolean>(
    () => {
      return Boolean(city && !matchedZone);
    },
  );

  const [isCustomAreaSelected, setIsCustomAreaSelected] = useState<boolean>(
    () => {
      if (!matchedZone) return false;
      return Boolean(area && !matchedZone.areas.includes(area));
    },
  );

  const citySelectValue = useMemo(() => {
    if (isCustomCitySelected) return "__OTHER__";
    if (matchedZone) return matchedZone.city;
    return "";
  }, [isCustomCitySelected, matchedZone]);

  const areaSelectValue = useMemo(() => {
    if (!matchedZone) return "";
    if (isCustomAreaSelected) return "__OTHER__";
    if (matchedZone.areas.includes(area)) return area;
    return "__OTHER__";
  }, [matchedZone, isCustomAreaSelected, area]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__OTHER__") {
      setIsCustomCitySelected(true);
      onChangeCity("");
      onChangeArea("");
    } else if (val === "") {
      setIsCustomCitySelected(false);
      onChangeCity("");
      onChangeArea("");
    } else {
      setIsCustomCitySelected(false);
      const zone = BANGLADESH_ZONES.find((z) => z.city === val);
      if (zone) {
        onChangeCity(zone.city);
        // Automatically default to the first area of selected zone
        if (zone.areas.length > 0) {
          onChangeArea(zone.areas[0]);
          setIsCustomAreaSelected(false);
        }
      }
    }
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__OTHER__") {
      setIsCustomAreaSelected(true);
      onChangeArea("");
    } else {
      setIsCustomAreaSelected(false);
      onChangeArea(val);
    }
  };

  const ringClass =
    accent === "emerald"
      ? "focus-visible:ring-emerald-500 focus:border-emerald-500"
      : "focus-visible:ring-primary focus:border-primary";

  const badgeIconClass =
    accent === "emerald" ? "text-emerald-500" : "text-primary";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full min-w-0">
      {/* City / Region Selection */}
      <div className="space-y-1.5 w-full min-w-0">
        <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
          {cityLabel}
        </label>
        <div className="relative w-full min-w-0">
          <select
            value={citySelectValue}
            onChange={handleCityChange}
            className={`w-full h-9 rounded-none border border-input bg-background px-3 pr-8 font-sans text-xs text-foreground appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 truncate ${ringClass}`}
          >
            <option value="">-- Select Hub City / Division --</option>
            {BANGLADESH_ZONES.map((z) => (
              <option key={z.zoneCode} value={z.city}>
                {z.city} ({z.zoneName})
              </option>
            ))}
            <option value="__OTHER__">Other / Custom City or Union...</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        {/* If Custom City selected, show custom text input */}
        {isCustomCitySelected && (
          <div className="pt-1 w-full min-w-0">
            <Input
              type="text"
              required
              placeholder="e.g. Gazipur Union, Savar, Cox's Bazar"
              value={city}
              onChange={(e) => onChangeCity(e.target.value)}
              className="font-sans text-xs w-full"
            />
            <span className="font-mono text-[10px] text-muted-foreground block mt-1 truncate">
              Specify custom city, union, or regional station
            </span>
          </div>
        )}

        {/* Active Zone Hub Indicator */}
        {matchedZone && !isCustomCitySelected && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mt-1 truncate">
            <Building2 className={`h-3 w-3 shrink-0 ${badgeIconClass}`} />
            <span className="truncate">
              Network:{" "}
              <strong className="text-foreground font-semibold">
                {matchedZone.zoneCode}
              </strong>{" "}
              ({matchedZone.zoneName})
            </span>
          </div>
        )}
      </div>

      {/* Area / District / Thana Selection */}
      <div className="space-y-1.5 w-full min-w-0">
        <label className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase block truncate">
          {areaLabel}
        </label>

        {matchedZone && !isCustomCitySelected ? (
          <div className="space-y-1.5 w-full min-w-0">
            <div className="relative w-full min-w-0">
              <select
                value={areaSelectValue}
                onChange={handleAreaChange}
                className={`w-full h-9 rounded-none border border-input bg-background px-3 pr-8 font-sans text-xs text-foreground appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 truncate ${ringClass}`}
              >
                <option value="">-- Select Area / Thana --</option>
                {matchedZone.areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
                <option value="__OTHER__">
                  Other / Specific Union or Village...
                </option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>

            {/* If Custom Area/Village selected */}
            {(isCustomAreaSelected || areaSelectValue === "__OTHER__") && (
              <div className="pt-1 w-full min-w-0">
                <Input
                  type="text"
                  required
                  placeholder="e.g. South Union, Ward #04, Industrial Plot"
                  value={area}
                  onChange={(e) => onChangeArea(e.target.value)}
                  className="font-sans text-xs w-full"
                />
                <span className="font-mono text-[10px] text-muted-foreground block mt-1 truncate">
                  Specify exact thana, union, or neighborhood
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full min-w-0">
            <Input
              type="text"
              required
              placeholder="e.g. Sadar Thana, Union #02, Sector 04"
              value={area}
              onChange={(e) => onChangeArea(e.target.value)}
              className="font-sans text-xs w-full"
            />
            <span className="font-mono text-[10px] text-muted-foreground block mt-1 truncate">
              Enter area, upazila, thana, or union
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
