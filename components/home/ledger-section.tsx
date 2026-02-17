"use client";

import { useState, useId, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Box,
  ClipboardList,
  Compass,
  Hammer,
  MessageCircle,
  Palette,
  Ruler,
  Search,
  TreePine,
  type LucideIcon,
} from "lucide-react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { createStaggerReveal } from "@/lib/gsap/scroll-animations";
import type { Service } from "@/lib/types/content";

type LedgerSectionProps = {
  services: Service[];
  id?: string;
  withHeading?: boolean;
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Ruler,
  Hammer,
  Palette,
  MessageCircle,
  ClipboardList,
  TreePine,
  Box,
  Search,
};

export function LedgerSection({ services, id = "ledger", withHeading = true }: LedgerSectionProps) {
  const [openId, setOpenId] = useState<string>(services[0]?.id ?? "");
  const shouldReduceMotion = useReducedMotion();
  const uid = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const staggerReveal = createStaggerReveal({
        trigger: gridRef.current,
        targets: gsap.utils.toArray<HTMLElement>(gridRef.current.querySelectorAll("article")),
        stagger: 0.08,
        y: 40,
        start: "top 80%",
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(gridRef.current!.querySelectorAll(".ledger-card"));
        cards.forEach((card) => {
          const rows = gsap.utils.toArray<HTMLElement>(card.querySelectorAll("[data-ledger-row]"));
          if (!rows.length) return;

          gsap.from(rows, {
            opacity: 0,
            y: 18,
            stagger: 0.055,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });

        if (!headingRef.current) return;

        gsap.fromTo(
          headingRef.current,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 0.8,
            },
          },
        );

        ScrollTrigger.refresh();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (headingRef.current) {
          gsap.set(headingRef.current, { y: 0, autoAlpha: 1 });
        }
      });

      return () => {
        staggerReveal.revert();
        mm.revert();
      };
    },
    { scope: gridRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section id={id} className="section-shell section-brand-wash-bold border-t border-line section-brand-divider">
      <Container swiss className="space-y-8">
        {withHeading ? (
          <header ref={headingRef}>
            <SectionHeading
              eyebrow="The Ledger"
              title="Capabilities defined by concrete deliverables"
              description="Each capability maps to outputs, owners, and checkpoints. The goal is predictable execution, not abstract promises."
            />
          </header>
        ) : null}

        <div ref={gridRef} className="brand-red-outline grid gap-px border border-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const isOpen = openId === service.id;
            const panelId = `${uid}-panel-${service.id}`;
            const previewCount = 2;
            const hasMore = service.deliverables.length > previewCount;
            const extraDeliverables = service.deliverables.slice(previewCount);

            const Icon = iconMap[service.icon as string];

            const buttonId = `${uid}-btn-${service.id}`;

            return (
              <article
                key={service.id}
                className="ledger-card brand-red-outline brand-red-surface group flex min-h-[clamp(18rem,34vw,24rem)] flex-col rounded-xl border border-line bg-surface p-5 sm:p-6"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={() => setOpenId((prev) => (prev === service.id ? "" : service.id))}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <div data-ledger-row className="flex h-12 w-12 items-center justify-center rounded-md border border-line bg-accent/8 text-muted transition-[border-color,background-color,color] duration-300 group-hover:border-accent/55 group-hover:bg-accent/14 group-hover:text-accent">
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                        strokeWidth={1.75}
                      />
                    ) : (
                      <p className="font-mono text-xs uppercase tracking-[0.05em]">{service.icon}</p>
                    )}
                  </div>
                  <h3 data-ledger-row className="mt-3 text-xl font-bold text-ink">{service.title}</h3>
                  <p data-ledger-row className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-ledger-row
                  className="mt-4 min-h-[clamp(6.5rem,15vw,9rem)] border-t border-line/85 pt-4"
                >
                  {/* Always-visible deliverables (first 2) */}
                  <ul className="space-y-2 text-sm text-ink">
                    {service.deliverables.slice(0, previewCount).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Extra deliverables — animate with transform/opacity only (no height) */}
                  <AnimatePresence initial={false}>
                    {isOpen && hasMore ? (
                      <motion.ul
                        key={`extra-${service.id}`}
                        className="origin-top space-y-2 text-sm text-ink"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.95 }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : springTransition}
                      >
                        {extraDeliverables.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>

                  {/* "+N more" indicator */}
                  <AnimatePresence initial={false}>
                    {!isOpen && hasMore ? (
                      <motion.p
                        key={`more-${service.id}`}
                        className="mt-3 font-mono text-xs uppercase tracking-[0.05em] text-muted"
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.15 }}
                      >
                        +{extraDeliverables.length} more
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
