"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/features/orders/actions";

export async function submitReviewAction(
  orderId: string,
  rating: number,
  comment: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_review", {
    p_order_id: orderId,
    p_rating: rating,
    p_comment: comment || undefined,
  });
  if (error) return { ok: false, error: error.hint ?? error.message };
  return { ok: true, data: undefined };
}
