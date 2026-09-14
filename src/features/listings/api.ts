import type { BrowseListingsParams, ListingSummary } from "./types";

interface ListingRow {
  id: string;
  title: string;
  display_price: number | null;
  base_price: number;
  cover_image_url: string | null;
  category_id: string;
}

function toListingSummary(row: ListingRow): ListingSummary {
  return {
    id: row.id,
    title: row.title,
    displayPrice: row.display_price ?? row.base_price,
    coverImageUrl: row.cover_image_url,
    categoryId: row.category_id,
  };
}

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL;

/**
 * Public browse feed. Goes through the Worker (not supabase-js) so
 * anonymous visitors share one edge-cached response instead of each
 * hitting Postgres directly — see worker/src/routes/cache.ts.
 * `status = 'active'` is enforced by RLS on the Postgres side, not
 * added here, so this never needs updating if that policy changes.
 */
export async function getBrowseListings({
  categoryId,
  query,
  page = 1,
  pageSize = 20,
}: BrowseListingsParams): Promise<ListingSummary[]> {
  const params = new URLSearchParams({
    select: "id,title,display_price,base_price,cover_image_url,category_id",
    order: "created_at.desc",
    limit: String(pageSize),
    offset: String((page - 1) * pageSize),
  });
  if (categoryId) params.set("category_id", `eq.${categoryId}`);
  if (query) params.set("search_vector", `fts(english).${query}`);

  const res = await fetch(`${WORKER_URL}/browse?${params.toString()}`, {
    next: { revalidate: 30 }, // matches the Worker's own edge-cache TTL
  });

  if (!res.ok) throw new Error(`getBrowseListings: worker returned ${res.status}`);
  const rows = (await res.json()) as ListingRow[];
  return rows.map(toListingSummary);
}
