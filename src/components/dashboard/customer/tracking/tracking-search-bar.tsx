"use client";

import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TrackingSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function TrackingSearchBar({
  value,
  onChange,
  onSearch,
  isLoading,
}: TrackingSearchBarProps) {
  return (
    <Card className="rounded-none border-border bg-card shadow-sm">
      <CardContent className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-heading font-black tracking-tight text-foreground uppercase">
              Consignment Tracking Console
            </h2>
            <p className="text-xs text-muted-foreground font-sans">
              Enter your alphanumeric waybill identifier (e.g.
              PP-20261005-A1B2C3)
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 hidden sm:inline-block">
            ACTIVE SENSOR NETWORK
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ENTER TRACKING ID (E.G. PP-XXXXXXXX-XXXXXX)"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              className="rounded-none pl-10 font-mono text-xs h-10 bg-background border-border uppercase placeholder:normal-case focus-visible:ring-primary/20"
            />
          </div>
          <Button
            type="button"
            disabled={isLoading || !value.trim()}
            onClick={onSearch}
            className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 px-6 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                <span>Locating...</span>
              </>
            ) : (
              <span>Inspect Waybill</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
