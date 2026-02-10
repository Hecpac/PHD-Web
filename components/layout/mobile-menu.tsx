"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { NavItem } from "@/lib/config/site";
import type { CtaConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  navigation: readonly NavItem[];
  cta: CtaConfig;
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 18 },
  },
};

export function MobileMenu({ navigation, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [expandedHref, setExpandedHref] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus trap
  const handleFocusTrap = useCallback(
    (e: KeyboardEvent) => {
      if (!open || e.key !== "Tab" || !overlayRef.current) return;

      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [open],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, [open, handleFocusTrap]);

  // Auto-focus first link when overlay opens
  useEffect(() => {
    if (open && overlayRef.current) {
      const first = overlayRef.current.querySelector<HTMLElement>("a[href]");
      first?.focus();
    }
  }, [open]);

  const menuId = "mobile-nav-overlay";

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        type="button"
        className="relative flex h-11 w-11 items-center justify-center md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        <span className="flex h-5 w-6 flex-col justify-between" aria-hidden="true">
          <span
            className={cn(
              "block h-0.5 w-full bg-ink transition-transform duration-200",
              open && "translate-y-[9px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-full bg-ink transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-full bg-ink transition-transform duration-200",
              open && "-translate-y-[9px] -rotate-45",
            )}
          />
        </span>
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-canvas"
            variants={prefersReduced ? undefined : overlayVariants}
            initial={prefersReduced ? undefined : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
            exit={prefersReduced ? undefined : "exit"}
          >
            {/* Spacer for header height */}
            <div className="h-[73px] shrink-0" />

            {/* Nav list */}
            <motion.nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto px-6 py-6"
              variants={prefersReduced ? undefined : listVariants}
              initial={prefersReduced ? undefined : "hidden"}
              animate={prefersReduced ? undefined : "visible"}
            >
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={prefersReduced ? undefined : itemVariants}
                  >
                    {item.children ? (
                      <ServiceAccordion
                        item={item}
                        expanded={expandedHref === item.href}
                        onToggle={() =>
                          setExpandedHref((prev) =>
                            prev === item.href ? null : item.href,
                          )
                        }
                        onNavigate={() => setOpen(false)}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 text-lg font-semibold text-ink hover:text-accent"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* CTAs at bottom */}
            <motion.div
              className="shrink-0 border-t border-line px-6 py-6"
              variants={prefersReduced ? undefined : itemVariants}
              initial={prefersReduced ? undefined : "hidden"}
              animate={prefersReduced ? undefined : "visible"}
            >
              <div className="flex flex-col gap-3">
                <a
                  href={cta.scheduleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-center bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-on-accent hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Schedule Consultation
                </a>
                <a
                  href={cta.phoneHref}
                  className="flex min-h-11 items-center justify-center border-2 border-ink bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-ink hover:bg-ink hover:text-canvas"
                >
                  Call {cta.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Service Accordion ─────────────────────── */

type ServiceAccordionProps = {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

function ServiceAccordion({
  item,
  expanded,
  onToggle,
  onNavigate,
}: ServiceAccordionProps) {
  const panelId = `mobile-services-panel`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className="py-3 text-lg font-semibold text-ink hover:text-accent"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-muted hover:text-ink"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? "Collapse services" : "Expand services"}
          onClick={onToggle}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={cn(
              "transition-transform duration-200",
              expanded && "rotate-180",
            )}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {expanded && item.children && (
        <ul id={panelId} className="pb-2 pl-4">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block py-2 text-base text-muted hover:text-ink"
                onClick={onNavigate}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
