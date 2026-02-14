"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const isPathActive = useCallback(
    (target: string) =>
      pathname === target || (target !== "/" && pathname.startsWith(`${target}/`)),
    [pathname],
  );
  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => buttonRef.current?.focus());
    }
  }, []);

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
        closeMenu(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, open]);

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
        className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-line/80 bg-surface/75 text-ink shadow-[0_3px_12px_rgb(0_0_0/0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
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

      {/* Mobile sheet overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] bg-ink/30 px-3 pb-3 pt-[5.25rem] backdrop-blur-[2px]"
            variants={prefersReduced ? undefined : overlayVariants}
            initial={prefersReduced ? undefined : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
            exit={prefersReduced ? undefined : "exit"}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeMenu(true);
              }
            }}
          >
            <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border border-line/80 bg-canvas shadow-[0_28px_55px_rgb(0_0_0/0.24)]">
              <div className="flex items-center justify-between border-b border-line/80 px-5 py-4">
                <p className="type-mono-label text-muted">Navigation</p>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-line/80 bg-surface text-ink hover:border-accent/40 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-label="Close menu"
                  onClick={() => closeMenu(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav list */}
              <motion.nav
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto px-4 py-4 sm:px-5"
                variants={prefersReduced ? undefined : listVariants}
                initial={prefersReduced ? undefined : "hidden"}
                animate={prefersReduced ? undefined : "visible"}
              >
                <ul className="space-y-2">
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
                          onNavigate={() => closeMenu()}
                          panelId={`${item.href}-panel`}
                          isPathActive={isPathActive}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={isPathActive(item.href) ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center rounded-lg border px-4 py-3 text-base font-semibold tracking-tight transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                            isPathActive(item.href)
                              ? "border-accent/35 bg-accent/10 text-ink"
                              : "border-transparent text-ink hover:border-line hover:bg-surface",
                          )}
                          onClick={() => closeMenu()}
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
                className="shrink-0 border-t border-line/80 bg-surface/60 px-5 py-5"
                variants={prefersReduced ? undefined : itemVariants}
                initial={prefersReduced ? undefined : "hidden"}
                animate={prefersReduced ? undefined : "visible"}
              >
                <div className="flex flex-col gap-3">
                  <a
                    href={cta.scheduleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 items-center justify-center rounded-md border border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-on-accent hover:bg-accent-hover active:bg-accent-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Schedule Consultation
                  </a>
                  <a
                    href={cta.phoneHref}
                    className="flex min-h-12 items-center justify-center rounded-md border border-ink bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.05em] text-ink hover:bg-ink hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Call {cta.phoneDisplay}
                  </a>
                </div>
              </motion.div>
            </div>
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
  panelId: string;
  isPathActive: (href: string) => boolean;
};

function ServiceAccordion({
  item,
  expanded,
  onToggle,
  onNavigate,
  panelId,
  isPathActive,
}: ServiceAccordionProps) {
  const hasActiveChild = item.children?.some((child) => isPathActive(child.href)) ?? false;
  const isActive = isPathActive(item.href) || hasActiveChild;

  return (
    <div className="rounded-lg border border-transparent px-1 py-1 hover:border-line/80">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex min-h-12 flex-1 items-center rounded-lg border px-3 py-3 text-base font-semibold tracking-tight transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            isActive
              ? "border-accent/35 bg-accent/10 text-ink"
              : "border-transparent text-ink hover:border-line hover:bg-surface",
          )}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className={cn(
            "ml-1 flex h-11 w-11 items-center justify-center rounded-md border border-transparent text-muted hover:border-line hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            expanded && "border-line bg-surface text-ink",
          )}
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
        <ul id={panelId} className="mt-2 space-y-1 border-l border-line pl-3">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={isPathActive(child.href) ? "page" : undefined}
                className={cn(
                  "block min-h-11 rounded-md px-3 py-2 text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  isPathActive(child.href)
                    ? "bg-accent/10 font-semibold text-ink"
                    : "text-muted hover:bg-surface hover:text-ink",
                )}
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
