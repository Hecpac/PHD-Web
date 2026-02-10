"use client";

import { cn } from "@/lib/utils";

const ALL_CATEGORY = "All" as const;

type BlogCategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function BlogCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: BlogCategoryFilterProps) {
  const allCategories = [ALL_CATEGORY, ...categories];

  return (
    <nav aria-label="Blog category filter">
      <ul
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
        role="list"
      >
        {allCategories.map((category) => {
          const isActive =
            category === ALL_CATEGORY
              ? activeCategory === ALL_CATEGORY
              : activeCategory === category;

          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150",
                  "min-h-[36px] min-w-[36px]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  isActive
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line bg-surface text-muted hover:border-accent/40 hover:text-ink",
                )}
                aria-pressed={isActive}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { ALL_CATEGORY };
