import { ImageIcon } from "lucide-react";
import Link from "next/link";
import type { OrderListItem } from "@/features/orders/types";
import { formatPHP } from "@/lib/utils/currency";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActions } from "./OrderActions";

export function OrderCard({ order, role }: { order: OrderListItem; role: "buyer" | "seller" }) {
  return (
    <div className="mb-2.5 rounded-lg border border-border bg-surface-2 p-3">
      <Link href={`/orders/${order.id}`} className="mb-2 flex gap-2.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-1">
          {order.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={order.coverImageUrl} alt={order.listingTitle} className="h-full w-full rounded-lg object-cover" />
          ) : (
            <ImageIcon size={18} className="text-text-muted" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-text-primary">{order.listingTitle}</p>
          <p className="text-[11px] text-text-muted">{order.counterpartName}</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-medium text-text-primary">{formatPHP(order.totalAmount)}</p>
          <OrderStatusBadge status={order.status} />
        </div>
      </Link>
      <OrderActions orderId={order.id} status={order.status} role={role} reviewed={order.reviewed} compact />
    </div>
  );
}
