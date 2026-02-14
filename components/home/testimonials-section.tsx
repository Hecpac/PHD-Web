"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { CarouselDots, CarouselPrevButton, CarouselNextButton, useCarouselButtons } from "@/components/ui/carousel-controls";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import type { Review } from "@/lib/types/content";

type TestimonialsSectionProps = {
  reviews: Review[];
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-line bg-surface p-6">
      <div className="space-y-4">
        <StarRating rating={review.rating} />
        <blockquote className="text-sm leading-relaxed text-ink/90">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>
      <footer className="mt-6 border-t border-line pt-4">
        <p className="text-sm font-semibold text-ink">{review.author}</p>
        <p className="font-mono text-xs text-muted">
          {review.location} · {review.projectType}
        </p>
      </footer>
    </article>
  );
}

function DesktopDragCard({ review, dragX, index, cardWidth }: { review: Review; dragX: ReturnType<typeof useMotionValue<number>>; index: number; cardWidth: number }) {
  const cardX = useTransform(dragX, (v) => v + index * cardWidth);
  const scale = useTransform(cardX, [-cardWidth, 0, cardWidth], [0.9, 1, 0.9]);
  const opacity = useTransform(cardX, [-cardWidth, 0, cardWidth], [0.3, 1, 0.3]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="min-w-[33%] flex-shrink-0"
    >
      <ReviewCard review={review} />
    </motion.div>
  );
}

function DesktopDragSlider({ reviews }: { reviews: Review[] }) {
  const dragX = useMotionValue(0);
  const cardWidth = 400;

  return (
    <div className="hidden md:block overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: -(cardWidth * (reviews.length - 1)), right: 0 }}
        dragElastic={0.1}
        style={{ x: dragX }}
        className="flex cursor-grab gap-6 active:cursor-grabbing"
      >
        {reviews.map((review, i) => (
          <DesktopDragCard
            key={review.id}
            review={review}
            dragX={dragX}
            index={i}
            cardWidth={cardWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const displayReviews = reviews.slice(0, 3);
  const shouldReduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    duration: shouldReduceMotion ? 0 : 20,
  });
  const { canPrev, canNext, scrollPrev, scrollNext } = useCarouselButtons(emblaApi);

  if (displayReviews.length === 0) return null;

  return (
    <section id="testimonials" className="section-shell" aria-label="Client testimonials">
      <Container swiss className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Testimonials"
            title="Confidence built through evidence, not claims"
            description="Our process is designed to reduce surprises and keep design quality intact during execution."
          />
          <Link
            href="/reviews"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View all reviews
          </Link>
        </div>

        {/* Desktop: Drag slider or static grid (reduced motion) */}
        {shouldReduceMotion ? (
          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {displayReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <DesktopDragSlider reviews={displayReviews} />
        )}

        {/* Mobile: Embla carousel */}
        <div className="md:hidden">
          <div
            ref={emblaRef}
            className="overflow-hidden"
            aria-roledescription="carousel"
            aria-label="Client testimonials carousel"
          >
            <div className="flex" aria-live="polite">
              {displayReviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 flex-[0_0_100%] px-1"
                  role="group"
                  aria-roledescription="slide"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {displayReviews.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <CarouselPrevButton onClick={scrollPrev} disabled={!canPrev} aria-label="Previous review" />
              <CarouselDots emblaApi={emblaApi} />
              <CarouselNextButton onClick={scrollNext} disabled={!canNext} aria-label="Next review" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
