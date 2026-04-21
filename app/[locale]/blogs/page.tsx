import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogList } from "@/components/blog/blog-list";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadMagnetBanner } from "@/components/ui/lead-magnet-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getBlogPosts } from "@/lib/data";
import {
  createBlogBreadcrumbSchema,
  createBlogCollectionSchema,
} from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("blogsPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${siteUrl}/blogs`,
      languages: { en: `${siteUrl}/en/blogs`, es: `${siteUrl}/es/blogs` },
      types: {
        "application/rss+xml": "/blogs/feed.xml",
      },
    },
  };
}

function BlogListFallback({ posts }: { posts: Awaited<ReturnType<typeof getBlogPosts>> }) {
  return (
    <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blogsPage");
  const posts = await getBlogPosts(locale);

  return (
    <>
      <JsonLd data={createBlogBreadcrumbSchema()} />
      <JsonLd data={createBlogCollectionSchema(posts)} />
      <section className="section-shell" aria-labelledby="blog-heading">
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h1"
            titleId="blog-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <LeadMagnetBanner compact />

          <Suspense fallback={<BlogListFallback posts={posts} />}>
            <BlogList posts={posts} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
