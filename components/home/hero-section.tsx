"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";
import { getCtaConfig } from "@/lib/config/site";
import { useHeroTypewriter } from "@/hooks/use-hero-typewriter";

type HeroSectionProps = {
  children?: ReactNode;
};

export function HeroSection({ children }: HeroSectionProps) {
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();
  const heroRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useHeroTypewriter();

  useGSAP(
    () => {
      if (shouldReduceMotion) return;
      if (
        !heroRef.current ||
        !topBarRef.current ||
        !bottomBarRef.current ||
        !contentRef.current ||
        !titleRef.current ||
        !imageRef.current
      ) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 1. Text fade-out phase (0% -> 40%)
      tl.to([topBarRef.current, bottomBarRef.current], {
        height: "50vh",
        duration: 0.4,
        ease: "power2.inOut",
      }, 0);

      // 2. H1 fades out faster + drifts up (0% -> 40%)
      tl.to(titleRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.32,
        ease: "power1.in",
      }, 0);

      // 3. Remaining content fades (0% -> 40%)
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "none",
      }, 0);

      // 4. Background image drift phase (40% -> 70%)
      tl.to(imageRef.current, {
        y: "-18%",
        scale: 1.05,
        duration: 0.3,
        ease: "none",
      }, 0.4);

      // 5. Featured portfolio enters near the end (85% -> 100%)
      if (galleryRef.current) {
        tl.fromTo(
          galleryRef.current,
          { y: "110%" },
          { y: "0%", duration: 0.15, ease: "power2.out" },
          0.85,
        );
      }
    },
    { scope: heroRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — DFW custom home builder"
      className="relative z-0 min-h-[200vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Top bar (animated) ── */}
        <div
          ref={topBarRef}
          className="absolute top-0 left-0 z-30 h-0 w-full bg-black"
          style={{ transformOrigin: "top" }}
          aria-hidden="true"
        />

        {/* ── Full-width hero image with GSAP parallax ── */}
        <div ref={imageRef} className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              src="/projects/north-dallas-courtyard-residence/hero.jpg"
              alt="Front elevation of a modern custom home in Dallas-Fort Worth"
              fill
              priority
              fetchPriority="high"
              className="object-cover opacity-32"
              sizes="100vw"
            />
          </div>
        </div>

        {/* ── Gradient overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/88 to-canvas/65" />

        {/* ── Cinematic typewriter reveal (70% -> 90% scroll) ── */}
        <div className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center px-4">
          <div className="space-y-2 text-center md:space-y-4">
            <h2
              className="text-[4rem] font-bold leading-none tracking-tight text-white opacity-0 md:text-[8rem] lg:text-[12rem]"
              data-hero-reveal="line-1"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.3)" }}
            >
              CRAFTED.
            </h2>

            <h2
              className="text-[4rem] font-bold leading-none tracking-tight text-white opacity-0 md:text-[8rem] lg:text-[12rem]"
              data-hero-reveal="line-2"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.3)" }}
            >
              NOT BUILT.
            </h2>

            <p
              className="mt-8 text-base font-medium tracking-wider text-white/80 opacity-0 md:text-xl"
              data-hero-reveal="subtitle"
            >
              DFW MODERN DESIGN-BUILD
            </p>
          </div>
        </div>

        {/* ── Content overlay — flush left, bottom aligned ── */}
        <Container swiss className="relative z-10">
          <div ref={contentRef} className="flex h-screen items-end pb-16">
            <div className="max-w-3xl space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                DFW Modern Design-Build
              </p>

              <h1
                ref={titleRef}
                className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[5.25rem]"
              >
                <SwissTextReveal mode="word" stagger={0.08} delay={0.05}>
                  Architectural custom homes, delivered with builder-grade control.
                </SwissTextReveal>
              </h1>

              <h2 className="max-w-2xl text-lg font-normal leading-relaxed tracking-normal text-ink/90 sm:text-xl">
                <SwissTextReveal mode="line" delay={0.7}>
                  {"We plan, coordinate, and build modern residences exclusively across Dallas-Fort Worth.\nEvery phase is tied to clear deliverables and decision gates."}
                </SwissTextReveal>
              </h2>

              <div
                className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center"
                role="group"
                aria-label="Call to action"
              >
                <CtaLink
                  href={scheduleUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="cta_schedule_click"
                  withArrow
                >
                  Schedule Consultation
                </CtaLink>
                <CtaLink
                  href={phoneHref}
                  eventName="cta_call_click"
                  variant="secondary"
                >
                  Call {phoneDisplay}
                </CtaLink>
              </div>
            </div>
          </div>
        </Container>

        {/* ── Bottom bar (animated) ── */}
        <div
          ref={bottomBarRef}
          className="absolute bottom-0 left-0 z-30 h-0 w-full bg-black"
          style={{ transformOrigin: "bottom" }}
          aria-hidden="true"
        />

        {/* ── Gallery overlay — slides up from below to cover the hero ── */}
        {children && (
          <div
            ref={galleryRef}
            className="absolute inset-0 z-40 flex translate-y-full items-center bg-canvas"
          >
            <div className="w-full">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
