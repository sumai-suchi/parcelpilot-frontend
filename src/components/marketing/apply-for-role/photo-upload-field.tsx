"use client";

import { Camera, Loader2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { uploadImage } from "@/api/upload.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface PhotoUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  nameFallback?: string;
}

export function PhotoUploadField({
  value,
  onChange,
  nameFallback = "ID",
}: PhotoUploadFieldProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayAvatar = avatarPreview || value;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setAvatarPreview(localUrl);
    setIsUploading(true);

    try {
      const res = await uploadImage(file, "parcelpilot/avatars");
      if (res.success && res.data?.url) {
        onChange(res.data.url);
        toast.add({
          title: "Photo Uploaded",
          description: "Profile picture uploaded successfully.",
          type: "success",
        });
      } else {
        throw new Error(res.message || "Failed to upload photo");
      }
    } catch (err: any) {
      setAvatarPreview(null);
      const isCloudinaryConfigError =
        err?.message?.includes?.("Cloudinary") ||
        err?.data?.message?.includes?.("Cloudinary") ||
        err?.message?.includes?.("api_key") ||
        err?.status === 500;

      toast.add({
        title: "Upload Failed",
        description: isCloudinaryConfigError
          ? "Cloudinary credentials missing or invalid in server .env. Please configure your Cloudinary Cloud Name, API Key, and API Secret."
          : err?.data?.message || err?.message || "Could not upload image.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
      // Reset input value so selecting the same file again triggers onChange
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Clickable Avatar Circle with Hover Overlay */}
      <div
        onClick={triggerFileInput}
        className="relative group cursor-pointer size-24 rounded-full overflow-hidden border-2 border-dashed border-primary/40 hover:border-primary transition-all shrink-0 bg-muted/40 shadow-xs"
        title="Click on image to upload photo"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerFileInput();
          }
        }}
      >
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt="Profile preview"
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full flex flex-col items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
            <Camera className="size-7 mb-1" />
            <span className="font-mono text-[9px] uppercase font-semibold">
              Add Photo
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
          <Camera className="size-5 mb-1" />
          <span className="font-mono text-[9px] uppercase font-bold tracking-wider">
            {displayAvatar ? "Change" : "Upload"}
          </span>
        </div>

        {/* Uploading Spinner */}
        {isUploading && (
          <div className="absolute inset-0 bg-background/85 flex flex-col items-center justify-center text-primary">
            <Loader2 className="size-6 animate-spin mb-1" />
            <span className="font-mono text-[8px] uppercase tracking-wider font-semibold">
              Uploading...
            </span>
          </div>
        )}
      </div>

      {/* Upload button and guidelines */}
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={triggerFileInput}
            className="rounded-none font-mono text-xs uppercase tracking-wider gap-2 cursor-pointer"
          >
            <UploadCloud className="size-4" />
            <span>
              {displayAvatar
                ? "Change Profile Picture"
                : "Upload Profile Picture"}
            </span>
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          id="role-avatar-file"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="sr-only"
          disabled={isUploading}
          onChange={handleFileSelect}
        />

        <p className="font-mono text-[11px] text-muted-foreground">
          Accepted formats: JPG, PNG, WEBP. Max 5MB. Click either the avatar or
          button.
        </p>
      </div>
    </div>
  );
}
