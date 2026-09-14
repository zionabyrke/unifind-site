"use server";

import { createClient } from "@/lib/supabase/server";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export async function createOrderAction(
  listingItemId: string,
  qty: number
): Promise<ActionResult<{ orderId: string }>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  // Prefer the default address; fall back to whichever one exists.
  const { data: addressRow } = await supabase
    .from("user_addresses")
    .select("address_id")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!addressRow) {
    return { ok: false, error: "Add a meetup address in your profile before placing an order." };
  }

  const { data, error } = await supabase.rpc("create_order", {
    p_listing_item_id: listingItemId,
    p_qty: qty,
    p_address_id: addressRow.address_id,
  });

  if (error) return { ok: false, error: error.hint ?? error.message };
  return { ok: true, data: { orderId: data as string } };
}

export async function respondToOrderAction(
  orderId: string,
  decision: "accepted" | "rejected"
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("respond_to_order", {
    p_order_id: orderId,
    p_decision: decision,
  });
  if (error) return { ok: false, error: error.hint ?? error.message };
  return { ok: true, data: undefined };
}

export async function completeOrderAction(orderId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("complete_order", { p_order_id: orderId });
  if (error) return { ok: false, error: error.hint ?? error.message };
  return { ok: true, data: undefined };
}

export async function cancelOrderAction(orderId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("cancel_order", { p_order_id: orderId });
  if (error) return { ok: false, error: error.hint ?? error.message };
  return { ok: true, data: undefined };
}
