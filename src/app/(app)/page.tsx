import { getTopLevelCategories } from "@/features/categories/api";
import { getBrowseListings } from "@/features/listings/api";
import { CategoryChips } from "@/components/home/CategoryChips";
import { ListingGrid } from "@/components/home/ListingGrid";

interface HomePageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category, q } = await searchParams;

  const [categories, listings] = await Promise.all([
    getTopLevelCategories(),
    getBrowseListings({ categoryId: category, query: q }),
  ]);

  return (
    <div className="px-4 py-4 md:px-6">
      <CategoryChips categories={categories} />
      <ListingGrid listings={listings} />
    </div>
  );
}
