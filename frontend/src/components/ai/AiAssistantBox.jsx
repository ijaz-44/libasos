"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { useCartStore } from "@/store/useCartStore";
import { aiPromptSchema } from "@/validation/aiPromptSchema";
import { aiService } from "@/services/ai.service";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const SUGGESTION_PROMPTS = [
  "Festive velvet outfit for an evening wedding under 30k",
  "Minimalist linen pret for daily office wear",
  "Pastel unstitched suit with silk dupatta",
];

export default function AiAssistantBox() {
  const { isAiOpen, closeAi, openCart } = useUiStore();
  const addItem = useCartStore((state) => state.addItem);
  const [recommendations, setRecommendations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(aiPromptSchema),
    defaultValues: { prompt: "" },
  });

  if (!isAiOpen) return null;

  const onSubmit = async (data) => {
    setIsGenerating(true);
    setApiError("");
    try {
      const response = await aiService.getOutfitRecommendations(data);
      const list = Array.isArray(response) ? response : response?.items || [];
      setRecommendations(list);
      if (list.length === 0) {
        setApiError("No matching outfits returned for this prompt. Try another style or budget.");
      }
    } catch (error) {
      setRecommendations([]);
      setApiError(getErrorMessage(error, "Unable to fetch AI recommendations right now."));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyPrompt = (text) => {
    setApiError("");
    setValue("prompt", text, { shouldValidate: true });
  };

  const handleQuickAdd = (item) => {
    addItem(item, 1);
    closeAi();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-[family-name:var(--font-content)]">
      <div className="fixed inset-0 bg-black/45 backdrop-blur-xs" onClick={closeAi} />

      <aside className="relative z-10 w-full max-w-lg bg-[var(--color-surface)] h-full shadow-[var(--shadow-popover)] border-l border-[var(--color-border)] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-header-bg)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-semibold tracking-wide font-[family-name:var(--font-header)]">
              AI Stylist Assistant
            </h3>
          </div>
          <button
            type="button"
            onClick={closeAi}
            aria-label="Close AI Stylist"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary-soft)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Results Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
              label="Describe Your Desired Look or Occasion"
              placeholder="e.g. Semi-formal outfit for a winter brunch under 20k PKR..."
              rows={3}
              error={errors.prompt?.message}
              {...register("prompt")}
            />

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
                Try Quick Prompts:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTION_PROMPTS.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPrompt(promptText)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors text-left font-[family-name:var(--font-ui)] cursor-pointer"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full gap-2"
              isLoading={isGenerating}
            >
              <Sparkles className="w-4 h-4" />
              <span>Curate AI Suggestions</span>
            </Button>
          </form>

          {apiError && (
            <div className="p-3.5 rounded-[var(--radius-md)] border border-red-200 bg-red-50 text-xs text-[var(--color-danger)] font-[family-name:var(--font-ui)]">
              {apiError}
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] font-[family-name:var(--font-ui)]">
                  AI Selected Silhouettes ({recommendations.length})
                </h4>
                <Badge variant="primary">Curated</Badge>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id || rec.slug}
                    className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] flex gap-3 items-center"
                  >
                    <img
                      src={rec.image || "/images/placeholder-product.jpg"}
                      alt={rec.title}
                      className="w-16 h-20 object-cover rounded-[var(--radius-sm)] border border-[var(--color-border)] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
                          {rec.brand || "Atelier Pick"}
                        </p>
                        {rec.tag && <Badge variant="secondary">{rec.tag}</Badge>}
                      </div>
                      <h5 className="text-sm font-semibold text-[var(--color-text)] truncate font-[family-name:var(--font-ui)] mt-0.5">
                        {rec.title}
                      </h5>
                      <p className="text-xs text-[var(--color-primary)] font-bold mt-0.5 font-[family-name:var(--font-ui)]">
                        {formatCurrency(rec.price)}
                      </p>
                      {rec.reason && (
                        <p className="text-[11px] text-[var(--color-text-muted)] italic mt-1 line-clamp-2">
                          &ldquo;{rec.reason}&rdquo;
                        </p>
                      )}
                      <Link
                        href={`/product/${rec.slug || rec.id}`}
                        onClick={closeAi}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] mt-1.5 font-[family-name:var(--font-ui)]"
                      >
                        <span>Inspect Piece</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <Button
                      variant="soft"
                      size="icon"
                      onClick={() => handleQuickAdd(rec)}
                      title="Add to Bag"
                      aria-label={`Add ${rec.title} to bag`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}