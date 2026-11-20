"use client";

import { useQuery } from "@tanstack/react-query";
import { catalogService } from "@/services/catalog.service";

export function useProducts(filters = {}) {
  const queryInfo = useQuery({
    queryKey: ["products", filters],
    queryFn: () => catalogService.getProducts(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return {
    products: queryInfo.data?.products || queryInfo.data || [],
    pagination: queryInfo.data?.pagination || null,
    isLoading: queryInfo.isLoading,
    isFetching: queryInfo.isFetching,
    isError: queryInfo.isError,
    error: queryInfo.error,
    refetch: queryInfo.refetch,
  };
}

export function useProduct(slug) {
  const queryInfo = useQuery({
    queryKey: ["product", slug],
    queryFn: () => catalogService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });

  return {
    product: queryInfo.data?.product || queryInfo.data || null,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
}