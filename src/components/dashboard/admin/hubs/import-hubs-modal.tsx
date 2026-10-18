"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Code,
  Download,
  FileJson,
  Loader2,
  MapPin,
  Sparkles,
  Upload,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useBulkCreateAdminHubs } from "@/hooks/admin.hook";

interface ImportHubsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportHubsModal({ open, onOpenChange }: ImportHubsModalProps) {
  const [jsonText, setJsonText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);

  const bulkMutation = useBulkCreateAdminHubs();

  // Parse JSON and compute statistics
  const parsedData = useMemo(() => {
    if (!jsonText.trim()) return null;
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setParseError("JSON root must be an array of zones or hubs.");
        return null;
      }

      setParseError(null);

      // Check format (Grouped vs Flat)
      let totalHubs = 0;
      let totalZones = 0;

      for (const item of parsed) {
        if (Array.isArray(item.hubs)) {
          totalZones++;
          totalHubs += item.hubs.length;
        } else if (item.name && item.code) {
          totalHubs++;
          totalZones = 1;
        }
      }

      return { items: parsed, totalHubs, totalZones };
    } catch (err: any) {
      setParseError(`JSON Syntax Error: ${err.message}`);
      return null;
    }
  }, [jsonText]);

  // Load the pre-configured Bangladesh dataset
  const handleLoadPreset = async () => {
    try {
      setIsLoadingSample(true);
      const res = await fetch("/data/hubs.json");
      if (!res.ok) {
        throw new Error("Could not load preset dataset.");
      }
      const data = await res.json();
      setJsonText(JSON.stringify(data, null, 2));
      setFileName("bangladesh-hubs-preset.json");
      toast.success(
        "Loaded pre-configured Bangladesh national logistics hub network!",
      );
    } catch (err: any) {
      toast.error(err?.message || "Failed to load preset hubs.");
    } finally {
      setIsLoadingSample(false);
    }
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      toast.info(`Loaded ${file.name}`);
    };
    reader.onerror = () => {
      toast.error("Failed to read file.");
    };
    reader.readAsText(file);
  };

  // Submit to backend bulk API
  const handleCommit = async () => {
    if (!parsedData || parsedData.totalHubs === 0) {
      toast.error("No valid hubs found in the current JSON payload.");
      return;
    }

    try {
      const res = await bulkMutation.mutateAsync(parsedData.items);
      const data = res?.data;
      toast.success(
        res?.message ||
          `Successfully provisioned ${data?.totalProcessed || parsedData.totalHubs} hubs in the database!`,
      );
      setJsonText("");
      setFileName(null);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Bulk import failed.");
    }
  };

  // Download template
  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/data/hubs.json";
    link.download = "parcelpilot-hubs-network.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[580px] sm:max-w-[calc(100vw-2rem)] p-0 flex flex-col h-full max-h-[100dvh] overflow-hidden bg-card text-card-foreground shadow-2xl border-l border-border"
      >
        {/* Fixed Header */}
        <SheetHeader className="shrink-0 border-b border-border/70 p-4 sm:p-6 bg-muted/20">
          <div className="flex items-center gap-2 font-mono text-[11px] text-primary bg-primary/10 border border-primary/20 w-fit px-2 py-0.5 uppercase tracking-widest font-semibold">
            <FileJson className="h-3 w-3" />
            <span>AUTOMATED BULK SEEDING</span>
          </div>
          <SheetTitle className="text-lg sm:text-xl font-heading font-black tracking-tight text-foreground uppercase mt-2">
            Import Hubs via JSON
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground font-sans leading-relaxed">
            Populate entire divisional sorting nodes, linehaul depots, and
            geographical zones into PostgreSQL in a single automated step.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Load Preset Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleLoadPreset}
              disabled={isLoadingSample}
              className="rounded-none border-border h-auto py-3 px-3 flex flex-col items-start gap-1 text-left hover:border-primary cursor-pointer bg-card w-full"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-foreground">
                {isLoadingSample ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                )}
                <span>Load Bangladesh Preset</span>
              </div>
              <span className="text-[11px] text-muted-foreground font-sans leading-snug">
                22 verified hubs across 9 national divisions (Dhaka, Bogura,
                CTG, etc.)
              </span>
            </Button>

            {/* Upload File Input */}
            <label className="rounded-none border border-border h-auto py-3 px-3 flex flex-col items-start gap-1 text-left hover:border-primary cursor-pointer bg-card transition-colors w-full">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-foreground">
                <Upload className="h-3.5 w-3.5 text-primary" />
                <span>Choose JSON File</span>
              </div>
              <span className="text-[11px] text-muted-foreground font-sans truncate w-full leading-snug">
                {fileName ? fileName : "Upload custom .json file"}
              </span>
            </label>
          </div>

          {/* Validation & Preview Badge */}
          {parsedData && !parseError ? (
            <div className="p-3 border border-emerald-500/30 bg-emerald-500/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Payload Validated:</span>
              </span>
              <span className="font-bold">
                {parsedData.totalHubs} Hubs across {parsedData.totalZones} Zones
              </span>
            </div>
          ) : parseError ? (
            <div className="p-3 border border-destructive/30 bg-destructive/10 flex items-start gap-2 font-mono text-xs text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="break-words">{parseError}</span>
            </div>
          ) : null}

          {/* Raw JSON Editor */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5 text-primary" />
                <span>JSON Payload Editor</span>
              </label>
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="font-mono text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="h-3 w-3" />
                <span>Download hubs.json</span>
              </button>
            </div>

            <Textarea
              placeholder="Paste or edit your hub JSON array here..."
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={8}
              className="rounded-none border-border font-mono text-xs bg-muted/20 resize-y min-h-[160px] sm:min-h-[220px] max-h-[380px] w-full focus-visible:ring-0 focus-visible:border-primary"
            />
            <span className="text-[11px] text-muted-foreground font-mono block leading-relaxed">
              Automatic zone provisioning: any missing zone code will be created
              automatically.
            </span>
          </div>
        </div>

        {/* Fixed Footer */}
        <SheetFooter className="shrink-0 border-t border-border/70 p-4 sm:p-6 bg-muted/10 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={bulkMutation.isPending}
            className="w-full sm:w-1/3 rounded-none font-mono text-xs uppercase tracking-wider h-10 cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleCommit}
            disabled={!parsedData || !!parseError || bulkMutation.isPending}
            className="w-full sm:w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase font-bold tracking-wider text-xs h-10 rounded-none cursor-pointer gap-2"
          >
            {bulkMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Importing to Database...</span>
              </>
            ) : (
              <>
                <Building2 className="h-4 w-4" />
                <span>
                  {parsedData
                    ? `Import ${parsedData.totalHubs} Hubs`
                    : "Import Hubs"}
                </span>
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
