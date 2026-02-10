"use client";

import { useState, useId, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LottieIcon } from "@/components/ui/lottie-icon";
import { gsap, useGSAP } from "@/lib/gsap";
import { createStaggerReveal } from "@/lib/gsap/scroll-animations";
import type { Service } from "@/lib/types/content";

type LedgerSectionProps = {
  services: Service[];
  id?: string;
  withHeading?: boolean;
};

const springTransition = { type: "spring" as const, stiffness: 70, damping: 18 };

const iconMap: Record<string, string> = {
  Compass: "/assets/lottie/compass.lottie",
  Ruler: "/assets/lottie/ruler.lottie",
  Hammer: "/assets/lottie/hammer.lottie",
  Palette: "/assets/lottie/palette.lottie",
  MessageCircle: "/assets/lottie/message.lottie",
  ClipboardList: "/assets/lottie/clipboard.lottie",
  TreePine: "/assets/lottie/tree.lottie",
  Box: "/assets/lottie/box.lottie",
  Search: "/assets/lottie/search.lottie",
};

export function LedgerSection({ services, id = "ledger", withHeading = true }: LedgerSectionProps) {
  const [openId, setOpenId] = useState<string>(services[0]?.id ?? "");
  const shouldReduceMotion = useReducedMotion();
  const uid = useId();
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    createStaggerReveal({
      trigger: gridRef.current,
      targets: gsap.utils.toArray<HTMLElement>(gridRef.current.querySelectorAll("article")),
      stagger: 0.08,
      y: 40,
      start: "top 80%",
    });
  }, { scope: gridRef });

  return (
    <section id={id} className="section-shell border-t border-line">
      <Container swiss className="space-y-8">
        {withHeading ? (
          <SectionHeading
            eyebrow="The Ledger"
            title="Capabilities defined by concrete deliverables"
            description="Each capability maps to outputs, owners, and checkpoints. The goal is predictable execution, not abstract promises."
          />
        ) : null}

        <div ref={gridRef} className="grid gap-px border border-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const isOpen = openId === service.id;
            const panelId = `${uid}-panel-${service.id}`;
            const previewCount = 2;
            const hasMore = service.deliverables.length > previewCount;
            const extraDeliverables = service.deliverables.slice(previewCount);

            // Allow icon to be a mapped Lottie URL or fallback text
            const lottieSrc = iconMap[service.icon as string];

            const buttonId = `${uid}-btn-${service.id}`;

            return (
              <article
                key={service.id}
                className="group min-h-64 border border-line bg-surface p-6"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="min-h-[24px] w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={() => setOpenId((prev) => (prev === service.id ? "" : service.id))}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <div className="flex h-12 w-12 items-center justify-center text-muted">
                    {lottieSrc ? (
                      <LottieIcon src={lottieSrc} className="h-10 w-10 text-accent" hover />
                    ) : (
                      <p className="font-mono text-xs uppercase tracking-[0.05em]">{service.icon}</p>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-4 min-h-32 border-t border-line pt-4"
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
