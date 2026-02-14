"use client";

import { useRef, useState } from "react";

import { gsap, useGSAP, CustomEase } from "@/lib/gsap";

type PreloaderProps = {
  onComplete?: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current || !counterRef.current || !topRef.current || !bottomRef.current) {
        return;
      }

      // Register custom ease curve
      CustomEase.create("swiss", "M0,0 C0.85,0 0.15,1 1,1");

      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
        },
      });

      // Counter animation: 0 → 100
      const counter = { value: 0 };
      tl.to(counter, {
        value: 87,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.floor(counter.value)).padStart(3, "0");
          }
        },
      })
        // Brief pause at 87
        .to(counter, {
          value: 87,
          duration: 0.2,
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.floor(counter.value)).padStart(3, "0");
            }
          },
        })
        // Jump to 100
        .to(counter, {
          value: 100,
          duration: 0.4,
          ease: "power3.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.floor(counter.value)).padStart(3, "0");
            }
          },
        })
        // Counter scaleY → 0
        .to(
          counterRef.current,
          {
            scaleY: 0,
            duration: 0.3,
            ease: "power3.inOut",
          },
          "+=0.1"
        )
        // Screen split
        .to(
          topRef.current,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "swiss",
          },
          "-=0.2"
        )
        .to(
          bottomRef.current,
          {
            yPercent: 100,
            duration: 1.2,
            ease: "swiss",
          },
          "<"
        );
    },
    { scope: containerRef }
  );

  if (isComplete) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "#050505" }}>
      {/* Top half */}
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundColor: "#050505" }} />

      {/* Bottom half */}
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: "#050505" }} />

      {/* Counter */}
      <div ref={counterRef} className="relative z-10 font-mono text-6xl text-white" style={{ transformOrigin: "center" }}>
        000
      </div>
    </div>
  );
}
