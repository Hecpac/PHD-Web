"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const updateStyles = () => {
    if (shouldReduceMotion || !refElement.current) return;

    const { background, rotate, glare } = state.current;
    
    refElement.current.style.setProperty("--m-x", `${glare.x}%`);
    refElement.current.style.setProperty("--m-y", `${glare.y}%`);
    refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
    refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
    refElement.current.style.setProperty("--bg-x", `${background.x}%`);
    refElement.current.style.setProperty("--bg-y", `${background.y}%`);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !refElement.current) return;
    
    const rect = refElement.current.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    
    const percentage = {
      x: (100 / rect.width) * position.x,
      y: (100 / rect.height) * position.y,
    };
    
    const delta = {
      x: percentage.x - 50,
      y: percentage.y - 50,
    };

    const { background, rotate, glare } = state.current;
    
    background.x = 50 + percentage.x / 4 - 12.5;
    background.y = 50 + percentage.y / 3 - 16.67;
    rotate.x = -(delta.y / 3.5);
    rotate.y = delta.x / 2;
    rotate.x *= 1;
    rotate.y *= 1;
    glare.x = percentage.x;
    glare.y = percentage.y;

    updateStyles();
  };

  const handlePointerEnter = () => {
    isPointerInside.current = true;
    if (refElement.current) {
      setTimeout(() => {
        if (isPointerInside.current && refElement.current) {
          refElement.current.style.setProperty("--duration", "0s");
        }
      }, 300);
    }
  };

  const handlePointerLeave = () => {
    isPointerInside.current = false;
    if (!refElement.current) return;
    
    refElement.current.style.setProperty("--duration", "300ms");
    refElement.current.style.setProperty("--r-x", "0deg");
    refElement.current.style.setProperty("--r-y", "0deg");
  };

  return (
    <div
      style={{
        "--m-x": "50%",
        "--m-y": "50%",
        "--r-x": "0deg",
        "--r-y": "0deg",
        "--bg-x": "50%",
        "--bg-y": "50%",
        "--duration": "300ms",
        "--fov": "1500px",
        "--diagonal": "111%",
        "--color-one": "#27272a",
        "--color-two": "#18181b",
      } as React.CSSProperties}
      className={cn(
        "relative isolate flex w-full flex-col justify-between overflow-hidden",
        "transition-transform duration-[var(--duration)] ease-out",
        "[transform-style:preserve-3d]",
        "hover:[transform:rotateY(var(--r-x))_rotateX(var(--r-y))_translateZ(10px)]",
        className
      )}
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="absolute inset-0 grid [grid-area:1/1] overflow-hidden rounded-inherit transition-transform duration-[var(--duration)] ease-out [transform-style:preserve-3d]">
        {/* Background layer */}
        <div className="absolute inset-0 transition-opacity duration-[var(--duration)] ease-out opacity-0 hover:opacity-100 pointer-events-none z-0"
          style={{
            background: `radial-gradient(
              circle at var(--bg-x) var(--bg-y),
              rgba(255, 255, 255, 0.05),
              transparent 40%
            )`,
          }}
        />
      </div>
      <div className="relative z-10 h-full w-full">{children}</div>
      {/* Glow effect */}
      <div
        className="absolute inset-0 h-full w-full opacity-0 mix-blend-overlay transition-opacity duration-[var(--duration)] ease-out hover:opacity-100 pointer-events-none z-20"
        style={{
          background: `radial-gradient(
            farthest-corner circle at var(--m-x) var(--m-y),
            rgba(255, 255, 255, 0.8) 10%,
            rgba(255, 255, 255, 0.3) 20%,
            rgba(255, 255, 255, 0) 90%
          )`,
        }}
      />
    </div>
  );
};
