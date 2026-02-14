"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type CursorState = "default" | "link" | "image" | "text" | "drag";

const cursorStateMap: Record<string, CursorState> = {
  cta: "link",
  drag: "drag",
  expand: "link",
  image: "image",
  link: "link",
  text: "text",
};

const cursorStyles: Record<CursorState, string> = {
  default: "h-2 w-2 rounded-full border-0 bg-white mix-blend-difference",
  link: "h-14 w-14 rounded-full border border-white bg-transparent mix-blend-difference",
  image: "h-24 w-24 rounded-full border-0 bg-black text-[0.625rem] font-semibold tracking-[0.2em] text-white",
  text: "h-6 w-[2px] rounded-sm border-0 bg-white mix-blend-difference",
  drag: "h-10 w-20 rounded-full border-0 bg-black text-xs font-semibold tracking-[0.2em] text-white",
};

function resolveCursorState(value?: string): CursorState {
  if (!value) {
    return "default";
  }

  return cursorStateMap[value] ?? "default";
}

export function CustomCursor() {
  const [isCoarsePointer, setIsCoarsePointer] = useState<boolean | null>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updatePointerType = () => setIsCoarsePointer(mediaQuery.matches);

    updatePointerType();
    mediaQuery.addEventListener("change", updatePointerType);

    return () => mediaQuery.removeEventListener("change", updatePointerType);
  }, []);

  useEffect(() => {
    if (isCoarsePointer !== false) {
      return;
    }

    const cursor = document.getElementById("custom-cursor");
    if (!cursor) {
      return;
    }

    let currentState: CursorState = "default";
    let isVisible = false;

    document.body.classList.add("custom-cursor-enabled");

    gsap.set(cursor, { autoAlpha: 0, scale: 1, x: -100, xPercent: -50, y: -100, yPercent: -50 });

    const moveX = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });

    const handleMouseMove = (event: MouseEvent) => {
      const hoveredElement = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-cursor]");
      const nextState = resolveCursorState(hoveredElement?.dataset.cursor);

      if (nextState !== currentState) {
        currentState = nextState;
        setCursorState(nextState);
      }

      let targetX = event.clientX;
      let targetY = event.clientY;

      if (nextState === "link" && hoveredElement) {
        const bounds = hoveredElement.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const magneticX = gsap.utils.clamp(-15, 15, (centerX - event.clientX) * 0.35);
        const magneticY = gsap.utils.clamp(-15, 15, (centerY - event.clientY) * 0.35);

        targetX += magneticX;
        targetY += magneticY;
      }

      if (!isVisible) {
        isVisible = true;
        gsap.set(cursor, { autoAlpha: 1 });
      }

      moveX(targetX);
      moveY(targetY);
    };

    const handleMouseDown = () => {
      if (currentState === "drag") {
        gsap.to(cursor, { duration: 0.12, ease: "power2.out", scale: 0.8 });
      }
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { duration: 0.2, ease: "power2.out", scale: 1 });
    };

    const handleMouseLeaveWindow = () => {
      isVisible = false;
      gsap.set(cursor, { autoAlpha: 0 });
      currentState = "default";
      setCursorState("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.body.classList.remove("custom-cursor-enabled");
      gsap.killTweensOf(cursor);
    };
  }, [isCoarsePointer]);

  if (isCoarsePointer !== false) {
    return null;
  }

  return (
    <div
      id="custom-cursor"
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center select-none opacity-0 transition-[width,height,border-width,border-radius,background-color,color] duration-150 ease-out [@media(pointer:coarse)]:hidden",
        cursorStyles[cursorState],
      )}
    >
      {cursorState === "image" ? "VIEW" : null}
      {cursorState === "drag" ? (
        <span className="flex items-center gap-2 text-xs leading-none">
          <span aria-hidden="true">←</span>
          <span aria-hidden="true">→</span>
        </span>
      ) : null}
    </div>
  );
}
