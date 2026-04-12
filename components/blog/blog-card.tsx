import Link from "next/link";

import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/types/content";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between border-t border-line pt-6 pb-2",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="type-mono-label text-accent">{post.category}</span>
          <span className="text-xs text-muted">{post.readTime}</span>
        </div>
        <h3 className="text-balance text-xl font-semibold leading-tight tracking-tight transition-colors duration-150 group-hover:text-accent sm:text-2xl">
          <Link
            href={`/blogs/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 max-w-prose text-sm leading-6 text-muted">
          {post.excerpt}
        </p>
      </div>

      <footer className="mt-4">
        <p className="text-xs text-muted">
          {formatDate(post.date)}
        </p>
      </footer>
    </article>
  );
}
