"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ProcessStep } from "@/lib/types/content";

type BlueprintSectionProps = {
  steps: ProcessStep[];
  id?: string;
  withHeading?: boolean;
  /** Render the section heading as h1 on standalone pages. */
  headingAs?: "h1" | "h2";
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

/* ------------------------------------------------------------------ */
/*  Step Card (shared between horizontal and vertical layouts)        */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  index,
  reduceMotion,
}: {
  step: ProcessStep;
  index: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...springTransition, delay: index * 0.08 }}
      className="flex h-full min-w-0 flex-col"
    >
      {/* Large Swiss number */}
      <div className="text-7xl font-bold tabular-nums text-accent lg:text-8xl">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="mt-6 flex flex-1 flex-col space-y-4">
        <h2 className="text-3xl font-bold text-ink">{step.title}</h2>
        <p className="text-lg leading-relaxed text-muted">{step.description}</p>

        {/* Deliverables */}
        {step.deliverables.length > 0 && (
          <div className="pt-4">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.05em] text-muted">
              Deliverables
            </h3>
            <ul className="space-y-2">
              {step.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                  <span className="leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Decision gate */}
        {step.decisionGate ? (
          <p className="mt-auto border-t border-line pt-4 text-sm text-ink">
            <span className="font-bold">Decision Gate:</span> {step.decisionGate}
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Horizontal scroll layout (desktop, motion enabled)                */
/* ------------------------------------------------------------------ */

function HorizontalBlueprint({ steps }: { steps: ProcessStep[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSteps = steps.length;

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>(contentRef.current.children);
    const totalWidth = contentRef.current.scrollWidth - sectionRef.current.offsetWidth;
    const snapPoints = panels.map((_, i) => i / (panels.length - 1));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.5,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        snap: { snapTo: snapPoints, duration: 0.3, delay: 0 },
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.round(progress * (panels.length - 1));
          setActiveIndex(idx);
        },
      },
    });

    tl.to(contentRef.current, {
      x: -totalWidth,
      ease: "none",
    });
  }, { scope: sectionRef });

  const scrollToSnap = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, totalSteps - 1));
    const triggers = ScrollTrigger.getAll();
    const pinTrigger = triggers.find(t => t.vars.trigger === sectionRef.current);
    if (pinTrigger) {
      const progress = clamped / (totalSteps - 1);
      const scrollPos = pinTrigger.start + progress * (pinTrigger.end - pinTrigger.start);
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  }, [totalSteps]);

  const goPrev = useCallback(() => scrollToSnap(activeIndex - 1), [activeIndex, scrollToSnap]);
  const goNext = useCallback(() => scrollToSnap(activeIndex + 1), [activeIndex, scrollToSnap]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  return (
    <div ref={sectionRef} className="mt-16">
      {/* Navigation controls */}
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-sm text-muted" aria-live="polite" aria-atomic="true">
          Step {activeIndex + 1} of {totalSteps}
        </p>

        <div className="flex gap-3" role="group" aria-label="Blueprint navigation">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Previous step"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="text-ink"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === totalSteps - 1}
            aria-label="Next step"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="text-ink"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal content strip (GSAP pin+scrub handles scrolling) */}
      <div
        ref={contentRef}
        role="region"
        aria-label="Process steps"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex gap-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="w-[min(85vw,380px)] flex-shrink-0 md:w-[min(60vw,420px)] lg:w-[min(40vw,440px)]"
            role="group"
            aria-roledescription="step"
            aria-label={`Step ${idx + 1}: ${step.title}`}
          >
            <StepCard step={step} index={idx} reduceMotion={false} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-1" role="group" aria-label="Process step indicators">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            type="button"
            aria-label={`Go to step ${idx + 1}: ${step.title}`}
            aria-current={idx === activeIndex ? "step" : undefined}
            onClick={() => scrollToSnap(idx)}
            className="flex min-h-[24px] min-w-[24px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span
              className={`block h-2 w-2 rounded-full transition-[transform,opacity] duration-200 ${
                idx === activeIndex
                  ? "scale-x-[3] bg-accent"
                  : "scale-x-100 bg-line"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vertical fallback (reduced motion / original layout)              */
/* ------------------------------------------------------------------ */

function VerticalBlueprint({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mt-16 space-y-24">
      {steps.map((step, idx) => (
        <article
          key={step.id}
          className="grid grid-cols-[auto_1fr] gap-8 lg:gap-16"
        >
          {/* Large Swiss number */}
          <div className="text-7xl font-bold tabular-nums text-accent lg:text-8xl">
            {String(idx + 1).padStart(2, "0")}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-ink">{step.title}</h2>
            <p className="text-lg leading-relaxed text-muted">
              {step.description}
            </p>

            {step.deliverables.length > 0 && (
              <div className="pt-4">
                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.05em] text-muted">
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                      <span className="leading-relaxed text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.decisionGate ? (
              <p className="border-t border-line pt-4 text-sm text-ink">
                <span className="font-bold">Decision Gate:</span> {step.decisionGate}
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                           */
/* ------------------------------------------------------------------ */

export function BlueprintSection({
  steps,
  id = "blueprint",
  withHeading = true,
  headingAs,
}: BlueprintSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={id} className="section-shell overflow-x-clip border-t border-line">
      <Container swiss>
        {withHeading ? (
          <SectionHeading
            as={headingAs}
            eyebrow="The Blueprint"
            title="Process defined by decision gates"
            description="Each phase has clear inputs, outputs, and approval thresholds. Nothing moves forward without alignment."
          />
        ) : null}

        {shouldReduceMotion ? (
          <VerticalBlueprint steps={steps} />
        ) : (
          <HorizontalBlueprint steps={steps} />
        )}
      </Container>
    </section>
  );
}
