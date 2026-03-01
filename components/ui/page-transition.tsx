"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TransitionProviderProps = {
  children: ReactNode;
};

type TransitionKind = "slab" | "blueprint";
type TransitionPhase = "idle" | "enter" | "hold" | "exit";
type TransitionTimings = {
  enter: number;
  hold: number;
  exit: number;
};

const POWER4_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];
const PROJECT_PAGE_PATTERN = /^\/projects\/[^/]+\/?$/;
const GRID_COLUMNS = 8;
const GRID_ROWS = 6;

const TIMINGS: Record<TransitionKind, TransitionTimings> = {
  slab: { enter: 0.6, hold: 0.2, exit: 0.6 },
  blueprint: { enter: 0.8, hold: 0.2, exit: 0.4 },
};

function isProjectPage(pathname: string) {
  return PROJECT_PAGE_PATTERN.test(pathname);
}

function toMs(seconds: number) {
  return seconds * 1000;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const previousPathRef = useRef(pathname);
  const pendingChildrenRef = useRef(children);
  const timersRef = useRef<number[]>([]);

  const [renderedChildren, setRenderedChildren] = useState(children);
  const [transitionKind, setTransitionKind] = useState<TransitionKind>("slab");
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  const verticalLines = useMemo(
    () =>
      Array.from(
        { length: GRID_COLUMNS + 1 },
        (_, index) => (index / GRID_COLUMNS) * 100,
      ),
    [],
  );
  const horizontalLines = useMemo(
    () =>
      Array.from(
        { length: GRID_ROWS + 1 },
        (_, index) => (index / GRID_ROWS) * 100,
      ),
    [],
  );

  const isTransitioning = phase !== "idle";

  const clearTimers = () => {
    for (const timerId of timersRef.current) {
      window.clearTimeout(timerId);
    }
    timersRef.current = [];
  };

  useEffect(() => {
    pendingChildrenRef.current = children;
  }, [children]);

  useEffect(() => {
    if (shouldReduceMotion) {
      clearTimers();
      previousPathRef.current = pathname;
      return;
    }

    const previousPath = previousPathRef.current;
    if (pathname === previousPath) {
      return;
    }

    previousPathRef.current = pathname;
    clearTimers();

    const nextKind: TransitionKind = isProjectPage(pathname)
      ? "blueprint"
      : "slab";
    const timing = TIMINGS[nextKind];
    const enterMs = toMs(timing.enter);
    const holdMs = toMs(timing.hold);
    const exitMs = toMs(timing.exit);

    timersRef.current.push(
      window.setTimeout(() => {
        setTransitionKind(nextKind);
        setPhase("enter");
      }, 0),
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("hold");
        setRenderedChildren(pendingChildrenRef.current);
      }, enterMs),
    );
    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("exit");
      }, enterMs + holdMs),
    );
    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("idle");
      }, enterMs + holdMs + exitMs),
    );

    return clearTimers;
  }, [pathname, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {phase === "idle" ? children : renderedChildren}

      <motion.div
        aria-hidden
        className={`fixed inset-0 z-50 bg-[#1a1a1a] ${
          transitionKind === "slab" && isTransitioning
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        initial={false}
        animate={
          transitionKind !== "slab"
            ? { y: "100%" }
            : phase === "enter" || phase === "hold"
              ? { y: "0%" }
              : phase === "exit"
                ? { y: "-100%" }
                : { y: "100%" }
        }
        transition={
          transitionKind !== "slab"
            ? { duration: 0 }
            : phase === "enter"
              ? { duration: TIMINGS.slab.enter, ease: POWER4_IN_OUT }
              : phase === "exit"
                ? { duration: TIMINGS.slab.exit, ease: POWER4_IN_OUT }
                : { duration: 0 }
        }
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono text-[10px] tracking-[0.45em] text-neutral-300"
            initial={false}
            animate={
              transitionKind === "slab" && phase === "hold"
                ? { opacity: [0, 1, 0], scale: [0.9, 1, 0.9] }
                : { opacity: 0, scale: 0.9 }
            }
            transition={
              transitionKind === "slab" && phase === "hold"
                ? {
                    duration: TIMINGS.slab.hold,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }
                : { duration: 0.1 }
            }
          >
            PHD
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className={`fixed inset-0 z-50 ${
          transitionKind === "blueprint" && isTransitioning
            ? "pointer-events-auto"
            : "pointer-events-none"
        } bg-[#1a1a1a]`}
        initial={false}
        animate={
          transitionKind !== "blueprint"
            ? { opacity: 0 }
            : phase === "exit"
              ? { opacity: 0 }
              : phase === "enter" || phase === "hold"
                ? { opacity: 1 }
                : { opacity: 0 }
        }
        transition={
          transitionKind !== "blueprint"
            ? { duration: 0 }
            : phase === "exit"
              ? { duration: TIMINGS.blueprint.exit, ease: POWER4_IN_OUT }
              : { duration: 0.15 }
        }
      >
        <motion.svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={false}
          animate={
            transitionKind !== "blueprint"
              ? { scale: 0, opacity: 0 }
              : phase === "enter" || phase === "hold" || phase === "exit"
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
          }
          transition={
            transitionKind !== "blueprint"
              ? { duration: 0 }
              : phase === "enter"
                ? { duration: TIMINGS.blueprint.enter, ease: POWER4_IN_OUT }
                : phase === "exit"
                  ? { duration: TIMINGS.blueprint.exit, ease: POWER4_IN_OUT }
                  : { duration: 0 }
          }
          style={{ transformOrigin: "50% 50%" }}
        >
          {verticalLines.map((x) => (
            <line
              key={`vertical-${x}`}
              x1={x}
              y1={0}
              x2={x}
              y2={100}
              stroke="#2a2a2a"
              strokeWidth={0.2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {horizontalLines.map((y) => (
            <line
              key={`horizontal-${y}`}
              x1={0}
              y1={y}
              x2={100}
              y2={y}
              stroke="#2a2a2a"
              strokeWidth={0.2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </motion.svg>
      </motion.div>
    </>
  );
}
