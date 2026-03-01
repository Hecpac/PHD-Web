"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AnimatedNavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function AnimatedNavLink({ href, children, className }: AnimatedNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex min-h-10 items-center px-1 py-2 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
        isActive && "text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}
