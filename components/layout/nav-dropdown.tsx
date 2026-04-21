"use client";

import { useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type NavDropdownProps = {
  label: string;
  href: string;
  items: readonly { href: string; label: string }[];
  tone?: "light" | "dark";
};

export function NavDropdown({
  label,
  href,
  items,
  tone = "light",
}: NavDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isPathActive = (target: string) =>
    pathname === target || (target !== "/" && pathname.startsWith(`${target}/`));
  const isActive = isPathActive(href) || items.some((item) => isPathActive(item.href));
  const isDarkTone = tone === "dark";

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`inline-flex min-h-10 items-center gap-1.5 px-1 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-[11px] ${
          isDarkTone ? "focus-visible:outline-accent" : "focus-visible:outline-white/50"
        } ${
          isActive
            ? isDarkTone
              ? "text-ink"
              : "text-white"
            : isDarkTone
              ? "text-ink/72 hover:text-ink"
              : "text-white/60 hover:text-white"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""} ${
            isActive
              ? isDarkTone
                ? "text-ink"
                : "text-white"
              : isDarkTone
                ? "text-ink/72"
                : "text-white/60"
          }`}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-2 min-w-64 rounded-xl border border-line/80 bg-canvas/95 p-1.5 shadow-[0_18px_34px_rgb(0_0_0/0.14)] backdrop-blur-header"
            role="menu"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {items.map((item) => {
              const itemIsActive = isPathActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={itemIsActive ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-[11px] font-mono uppercase tracking-[0.15em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                    itemIsActive
                      ? "bg-surface text-ink"
                      : "text-ink/70 hover:bg-surface hover:text-ink focus-visible:bg-surface"
                  }`}
                  onClick={() => setOpen(false)}
                  onFocus={handleEnter}
                  onBlur={handleLeave}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
