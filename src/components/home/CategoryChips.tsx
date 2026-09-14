"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/features/categories/types";

interface CategoryChipsProps {
  categories: Category[];
}

export function CategoryChips({ categories }: CategoryChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeId = searchParams.get("category");

  const setCategory = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("category", id);
    else params.delete("category");
    router.push(`/?${params.toString()}`);
  };

  const chipClass = (active: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs transition-colors ${
      active
        ? "border border-transparent bg-accent-bg text-accent"
        : "border border-border bg-surface-2 text-text-primary"
    }`;

  return (
    <div className="flex gap-2 overflow-x-auto pb-3">
      <button className={chipClass(!activeId)} onClick={() => setCategory(null)}>
        All
      </button>
      {categories.map((c) => (
        <button key={c.id} className={chipClass(activeId === c.id)} onClick={() => setCategory(c.id)}>
          {c.name}
        </button>
      ))}
    </div>
  );
}
