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
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (
        !heroRef.current ||
        !topBarRef.current ||
        !bottomBarRef.current ||
        !contentRef.current ||
        !titleRef.current ||
        !imageRef.current
      ) return;

      if (ctaGroupRef.current) {
        if (shouldReduceMotion) {
          gsap.set(ctaGroupRef.current.children, { autoAlpha: 1, y: 0 });
        } else {
          const ctaItems = gsap.utils.toArray<HTMLElement>(ctaGroupRef.current.children);
          gsap.set(ctaItems, { autoAlpha: 0, y: 16 });
          gsap.to(ctaItems, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            delay: 0.56,
            stagger: 0.08,
            ease: "power2.out",
          });
        }
      }

      if (shouldReduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 1. Bars grow from 0 → 50vh using scaleY (compositor-friendly)
      gsap.set(topBarRef.current, { height: "50vh", scaleY: 0, transformOrigin: "top" });
      gsap.set(bottomBarRef.current, { height: "50vh", scaleY: 0, transformOrigin: "bottom" });
      tl.to([topBarRef.current, bottomBarRef.current], {
        scaleY: 1,
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

      // 3. Remaining content fades + subtle foreground drift
      tl.to(contentRef.current, {
        opacity: 0,
        y: "-8%",
        duration: 0.55,
        ease: "none",
      }, 0.05);

      // 4. Background image parallax (deeper depth feel)
      tl.to(imageRef.current, {
        y: "-15%",
        scale: 1.08,
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
      {/* Overscroll easter egg — visible on rubber-band pull-down */}
      <div
        className="absolute top-[-100vh] left-0 right-0 z-[-10] flex h-[100vh] items-center justify-center text-[10vw] font-black uppercase tracking-tighter text-ink/10"
        aria-hidden="true"
      >
        BUILT ON SOLID GROUND
      </div>

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Top bar (animated) ── */}
        <div
          ref={topBarRef}
          className="absolute top-0 left-0 z-30 w-full bg-black"
          style={{ height: 0, transformOrigin: "top" }}
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
                <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.04}>
                  DFW Modern Design-Build
                </SwissTextReveal>
              </p>

              <h1
                ref={titleRef}
                className="type-hero text-ink"
              >
                <SwissTextReveal mode="line" stagger={0.12} delay={0.14}>
                  {"Architectural custom homes,\ndelivered with builder-grade control."}
                </SwissTextReveal>
              </h1>

              <h2 className="max-w-2xl text-lg font-normal leading-relaxed tracking-normal text-ink/90 sm:text-xl">
                <SwissTextReveal mode="line" stagger={0.1} delay={0.34}>
                  {"We plan, coordinate, and build modern residences exclusively across Dallas-Fort Worth.\nEvery phase is tied to clear deliverables and decision gates."}
                </SwissTextReveal>
              </h2>

              <div
                ref={ctaGroupRef}
                className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center"
                role="group"
                aria-label="Call to action"
              >
                <CtaLink
                  href={scheduleUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="cta_schedule_click"
                  className="w-full min-h-12 justify-between rounded-md border-accent px-6 shadow-[0_16px_28px_rgb(0_0_0/0.24)] hover:translate-x-0 hover:translate-y-0 hover:shadow-[0_20px_34px_rgb(0_0_0/0.28)] sm:w-auto sm:justify-center"
                  withArrow
                >
                  Schedule Consultation
                </CtaLink>
                <CtaLink
                  href={phoneHref}
                  eventName="cta_call_click"
                  variant="secondary"
                  className="w-full min-h-10 rounded-md border-line/75 bg-surface/70 px-5 text-ink/90 hover:bg-surface/90 sm:w-auto"
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
          className="absolute bottom-0 left-0 z-30 w-full bg-black"
          style={{ height: 0, transformOrigin: "bottom" }}
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
