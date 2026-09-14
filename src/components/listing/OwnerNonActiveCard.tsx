import Link from "next/link";
import { ImageIcon } from "lucide-react";
import type { ListingDetail } from "@/features/listings/types";
import { formatPHP } from "@/lib/utils/currency";

export function OwnerNonActiveCard({ listing }: { listing: ListingDetail }) {
  const isSoldOut = listing.status === "sold_out";

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <div className="mb-3 rounded-lg bg-accent-bg px-3 py-2 text-xs text-accent">
        You&apos;re viewing this as the shop owner.
      </div>

      <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl border border-border bg-surface-2 opacity-60">
        <ImageIcon size={32} className="text-text-muted" />
      </div>

      <div className="mb-1.5 flex items-center gap-2">
        <h1 className="text-lg font-medium text-text-primary">{listing.title}</h1>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] ${
            isSoldOut ? "bg-bg-warning text-text-warning" : "bg-bg-danger text-text-danger"
          }`}
        >
          {isSoldOut ? "Sold Out" : "Removed"}
        </span>
      </div>
      <p className="mb-4 text-xs text-text-muted">
        {listing.categoryPath} · Last price {formatPHP(listing.basePrice)}
      </p>
      <p className="mb-5 text-sm text-text-secondary">
        {isSoldOut
          ? "All sizes are currently out of stock. Restock or edit item prices below."
          : "You took this listing down. Buyers can no longer find or view it."}
      </p>

      {/* TODO(shop step): route to the real edit-listing / relist flow once it exists */}
      <Link
        href="/shop"
        className="flex h-11 items-center justify-center rounded-lg bg-accent px-4 text-sm text-white"
      >
        {isSoldOut ? "Restock / edit listing" : "Relist"}
      </Link>
    </div>
  );
}
