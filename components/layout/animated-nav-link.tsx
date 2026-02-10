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
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "mi-underline-reveal text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive && "text-ink after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
