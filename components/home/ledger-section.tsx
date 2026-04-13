"use client";

import { useState, useId, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { resolveIcon } from "@/lib/icons";
import { createStaggerReveal } from "@/lib/gsap/scroll-animations";
import type { Service } from "@/lib/types/content";

type LedgerSectionProps = {
  services: Service[];
  id?: string;
  withHeading?: boolean;
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

export function LedgerSection({ services, id = "ledger", withHeading = true }: LedgerSectionProps) {
  const [openId, setOpenId] = useState<string>(services[0]?.id ?? "");
  const shouldReduceMotion = useReducedMotion();
  const uid = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const staggerReveal = createStaggerReveal({
        trigger: gridRef.current,
        targets: gsap.utils.toArray<HTMLElement>(gridRef.current.querySelectorAll(".ledger-card")),
        stagger: 0.08,
        y: 40,
        start: "top 80%",
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
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
    <section ref={sectionRef} id={id} className="section-shell section-brand-wash-bold border-t border-line section-brand-divider relative z-50">
      <Container swiss className="space-y-8">
        {withHeading ? (
          <div ref={headingRef}>
            <SectionHeading
              eyebrow="The Ledger"
              title="Capabilities tied to real deliverables"
              description="Each service is defined by outputs, owners, and checkpoints so you can see what is actually being delivered before the project advances."
            />
          </div>
        ) : null}

        <div ref={gridRef} className="brand-red-outline grid gap-px border border-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const isOpen = openId === service.id;
            const panelId = `${uid}-panel-${service.id}`;
            const previewCount = 2;
            const hasMore = service.deliverables.length > previewCount;
            const extraDeliverables = service.deliverables.slice(previewCount);

            const Icon = resolveIcon(service.icon as string);

            const buttonId = `${uid}-btn-${service.id}`;

            return (
              <CardContainer key={service.id} containerClassName={index === 2 ? "md:col-span-2 xl:col-span-1 h-full" : "h-full"} className="w-full h-full">
                <CardBody
                  className="ledger-card relative overflow-hidden group flex min-h-[clamp(18rem,34vw,24rem)] flex-col rounded-xl border border-line bg-surface p-6 sm:p-8 md:p-10 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(203,33,49,0.3)] hover:border-accent"
                >
                  {/* Luxurious animated red background */}
                  <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none z-0" />

                  <div className="relative z-10 flex flex-col h-full">
                    <button
                      id={buttonId}
                      type="button"
                      className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      onClick={() => setOpenId((prev) => (prev === service.id ? "" : service.id))}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <CardItem translateZ="50" className="mb-6">
                        <div data-ledger-row className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-accent/8 text-muted transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                          {Icon ? (
                            <Icon
                              aria-hidden="true"
                              className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                              strokeWidth={1.75}
                            />
                          ) : (
                            <p className="font-mono text-xs uppercase tracking-[0.05em]">{service.icon}</p>
                          )}
                        </div>
                      </CardItem>
                      <CardItem translateZ="30" className="mb-3">
                        <h3 data-ledger-row className="type-h3-standard text-ink transition-colors duration-500 group-hover:text-white">{service.title}</h3>
                      </CardItem>
                      <CardItem translateZ="20">
                        <p data-ledger-row className="text-base leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">{service.summary}</p>
                      </CardItem>
                    </button>

                    <CardItem
                      translateZ="25"
                      className="mt-6 w-full"
                    >
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        data-ledger-row
                        className="min-h-[clamp(6.5rem,15vw,9rem)] border-t border-line/85 pt-6 transition-colors duration-500 group-hover:border-white/20 w-full"
                      >
                        {/* Always-visible deliverables (first 2) */}
                        <ul className="space-y-3 text-base text-ink transition-colors duration-500 group-hover:text-white/90">
                          {service.deliverables.slice(0, previewCount).map((item) => (
                            <li key={item} className="flex gap-3">
                              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent transition-colors duration-500 group-hover:bg-white" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Extra deliverables — animate with transform/opacity only (no height) */}
                        <AnimatePresence initial={false}>
                          {isOpen && hasMore ? (
                            <motion.ul
                              key={`extra-${service.id}`}
                              className="origin-top mt-3 space-y-3 text-base text-ink transition-colors duration-500 group-hover:text-white/90"
                              initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.95 }}
                              transition={shouldReduceMotion ? { duration: 0.01 } : springTransition}
                            >
                              {extraDeliverables.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-accent transition-colors duration-500 group-hover:bg-white" />
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
                              className="mt-3 font-mono text-xs uppercase tracking-[0.05em] text-muted transition-colors duration-500 group-hover:text-white/70"
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
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
