export interface ListingSummary {
  id: string;
  title: string;
  /** Cheapest active item's price, or the seller's base price if no items yet. */
  displayPrice: number;
  coverImageUrl: string | null;
  categoryId: string;
}

export interface BrowseListingsParams {
  categoryId?: string;
  query?: string;
  page?: number;
  pageSize?: number;
}

export type ListingCondition = "new" | "like_new" | "used" | "for_parts";
export type ListingStatus = "active" | "sold_out" | "removed";

export interface ListingVariant {
  id: string;
  /** e.g. "S", "Red / M". Empty string when the listing has no variations. */
  label: string;
  price: number;
  stockQty: number;
  condition: ListingCondition;
  imageUrl: string | null;
  /** True only when the item itself is active AND in stock - purchasable */
  available: boolean;
}

export interface ListingDetail {
  id: string;
  title: string;
  description: string | null;
  status: ListingStatus;
  /** "Parent → Child", or just "Child" if it's a top-level category */
  categoryPath: string;
  basePrice: number;
  shop: {
    id: string;
    name: string;
    ratingAvg: number;
  };
  /** True when the signed-in user owns the shop this listing belongs to */
  isOwner: boolean;
  variants: ListingVariant[];
}
