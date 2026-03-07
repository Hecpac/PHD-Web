"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

type AnimatedNavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function AnimatedNavLink({
  href,
  children,
  className,
  tone = "light",
}: AnimatedNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const isDarkTone = tone === "dark";

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex min-h-10 items-center px-1 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-[11px]",
        isDarkTone
          ? "text-ink/72 hover:text-ink focus-visible:outline-accent"
          : "text-white/60 hover:text-white focus-visible:outline-white/50",
        isActive && (isDarkTone ? "text-ink" : "text-white"),
        className,
      )}
    >
      {children}
    </Link>
  );
}
