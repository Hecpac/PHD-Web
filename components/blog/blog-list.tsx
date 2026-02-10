"use client";

import { useMemo, useState } from "react";

import type { BlogPost } from "@/lib/types/content";

import { BlogCard } from "./blog-card";
import { ALL_CATEGORY, BlogCategoryFilter } from "./blog-category-filter";

type BlogListProps = {
  posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    unique.sort();
    return unique;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div className="space-y-8">
      <BlogCategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
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
            onClick={() => setActiveCategory(ALL_CATEGORY)}
            className="mt-4 rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-colors duration-150 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View all posts
          </button>
        </div>
      )}
    </div>
  );
}
