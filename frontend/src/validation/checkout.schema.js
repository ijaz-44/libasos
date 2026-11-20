import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(["cod", "card", "wallet"], {
    required_error: "Please select a payment method",
  }),
});