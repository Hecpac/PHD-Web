"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";
import { getCtaConfig } from "@/lib/config/site";
import type { GalleryImage } from "@/lib/types/content";

type HeroSectionProps = {
  heroImage?: GalleryImage;
  children?: ReactNode;
};

export function HeroSection({ heroImage, children }: HeroSectionProps) {
  const { phoneDisplay, phoneHref, scheduleUrl } = getCtaConfig();
  const heroRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

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

      // 1. Bars grow from 0 → 50vh
      tl.to([topBarRef.current, bottomBarRef.current], {
        height: "50vh",
        duration: 0.6,
        ease: "power2.inOut",
      }, 0);

      // 2. H1 fades out faster + drifts up
      tl.to(titleRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: "power1.in",
      }, 0);

      // 3. Remaining content fades
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.55,
        ease: "none",
      }, 0.05);

      // 4. Background image parallax
      tl.to(imageRef.current, {
        y: "-18%",
        scale: 1.05,
        duration: 1,
        ease: "none",
      }, 0);

      // 5. Gallery slides up from below the viewport into full view
      //    Starts at 15% of timeline, ends at 65% → stays visible for remaining 35%
      if (galleryRef.current) {
        tl.fromTo(
          galleryRef.current,
          { y: "100%" },
          { y: "0%", duration: 0.5, ease: "power2.out" },
          0.15,
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
              src={heroImage?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
              alt={heroImage?.alt ?? "Front elevation of a modern custom home in Dallas-Fort Worth"}
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
