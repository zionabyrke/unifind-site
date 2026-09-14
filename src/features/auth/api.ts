import { createClient } from "@/lib/supabase/server";
import type { CurrentUser } from "./types";

interface UserRow {
  id: string;
  bu_email: string;
  display_name: string;
  avatar_url: string | null;
}

function toCurrentUser(row: UserRow): CurrentUser {
  return {
    id: row.id,
    email: row.bu_email,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
  };
}

/**
 * Returns null when signed out - callers decide whether that's an error
 * (protected page) or fine (public page rendering a "sign in" state).
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data, error } = await supabase
    .from("users")
    .select("id, bu_email, display_name, avatar_url")
    .eq("id", authUser.id)
    .single();

  // The on_auth_user_created trigger provisions this row synchronously
  // during sign-up, so a missing row here means something upstream broke -
  // treat it as signed-out rather than crashing the page.
  if (error || !data) return null;

  return toCurrentUser(data as UserRow);
}
