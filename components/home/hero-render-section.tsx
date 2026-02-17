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

      const clearTransforms = () => {
        gsap.set([frameRef.current, videoRef.current], {
          clearProps: "transform,willChange",
        });
      };

      if (shouldReduceMotion) {
        clearTransforms();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set([frameRef.current, videoRef.current], { willChange: "transform" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Section 2 parallax plane: container drifts subtly while the render video
        // moves faster, reproducing a 3D depth split without touching document flow.
        tl.fromTo(
          frameRef.current,
          { yPercent: 7 },
          { yPercent: -7, duration: 1, ease: "none" },
          0,
        );

        tl.fromTo(
          videoRef.current,
          { yPercent: 14, scale: 1.14, transformOrigin: "center center" },
          { yPercent: -14, scale: 1.04, duration: 1, ease: "none" },
          0,
        );
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        clearTransforms();
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
      className="relative z-20 -mt-[15vh] w-full overflow-hidden border-y border-line bg-black"
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
