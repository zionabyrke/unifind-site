import { createClient } from "@/lib/supabase/server";
import type {
  BrowseListingsParams,
  ListingCondition,
  ListingDetail,
  ListingStatus,
  ListingSummary,
  ListingVariant,
} from "./types";

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

if (!WORKER_URL) {
  throw new Error(
    "NEXT_PUBLIC_WORKER_URL is not set. Add it to .env.local (e.g. " +
      "http://127.0.0.1:8787 while running `wrangler dev`) and restart `next dev`."
  );
}

/**
 * Public browse feed. Goes through the Worker (not supabase-js) so
 * anonymous visitors share one edge-cached response instead of each
 * hitting Postgres directly - see worker/src/routes/cache.ts.
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

// ------------------------------------------------------------------
// getListingDetail
// ------------------------------------------------------------------

interface ListingDetailRow {
  id: string;
  title: string;
  description: string | null;
  base_price: number;
  status: ListingStatus;
  category: {
    name: string;
    parent: { name: string } | null;
  } | null;
  shop: {
    id: string;
    shop_name: string;
    shop_rating_avg: number;
    user_id: string;
  };
  listing_items: {
    id: string;
    price: number;
    qty_in_stock: number;
    condition: ListingCondition;
    status: string;
    listing_images: { url: string; sort_order: number }[] | null;
    listing_configurations: { variation_options: { value: string } }[] | null;
  }[];
}

function buildVariantLabel(
  configurations: { variation_options: { value: string } }[] | null
): string {
  if (!configurations || configurations.length === 0) return "";
  return configurations.map((c) => c.variation_options.value).join(" / ");
}

function pickCoverImage(images: { url: string; sort_order: number }[] | null): string | null {
  if (!images || images.length === 0) return null;
  return [...images].sort((a, b) => a.sort_order - b.sort_order)[0].url;
}

function toListingDetail(row: ListingDetailRow, currentUserId: string | null): ListingDetail {
  const categoryPath = row.category
    ? row.category.parent
      ? `${row.category.parent.name} → ${row.category.name}`
      : row.category.name
    : "";

  const variants: ListingVariant[] = row.listing_items.map((item) => ({
    id: item.id,
    label: buildVariantLabel(item.listing_configurations),
    price: item.price,
    stockQty: item.qty_in_stock,
    condition: item.condition,
    imageUrl: pickCoverImage(item.listing_images),
    available: item.status === "active" && item.qty_in_stock > 0,
  }));

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    categoryPath,
    basePrice: row.base_price,
    shop: {
      id: row.shop.id,
      name: row.shop.shop_name,
      ratingAvg: row.shop.shop_rating_avg,
    },
    isOwner: currentUserId !== null && row.shop.user_id === currentUserId,
    variants,
  };
}

/**
 * Returns null both when the listing genuinely doesn't exist AND when RLS
 * hides it (a non-active listing viewed by a non-owner) - the two cases
 * are indistinguishable at the query level by design, and the UI is meant
 * to treat them the same way ("this listing isn't available").
 */
export async function getListingDetail(id: string): Promise<ListingDetail | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("listings")
    .select(
      `
      id, title, description, base_price, status,
      category:category_id ( name, parent:parent_category_id ( name ) ),
      shop:shop_profiles!inner ( id, shop_name, shop_rating_avg, user_id ),
      listing_items (
        id, price, qty_in_stock, condition, status,
        listing_images ( url, sort_order ),
        listing_configurations ( variation_options ( value ) )
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return toListingDetail(data as unknown as ListingDetailRow, user?.id ?? null);
}
