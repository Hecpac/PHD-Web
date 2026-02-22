"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

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
  const hasGallery = Boolean(children);
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
        !contentRef.current ||
        !titleRef.current ||
        !imageRef.current
      ) return;

      if (hasGallery && (!topBarRef.current || !bottomBarRef.current)) {
        return;
      }

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

      if (shouldReduceMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Base depth parallax: image fades and scales, content stays pinned while video slides over
        tl.to(imageRef.current, {
          scale: 1.05,
          opacity: 0,
          duration: 1,
          ease: "none",
          force3D: true,
        }, 0);

        tl.to(contentRef.current, {
          opacity: 0.1, // Fade content slowly so it doesn't distract
          duration: 1,
          ease: "power2.inOut",
          force3D: true,
        }, 0);

        if (!hasGallery) {
          return;
        }

        // Gallery mode: keep the stronger editorial transition.
        gsap.set(topBarRef.current, { height: "50vh", scaleY: 0, transformOrigin: "top" });
        gsap.set(bottomBarRef.current, { height: "50vh", scaleY: 0, transformOrigin: "bottom" });

        tl.to([topBarRef.current, bottomBarRef.current], {
          scaleY: 1,
          duration: 0.6,
          ease: "power2.inOut",
          force3D: true,
        }, 0);

        tl.to(titleRef.current, {
          opacity: 0,
          y: -120,
          duration: 0.4,
          ease: "power1.in",
          force3D: true,
        }, 0);

        tl.to(contentRef.current, {
          opacity: 0,
          yPercent: -8,
          duration: 0.55,
          ease: "none",
          force3D: true,
        }, 0.05);

        tl.to(imageRef.current, {
          yPercent: -15,
          scale: 1.08,
          duration: 1,
          ease: "none",
          force3D: true,
        }, 0);

        if (galleryRef.current) {
          tl.fromTo(
            galleryRef.current,
            { y: "100%" },
            { y: "0%", duration: 0.5, ease: "power2.out" },
            0.15,
          );
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope: heroRef, dependencies: [shouldReduceMotion, hasGallery] },
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — DFW custom home builder"
      className="sticky top-0 z-0 h-screen w-full overflow-hidden"
    >
      {/* Overscroll easter egg — visible on rubber-band pull-down */}
      <div
        className="absolute top-[-100vh] left-0 right-0 z-[-10] flex h-[100vh] items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-full max-w-[72vw] space-y-6 opacity-45">
          <div className="h-px bg-ink/16" />
          <div className="h-px w-[82%] bg-ink/12" />
          <div className="h-px w-[64%] bg-ink/10" />
        </div>
      </div>

      <div className="relative h-full w-full">
        {/* ── Top bar (animated) ── */}
        {hasGallery ? (
          <div
            ref={topBarRef}
            className="absolute top-0 left-0 z-30 w-full bg-black"
            style={{ height: 0, transformOrigin: "top" }}
            aria-hidden="true"
          />
        ) : null}

        {/* ── Full-width hero image with GSAP parallax ── */}
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <div className="relative h-full w-full">
            <Image
              src={heroImage?.src ?? "/projects/north-dallas-courtyard-residence/hero.jpg"}
              alt={heroImage?.alt ?? "Front elevation of a modern custom home in Dallas-Fort Worth"}
              fill
              priority
              fetchPriority="high"
              className="object-cover opacity-32"
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
          </div>
        </div>

        {/* ── Gradient overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/92 to-canvas/72" />

        {/* ── Content overlay ── */}
        <Container swiss className="relative z-10 h-full flex flex-col justify-between pt-[14vh] md:pt-[16vh] pb-8 md:pb-12">
          {/* TOP AREA - 12 Column Grid */}
          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 w-full will-change-transform">
            
            {/* Col 1-4: Eyebrow */}
            <div className="md:col-span-4 lg:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.04}>
                  DFW Modern Design-Build
                </SwissTextReveal>
              </p>
            </div>

            {/* Col 5-8: The Blueprint (List) */}
            <div className="md:col-span-4 lg:col-span-3 lg:col-start-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-muted mb-4">
                <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.1}>
                  The Blueprint
                </SwissTextReveal>
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-ink/90 border-t border-line/40 pt-4" aria-label="Key proof points">
                <li className="flex justify-between">
                  <span className="text-muted">Model</span> 
                  <span className="text-right">DFW-Only Operation</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">Experience</span> 
                  <span className="text-right">60+ Homes Delivered</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">Process</span> 
                  <span className="text-right">Decision-Gated Planning</span>
                </li>
              </ul>
            </div>

            {/* Col 9-12: About & CTA */}
            <div className="md:col-span-4 lg:col-span-3 lg:col-start-10 flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-muted mb-4">
                  <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.15}>
                    About Us
                  </SwissTextReveal>
                </h2>
                <div className="border-t border-line/40 pt-4">
                  <p className="text-sm leading-relaxed text-ink/90">
                    <SwissTextReveal as="span" mode="line" stagger={0.1} delay={0.2}>
                      {"We plan, coordinate, and build modern residences exclusively across Dallas-Fort Worth. Every phase is tied to clear deliverables and decision gates."}
                    </SwissTextReveal>
                  </p>
                </div>
              </div>
              
              <div
                ref={ctaGroupRef}
                className="mt-8 flex flex-col gap-3"
              >
                <CtaLink
                  href={scheduleUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="cta_schedule_click"
                  variant="ghost"
                  className="w-fit text-xs md:text-sm px-0 border-b border-transparent hover:border-accent pb-0.5 text-ink hover:text-accent focus-visible:outline-none rounded-none"
                >
                  [ SCHEDULE CONSULTATION ]
                </CtaLink>
                <CtaLink
                  href={phoneHref}
                  eventName="cta_call_click"
                  variant="ghost"
                  className="w-fit text-xs md:text-sm px-0 border-b border-transparent hover:border-accent pb-0.5 text-ink hover:text-accent focus-visible:outline-none rounded-none"
                >
                  [ CALL {phoneDisplay} ]
                </CtaLink>
              </div>
            </div>
          </div>

          {/* BOTTOM AREA - Giant Typography */}
          <div className="w-full mt-auto">
            <h1
              ref={titleRef}
              className="text-[12vw] sm:text-[10vw] leading-[0.85] tracking-tighter font-bold text-ink uppercase opacity-90 will-change-transform pb-4 sm:pb-0"
              style={{ wordSpacing: "-0.1em" }}
            >
              <SwissTextReveal as="span" mode="line" stagger={0.12} delay={0.14}>
                {"ARCHITECTURAL\n(CUSTOM) HOMES"}
              </SwissTextReveal>
            </h1>
            <div className="flex flex-wrap justify-between items-center mt-6 md:mt-8 font-mono text-[10px] sm:text-xs text-muted uppercase tracking-widest border-t border-line/40 pt-4">
              <span>Dallas-Fort Worth</span>
              <span className="hidden sm:inline">Builder-Grade Control</span>
              <span>Est. 2026</span>
            </div>
          </div>
        </Container>

        {/* ── Bottom bar (animated) ── */}
        {hasGallery ? (
          <div
            ref={bottomBarRef}
            className="absolute bottom-0 left-0 z-30 w-full bg-black"
            style={{ height: 0, transformOrigin: "bottom" }}
            aria-hidden="true"
          />
        ) : null}

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
