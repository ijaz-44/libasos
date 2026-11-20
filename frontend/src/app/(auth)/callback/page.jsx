"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { handleOAuthCallbackExchange } from "@/lib/oauthClient";
import { tokenManager } from "@/lib/tokenManager";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    const completeAuth = async () => {
      try {
        const data = await handleOAuthCallbackExchange(searchParams);
        if (!active) return;

        if (data?.accessToken) {
          tokenManager.setAccessToken(data.accessToken);
        }
        if (data?.user) {
          queryClient.setQueryData(["auth", "me"], data.user);
        }

        router.replace("/dashboard");
      } catch (err) {
        if (!active) return;
        setErrorMessage(err.message || "OAuth sign-in failed or was cancelled.");
      }
    };

    completeAuth();

    return () => {
      active = false;
    };
  }, [searchParams, queryClient, router]);

  if (errorMessage) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          Authentication Interrupted
        </h1>
        <p className="text-sm text-[var(--color-danger)] max-w-md font-[family-name:var(--font-content)]">
          {errorMessage}
        </p>
        <Link href="/login">
          <Button variant="primary" size="md">
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div className="relative w-11 h-11">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary-soft)]" />
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
      </div>
      <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
        Completing Secure Sign-In...
      </p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[65vh] flex items-center justify-center text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
          Verifying Session...
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}