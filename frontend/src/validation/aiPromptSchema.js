import { z } from "zod";

export const aiPromptSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(3, "Please describe your desired outfit or occasion (at least 3 characters)."),
  budgetLimit: z.number().positive().optional(),
  preferredCategory: z.string().optional(),
});