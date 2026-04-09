import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BlogArticle } from "@/components/blog/blog-article";
import { JsonLd } from "@/components/ui/json-ld";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { getSiteUrl } from "@/lib/config/site";
import {
  createBlogBreadcrumbSchema,
  createBlogPostSchema,
} from "@/lib/seo/schema";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const LEGACY_BLOG_SLUGS: Record<string, string> = {
  "true-cost-building-custom-home-dfw-2025": "true-cost-building-custom-home-dfw-2026",
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = LEGACY_BLOG_SLUGS[slug] ?? slug;
  const post = await getBlogPostBySlug(resolvedSlug);
  const siteUrl = getSiteUrl();

  if (!post) {
    return {
      title: "Post Not Found",
      alternates: {
        canonical: `${siteUrl}/blogs`,
      },
    };
  }

  const articleUrl = `${siteUrl}/blogs/${post.slug}`;
  const twitterImage = post.coverImage?.src ? `${siteUrl}${post.coverImage.src}` : `${siteUrl}/og-default.jpg`;

  return {
    title: `${post.title} | Custom Home Blog — DFW · North Texas · S. Oklahoma`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: articleUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      ...(post.coverImage?.src && {
        images: [{ url: `${siteUrl}${post.coverImage.src}`, alt: post.coverImage.alt, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: post.coverImage?.src ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: [twitterImage],
    },
    other: {
      "geo.region": "US-TX",
      "geo.placename": "Dallas-Fort Worth, TX",
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const redirectedSlug = LEGACY_BLOG_SLUGS[slug];

  if (redirectedSlug) {
    redirect(`/blogs/${redirectedSlug}`);
  }

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={createBlogBreadcrumbSchema(post)} />
      <JsonLd data={createBlogPostSchema(post)} />
      <BlogArticle post={post} />
    </>
  );
}
