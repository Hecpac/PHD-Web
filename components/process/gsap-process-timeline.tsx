"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ProcessStep } from "@/lib/types/content";

type GsapProcessTimelineProps = {
  steps: ProcessStep[];
};

export function GsapProcessTimeline({ steps }: GsapProcessTimelineProps) {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-process-step]", rootRef.current);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.04,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top 70%",
                end: "bottom 75%",
                scrub: 0.35,
              },
            },
          );
        }
      });

      gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { opacity: 1, y: 0 });
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleY: 1 });
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="section-shell border-t border-line" aria-labelledby="process-heading">
      <Container swiss className="space-y-10">
        <SectionHeading
          as="h1"
          eyebrow="Execution Timeline"
          title="Pre-construction → Permits → Build"
          description="A vertical timeline engineered for decision gates, with each phase tied to explicit outputs and approvals."
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-line sm:left-8" aria-hidden="true" />
          <div
            ref={progressRef}
            className="pointer-events-none absolute left-5 top-0 h-full w-px bg-accent sm:left-8"
            aria-hidden="true"
          />

          <ol className="space-y-6 sm:space-y-8">
            {steps.map((step) => (
              <li key={step.id} data-process-step className="relative pl-12 sm:pl-20">
                <span
                  aria-hidden="true"
                  className="absolute left-[13px] top-6 h-3.5 w-3.5 rounded-full border border-accent bg-canvas sm:left-[25px]"
                />

                <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                    Phase {String(step.stepNumber).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">{step.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>

                  {step.deliverables.length > 0 ? (
                    <div className="mt-5">
                      <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">Deliverables</p>
                      <ul className="mt-2 space-y-2">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-ink">
                            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {step.decisionGate ? (
                    <p className="mt-5 border-t border-line pt-4 text-sm text-ink">
                      <span className="font-semibold text-accent">Decision Gate:</span> {step.decisionGate}
                    </p>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
