"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGoogleLogin } from "@/hooks/auth.hook";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: number | string;
            },
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleAuthButtonProps {
  mode?: "login" | "register";
  className?: string;
}

export function GoogleAuthButton({
  mode = "login",
  className,
}: GoogleAuthButtonProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: googleLogin, isPending } = useGoogleLogin();

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "650708752365-7funku64q8eb4ug32ibvmr40koo9em7c.apps.googleusercontent.com";

  // Handle Google Token Response
  const handleCredentialResponse = (response: { credential: string }) => {
    if (!response?.credential) {
      toast.add({
        title: "Google Authentication Error",
        description: "No Google ID token received. Please try again.",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken: response.credential },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.add({
            title: "Authentication Successful",
            description:
              mode === "register"
                ? "Your account has been registered with Google!"
                : "Welcome back to ParcelPilot!",
            type: "success",
          });
          router.push("/");
        },
        onError: (err: any) => {
          console.error("Google auth error:", err);
          toast.add({
            title: "Authentication Failed",
            description:
              err?.message ||
              "Could not complete Google authentication. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  // Load Google Identity Services Script
  useEffect(() => {
    const existingScript = document.getElementById("google-gsi-script");

    const onScriptReady = () => {
      setIsScriptLoaded(true);
    };

    if (existingScript) {
      if (window.google?.accounts?.id) {
        setIsScriptLoaded(true);
      } else {
        existingScript.addEventListener("load", onScriptReady);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "google-gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = onScriptReady;
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptReady);
    };
  }, []);

  // Initialize and Render Button
  useEffect(() => {
    if (
      !isScriptLoaded ||
      !containerRef.current ||
      !window.google?.accounts?.id
    ) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Clear previous buttons if re-rendering
      containerRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: mode === "register" ? "signup_with" : "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: 320,
      });
    } catch (e) {
      console.error("Failed to render Google button:", e);
    }
  }, [isScriptLoaded, mode, clientId]);

  const handleCustomClick = () => {
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
      } catch (err) {
        console.error("Google prompt error:", err);
      }
    } else {
      toast.add({
        title: "Google Sign-In",
        description:
          "Google services are initializing, please wait a moment...",
        type: "info",
      });
    }
  };

  return (
    <div className={cn("w-full flex flex-col items-center gap-2", className)}>
      {/* Official Google GSI Mount Container */}
      <div
        ref={containerRef}
        className={cn(
          "w-full flex justify-center items-center min-h-[40px] transition-opacity duration-200",
          !isScriptLoaded && "hidden",
          isPending && "pointer-events-none opacity-50",
        )}
      />

      {/* Fallback & Loading Button */}
      {(!isScriptLoaded || isPending) && (
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={handleCustomClick}
          className="w-full h-10 gap-2.5 font-medium text-xs rounded-none border-border bg-background hover:bg-muted/60 transition-colors"
        >
          {isPending ? (
            <>
              <Spinner className="h-4 w-4" />
              <span>Verifying Google account...</span>
            </>
          ) : (
            <>
              <GoogleIcon className="h-4 w-4 shrink-0" />
              <span>
                {mode === "register"
                  ? "Sign up with Google"
                  : "Sign in with Google"}
              </span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}
