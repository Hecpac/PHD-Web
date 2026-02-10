"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { gsap, useGSAP } from "@/lib/gsap";
import { createSequentialTimeline } from "@/lib/gsap/scroll-animations";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery & Feasibility",
    description:
      "We evaluate your lot, program, and budget range. Site constraints, zoning, and HOA requirements are documented before any design work begins.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="11" stroke="currentColor" strokeWidth="2" />
        <path d="M25 25l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Concept & Cost Alignment",
    description:
      "Architecture and builder teams align scope, systems, and cost targets. You approve the schematic direction before drawings advance.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M6 16h28M16 6v28" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Documentation & Permits",
    description:
      "Construction documents are coordinated across all trades. Bid-ready scopes, a milestone schedule, and permit submittals are prepared for review.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 6h14l10 10v18a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" />
        <path d="M24 6v10h10M14 22h12M14 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Build & Handover",
    description:
      "Construction is managed through QA checkpoints and weekly owner reporting. Punch completion and warranty orientation close out the project.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M8 34l6-6M20 6l14 14-10 10L10 16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 13l10 10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function HowWeWorkSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const stepEls = gsap.utils.toArray<HTMLElement>(gridRef.current.children);
    createSequentialTimeline({
      trigger: gridRef.current,
      steps: stepEls,
      connector: connectorRef.current ?? undefined,
      stagger: 0.15,
    });
  }, { scope: gridRef });

  return (
    <section id="how-we-work" className="section-shell">
      <Container swiss className="space-y-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Sticky Header (Left) */}
          <div className="lg:col-span-4 lg:relative">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="How We Work"
                title="A structured path from vision to move-in"
                description="Every project follows four decision-gated phases. Nothing advances without your alignment — no surprises, no ambiguity."
              />
            </div>
          </div>

          {/* Connector line between heading and steps */}
          <div
            ref={connectorRef}
            className="mx-auto hidden h-12 w-px bg-line lg:block"
            aria-hidden="true"
          />

          {/* Steps Grid (Right) */}
          <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">
            {steps.map((step) => (
              <div key={step.number}>
                <CardContainer containerClassName="py-0 h-full">
                  <CardBody className="group/card relative h-full w-full rounded-xl border border-line bg-surface-2 p-6 hover:shadow-2xl hover:shadow-black/30">
                    {/* Step number */}
                    <CardItem
                      translateZ="30"
                      className="!w-auto font-mono text-xs font-medium tracking-widest text-muted"
                    >
                      STEP {step.number}
                    </CardItem>

                    {/* Icon */}
                    <CardItem translateZ="50" className="mt-4 text-ink/80">
                      {step.icon}
                    </CardItem>

                    {/* Title */}
                    <CardItem
                      translateZ="40"
                      className="mt-5 text-xl font-bold text-ink"
                    >
                      {step.title}
                    </CardItem>

                    {/* Description */}
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="mt-3 text-sm leading-relaxed text-muted"
                    >
                      {step.description}
                    </CardItem>

                    {/* Bottom accent line */}
                    <CardItem translateZ="20" className="mt-6">
                      <div className="h-0.5 w-10 rounded-full bg-accent transition-all duration-300 group-hover/card:w-full" />
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-muted">
            Ready to start your custom home project in Dallas–Fort Worth?
          </p>
          <CtaLink
            href="#contact"
            variant="primary"
            eventName="cta_schedule_click"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Schedule a Consultation
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
