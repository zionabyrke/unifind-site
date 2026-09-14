import { getListingDetail } from "@/features/listings/api";
import { UnavailableListing } from "@/components/listing/UnavailableListing";
import { OwnerNonActiveCard } from "@/components/listing/OwnerNonActiveCard";
import { ListingVariantPicker } from "@/components/listing/ListingVariantPicker";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listing = await getListingDetail(id);

  if (!listing) return <UnavailableListing />;
  if (listing.isOwner && listing.status !== "active") return <OwnerNonActiveCard listing={listing} />;
  return <ListingVariantPicker listing={listing} />;
}
