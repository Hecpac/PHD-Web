"use client";

import { useRef } from "react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SwissTextReveal } from "@/components/ui/swiss-text-reveal";
import { getCtaConfig } from "@/lib/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const STATS = [
  { value: "60+", label: "homes documented" },
  { value: "94%", label: "on-time delivery" },
  { value: "DFW", label: "exclusive" },
] as const;

export function B2BHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { phoneDisplay, phoneHref } = getCtaConfig();

  useGSAP(
    () => {
      if (!contentRef.current || !statsRef.current || !ctaRef.current) return;

      const elements = [
        ...gsap.utils.toArray<HTMLElement>(contentRef.current.children),
        ...gsap.utils.toArray<HTMLElement>(statsRef.current.children),
        ...gsap.utils.toArray<HTMLElement>(ctaRef.current.children),
      ];

      if (shouldReduceMotion) {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(elements, { autoAlpha: 0, y: 24 });
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.15,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="b2b-hero"
      aria-label="Design-build documentation partner for DFW builders"
      className="relative min-h-[85vh] overflow-hidden border-b border-line bg-black"
    >
      {/* Background media — video with reduced-motion fallback */}
      {shouldReduceMotion ? (
        <Image
          src="/for-builders/hero-bg.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="object-cover opacity-40"
          sizes="100vw"
          aria-hidden="true"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/for-builders/hero-bg.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          aria-hidden="true"
        >
          <source src="/for-builders/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black"
        aria-hidden="true"
      />

      <Container swiss className="relative z-10 flex min-h-[85vh] flex-col justify-center py-24 md:py-32">
        <div ref={contentRef} className="max-w-3xl space-y-6">
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Design-Build Documentation Partner
          </span>

          <h1 className="type-hero max-w-2xl text-white">
            <SwissTextReveal mode="word" as="span" noInitialHide>
              Outsourced Drafting &amp; Construction Documents for DFW Builders
            </SwissTextReveal>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Permit-ready floor plans, 3D renders, and full CDs with 5–7 day
            turnaround — exclusively for Dallas–Fort Worth builders.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-10 flex flex-wrap gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
          <CtaLink
            href="#b2b-contact"
            variant="primary"
            eventName="cta_schedule_click"
            eventPayload={{ source: "b2b_hero", intent: "documentation" }}
            className="focus-visible:ring-offset-black"
          >
            Request Documentation Quote
          </CtaLink>
          <CtaLink
            href="#b2b-contact"
            variant="secondary"
            eventName="cta_schedule_click"
            eventPayload={{ source: "b2b_hero", intent: "full_package" }}
            className="border-white/40 text-white hover:text-white/80"
          >
            Full Design-Build Package
          </CtaLink>
          <CtaLink
            href={phoneHref}
            variant="ghost"
            eventName="cta_call_click"
            eventPayload={{ source: "b2b_hero" }}
            className="text-white/70 hover:text-white"
          >
            Call {phoneDisplay}
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
