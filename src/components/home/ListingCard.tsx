import Link from "next/link";
import { ImageIcon, Heart } from "lucide-react";
import type { ListingSummary } from "@/features/listings/types";
import { formatPHP } from "@/lib/utils/currency";

export function ListingCard({ listing }: { listing: ListingSummary }) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="overflow-hidden rounded-lg border border-border bg-surface-2"
    >
      <div className="relative flex aspect-square items-center justify-center bg-surface-1">
        {listing.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={listing.coverImageUrl} alt={listing.title} className="h-full w-full object-cover" />
        ) : (
          <ImageIcon size={24} className="text-text-muted" />
        )}
        {/* TODO: wire up to the wishlist mutation once auth is in place */}
        <Heart size={16} className="absolute right-1.5 top-1.5 text-white drop-shadow" />
      </div>
      <div className="p-2">
        <p className="truncate text-xs text-text-primary">{listing.title}</p>
        <p className="text-sm font-medium text-text-primary">{formatPHP(listing.displayPrice)}</p>
      </div>
    </Link>
  );
}
