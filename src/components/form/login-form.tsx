"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "cn";
import {
  Briefcase,
  Building2,
  Eye,
  EyeClosed,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { useLogin } from "@/hooks/auth.hook";
import { loginSchema } from "@/validation/auth.validation";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const DEMO_ACCOUNTS = [
  {
    role: "ADMIN",
    label: "Admin",
    email: "superadmin@gmail.com",
    password: "Super@admin12345",
    icon: ShieldCheck,
  },
  {
    role: "OPERATIONS_MANAGER",
    label: "Operations Manager",
    email: "operations@parcelpilot.com",
    password: "Ops@123456",
    icon: Briefcase,
  },
  {
    role: "HUB_MANAGER",
    label: "Hub Manager",
    email: "hubmanager@parcelpilot.com",
    password: "Hub@123456",
    icon: Building2,
  },
  {
    role: "COURIER",
    label: "Courier",
    email: "courier@parcelpilot.com",
    password: "Courier@123456",
    icon: Truck,
  },
  {
    role: "CUSTOMER",
    label: "Customer",
    email: "customer@parcelpilot.com",
    password: "Customer@123456",
    icon: User,
  },
] as const;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      console.log("loginData", loginData);

      login(loginData, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.add({
            title: "Login Success",
            description: `Welcome back `,
            type: "success",
          });
          console.log("res", res);

          router.push("/");
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

  const handleDemoSelect = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    form.setFieldValue("email", account.email);
    form.setFieldValue("password", account.password);

    // if (account.role === "CUSTOMER") {
    //   setSelectedRole(account.role);
    //   login(
    //     {
    //       email: account.email,
    //       password: account.password,
    //     },
    //     {
    //       onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["user"] });
    //         toast.add({
    //           title: "Login Success",
    //           description: "Welcome to Customer Dashboard",
    //           type: "success",
    //         });
    //         router.push("/customer");
    //       },
    //       onError: (err) => {
    //         toast.add({
    //           title: "Authorization failure",
    //           description:
    //             err.message || "Something went wrong. Please try again",
    //           type: "error",
    //         });
    //       },
    //     },
    //   );
    //   return;
    // }

    if (selectedRole === account.role) {
      form.handleSubmit();
    } else {
      setSelectedRole(account.role);
      toast.add({
        title: `${account.label} credentials loaded`,
        description: `Click Submit or click ${account.label} again to log in`,
        type: "info",
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Demo Accounts Section */}
        <div className="flex flex-col gap-2.5 rounded-none border border-border bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <Sparkles className="size-3 text-primary" /> Demo Accounts
            </span>
            {selectedRole && (
              <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                {DEMO_ACCOUNTS.find((a) => a.role === selectedRole)?.label}{" "}
                Loaded
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {DEMO_ACCOUNTS.map((account) => {
              const isSelected = selectedRole === account.role;
              const Icon = account.icon;

              return (
                <Button
                  key={account.role}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  size="xs"
                  onClick={() => handleDemoSelect(account)}
                  disabled={loginPending}
                  className={cn(
                    "h-8 gap-1.5 text-[11px] font-semibold tracking-normal normal-case transition-all",
                    isSelected && "bg-primary text-primary-foreground",
                  )}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span className="truncate">{account.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Click to fill credentials</span>
            <span>Click twice or Submit to log in</span>
          </div>
        </div>

        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (selectedRole) setSelectedRole(null);
                    }}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

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
                      placeholder="••••••••"
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        if (selectedRole) setSelectedRole(null);
                      }}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
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

          <Button disabled={loginPending} type="submit">
            {loginPending ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>

        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GoogleAuthButton mode="login" />
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
