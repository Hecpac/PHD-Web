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
        gsap.set([sectionRef.current, frameRef.current, videoRef.current], { clearProps: "transform" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(sectionRef.current, { yPercent: 10, willChange: "transform" });
        gsap.set(videoRef.current, { yPercent: 0, scale: 1.12, transformOrigin: "center center", willChange: "transform" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.05,
          },
          onComplete() {
            if (sectionRef.current) sectionRef.current.style.willChange = "auto";
            if (videoRef.current) videoRef.current.style.willChange = "auto";
          },
        });

        tl.to(sectionRef.current, {
          yPercent: -6,
          ease: "none",
          duration: 1,
        }, 0);

        tl.to(videoRef.current, {
          yPercent: -14,
          scale: 1.02,
          ease: "none",
          duration: 1,
        }, 0);
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.set([sectionRef.current, frameRef.current, videoRef.current], { clearProps: "transform" });
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
      className="relative z-20 -mt-[16vh] w-full overflow-hidden bg-black"
    >
      <div ref={frameRef} className="relative h-[60vh] min-h-[360px] w-full sm:h-[64vh] md:h-[70vh] lg:h-[74vh]">
        <video
          ref={videoRef}
          className="absolute inset-0 block h-full w-full bg-black object-cover"
          src="/media/render-3d.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          Tu navegador no soporta video HTML5.
        </video>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-canvas/85 via-canvas/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-black/12" />
      </div>
    </section>
  );
}
