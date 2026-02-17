"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
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
  const innerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (
        !heroRef.current ||
        !innerRef.current ||
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
        // Pin the hero viewport while the render section (S2) rises from below and
        // covers it. pinSpacing:false keeps the DOM untouched so S2 stays at its
        // natural flow position and uses scroll space to drive its rise.
        //
        // Non-gallery: hero is min-h-screen (100 vh), so pin runs just 20 vh past
        // that to let the render section fully settle before releasing.
        ScrollTrigger.create({
          trigger: heroRef.current,
          pin: innerRef.current,
          start: "top top",
          end: hasGallery ? "+=165vh" : "+=100vh",
          pinSpacing: false,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Background image drifts up at ~22 % of scroll speed — slower than the
        // render panel that rises at 100 % — producing the same depth-recession
        // feel as a CSS perspective/translateZ parallax, but compatible with Lenis.
        tl.to(imageRef.current, {
          y: hasGallery ? "-15%" : "-30%",
          scale: hasGallery ? 1.08 : 1.12,
          duration: 1,
          ease: "none",
        }, 0);

        if (!hasGallery) {
          // Foreground copy moves a bit faster than the image so the hero gains
          // a true two-layer parallax feel (background vs content plane).
          tl.to(contentRef.current, {
            y: "-10%",
            autoAlpha: 0.88,
            duration: 1,
            ease: "none",
          }, 0);

          tl.to(titleRef.current, {
            y: -52,
            duration: 1,
            ease: "none",
          }, 0);

          return;
        }

        // Gallery mode: keep the stronger editorial transition.
        gsap.set(topBarRef.current, { height: "50vh", scaleY: 0, transformOrigin: "top" });
        gsap.set(bottomBarRef.current, { height: "50vh", scaleY: 0, transformOrigin: "bottom" });

        tl.to([topBarRef.current, bottomBarRef.current], {
          scaleY: 1,
          duration: 0.6,
          ease: "power2.inOut",
        }, 0);

        tl.to(titleRef.current, {
          opacity: 0,
          y: -40,
          duration: 0.4,
          ease: "power1.in",
        }, 0);

        tl.to(contentRef.current, {
          opacity: 0,
          y: "-8%",
          duration: 0.55,
          ease: "none",
        }, 0.05);

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
      className={`relative z-0 ${hasGallery ? "min-h-[120vh] lg:min-h-[150vh]" : "h-[85vh]"}`}
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

      <div ref={innerRef} className="h-screen overflow-hidden">
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
        <div ref={imageRef} className="absolute inset-0">
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

        {/* ── Content overlay — flush left, bottom aligned ── */}
        <Container swiss className="relative z-10 ![padding-inline-start:20px] sm:![padding-inline-start:28px] lg:![padding-inline-start:36px]">
          <div ref={contentRef} className="flex h-screen items-start pt-[22vh]">
            <div className="max-w-3xl space-y-5 sm:space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.04}>
                  DFW Modern Design-Build
                </SwissTextReveal>
              </p>

              <h1
                ref={titleRef}
                className="type-hero text-ink"
              >
                <SwissTextReveal as="span" mode="line" stagger={0.12} delay={0.14}>
                  {"Architectural custom homes,\ndelivered with builder-grade control."}
                </SwissTextReveal>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed tracking-normal text-ink/92 sm:text-lg">
                <SwissTextReveal as="span" mode="line" stagger={0.1} delay={0.34}>
                  {"We plan, coordinate, and build modern residences exclusively across Dallas-Fort Worth.\nEvery phase is tied to clear deliverables and decision gates."}
                </SwissTextReveal>
              </p>

              <ul className="flex flex-wrap gap-2" aria-label="Key proof points">
                {[
                  "DFW-only operating model",
                  "40+ custom homes delivered",
                  "Decision-gated planning",
                ].map((proof) => (
                  <li
                    key={proof}
                    className="rounded-sm border border-line/80 bg-canvas/70 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink/88"
                  >
                    {proof}
                  </li>
                ))}
              </ul>

              <div
                ref={ctaGroupRef}
                className="flex flex-col gap-2.5 rounded-lg border border-line/45 bg-canvas/45 p-2.5 sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0"
                role="group"
                aria-label="Call to action"
              >
                <CtaLink
                  href={scheduleUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="cta_schedule_click"
                  className="w-full min-h-12 justify-between rounded-md border-accent px-6 shadow-[0_16px_28px_rgb(0_0_0/0.24)] hover:translate-x-0 hover:translate-y-0 hover:shadow-[0_20px_34px_rgb(0_0_0/0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-auto sm:justify-center"
                  withArrow
                >
                  Schedule Consultation
                </CtaLink>
                <CtaLink
                  href={phoneHref}
                  eventName="cta_call_click"
                  variant="secondary"
                  className="w-full min-h-[44px] rounded-md border-line/80 bg-surface/75 px-5 text-ink/92 hover:bg-surface/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-auto"
                >
                  Call {phoneDisplay}
                </CtaLink>
              </div>
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
