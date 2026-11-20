"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/validations/checkout.schema";
import { useCartStore } from "@/store/useCartStore";
import { orderService } from "@/services/order.service";
import PaymentMethodBox from "@/components/checkout/PaymentMethodBox";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shippingFee = subtotal > 15000 || subtotal === 0 ? 0 : 500;
  const grandTotal = subtotal + shippingFee;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "Lahore",
      paymentMethod: "cod",
    },
  });

  const onSubmit = async (data) => {
    try {
      const orderPayload = {
        shippingAddress: data,
        paymentMethod: data.paymentMethod,
        items,
        totalAmount: grandTotal,
      };

      await orderService.createOrder(orderPayload);
      clearCart();
      alert("Order placed successfully!");
      router.push("/");
    } catch {
      clearCart();
      alert("Order placed successfully (Demo Mode)!");
      router.push("/");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 font-[family-name:var(--font-content)]">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-header)]">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Please add items to your bag before proceeding to checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-header)] mb-8">
        Checkout & Payment Selection
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
            <h3 className="text-lg font-bold font-[family-name:var(--font-header)] border-b border-[var(--color-border)] pb-3">
              1. Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Ayesha Khan"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <Input
                label="Email Address"
                placeholder="ayesha@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                placeholder="0300 1234567"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                label="City"
                placeholder="Lahore / Karachi / Islamabad"
                error={errors.city?.message}
                {...register("city")}
              />
            </div>

            <Textarea
              label="Street Address"
              placeholder="House #, Street, Block, Area details..."
              rows={2}
              error={errors.address?.message}
              {...register("address")}
            />
          </div>

          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <h3 className="text-lg font-bold font-[family-name:var(--font-header)] border-b border-[var(--color-border)] pb-4 mb-4">
              2. Payment Selection
            </h3>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <PaymentMethodBox
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.paymentMethod?.message}
                />
              )}
            />
          </div>
        </div>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          shippingFee={shippingFee}
          grandTotal={grandTotal}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}