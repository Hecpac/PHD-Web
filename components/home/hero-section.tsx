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
  const { scheduleUrl } = getCtaConfig();
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
      className="sticky top-0 z-0 -mt-14 mb-14 h-screen w-full overflow-hidden md:-mt-[72px] md:mb-[72px]"
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
          <div className="relative h-full w-full bg-black">
            <Image
              src={heroImage?.src ?? "/hero-background.jpg"}
              alt={heroImage?.alt ?? "Front elevation of a modern custom home in Dallas-Fort Worth"}
              fill
              priority
              fetchPriority="high"
              className="object-cover opacity-60 contrast-[1.1] brightness-[0.6]"
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
          </div>
        </div>

        {/* ── Dark overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/80 mix-blend-multiply" />

        {/* ── Content overlay ── */}
        <Container swiss className="relative z-10 h-full flex flex-col justify-between pt-[14vh] md:pt-[18vh] pb-8 md:pb-12">

          {/* TOP AREA - 12 Column Grid */}
          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 w-full will-change-transform text-white">
            
            {/* Col 1-4: Brand Name + Line */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.15em] font-medium text-white/90">
                  <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.04}>
                    Premium Home Design
                  </SwissTextReveal>
                </span>
                <div className="h-[1px] w-12 bg-white/30" />
              </div>
            </div>

            {/* Col 5-8: The Blueprint (List) */}
            <div className="md:col-span-4 lg:col-span-3 lg:col-start-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] font-medium mb-6 text-white/60">
                <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.1}>
                  OUR EXPERTISE
                </SwissTextReveal>
              </h2>
              <ul className="space-y-4 text-xs tracking-wide text-white/90" aria-label="Key proof points">
                <li className="flex justify-between items-baseline">
                  <span className="text-white/60 mr-4">Focus</span> 
                  <span className="text-right">Custom Residential Design</span>
                </li>
                <li className="flex justify-between items-baseline">
                  <span className="text-white/60 mr-4">Delivery</span> 
                  <span className="text-right">60+ Projects Completed</span>
                </li>
                <li className="flex justify-between items-baseline">
                  <span className="text-white/60 mr-4">Approach</span> 
                  <span className="text-right">Precision-Driven Workflow</span>
                </li>
                <li className="flex justify-between items-baseline">
                  <span className="text-white/60 mr-4">Style</span> 
                  <span className="text-right">Modern & Transitional</span>
                </li>
              </ul>
            </div>

            {/* Col 9-12: About & CTA */}
            <div className="md:col-span-4 lg:col-span-3 lg:col-start-10 flex flex-col justify-between h-full">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] font-medium mb-6 text-white/60">
                  <SwissTextReveal as="span" mode="word" stagger={0.08} delay={0.15}>
                    THE STUDIO
                  </SwissTextReveal>
                </h2>
                <div className="text-xs leading-[1.8] text-white/80 tracking-wide pr-4">
                  <p>
                    <SwissTextReveal as="span" mode="line" stagger={0.1} delay={0.2}>
                      {"We translate visionary concepts into permit-ready construction plans and photorealistic renders. Exclusively serving Dallas-Fort Worth with uncompromising precision and aesthetic excellence."}
                    </SwissTextReveal>
                  </p>
                </div>
              </div>
              
              <div ref={ctaGroupRef} className="mt-12 flex flex-col gap-3">
                <CtaLink
                  href={scheduleUrl}
                  {...(scheduleUrl.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                  eventName="cta_schedule_click"
                  variant="ghost"
                  className="w-fit text-[11px] tracking-[0.15em] font-mono px-0 border-b-0 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-sm whitespace-nowrap"
                >
                  ( Schedule a Consultation )
                </CtaLink>
              </div>
            </div>
          </div>

          {/* BOTTOM AREA - Giant Typography */}
          <div className="w-full mt-auto mb-2">
            <h1
              ref={titleRef}
              className="text-[7vw] sm:text-[6vw] lg:text-[5vw] xl:text-[4.5vw] leading-[0.85] tracking-tighter font-normal uppercase opacity-90 will-change-transform pb-2 md:pb-4 flex items-baseline gap-x-[1.5vw] whitespace-nowrap"
              style={{ wordSpacing: "-0.02em" }}
            >
              <SwissTextReveal as="span" mode="word" stagger={0.12} delay={0.14} className="text-white">
                BESPOKE
              </SwissTextReveal>
              <SwissTextReveal as="span" mode="word" stagger={0.12} delay={0.20} className="text-red-500">
                (CUSTOM) DESIGN
              </SwissTextReveal>
            </h1>
            
            <div className="flex flex-wrap justify-between items-center mt-4 sm:mt-6 font-mono text-[9px] sm:text-[10px] text-white uppercase tracking-[0.15em] border-t border-white/30 pt-4">
              <span>Dallas-Fort Worth</span>
              <span className="hidden sm:inline text-red-500">Established 2016</span>
              <span>Copyright © {new Date().getFullYear()}</span>
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
