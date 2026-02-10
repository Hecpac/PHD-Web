import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { BlogPost } from "@/lib/types/content";

type BlogArticleProps = {
  post: BlogPost;
};

export function BlogArticle({ post }: BlogArticleProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const paragraphs = post.content?.split("\n\n").filter(Boolean) ?? [];

  return (
    <article className="section-shell">
      <Container className="max-w-3xl space-y-8">
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
            <li aria-current="page" className="text-ink truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {post.category}
            </span>
            <span className="text-xs text-muted">{post.readTime}</span>
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{post.author}</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </header>

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

        <div className="space-y-6 text-base leading-7 text-muted">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

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
