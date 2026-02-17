"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function HeroRenderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !frameRef.current || !videoRef.current) return;

      if (shouldReduceMotion) {
        gsap.set([sectionRef.current, frameRef.current, videoRef.current], { clearProps: "transform,willChange" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(sectionRef.current, { yPercent: 10, willChange: "transform" });
        gsap.set(frameRef.current, { yPercent: 14, willChange: "transform" });
        gsap.set(videoRef.current, {
          yPercent: 18,
          scale: 1.14,
          transformOrigin: "center center",
          willChange: "transform",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(sectionRef.current, { yPercent: -8, ease: "none", duration: 1 }, 0)
          .to(frameRef.current, { yPercent: -16, ease: "none", duration: 1 }, 0)
          .to(videoRef.current, { yPercent: -24, scale: 1.02, ease: "none", duration: 1 }, 0);
      });

      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        gsap.set([sectionRef.current, frameRef.current, videoRef.current], { clearProps: "transform,willChange" });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Render 3D"
      className="relative z-40 -mt-[14vh] w-full overflow-hidden border-y border-line bg-black md:-mt-[18vh] lg:-mt-[24vh]"
    >
      <div ref={frameRef} className="relative h-[58vh] min-h-[340px] w-full sm:h-[62vh] md:h-[66vh] lg:h-[72vh]">
        <video
          ref={videoRef}
          className="absolute inset-0 block h-full w-full bg-black object-cover"
          src="/media/render-3d.mp4"
          poster="/media/render-3d-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          Tu navegador no soporta video HTML5.
        </video>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-canvas/80 via-canvas/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/10" />
      </div>
    </section>
  );
}
