"use client";

import { useRef } from "react";

import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";

type Step = {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
};

export function B2BProcess() {
  const t = useTranslations("forBuildersPage");
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      number: "01",
      title: t("processStep1Title"),
      description: t("processStep1Desc"),
      deliverables: [t("processStep1Del1"), t("processStep1Del2"), t("processStep1Del3")],
    },
    {
      number: "02",
      title: t("processStep2Title"),
      description: t("processStep2Desc"),
      deliverables: [t("processStep2Del1"), t("processStep2Del2"), t("processStep2Del3")],
    },
    {
      number: "03",
      title: t("processStep3Title"),
      description: t("processStep3Desc"),
      deliverables: [t("processStep3Del1"), t("processStep3Del2"), t("processStep3Del3")],
    },
    {
      number: "04",
      title: t("processStep4Title"),
      description: t("processStep4Desc"),
      deliverables: [t("processStep4Del1"), t("processStep4Del2"), t("processStep4Del3")],
    },
  ];

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
                eyebrow={t("processEyebrow")}
                title={t("processTitle")}
                description={t("processDescription")}
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
                  {t("processPhaseLabel")} {step.number}
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
