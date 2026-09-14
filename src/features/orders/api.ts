import { createClient } from "@/lib/supabase/server";
import type { ListingCondition } from "@/features/listings/types";
import type { OrderDetail, OrderLine, OrderListItem, OrderStatus } from "./types";

interface OrderLineRow {
  qty: number;
  unit_price_snapshot: number;
  listing_items: {
    condition: ListingCondition;
    listing_images: { url: string; sort_order: number }[] | null;
    listings: { title: string; cover_image_url: string | null };
  };
}

function pickCoverImage(images: { url: string; sort_order: number }[] | null): string | null {
  if (!images || images.length === 0) return null;
  return [...images].sort((a, b) => a.sort_order - b.sort_order)[0].url;
}

function toOrderLine(row: OrderLineRow): OrderLine {
  return {
    listingTitle: row.listing_items.listings.title,
    condition: row.listing_items.condition,
    qty: row.qty,
    unitPrice: row.unit_price_snapshot,
    imageUrl: pickCoverImage(row.listing_items.listing_images) ?? row.listing_items.listings.cover_image_url,
  };
}

// ------------------------------------------------------------------
// getBuyerOrders
// ------------------------------------------------------------------

interface BuyerOrderRow {
  id: string;
  status: OrderStatus;
  total_amount: number;
  order_date: string;
  shop: { shop_name: string };
  order_lines: OrderLineRow[];
  reviews: { id: string }[] | null;
}

export async function getBuyerOrders(status?: OrderStatus): Promise<OrderListItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  let query = supabase
    .from("shop_orders")
    .select(
      `
      id, status, total_amount, order_date,
      shop:shop_profiles!inner ( shop_name ),
      order_lines (
        qty, unit_price_snapshot,
        listing_items ( condition, listing_images ( url, sort_order ), listings ( title, cover_image_url ) )
      ),
      reviews ( id )
    `
    )
    .eq("buyer_id", user.id)
    .order("order_date", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error(`getBuyerOrders: ${error.message}`);

  return (data as unknown as BuyerOrderRow[]).map((row) => {
    const firstLine = row.order_lines[0];
    return {
      id: row.id,
      status: row.status,
      totalAmount: row.total_amount,
      orderDate: row.order_date,
      listingTitle: firstLine?.listing_items.listings.title ?? "",
      coverImageUrl: firstLine ? toOrderLine(firstLine).imageUrl : null,
      counterpartName: row.shop.shop_name,
      reviewed: (row.reviews?.length ?? 0) > 0,
    };
  });
}

// ------------------------------------------------------------------
// getSellerOrders
// ------------------------------------------------------------------

interface SellerOrderRow {
  id: string;
  status: OrderStatus;
  total_amount: number;
  order_date: string;
  buyer: { display_name: string };
  order_lines: OrderLineRow[];
}

export async function getCurrentShopId(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: shop } = await supabase
    .from("shop_profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  return shop?.id ?? null;
}

export async function getSellerOrders(status?: OrderStatus): Promise<OrderListItem[]> {
  const supabase = await createClient();
  const shopId = await getCurrentShopId();
  if (!shopId) return [];

  let query = supabase
    .from("shop_orders")
    .select(
      `
      id, status, total_amount, order_date,
      buyer:users!inner ( display_name ),
      order_lines (
        qty, unit_price_snapshot,
        listing_items ( condition, listing_images ( url, sort_order ), listings ( title, cover_image_url ) )
      )
    `
    )
    .eq("shop_id", shopId)
    .order("order_date", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error(`getSellerOrders: ${error.message}`);

  return (data as unknown as SellerOrderRow[]).map((row) => {
    const firstLine = row.order_lines[0];
    return {
      id: row.id,
      status: row.status,
      totalAmount: row.total_amount,
      orderDate: row.order_date,
      listingTitle: firstLine?.listing_items.listings.title ?? "",
      coverImageUrl: firstLine ? toOrderLine(firstLine).imageUrl : null,
      counterpartName: row.buyer.display_name,
      reviewed: false,
    };
  });
}

// ------------------------------------------------------------------
// getOrderDetail — shared by both roles; isBuyer distinguishes them
// ------------------------------------------------------------------

interface OrderDetailRow {
  id: string;
  status: OrderStatus;
  total_amount: number;
  order_date: string;
  buyer_id: string;
  buyer: { display_name: string };
  shop: { shop_name: string; user_id: string };
  address: { address_line1: string; address_line2: string | null; city: string };
  order_lines: OrderLineRow[];
  reviews: { id: string }[] | null;
}

export async function getOrderDetail(id: string): Promise<OrderDetail | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("shop_orders")
    .select(
      `
      id, status, total_amount, order_date, buyer_id,
      buyer:users!inner ( display_name ),
      shop:shop_profiles!inner ( shop_name, user_id ),
      address:addresses!inner ( address_line1, address_line2, city ),
      order_lines (
        qty, unit_price_snapshot,
        listing_items ( condition, listing_images ( url, sort_order ), listings ( title, cover_image_url ) )
      ),
      reviews ( id )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  const row = data as unknown as OrderDetailRow;
  const isBuyer = row.buyer_id === user.id;

  return {
    id: row.id,
    status: row.status,
    totalAmount: row.total_amount,
    orderDate: row.order_date,
    isBuyer,
    counterpartName: isBuyer ? row.shop.shop_name : row.buyer.display_name,
    address: {
      line1: row.address.address_line1,
      line2: row.address.address_line2,
      city: row.address.city,
    },
    lines: row.order_lines.map(toOrderLine),
    reviewed: (row.reviews?.length ?? 0) > 0,
  };
}
