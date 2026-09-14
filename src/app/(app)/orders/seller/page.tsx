import Link from "next/link";
import { Store, PackageOpen } from "lucide-react";
import { getCurrentShopId, getSellerOrders } from "@/features/orders/api";
import type { OrderStatus } from "@/features/orders/types";
import { OrderStatusChips } from "@/components/orders/OrderStatusChips";
import { OrderCard } from "@/components/orders/OrderCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface SellerOrdersPageProps {
  searchParams: Promise<{ status?: OrderStatus }>;
}

export default async function SellerOrdersPage({ searchParams }: SellerOrdersPageProps) {
  const { status } = await searchParams;
  const shopId = await getCurrentShopId();

  if (!shopId) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <Store size={28} className="mx-auto mb-3 text-text-muted" />
        <p className="mb-1 text-sm text-text-primary">You don&apos;t have a shop yet</p>
        <p className="mb-5 text-xs text-text-muted">Create one to start receiving orders.</p>
        {/* TODO(shop step): route to the real create-shop flow once it exists. */}
        <Link href="/shop" className="rounded-lg bg-accent px-5 py-2 text-sm text-white">
          Start selling
        </Link>
      </div>
    );
  }

  const orders = await getSellerOrders(status);

  return (
    <div className="mx-auto max-w-xl px-4 py-4">
      <h1 className="mb-3 text-[15px] font-medium text-text-primary">Orders</h1>
      <OrderStatusChips basePath="/orders/seller" />
      {orders.length === 0 ? (
        <EmptyState icon={PackageOpen} title="No orders here" description="Orders placed on your shop will show up in this list." />
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} role="seller" />)
      )}
    </div>
  );
}
