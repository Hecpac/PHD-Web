"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { Container } from "@/components/layout/container";

const CARDS = [
  {
    index: "01",
    phase: "Design",
    headline: "Blueprint\nwith Purpose",
    body: "From initial concept to permit-ready documentation — every detail resolved on paper before a single nail is driven.",
    bg: "bg-ink",
    textPrimary: "text-white",
    textSecondary: "text-white/55",
    border: "border-white/12",
    divider: "bg-white/20",
  },
  {
    index: "02",
    phase: "Visualize",
    headline: "See It Before\nYou Build",
    body: "Photorealistic renders and 3D walkthroughs that make material decisions confident and client approvals decisive.",
    bg: "bg-canvas",
    textPrimary: "text-ink",
    textSecondary: "text-muted",
    border: "border-line",
    divider: "bg-accent",
  },
  {
    index: "03",
    phase: "Execute",
    headline: "Permit-Ready.\nBuilder-Proven.",
    body: "Construction documents engineered for zero ambiguity — coordinated across structure, MEP, and interiors.",
    bg: "bg-accent",
    textPrimary: "text-white",
    textSecondary: "text-white/70",
    border: "border-white/20",
    divider: "bg-white",
  },
];

export function ParallaxStickyCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 3) return;

      if (shouldReduceMotion) {
        // Show only last card in reduced motion mode
        gsap.set(cards[0], { autoAlpha: 0 });
        gsap.set(cards[1], { autoAlpha: 0 });
        gsap.set(cards[2], { autoAlpha: 1, y: "0%" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
          },
        });

        // Transition 1: card[0] exits back, card[1] slides in (t=0→1)
        tl.to(
          cards[0],
          { scale: 0.88, y: "-5%", opacity: 0.4, ease: "none", duration: 1 },
          0,
        );
        tl.fromTo(
          cards[1],
          { y: "100%" },
          { y: "0%", ease: "none", duration: 1 },
          0,
        );

        // Transition 2: card[1] exits back, card[2] slides in (t=1→2)
        tl.to(
          cards[0],
          { scale: 0.78, y: "-10%", opacity: 0, ease: "none", duration: 1 },
          1,
        );
        tl.to(
          cards[1],
          { scale: 0.88, y: "-5%", opacity: 0.4, ease: "none", duration: 1 },
          1,
        );
        tl.fromTo(
          cards[2],
          { y: "100%" },
          { y: "0%", ease: "none", duration: 1 },
          1,
        );

        return () => {};
      });

      // Mobile: simple fade sequence, no pin
      mm.add("(max-width: 767px)", () => {
        gsap.set(cards[1], { y: "0%" });
        gsap.set(cards[2], { y: "0%" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Our process"
      className="relative z-10 h-screen w-full overflow-hidden"
    >
      {CARDS.map((card, i) => (
        <div
          key={card.index}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className={`absolute inset-0 flex items-center ${card.bg}`}
          style={{
            zIndex: i + 1,
            transform: i > 0 ? "translateY(100%)" : "none",
            willChange: "transform, opacity",
          }}
        >
          <Container swiss className="w-full">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-6 md:items-center">

              {/* Giant index number */}
              <div className="md:col-span-3 flex items-end md:items-center">
                <span
                  className={`font-mono leading-none tracking-tighter select-none ${card.textPrimary}`}
                  style={{ fontSize: "clamp(5rem, 12vw, 9rem)", opacity: 0.15 }}
                  aria-hidden="true"
                >
                  {card.index}
                </span>
              </div>

              {/* Content */}
              <div
                className={`md:col-span-8 md:col-start-5 border-l pl-8 md:pl-12 space-y-6 ${card.border}`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] ${card.textSecondary}`}
                >
                  {card.phase}
                </p>

                <h2
                  className={`leading-[0.88] tracking-tight font-normal whitespace-pre-line ${card.textPrimary}`}
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
                >
                  {card.headline}
                </h2>

                <div className={`h-px w-10 ${card.divider}`} />

                <p
                  className={`text-base leading-relaxed max-w-[36ch] ${card.textSecondary}`}
                >
                  {card.body}
                </p>
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}
