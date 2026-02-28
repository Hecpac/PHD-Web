"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";

type Step = {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
};

const steps: Step[] = [
  {
    number: "01",
    title: "Scope & Brief",
    description:
      "We review your plans, scope, and timeline requirements. Site constraints, lot survey, and HOA/city requirements are cataloged before any drafting begins.",
    deliverables: [
      "Scope-of-work agreement",
      "Timeline & milestone schedule",
      "Document checklist",
    ],
  },
  {
    number: "02",
    title: "Schematic Drafting",
    description:
      "Floor plans, elevations, and initial 3D views are developed from your direction. Revisions are tracked and coordinated before advancing to CDs.",
    deliverables: [
      "Preliminary floor plans",
      "Exterior elevations",
      "3D schematic views",
    ],
  },
  {
    number: "03",
    title: "Construction Documents",
    description:
      "Full CD sets including structural coordination, MEP layouts, sections, and details. All documents are formatted for your permit jurisdiction.",
    deliverables: [
      "Complete CD package",
      "Structural coordination sheets",
      "MEP layout plans",
    ],
  },
  {
    number: "04",
    title: "Permit Support & Handoff",
    description:
      "We handle revision rounds from city review, coordinate with engineers of record, and deliver final permit-ready documents in your preferred format.",
    deliverables: [
      "City revision responses",
      "Engineer coordination",
      "Final permit-ready set",
    ],
  },
];

export function B2BProcess() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          cardsRef.current!.querySelectorAll("[data-step-card]"),
        );

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;

          gsap.to(card, {
            scale: 0.94,
            y: -20,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 20vh",
              scrub: true,
            },
          });
        });
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          cardsRef.current!.querySelectorAll("[data-step-card]"),
        );

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    },
    { scope: cardsRef },
  );

  return (
    <section id="b2b-process" className="section-shell border-t border-line">
      <Container swiss className="space-y-10 md:space-y-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Sticky header (left) */}
          <div className="lg:col-span-4 lg:relative">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Our Process"
                title="From brief to permit-ready in four phases"
                description="Every engagement follows a structured workflow. No ambiguity, no scope creep — clear deliverables at each gate."
              />
            </div>
          </div>

          {/* Steps (right) — sticky stack */}
          <div ref={cardsRef} className="flex flex-col gap-6 sm:gap-8 lg:col-span-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-step-card
                className="rounded-xl border border-line bg-surface-2 p-5 shadow-[0_12px_24px_rgb(0_0_0/0.08)] sm:p-6 lg:sticky"
                style={{ top: `calc(20vh + ${index * 12}px)`, zIndex: index + 1 }}
              >
                <div className="font-mono text-xs font-medium tracking-widest text-muted">
                  PHASE {step.number}
                </div>
                <h3 className="mt-4 type-h3-standard text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                <ul className="mt-4 space-y-1.5" aria-label={`${step.title} deliverables`}>
                  {step.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 h-0.5 w-10 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
