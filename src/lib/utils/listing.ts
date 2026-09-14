import type { ListingCondition } from "@/features/listings/types";

const CONDITION_LABELS: Record<ListingCondition, string> = {
  new: "New",
  like_new: "Like New",
  used: "Used",
  for_parts: "For Parts",
};

export function formatCondition(condition: ListingCondition): string {
  return CONDITION_LABELS[condition];
}
