import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteUrl } from "@/lib/config/site";
import { getReviews } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Reviews | Client Testimonials",
    description:
      "Read what homeowners across Dallas-Fort Worth say about our design-build process, quality, and communication.",
    openGraph: {
      title: "Reviews | DFW Custom Home Client Testimonials",
      description:
        "Read what homeowners across Dallas-Fort Worth say about our design-build process, quality, and communication.",
    },
    alternates: {
      canonical: `${siteUrl}/reviews`,
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

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Reviews", href: "/reviews" },
        ])}
      />
      <section className="section-shell" aria-labelledby="reviews-heading">
        <Container swiss className="space-y-10">
          <SectionHeading
            as="h1"
            eyebrow="Reviews"
            title="What our DFW homeowners say"
            description="Verified testimonials from clients who have completed the design-build process with our team across the Dallas-Fort Worth Metroplex."
          />

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
                <footer className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-bold text-ink">{review.author}</p>
                  <p className="type-mono-label mt-1 text-muted">
                    {review.location}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {review.projectType} &middot;{" "}
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
