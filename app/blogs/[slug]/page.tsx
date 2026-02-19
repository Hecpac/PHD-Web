import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!post) {
    return {
      title: "Post Not Found",
      alternates: {
        canonical: `${siteUrl}/blogs`,
      },
    };
  }

  return {
    title: `${post.title} | DFW Custom Home Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blogs/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      ...(post.coverImage?.src && {
        images: [{ url: post.coverImage.src, alt: post.coverImage.alt, width: 1200, height: 630 }],
      }),
    },
    other: {
      "geo.region": "US-TX",
      "geo.placename": "Dallas-Fort Worth, TX",
    },
    alternates: {
      canonical: `${siteUrl}/blogs/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
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
