import Link from "next/link";

import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/types/content";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border border-line bg-surface mi-card-lift",
        className,
      )}
    >
      {/* Image placeholder for future cover images */}
      <div
        className="relative aspect-[16/9] w-full bg-surface-2"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-10 w-10 text-muted/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
        </div>
      </div>

      {/* Top accent line on hover */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="type-mono-label text-accent">{post.category}</span>
            <span className="text-xs text-muted">{post.readTime}</span>
          </div>
          <h2 className="type-heading transition-colors duration-150 group-hover:text-accent">
            <Link
              href={`/blogs/${post.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-sm leading-6 text-muted line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <footer className="mt-6 border-t border-line pt-4">
          <p className="text-xs text-muted">
            {post.author} &middot;{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </footer>
      </div>
    </article>
  );
}
