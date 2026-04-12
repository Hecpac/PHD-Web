"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { BlogPost } from "@/lib/types/content";

import { BlogCard } from "./blog-card";
import { ALL_CATEGORY, BlogCategoryFilter } from "./blog-category-filter";

type BlogListProps = {
  posts: BlogPost[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CATEGORY_ALIASES: Record<string, string> = {};

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
  const normalizedCategory = requestedCategory
    ? CATEGORY_ALIASES[requestedCategory] ?? requestedCategory
    : null;
  const activeCategory =
    normalizedCategory && categories.includes(normalizedCategory)
      ? normalizedCategory
      : ALL_CATEGORY;

  useEffect(() => {
    if (!requestedCategory) {
      return;
    }

    if (
      requestedCategory === normalizedCategory &&
      normalizedCategory &&
      categories.includes(normalizedCategory)
    ) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (normalizedCategory && categories.includes(normalizedCategory)) {
      params.set("category", normalizedCategory);
    } else {
      params.delete("category");
    }

    const currentQuery = searchParams.toString();
    const nextQuery = params.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [
    categories,
    normalizedCategory,
    pathname,
    requestedCategory,
    router,
    searchParams,
  ]);

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

  if (filteredPosts.length === 0) {
    return (
      <div className="space-y-8">
        <BlogCategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
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
      </div>
    );
  }

  const [leadPost, ...remainingPosts] = filteredPosts;

  return (
    <div className="space-y-10">
      <BlogCategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Lead article */}
      <article className="group relative border-b border-line pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="type-mono-label text-accent">{leadPost.category}</span>
            <span className="text-xs text-muted">{leadPost.readTime}</span>
          </div>
          <h2 className="type-display max-w-3xl text-balance transition-colors duration-150 group-hover:text-accent">
            <Link
              href={`/blogs/${leadPost.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {leadPost.title}
            </Link>
          </h2>
          <p className="type-subhead max-w-prose text-muted">
            {leadPost.excerpt}
          </p>
          <p className="text-xs text-muted">
            {leadPost.author} &middot; {formatDate(leadPost.date)}
          </p>
        </div>
      </article>

      {/* Remaining articles */}
      {remainingPosts.length > 0 ? (
        <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
          {remainingPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
