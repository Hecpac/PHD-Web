import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getReviews } from "@/lib/data";
import { createBreadcrumbSchema, createReviewPageSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const t = await getTranslations("reviewsPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "reviews",
      "testimonials",
      "client feedback",
      "custom homes",
      "DFW",
      "North Texas",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PHDhomes",
    },
    alternates: {
      canonical: `${siteUrl}/reviews`,
      languages: { en: `${siteUrl}/en/reviews`, es: `${siteUrl}/es/reviews` },
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={i < rating ? "text-accent" : "text-line"}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reviewsPage");
  const reviews = await getReviews(locale);
  const dateLocale = locale === "es" ? "es-ES" : "en-US";

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: t("breadcrumbHome"), href: "/" },
          { name: t("breadcrumbReviews"), href: "/reviews" },
        ])}
      />
      <JsonLd data={createReviewPageSchema(reviews)} />
      <section className="section-shell" aria-labelledby="reviews-heading">
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h1"
            titleId="reviews-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <div className="rounded-xl border border-line bg-surface p-4 text-sm text-muted">
            {t("disclaimer")}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between border border-line bg-surface p-6"
              >
                <div className="space-y-4">
                  <StarRating rating={review.rating} />
                  <blockquote className="text-sm leading-6 text-muted">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>
                <div className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-bold text-ink">{review.author}</p>
                  <p className="type-mono-label mt-1 text-muted">
                    {review.location}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {review.projectType} &middot;{" "}
                    {new Date(review.date).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
