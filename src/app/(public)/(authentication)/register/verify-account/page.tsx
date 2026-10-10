import Link from "next/link";
import { Suspense } from "react";
import { VerifyAccountForm } from "@/components/form/verify-account-form";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 pt-2 pb-2 md:p-8">
        <Link href="/" className="h-auto w-auto">
          <img
            src="/logo.png"
            alt=""
            className="h-30 w-30  lg:h-60 lg:w-60  object-cover"
          />
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<p>Loading...</p>}>
              <VerifyAccountForm />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src="/register.jpg"
          alt="register"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
