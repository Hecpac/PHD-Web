import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import type { BlogPost } from "@/lib/types/content";

import { BlogRichText } from "./blog-rich-text";

type BlogArticleProps = {
  post: BlogPost;
};

export function BlogArticle({ post }: BlogArticleProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="section-shell">
      <Container swiss className="max-w-3xl space-y-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blogs" className="hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="max-w-[200px] truncate text-ink sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>

        <hgroup className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {post.category}
            </span>
            <span className="text-xs text-muted">{post.readTime}</span>
          </div>
          <h1 className="type-display text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{post.author}</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </hgroup>

        {post.coverImage && (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={post.coverImage.width}
              height={post.coverImage.height}
              className="w-full object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </div>
        )}

        <BlogRichText content={post.content} />

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-line pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-line bg-surface px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2 border-t border-line pt-8">
          <p className="text-sm text-muted">
            Ready to discuss your custom home project in Dallas-Fort Worth?
          </p>
          <CtaLink
            href="/contact"
            eventName="cta_schedule_click"
            data-analytics-cta="blog_footer_contact"
          >
            Start with Vision Builder
          </CtaLink>
        </div>

        <footer className="border-t border-line pt-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden>&larr;</span>
            Back to all articles
          </Link>
        </footer>
      </Container>
    </article>
  );
}
