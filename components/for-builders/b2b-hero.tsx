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
  const mediaRef = useRef<HTMLDivElement>(null);
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

      // Scroll-out parallax — desktop + motion-safe
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!mediaRef.current) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=100%",
              pin: true,
              pinSpacing: false,
              scrub: 1,
            },
          });

          tl.to(mediaRef.current, {
            yPercent: -15,
            scale: 1.08,
            duration: 1,
            ease: "none",
            force3D: true,
          }, 0);

          tl.to(contentRef.current, {
            opacity: 0,
            yPercent: -8,
            duration: 1,
            ease: "none",
            force3D: true,
          }, 0);

          tl.to([statsRef.current, ctaRef.current], {
            opacity: 0,
            duration: 0.6,
            ease: "none",
            force3D: true,
          }, 0);
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="b2b-hero"
      aria-label="Premium Custom Home Design and Visualization for DFW builders"
      className="relative -mt-14 min-h-[85vh] overflow-hidden border-b border-line bg-black md:-mt-[72px]"
    >
      {/* Background media — elegant dark video or image fallback */}
      <div ref={mediaRef} className="absolute inset-0">
        {shouldReduceMotion ? (
          <Image
            src="/for-builders/hero-bg.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-60"
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
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            aria-hidden="true"
          >
            <source src="/Architect_s_Blueprint_Motion_Video.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <Container swiss className="relative z-10 flex min-h-[85vh] flex-col justify-center py-24 md:py-32">
          <div ref={contentRef} className="max-w-3xl space-y-6">
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]">
              Custom Home Plans & Photorealistic 3D Visualizations
            </span>

            <h1 className="type-hero max-w-2xl text-white leading-[1.1]">
              <SwissTextReveal mode="word" as="span" noInitialHide>
                Designed with Vision. Built with Confidence.
              </SwissTextReveal>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Working with our team to realize your dream home is a collaborative journey. We transform initial ideas into detailed concept plans and bring them to life with realistic 3D visualizations, ensuring every detail is refined before construction begins.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="mt-10 flex flex-wrap gap-8 md:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <CtaLink
              href="#b2b-services"
              variant="primary"
              eventName="cta_schedule_click"
              eventPayload={{ source: "b2b_hero", intent: "explore_services" }}
              className="bg-[#d4af37] text-black hover:bg-[#b5952f] focus-visible:ring-offset-black"
            >
              Explore Services
            </CtaLink>
            <CtaLink
              href="#b2b-contact"
              variant="secondary"
              eventName="cta_schedule_click"
              eventPayload={{ source: "b2b_hero", intent: "consultation" }}
              className="border-white/40 text-white hover:text-white/80"
            >
              Schedule Consultation
            </CtaLink>
            <CtaLink
              href={phoneHref}
              variant="ghost"
              eventName="cta_call_click"
              eventPayload={{ source: "b2b_hero" }}
              className="text-[#d4af37] hover:text-[#b5952f]"
            >
              {phoneDisplay}
            </CtaLink>
          </div>
        </Container>
      </section>
  );
}
