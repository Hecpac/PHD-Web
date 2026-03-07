"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { BlogPost } from "@/lib/types/content";

import { BlogCard } from "./blog-card";
import { ALL_CATEGORY, BlogCategoryFilter } from "./blog-category-filter";

type BlogListProps = {
  posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category)));
    unique.sort();
    return unique;
  }, [posts]);

  const requestedCategory = searchParams.get("category");
  const activeCategory =
    requestedCategory && categories.includes(requestedCategory)
      ? requestedCategory
      : ALL_CATEGORY;

  useEffect(() => {
    if (!requestedCategory || categories.includes(requestedCategory)) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [categories, pathname, requestedCategory, router, searchParams]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return posts;
    }

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === ALL_CATEGORY) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
    router.push(nextUrl, { scroll: false });
  };

  return (
    <div className="space-y-8">
      <BlogCategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="type-heading text-muted">No posts found</p>
          <p className="mt-2 text-sm text-muted">
            No articles match the selected category. Try selecting a different
            filter.
          </p>
          <button
            type="button"
            onClick={() => handleCategoryChange(ALL_CATEGORY)}
            className="mt-4 rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-colors duration-150 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View all posts
          </button>
        </div>
      )}
    </div>
  );
}
