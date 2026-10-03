"use client";

import { useQueryClient } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyAccount } from "@/hooks/auth.hook";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120;

export function VerifyAccountForm() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const router = useRouter();
    const queryClient = useQueryClient();


  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyAccountMutation } = useVerifyAccount();

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };
    console.log(typeof verifyData, "verifyData", verifyData);

    verifyAccountMutation(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        }

        toast.add({
          title: "Verification Successful",
          description: "Welcome onboard",
          type: "success",
        });
         queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  if (!email) {
    return null;
  }

  console.log("params-", searchParams);
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <form
            id="otp-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOTP();
            }}
          >
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="xs">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="otp">OTP</FieldLabel>
              <InputOTP
                maxLength={6}
                onChange={(value) => {
                  setOtp(value);
                  if (isInvalid) {
                    setIsInvalid(false);
                  }
                }}
                value={otp}
                autoComplete="off"
                name="otp"
                id="otp"
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {isInvalid && (
                <FieldError
                  errors={[{ message: "Invalid Code. Please try again" }]}
                />
              )}
              <FieldDescription>Resend in {resendTimer}</FieldDescription>
            </Field>
          </form>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full" form="otp-form">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="/support"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
