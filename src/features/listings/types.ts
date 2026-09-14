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
