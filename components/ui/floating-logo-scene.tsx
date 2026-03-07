"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getLenisInstance } from "@/lib/lenis";

export function FloatingLogoScene() {
  const pathname = usePathname();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
    [pathname],
  );

  return (
    <Link
      href="/"
      aria-label="Premium Home Design — Go to homepage"
      onClick={handleClick}
      className="pointer-events-auto fixed bottom-28 right-4 z-[85] flex items-center justify-center md:bottom-20 md:right-8 motion-safe:animate-[float_6s_ease-in-out_infinite] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group"
    >
      <span
        className="select-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-ink/30 transition-all duration-500 group-hover:tracking-[0.35em] group-hover:text-ink/50 md:text-[0.7rem]"
        style={{
          textShadow: "0 1px 3px rgba(255,255,255,0.6), 0 0 8px rgba(255,255,255,0.3)",
        }}
      >
        PHD
      </span>
    </Link>
  );
}
