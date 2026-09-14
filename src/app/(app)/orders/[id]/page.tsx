import { Clock, CircleCheck, CircleX, Ban, ImageIcon } from "lucide-react";
import { getOrderDetail } from "@/features/orders/api";
import { formatPHP } from "@/lib/utils/currency";
import { formatCondition } from "@/lib/utils/listing";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderActions } from "@/components/orders/OrderActions";
import { UnavailableListing } from "@/components/listing/UnavailableListing";
import type { OrderDetail } from "@/features/orders/types";

const HEADER: Record<OrderDetail["status"], { icon: typeof Clock; text: (name: string) => string }> = {
  pending: { icon: Clock, text: (name) => `Waiting for ${name} to accept.` },
  accepted: { icon: CircleCheck, text: () => "Order accepted - coordinate the meetup in Messages." },
  completed: { icon: CircleCheck, text: () => "This order is complete." },
  rejected: { icon: CircleX, text: () => "This order was rejected." },
  cancelled: { icon: Ban, text: () => "This order was cancelled." },
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderDetail(id);

  if (!order) return <UnavailableListing />;

  const header = HEADER[order.status];
  const HeaderIcon = header.icon;

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <div className="mb-5 text-center">
        <HeaderIcon size={30} className="mx-auto mb-2 text-text-warning" />
        <p className="mb-1 text-sm font-medium text-text-primary">
          {order.status === "pending" ? "Order request sent" : `Order ${order.status}`}
        </p>
        <p className="text-xs text-text-muted">{header.text(order.counterpartName)}</p>
      </div>

      {order.lines.map((line, i) => (
        <div key={i} className="mb-3 flex items-center gap-2.5 rounded-lg border border-border bg-surface-2 p-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-1">
            {line.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={line.imageUrl} alt={line.listingTitle} className="h-full w-full rounded-lg object-cover" />
            ) : (
              <ImageIcon size={18} className="text-text-muted" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[13px] text-text-primary">{line.listingTitle}</p>
            <p className="text-[11px] text-text-muted">{formatCondition(line.condition)} · Qty {line.qty}</p>
          </div>
          <p className="text-[13px] font-medium text-text-primary">{formatPHP(line.unitPrice * line.qty)}</p>
        </div>
      ))}

      <div className="mb-3 rounded-lg border border-border bg-surface-2 p-3.5">
        <div className="flex justify-between text-[13px]">
          <span className="text-text-secondary">{order.isBuyer ? "Shop" : "Buyer"}</span>
          <span className="text-text-primary">{order.counterpartName}</span>
        </div>
        <div className="mt-1.5 flex justify-between border-t border-border pt-1.5 text-sm font-medium">
          <span className="text-text-primary">Total</span>
          <span className="text-text-primary">{formatPHP(order.totalAmount)}</span>
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-border bg-surface-2 p-3.5">
        <p className="mb-1 text-[11px] text-text-muted">Meetup location</p>
        <p className="text-xs text-text-primary">
          {order.address.line1}
          {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city}
        </p>
      </div>

      <div className="mb-2 flex justify-center">
        <OrderStatusBadge status={order.status} />
      </div>

      <OrderActions
        orderId={order.id}
        status={order.status}
        role={order.isBuyer ? "buyer" : "seller"}
        reviewed={order.reviewed}
      />
    </div>
  );
}
