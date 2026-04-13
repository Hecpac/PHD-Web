"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import type { ProcessStep } from "@/lib/types/content";

type BlueprintSectionProps = {
  steps: ProcessStep[];
  id?: string;
  withHeading?: boolean;
  /** Render the section heading as h1 on standalone pages. */
  headingAs?: "h1" | "h2";
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

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
      className="relative h-auto min-w-0 md:h-full"
    >
      <CardContainer containerClassName="h-full" className="w-full h-full">
        <CardBody className="brand-red-outline brand-red-surface flex h-full w-full flex-col rounded-xl border border-line bg-surface p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:shadow-accent/[0.1] transition-[border-color,box-shadow,transform] duration-300">
          {/* Large Swiss number */}
          <CardItem translateZ="50" className="w-fit">
            <div className="text-7xl font-bold tabular-nums text-accent lg:text-8xl drop-shadow-sm">
              {String(index + 1).padStart(2, "0")}
            </div>
          </CardItem>

          <div className="mt-8 flex flex-1 flex-col space-y-4">
            <CardItem translateZ="30">
              <h3 className="type-h3-display text-ink">{step.title}</h3>
            </CardItem>
            
            <CardItem translateZ="20">
              <p className="text-base leading-relaxed text-muted sm:text-lg">{step.description}</p>
            </CardItem>

            {/* Deliverables */}
            {step.deliverables.length > 0 && (
              <CardItem translateZ="25" className="pt-6">
                <div className="mb-4 font-mono text-[14px] font-semibold uppercase tracking-[0.05em] text-ink">
                  Deliverables
                </div>
                <ul className="space-y-3">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                      <span className="text-base leading-relaxed text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardItem>
            )}

            {/* Decision gate */}
            {step.decisionGate ? (
              <CardItem translateZ="40" className="mt-auto border-t border-line/80 pt-6 text-sm text-ink w-full">
                <p>
                  <span className="font-bold text-accent">Decision Gate:</span> {step.decisionGate}
                </p>
              </CardItem>
            ) : null}
          </div>
        </CardBody>
      </CardContainer>
    </motion.article>
  );
}

export function BlueprintSection({
  steps,
  id = "blueprint",
  withHeading = true,
  headingAs,
}: BlueprintSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className="section-shell section-intake-gradient overflow-x-clip border-t border-line"
    >
      <Container swiss>
        {withHeading ? (
          <SectionHeading
            as={headingAs}
            eyebrow="The Blueprint"
            title="Process defined by decision gates"
            description="Each phase has clear inputs, outputs, and approval thresholds. Nothing moves forward without alignment."
          />
        ) : null}

        <h2 className="sr-only">Process steps</h2>

        {/* Mobile: Sticky stack using flex-col. Desktop: Grid layout */}
        <div className="relative mt-12 flex flex-col gap-6 sm:mt-16 sm:gap-8 md:grid md:grid-cols-2 xl:grid-cols-4 pb-12 md:pb-0">
          {steps.map((step, idx) => (
            <StepCard key={step.id} step={step} index={idx} reduceMotion={!!shouldReduceMotion} />
          ))}
        </div>
      </Container>
    </section>
  );
}
