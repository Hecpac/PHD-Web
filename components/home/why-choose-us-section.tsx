"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwissCard } from "@/components/ui/swiss-card";
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
        className="text-accent"
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
      "One team carries your project from schematic design through final punch list. That single point of accountability eliminates the costly miscommunications that plague traditional architect-then-contractor workflows.",
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
        className="text-accent"
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
      "We know Dallas\u2013Fort Worth down to the soil reports. Expansive clay conditions, municipality-specific permitting timelines, HOA design review boards\u2014our local expertise keeps your project moving without avoidable delays.",
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
        className="text-accent"
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
      "Every line item, allowance, and change order is visible to you in real time. Our open-book budgeting and documented decision gates mean you approve costs before they're committed\u2014never after.",
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
        className="text-accent"
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
      "Vetted trade partners, third-party inspections at every critical milestone, and construction detailing that honors the original architectural intent. The result is a home that performs as well as it photographs.",
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
        className="text-accent"
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
      "Your priorities\u2014not ours\u2014define the project. We listen before we draw, confirm before we build, and adapt when your needs evolve. Every decision is yours to make with clear data behind it.",
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
        className="text-accent"
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

/* ── Component ───────────────────────────────────────── */

const HEADING_ID = "why-choose-us-heading";

export function WhyChooseUsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      // Stagger reveal for the cards
      createStaggerReveal({
        trigger: gridRef.current,
        targets: gsap.utils.toArray<HTMLElement>(
          gridRef.current.querySelectorAll(".why-card"),
        ),
        stagger: 0.09,
        y: 48,
        start: "top 80%",
      });

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

      // Velocity-based skew on marquee
      if (marqueeRef.current) {
        const marqueeEl = marqueeRef.current;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReduced) {
          // Create a ScrollTrigger to track scroll velocity
          const velocityTracker = ScrollTrigger.create({
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
          return () => {
            velocityTracker.kill();
          };
        }
      }
    },
    { scope: gridRef },
  );

  return (
    <section
      id="why-choose-us"
      className="section-shell border-t border-line"
      aria-labelledby={HEADING_ID}
    >
      <Container swiss className="space-y-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Dallas\u2013Fort Worth\u2019s architecture-first builder"
            description="Design and construction under one roof, backed by deep local knowledge. Here\u2019s what sets our Dallas\u2013Fort Worth custom home process apart."
            className="[&_h2]:scroll-mt-24"
          />
        </div>

        {/* "BUILT TO OUTLAST" marquee */}
        <div className="overflow-hidden" aria-hidden="true">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap motion-safe:animate-[swiss-marquee_20s_linear_infinite]"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="shrink-0 text-[12vw] font-black uppercase tracking-tighter text-ink/[0.04]"
              >
                BUILT TO OUTLAST&ensp;
              </span>
            ))}
          </div>
        </div>

        {/* Decorative beam above the grid */}
        <SwissBeam direction="horizontal" length="100%" thickness={1} />

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <SwissCard key={item.id} spotlight className="why-card">
              <article aria-labelledby={`why-card-title-${item.id}`}>
                {/* Icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center border border-line bg-canvas">
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  id={`why-card-title-${item.id}`}
                  className="type-heading"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </article>
            </SwissCard>
          ))}
        </div>

        {/* Decorative beam below the grid */}
        <SwissBeam direction="horizontal" length="100%" thickness={1} delay={0.3} />
      </Container>

      {/* Hidden label for aria-labelledby (visual heading is inside SectionHeading) */}
      <span id={HEADING_ID} className="sr-only">
        Why Choose Us
      </span>
    </section>
  );
}
