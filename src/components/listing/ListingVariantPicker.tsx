"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageIcon, Heart, MessageCircle } from "lucide-react";
import type { ListingDetail } from "@/features/listings/types";
import { formatPHP } from "@/lib/utils/currency";
import { formatCondition } from "@/lib/utils/listing";
import { PlaceOrderButton } from "./PlaceOrderButton";

export function ListingVariantPicker({ listing }: { listing: ListingDetail }) {
  const hasVariants = listing.variants.length > 0;
  const [selectedId, setSelectedId] = useState<string | undefined>(
    listing.variants.find((v) => v.available)?.id ?? listing.variants[0]?.id
  );
  const selected = listing.variants.find((v) => v.id === selectedId);

  const price = selected?.price ?? listing.basePrice;
  const condition = selected ? formatCondition(selected.condition) : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {listing.isOwner && (
        <div className="mb-3 rounded-lg bg-accent-bg px-3 py-2 text-xs text-accent">
          You&apos;re viewing this as the shop owner.
        </div>
      )}

      <div className="relative mb-4 flex aspect-[4/3] items-center justify-center rounded-xl border border-border bg-surface-2">
        <ImageIcon size={32} className="text-text-muted" />
        {!listing.isOwner && (
          // TODO(wishlist step): wire up to the wishlist mutation.
          <Heart size={20} className="absolute right-2.5 top-2.5 cursor-pointer text-text-primary" />
        )}
        {selected?.label && (
          <div className="absolute bottom-2.5 left-2.5 rounded-full border border-border bg-surface-1 px-2.5 py-0.5 text-[11px] text-text-primary">
            Photos for {selected.label}
          </div>
        )}
      </div>

      <p className="mb-1 text-xs text-text-muted">{listing.categoryPath}</p>
      <h1 className="mb-1.5 text-lg font-medium text-text-primary">{listing.title}</h1>

      <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
        <span className="text-xl font-semibold text-text-primary">{formatPHP(price)}</span>
        {condition && (
          <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[11px] text-text-primary">
            {condition}
          </span>
        )}
        {selected && (
          <span className={`text-xs ${selected.available ? "text-text-secondary" : "text-text-danger"}`}>
            {selected.available ? `${selected.stockQty} in stock` : "Sold out"}
          </span>
        )}
      </div>

      {hasVariants && (
        <>
          <p className="mb-1.5 text-xs text-text-secondary">Options</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {listing.variants.map((variant) => {
              const isSelected = variant.id === selectedId;
              if (!variant.available) {
                return (
                  <div
                    key={variant.id}
                    title="Sold out"
                    className="rounded-lg border border-border bg-surface-1 px-3.5 py-2 text-sm text-text-muted line-through"
                  >
                    {variant.label || "Default"}
                  </div>
                );
              }
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedId(variant.id)}
                  className={`rounded-lg px-3.5 py-2 text-sm ${
                    isSelected
                      ? "border border-transparent bg-accent-bg text-accent"
                      : "border border-border bg-surface-1 text-text-primary"
                  }`}
                >
                  {variant.label || "Default"}
                </button>
              );
            })}
          </div>
        </>
      )}

      {listing.description && (
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">{listing.description}</p>
      )}

      {/* TODO(shop step): link to the real public shop storefront route once it exists. */}
      <Link
        href={`/shop/${listing.shop.id}`}
        className="mb-4 flex items-center gap-2.5 rounded-lg border border-border bg-surface-2 p-3"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-bg text-[11px] font-medium text-accent">
          {listing.shop.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="text-xs text-text-primary">{listing.shop.name}</div>
          <div className="text-[11px] text-text-muted">{listing.shop.ratingAvg.toFixed(1)} shop rating</div>
        </div>
      </Link>

      {listing.isOwner ? (
        // TODO(shop step): route to the real edit-listing flow once it exists.
        <Link
          href="/shop"
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-border-strong text-sm text-text-primary"
        >
          Edit listing
        </Link>
      ) : (
        <div className="flex gap-2.5">
          {/* TODO(messages step): open a real conversation once messaging exists. */}
          <button className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-strong text-sm text-text-primary">
            <MessageCircle size={15} /> Message
          </button>
          <PlaceOrderButton
            listingItemId={selected?.id}
            disabled={hasVariants && !selected?.available}
          />
        </div>
      )}
    </div>
  );
}
