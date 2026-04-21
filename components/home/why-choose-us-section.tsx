"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwissBeam } from "@/components/ui/swiss-beam";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { createStaggerReveal } from "@/lib/gsap/scroll-animations";
import { animateSwissEntrance } from "@/lib/gsap/animations";

/* ── Differentiator data ─────────────────────────────── */

const ICON_CLASS = "text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white";

const differentiatorDefs = [
  {
    id: "design-build",
    titleKey: "reason1Title",
    descriptionKey: "reason1Description",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={ICON_CLASS}>
        <path d="M4 24L14 4l10 20H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="14" y1="10" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "dfw-expertise",
    titleKey: "reason2Title",
    descriptionKey: "reason2Description",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={ICON_CLASS}>
        <circle cx="14" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 2C8.48 2 4 6.48 4 12c0 7 10 14 10 14s10-7 10-14c0-5.52-4.48-10-10-10z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    id: "transparent-process",
    titleKey: "reason3Title",
    descriptionKey: "reason3Description",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={ICON_CLASS}>
        <rect x="4" y="4" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="10" y2="24" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "quality-craftsmanship",
    titleKey: "reason4Title",
    descriptionKey: "reason4Description",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={ICON_CLASS}>
        <path d="M6 22l4-8 4 4 4-10 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "client-first",
    titleKey: "reason5Title",
    descriptionKey: "reason5Description",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={ICON_CLASS}>
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 24c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "documented-decisions",
    titleKey: "reason6Title",
    descriptionKey: "reason6Description",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={ICON_CLASS}>
        <rect x="6" y="3" width="16" height="22" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="19" x2="15" y2="19" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const MARQUEE_KEYS = ["marquee1", "marquee2", "marquee3", "marquee4", "marquee5", "marquee6", "marquee7", "marquee8"] as const;

/* ── Component ───────────────────────────────────────── */

const HEADING_ID = "why-choose-us-title";

export function WhyChooseUsSection() {
  const t = useTranslations("whyChooseUs");
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      // Stagger reveal for the cards
      const staggerReveal = createStaggerReveal({
        trigger: gridRef.current,
        targets: gsap.utils.toArray<HTMLElement>(
          gridRef.current.querySelectorAll(".why-card"),
        ),
        stagger: 0.09,
        y: 48,
        start: "top 80%",
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Heading entrance animation
        if (headingRef.current) {
          animateSwissEntrance(headingRef.current, {
            y: 32,
            duration: 0.8,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // Card row choreography for icon/title/copy
        const cardBodies = gsap.utils.toArray<HTMLElement>(
          gridRef.current!.querySelectorAll(".why-card article"),
        );

        cardBodies.forEach((card) => {
          const rows = gsap.utils.toArray<HTMLElement>(card.querySelectorAll("[data-why-row]"));
          if (!rows.length) return;

          gsap.from(rows, {
            opacity: 0,
            y: 20,
            stagger: 0.06,
            duration: 0.58,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });
      });

      // Velocity-based skew on marquee
      let velocityTracker: ScrollTrigger | null = null;
      if (marqueeRef.current) {
        const marqueeEl = marqueeRef.current;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReduced) {
          // Create a ScrollTrigger to track scroll velocity
          velocityTracker = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              const clampedSkew = gsap.utils.clamp(-15, 15, velocity * -0.015);
              gsap.to(marqueeEl, {
                skewX: clampedSkew,
                ease: "power3.out",
                duration: 0.3,
                overwrite: true,
              });
            },
          });
        }
      }

      return () => {
        staggerReveal.revert();
        mm.revert();
        velocityTracker?.kill();
      };
    },
    { scope: gridRef },
  );

  return (
    <section
      id="why-choose-us"
      className="section-shell section-brand-wash-bold border-t border-line section-brand-divider"
      aria-labelledby={HEADING_ID}
    >
      <Container swiss className="space-y-10">
        <div ref={headingRef}>
          <SectionHeading
            titleId={HEADING_ID}
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="[&_h2]:scroll-mt-24"
          />
        </div>

        {/* Marquee highlights */}
        <div className="overflow-hidden" aria-hidden="true">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap will-change-transform motion-safe:animate-[swiss-marquee_17s_linear_infinite] sm:motion-safe:animate-[swiss-marquee_20s_linear_infinite] lg:motion-safe:animate-[swiss-marquee_24s_linear_infinite] motion-safe:hover:[animation-play-state:paused]"
          >
            {MARQUEE_KEYS.map((key) => (
              <span
                key={key}
                className="mr-4 inline-flex min-h-10 shrink-0 items-center rounded-full bg-canvas/80 px-4 text-[0.68rem] font-mono uppercase tracking-[0.08em] text-ink/80 pointer-events-none select-none"
              >
                {t(key)}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative beam above the grid */}
        <SwissBeam direction="horizontal" length="100%" thickness={1} />

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentiatorDefs.map((item) => (
            <article
              key={item.id}
              aria-labelledby={`why-card-title-${item.id}`}
              className="why-card relative overflow-hidden group flex min-h-[clamp(18rem,34vw,24rem)] flex-col rounded-xl border border-line bg-surface p-6 sm:p-8 md:p-10 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 active:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgba(203,33,49,0.3)] hover:border-accent active:border-accent"
            >
              <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col h-full">
                <div data-why-row className="mb-6 flex h-14 w-14 items-center justify-center rounded-md border border-line bg-accent/8 transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/10">
                  {item.icon}
                </div>

                <h3
                  id={`why-card-title-${item.id}`}
                  data-why-row
                  className="mb-3 type-h3-standard text-ink transition-colors duration-500 group-hover:text-white"
                >
                  {t(item.titleKey)}
                </h3>

                <p data-why-row className="text-base leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Decorative beam below the grid */}
        <SwissBeam direction="horizontal" length="100%" thickness={1} delay={0.3} />
      </Container>

    </section>
  );
}
