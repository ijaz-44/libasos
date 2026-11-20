import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-5">
      <Badge variant="primary">404 • Route Not Found</Badge>
      <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
        This Edit Could Not Be Found
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] max-w-md font-[family-name:var(--font-content)]">
        The page or collection link you followed may have moved or is no longer available.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/shop">
          <Button variant="primary" size="md" className="gap-2">
            <span>Browse Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="md">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}