import { PackageSearch } from "lucide-react";
import type { ListingSummary } from "@/features/listings/types";
import { ListingCard } from "./ListingCard";
import { EmptyState } from "@/components/shared/EmptyState";

export function ListingGrid({ listings }: { listings: ListingSummary[] }) {
  if (listings.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <EmptyState icon={PackageSearch} title="No listings found" description="Try a different category or search." />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
