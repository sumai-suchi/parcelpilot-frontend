"use client";

import { useForm } from "@tanstack/react-form";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useGetMe } from "@/hooks/auth.hook";
import {
  useApplyForRole,
  useGetApplicationHubs,
  useGetMyApplications,
} from "@/hooks/roleApplication.hook";
import type {
  ApplicationRole,
  CreateRoleApplicationPayload,
} from "@/types/roleApplication.interface";
import {
  ApplicationHistoryView,
  PendingApplicationBanner,
} from "@/components/marketing/apply-for-role/application-history-view";
import { PhotoUploadField } from "@/components/marketing/apply-for-role/photo-upload-field";
import { RoleSelectionStep } from "@/components/marketing/apply-for-role/role-selection-step";
import { RoleSpecificStep } from "@/components/marketing/apply-for-role/role-specific-step";

export default function ApplyForRolePage() {
  const router = useRouter();
  const { data: userData, isLoading: isUserLoading } = useGetMe();
  const currentUser = userData?.data;

  const { data: hubsResponse, isLoading: isHubsLoading } =
    useGetApplicationHubs();
  const hubs = hubsResponse?.data || [];

  const { data: myAppsResponse } = useGetMyApplications();
  const myApplications = myAppsResponse?.data || [];

  const pendingApplication = myApplications.find(
    (app) => app.status === "PENDING",
  );

  const { mutate: submitApplication, isPending: isSubmitting } =
    useApplyForRole();

  const [desiredRole, setDesiredRole] = useState<ApplicationRole>("COURIER");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [vehicleType, setVehicleType] = useState("Motorcycle");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [hubId, setHubId] = useState("");
  const [experience, setExperience] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.add({
        title: "Authentication Required",
        description: "Please sign in to submit a role application.",
        type: "error",
      });
      router.push("/login?redirect=/apply-for-role");
      return;
    }

    if (currentUser.role === desiredRole) {
      toast.add({
        title: "Already Assigned",
        description: `You are currently already assigned as ${desiredRole.replace(/_/g, " ")}.`,
        type: "error",
      });
      return;
    }

    const payload: CreateRoleApplicationPayload = {
      desiredRole,
      notes: notes.trim() || undefined,
      experience: experience.trim() || undefined,
      vehicleType:
        desiredRole === "COURIER" ? vehicleType.trim() || undefined : undefined,
      vehicleNumber:
        desiredRole === "COURIER"
          ? vehicleNumber.trim() || undefined
          : undefined,
      hubId:
        desiredRole === "COURIER" || desiredRole === "HUB_MANAGER"
          ? hubId || undefined
          : undefined,
      profilePicture: profilePicture || currentUser.profilePicture || undefined,
    };

    submitApplication(payload, {
      onSuccess: () => {
        toast.add({
          title: "Application Submitted!",
          description:
            "Your application has been received and forwarded to administration.",
          type: "success",
        });
        setVehicleNumber("");
        setExperience("");
        setNotes("");
      },
      onError: (err: any) => {
        toast.add({
          title: "Submission Error",
          description:
            err?.data?.message ||
            err?.message ||
            "Could not submit application. Please try again.",
          type: "error",
        });
      },
    });
  };

  if (isUserLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <Card className="rounded-none border-border bg-card shadow-md">
          <CardHeader>
            <div className="mx-auto size-12 rounded-none border border-primary/20 bg-primary/10 flex items-center justify-center mb-3 text-primary">
              <LogIn className="size-6" />
            </div>
            <CardTitle className="font-heading font-black tracking-tight text-xl uppercase">
              Sign In Required
            </CardTitle>
            <CardDescription className="text-muted-foreground font-sans text-xs">
              You must have an active ParcelPilot account to apply for
              operational roles.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3">
            <Link
              href="/login?redirect=/apply-for-role"
              className={buttonVariants({
                className:
                  "w-full rounded-none font-mono text-xs uppercase tracking-wider",
              })}
            >
              Log In to Apply
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "outline",
                className:
                  "w-full rounded-none font-mono text-xs uppercase tracking-wider",
              })}
            >
              Create Account
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl space-y-8">
      {/* Page Telemetry Header */}
      <div className="space-y-2 border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span>CAREER & PARTNERSHIP GATEWAY</span>
          <span className="text-muted-foreground">/</span>
          <span>ROLE ADVANCEMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
          Apply for Logistics Role.
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Transition your account to courier rider, terminal hub manager, or
          operations dispatcher. Applications undergo direct review by platform
          administrators.
        </p>
      </div>

      {/* Pending Application Warning if exists */}
      {pendingApplication && (
        <PendingApplicationBanner application={pendingApplication} />
      )}

      {/* Main Application Form */}
      {!pendingApplication && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Select Role */}
          <RoleSelectionStep
            selectedRole={desiredRole}
            onSelectRole={setDesiredRole}
            currentRole={currentUser?.role}
          />

          {/* Step 2: Photo Identification */}
          <Card className="rounded-none border-border bg-card">
            <CardHeader>
              <CardTitle className="font-heading font-black tracking-tight text-xl uppercase">
                2. Identification & Photo
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs font-sans">
                Upload a clear profile picture for field badge and identity
                verification. Click directly on the image to upload.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PhotoUploadField
                value={profilePicture || currentUser?.profilePicture}
                onChange={setProfilePicture}
                nameFallback={currentUser?.name?.slice(0, 2).toUpperCase()}
              />
            </CardContent>
          </Card>

          {/* Step 3: Role Specific Credentials & Submission */}
          <RoleSpecificStep
            desiredRole={desiredRole}
            vehicleType={vehicleType}
            onVehicleTypeChange={setVehicleType}
            vehicleNumber={vehicleNumber}
            onVehicleNumberChange={setVehicleNumber}
            hubId={hubId}
            onHubIdChange={setHubId}
            experience={experience}
            onExperienceChange={setExperience}
            notes={notes}
            onNotesChange={setNotes}
            hubs={hubs}
            isHubsLoading={isHubsLoading}
            isSubmitting={isSubmitting}
            isUploadingPhoto={false}
          />
        </form>
      )}

      {/* Historical Applications Table */}
      <ApplicationHistoryView applications={myApplications} />
    </div>
  );
}
