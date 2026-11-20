"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginSchema } from "@/validation/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { getOAuthLoginUrl, OAUTH_PROVIDERS } from "@/lib/oauthClient";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await login(data);
    } catch (err) {
      setServerError(err.message || "Invalid credentials. Please try again.");
    }
  };

  const handleOAuthLogin = (provider) => {
    if (typeof window !== "undefined") {
      window.location.href = getOAuthLoginUrl(provider);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1.5">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--color-primary)] font-[family-name:var(--font-ui)]">
            Welcome Back
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
            Sign In to ZAYRA
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Access your orders, saved edits, and merchant or member portal.
          </p>
        </div>

        {serverError && (
          <div className="p-3 rounded-[var(--radius-sm)] bg-red-50 border border-red-200 text-xs text-[var(--color-danger)] font-[family-name:var(--font-content)]">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password visibility"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full gap-2 mt-2"
            isLoading={isLoggingIn}
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* OAuth Divider */}
        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-[var(--color-border)]" />
          <span className="px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
            Or continue with
          </span>
          <div className="flex-grow border-t border-[var(--color-border)]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleOAuthLogin(OAUTH_PROVIDERS.GOOGLE)}
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleOAuthLogin(OAUTH_PROVIDERS.GITHUB)}
          >
            GitHub
          </Button>
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)] pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[var(--color-primary)] hover:underline font-[family-name:var(--font-ui)]"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}