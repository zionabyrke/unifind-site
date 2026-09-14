import { PackageOpen } from "lucide-react";
import { getBuyerOrders } from "@/features/orders/api";
import type { OrderStatus } from "@/features/orders/types";
import { OrderStatusChips } from "@/components/orders/OrderStatusChips";
import { OrderCard } from "@/components/orders/OrderCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface BuyerOrdersPageProps {
  searchParams: Promise<{ status?: OrderStatus }>;
}

export default async function BuyerOrdersPage({ searchParams }: BuyerOrdersPageProps) {
  const { status } = await searchParams;
  const orders = await getBuyerOrders(status);

  return (
    <div className="mx-auto max-w-xl px-4 py-4">
      <h1 className="mb-3 text-[15px] font-medium text-text-primary">My Orders</h1>
      <OrderStatusChips basePath="/orders" />
      {orders.length === 0 ? (
        <EmptyState icon={PackageOpen} title="No orders here" description="Orders you place will show up in this list." />
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} role="buyer" />)
      )}
    </div>
  );
}
