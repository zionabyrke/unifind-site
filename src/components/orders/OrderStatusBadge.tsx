import type { OrderStatus } from "@/features/orders/types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-bg-warning text-text-warning",
  accepted: "bg-accent-bg text-accent",
  completed: "bg-bg-success text-text-success",
  rejected: "bg-surface-1 text-text-muted",
  cancelled: "bg-surface-1 text-text-muted",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
