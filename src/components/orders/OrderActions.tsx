"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/features/orders/types";
import {
  cancelOrderAction,
  completeOrderAction,
  respondToOrderAction,
} from "@/features/orders/actions";

interface OrderActionsProps {
  orderId: string;
  status: OrderStatus;
  role: "buyer" | "seller";
  reviewed: boolean;
  /** Smaller buttons for list rows; full-size for the detail page */
  compact?: boolean;
}

export function OrderActions({ orderId, status, role, reviewed, compact = false }: OrderActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (action: () => Promise<{ ok: boolean; error?: string }>) => {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error ?? "Something went wrong.");
      else router.refresh();
    });
  };

  const btnClass = compact
    ? "h-8 rounded-lg px-3 text-xs"
    : "h-11 flex-1 rounded-lg text-sm";
  const primary = `${btnClass} bg-accent text-white disabled:opacity-50`;
  const ghost = `${btnClass} border border-border-strong text-text-primary disabled:opacity-50`;

  let content: React.ReactNode;

  if (role === "seller" && status === "pending") {
    content = (
      <>
        <button disabled={isPending} className={primary} onClick={() => run(() => respondToOrderAction(orderId, "accepted"))}>
          Accept
        </button>
        <button disabled={isPending} className={ghost} onClick={() => run(() => respondToOrderAction(orderId, "rejected"))}>
          Reject
        </button>
      </>
    );
  } else if (role === "seller" && status === "accepted") {
    content = (
      <>
        <button disabled={isPending} className={ghost} onClick={() => run(() => cancelOrderAction(orderId))}>
          Cancel order
        </button>
        <button disabled={isPending} className={primary} onClick={() => run(() => completeOrderAction(orderId))}>
          Mark complete
        </button>
      </>
    );
  } else if (role === "buyer" && status === "pending") {
    content = (
      <button disabled={isPending} className={ghost} onClick={() => run(() => cancelOrderAction(orderId))}>
        Cancel request
      </button>
    );
  } else if (role === "buyer" && status === "accepted") {
    content = (
      <button disabled={isPending} className={primary} onClick={() => run(() => completeOrderAction(orderId))}>
        Confirm received
      </button>
    );
  } else if (role === "buyer" && status === "completed" && !reviewed) {
    content = (
      <button className={primary} onClick={() => router.push(`/orders/${orderId}/review`)}>
        Leave a review
      </button>
    );
  } else if (role === "buyer" && status === "completed" && reviewed) {
    content = <div className="text-xs text-text-muted">You reviewed this order</div>;
  } else {
    content = <div className="text-xs text-text-muted">No further action</div>;
  }

  return (
    <div>
      <div className={compact ? "flex justify-end gap-2" : "flex gap-2.5"}>{content}</div>
      {error && <p className="mt-1.5 text-xs text-text-danger">{error}</p>}
    </div>
  );
}
