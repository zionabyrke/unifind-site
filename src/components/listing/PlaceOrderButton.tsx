"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createOrderAction } from "@/features/orders/actions";

export function PlaceOrderButton({ listingItemId, disabled }: { listingItemId?: string; disabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const placeOrder = () => {
    if (!listingItemId) return;
    setError(null);
    startTransition(async () => {
      const result = await createOrderAction(listingItemId, 1);
      if (!result.ok) setError(result.error);
      else router.push(`/orders/${result.data.orderId}`);
    });
  };

  return (
    <div className="flex-[2]">
      <button
        onClick={placeOrder}
        disabled={disabled || isPending || !listingItemId}
        className="h-11 w-full rounded-lg bg-accent text-sm text-white disabled:opacity-45"
      >
        {isPending ? "Placing order..." : "Place order"}
      </button>
      {error && <p className="mt-1.5 text-xs text-text-danger">{error}</p>}
    </div>
  );
}
