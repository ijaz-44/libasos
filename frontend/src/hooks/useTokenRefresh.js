"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useTokenRefresh() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.clear();
      router.push("/login?session=expired");
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [queryClient, router]);
}