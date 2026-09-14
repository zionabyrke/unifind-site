import { createClient } from "@/lib/supabase/server";
import type { Category } from "./types";

interface CategoryRow {
  id: string;
  name: string;
  parent_category_id: string | null;
}

function toCategory(row: CategoryRow): Category {
  return { id: row.id, name: row.name, parentCategoryId: row.parent_category_id };
}

/** Top-level categories only — matches the chip row on Home. */
export async function getTopLevelCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, parent_category_id")
    .is("parent_category_id", null)
    .order("name");

  if (error) throw new Error(`getTopLevelCategories: ${error.message}`);
  return (data as CategoryRow[]).map(toCategory);
}
