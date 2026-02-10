"use client";

import { useEffect, useSyncExternalStore, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const noop = () => () => {};
const getIsTouch = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
const getIsTouchServer = () => false;

export function CursorEffect() {
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useSyncExternalStore(noop, getIsTouch, getIsTouchServer);
  const [isExpanded, setIsExpanded] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  // Track mouse position
  useEffect(() => {
    if (isTouch || shouldReduceMotion) return;

    function handleMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch, shouldReduceMotion, cursorX, cursorY]);

  // Track expand targets
  useEffect(() => {
    if (isTouch || shouldReduceMotion) return;

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='expand']")) {
        setIsExpanded(true);
      }
    }

    function handleOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='expand']")) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isTouch, shouldReduceMotion]);

  if (isTouch || shouldReduceMotion) return null;

  const size = isExpanded ? 40 : 12;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full bg-ink mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
