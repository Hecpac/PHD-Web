"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwissBeam } from "@/components/ui/swiss-beam";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { createStaggerReveal } from "@/lib/gsap/scroll-animations";
import { animateSwissEntrance } from "@/lib/gsap/animations";

/* ── Differentiator data ─────────────────────────────── */

const differentiators = [
  {
    id: "design-build",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white"
      >
        <path
          d="M4 24L14 4l10 20H4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line
          x1="14"
          y1="10"
          x2="14"
          y2="18"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Integrated Design-Build",
    description:
      "One team carries your project from schematic design through final punch list. That single point of accountability eliminates the costly miscommunications that plague traditional designer-then-contractor workflows.",
  },
  {
    id: "dfw-expertise",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white"
      >
        <circle cx="14" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M14 2C8.48 2 4 6.48 4 12c0 7 10 14 10 14s10-7 10-14c0-5.52-4.48-10-10-10z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
    title: "DFW Market Fluency",
    description:
      "We know Dallas–Fort Worth down to the soil reports. Expansive clay conditions, municipality-specific permitting timelines, HOA design review boards—our local expertise keeps your project moving without avoidable delays.",
  },
  {
    id: "transparent-process",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white"
      >
        <rect
          x="4"
          y="4"
          width="20"
          height="20"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="4"
          y1="10"
          x2="24"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="10"
          x2="10"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Open-Book Transparency",
    description:
      "Every line item, allowance, and change order is visible to you in real time. Our open-book budgeting and documented decision gates mean you approve costs before they're committed—never after.",
  },
  {
    id: "quality-craftsmanship",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white"
      >
        <path
          d="M6 22l4-8 4 4 4-10 4 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Uncompromised Craft",
    description:
      "Vetted trade partners, third-party inspections at every critical milestone, and construction detailing that honors the original design intent. The result is a home that performs as well as it photographs.",
  },
  {
    id: "client-first",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white"
      >
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 24c0-4.42 3.58-8 8-8s8 3.58 8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Client-Driven Scope",
    description:
      "Your priorities—not ours—define the project. We listen before we draw, confirm before we build, and adapt when your needs evolve. Every decision is yours to make with clear data behind it.",
  },
  {
    id: "documented-decisions",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-accent transition-[transform,color] duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white"
      >
        <rect
          x="6"
          y="3"
          width="16"
          height="22"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="9"
          x2="18"
          y2="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="14"
          x2="18"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="19"
          x2="15"
          y2="19"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Full Documentation Trail",
    description:
      "Every approval, specification, and change order is recorded and accessible. A complete paper trail protects your investment and ensures nothing agreed upon gets lost between design and construction.",
  },
];

const marqueeHighlights = [
  "Design-Led Planning",
  "Open-Book Budgeting",
  "Decision Gates",
  "DFW Permit Fluency",
  "Milestone QA",
  "Trade Partner Network",
  "Client-Driven Scope",
  "Schedule Discipline",
];

/* ── Component ───────────────────────────────────────── */

const HEADING_ID = "why-choose-us-title";

export function WhyChooseUsSection() {
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
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
            eyebrow="Why Choose Us"
            title="Dallas–Fort Worth’s design-first builder"
            description="Design and construction under one roof, backed by deep local knowledge. Here’s what sets our Dallas–Fort Worth custom home process apart."
            className="[&_h2]:scroll-mt-24"
          />
        </div>

        {/* Marquee highlights */}
        <div className="overflow-hidden" aria-hidden="true">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap will-change-transform motion-safe:animate-[swiss-marquee_17s_linear_infinite] sm:motion-safe:animate-[swiss-marquee_20s_linear_infinite] lg:motion-safe:animate-[swiss-marquee_24s_linear_infinite] motion-safe:hover:[animation-play-state:paused]"
          >
            {marqueeHighlights.map((item) => (
              <span
                key={item}
                className="mr-4 inline-flex min-h-10 shrink-0 items-center rounded-full bg-canvas/80 px-4 text-[0.68rem] font-mono uppercase tracking-[0.08em] text-ink/80 pointer-events-none select-none"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative beam above the grid */}
        <SwissBeam direction="horizontal" length="100%" thickness={1} />

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <article
              key={item.id}
              aria-labelledby={`why-card-title-${item.id}`}
              className="why-card relative overflow-hidden group flex min-h-[clamp(18rem,34vw,24rem)] flex-col rounded-xl border border-line bg-surface p-6 sm:p-8 md:p-10 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(203,33,49,0.3)] hover:border-accent"
            >
              {/* Luxurious animated red background */}
              <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div data-why-row className="mb-6 flex h-14 w-14 items-center justify-center rounded-md border border-line bg-accent/8 transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/10">
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  id={`why-card-title-${item.id}`}
                  data-why-row
                  className="mb-3 type-h3-standard text-ink transition-colors duration-500 group-hover:text-white"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p data-why-row className="text-base leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">
                  {item.description}
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
