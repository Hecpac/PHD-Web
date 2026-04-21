"use client";

import React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { SwissMarquee } from "@/components/ui/swiss-marquee";
import type { Review } from "@/lib/types/content";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  reviews: Review[];
};

function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <article
      className={cn(
        "brand-red-outline brand-red-surface flex h-full flex-col justify-between rounded-xl border border-line bg-surface p-6 sm:p-8 w-[320px] md:w-[400px] shrink-0",
        className
      )}
    >
      <div className="space-y-4">
        <StarRating rating={review.rating} />
        <blockquote className="text-base leading-relaxed text-ink/90">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>
      <div className="mt-8 border-t border-line/80 pt-6">
        <p className="text-base font-bold text-ink">{review.author}</p>
        <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
          {review.location} · {review.projectType}
        </p>
      </div>
    </article>
  );
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const t = useTranslations("testimonials");
  const shouldReduceMotion = useReducedMotion();

  if (!reviews || reviews.length === 0) return null;

  // Split reviews into two rows for the marquee
  // If there are few reviews, duplicate them to ensure the marquee fills the screen nicely
  const displayReviews = reviews.length < 6 ? [...reviews, ...reviews, ...reviews] : reviews;
  const half = Math.ceil(displayReviews.length / 2);
  const row1 = displayReviews.slice(0, half);
  const row2 = displayReviews.slice(half);

  return (
    <section
      id="testimonials"
      className="section-shell section-shell-tight section-brand-wash-bold overflow-hidden"
      aria-label="Client testimonials"
    >
      <Container swiss className="mb-12 sm:mb-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/reviews"
            className="mb-2 inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-[0.05em] text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>

      {/* Marquee Grid */}
      <div className="flex flex-col gap-6 sm:gap-8 pb-4">
        {shouldReduceMotion ? (
          <Container swiss>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 3).map((review, i) => (
                <ReviewCard key={`${review.id}-${i}`} review={review} className="w-full md:w-full" />
              ))}
            </div>
          </Container>
        ) : (
          <>
            <SwissMarquee speed={30} direction="left" className="border-y-0 py-0" gap="1.5rem">
              {row1.map((review, i) => (
                <ReviewCard key={`${review.id}-${i}-row1`} review={review} />
              ))}
            </SwissMarquee>

            {row2.length > 0 && (
              <SwissMarquee speed={25} direction="right" className="border-y-0 py-0" gap="1.5rem">
                {row2.map((review, i) => (
                  <ReviewCard key={`${review.id}-${i}-row2`} review={review} />
                ))}
              </SwissMarquee>
            )}
          </>
        )}
      </div>
    </section>
  );
}
