"use client";

import { useForm } from "@tanstack/react-form";
import { cn } from "cn";
import { Camera, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadImage } from "@/api/upload.api";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useRegistration } from "@/hooks/auth.hook";
import type { RegistrationPayload } from "@/types/auth.interface";
import { CustomerRegistrationSchema } from "@/validation/auth.validation";
import { toast } from "../ui/toast";
import GoogleLoginComponent from "../google-login/GoogleLogin";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const defaultValues: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture?: string;
  } = {
    name: "Mir",
    email: "mir@gmail.com",
    password: "@User123456",
    confirmPassword: "@User123456",
    profilePicture: undefined,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate: registration } = useRegistration();
  const router = useRouter();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: CustomerRegistrationSchema,
    },
    onSubmit: async ({ value }) => {
      const registrationData: RegistrationPayload = {
        name: value.name,
        email: value.email,
        password: value.password,
        profilePicture: value.profilePicture || undefined,
      };
      console.log("form-", registrationData);
      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });

            console.log("res-", res);
          }

          toast.add({
            title: "Registration Successful",
            description: "Please verify your account",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <form.Field name="profilePicture">
          {(field) => (
            <div className="flex flex-col items-center gap-2 pb-1">
              <div className="relative group">
                <label
                  htmlFor="signup-avatar-input"
                  className={cn(
                    "cursor-pointer block relative rounded-full overflow-hidden border-2 border-dashed transition-all p-1",
                    isUploadingAvatar
                      ? "opacity-60 pointer-events-none"
                      : "border-muted-foreground/30 hover:border-primary",
                  )}
                  title="Click to upload profile picture"
                >
                  <div className="relative size-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {avatarPreview || field.state.value ? (
                      <img
                        src={avatarPreview || field.state.value}
                        alt="Avatar preview"
                        className="size-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Camera className="size-6 mb-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-medium">Photo</span>
                      </div>
                    )}

                    {isUploadingAvatar && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Loader2 className="size-5 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="signup-avatar-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="sr-only"
                  disabled={isUploadingAvatar}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const localUrl = URL.createObjectURL(file);
                    setAvatarPreview(localUrl);
                    setIsUploadingAvatar(true);

                    try {
                      const res = await uploadImage(
                        file,
                        "parcelpilot/avatars",
                      );
                      if (res.success && res.data?.url) {
                        field.handleChange(res.data.url);
                        toast.add({
                          title: "Photo Uploaded",
                          description: "Profile picture ready.",
                          type: "success",
                        });
                      } else {
                        throw new Error(
                          res.message || "Failed to upload photo",
                        );
                      }
                    } catch (err: any) {
                      setAvatarPreview(null);
                      field.handleChange("");
                      const isCloudinaryConfigError =
                        err?.message?.includes?.("Cloudinary") ||
                        err?.data?.message?.includes?.("Cloudinary") ||
                        err?.message?.includes?.("api_key") ||
                        err?.status === 500;

                      toast.add({
                        title: "Upload Failed",
                        description: isCloudinaryConfigError
                          ? "Cloudinary credentials missing or invalid in server .env. Please configure your Cloudinary Cloud Name, API Key, and API Secret."
                          : err?.data?.message ||
                            err?.message ||
                            "Failed to upload photo",
                        type: "error",
                      });
                    } finally {
                      setIsUploadingAvatar(false);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                Profile picture (Optional)
              </span>
            </div>
          )}
        </form.Field>

        <Field>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  <FieldDescription>Provide your full name.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </Field>
        <Field>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Provide your email address.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </Field>
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="*********"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="pr-10"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="*********"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="pr-10"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <GoogleLoginComponent></GoogleLoginComponent>
        <Field>
         
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
