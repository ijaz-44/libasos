"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { registerSchema } from "@/validations/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const { register: registerUser, isRegistering } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      setServerError(err.message || "Could not create account. Please try again.");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1.5">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--color-primary)] font-[family-name:var(--font-ui)]">
            Join The Atelier
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Sign up for faster checkout, order tracking, and curated AI picks.
          </p>
        </div>

        {serverError && (
          <div className="p-3 rounded-[var(--radius-sm)] bg-red-50 border border-red-200 text-xs text-[var(--color-danger)] font-[family-name:var(--font-content)]">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="e.g. Zoya Tariq"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.name?.message}
            {...register("name")}
          />

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
            type="password"
            placeholder="At least 6 characters"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full gap-2 mt-2"
            isLoading={isRegistering}
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)] pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--color-primary)] hover:underline font-[family-name:var(--font-ui)]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}