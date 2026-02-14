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
        "inline-flex min-h-10 items-center rounded-lg border border-transparent px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.07em] text-muted transition-all hover:border-line hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive && "border-accent/35 bg-accent/10 text-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}
