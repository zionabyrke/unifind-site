"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { OrderStatus } from "@/features/orders/types";

const ALL_STATUSES: OrderStatus[] = ["pending", "accepted", "completed", "rejected", "cancelled"];
const LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export function OrderStatusChips({ basePath }: { basePath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("status");

  const setStatus = (status: OrderStatus | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) params.set("status", status);
    else params.delete("status");
    router.push(`${basePath}?${params.toString()}`);
  };

  const chipClass = (isActive: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs ${
      isActive ? "border border-transparent bg-accent-bg text-accent" : "border border-border bg-surface-2 text-text-primary"
    }`;

  return (
    <div className="mb-2 flex gap-2 overflow-x-auto pb-3">
      <button className={chipClass(!active)} onClick={() => setStatus(null)}>
        All
      </button>
      {ALL_STATUSES.map((status) => (
        <button key={status} className={chipClass(active === status)} onClick={() => setStatus(status)}>
          {LABELS[status]}
        </button>
      ))}
    </div>
  );
}
