"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";

import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
import { SocialLinks } from "@/components/ui/social-links";
import { getCtaConfig, siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const ctaConfig = getCtaConfig();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const supportsTransparentHeader =
    pathname === "/" || pathname === "/es" || pathname.startsWith("/for-builders");
  const isSolidHeader = !supportsTransparentHeader || !isAtTop;
  const navTone = isSolidHeader ? "dark" : "light";
  const mobileLogoSrc = isSolidHeader ? "/logo/PHD_logo-removebg-preview.png" : "/logo/PHD_logo_white.png";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest <= 50);
  });

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        isSolidHeader
          ? "border-line/80 bg-canvas/92 shadow-[0_10px_30px_rgb(0_0_0/0.08)] backdrop-blur-header"
          : "border-transparent bg-transparent",
      )}
      role="banner"
    >
      <div className="container-swiss">
        <div className="flex items-center justify-between py-4 md:py-5">
          <Link
            href="/"
            className="relative block h-10 w-[7.5rem] shrink-0 md:hidden"
            aria-label="Go to homepage"
          >
            <Image
              src={mobileLogoSrc}
              alt="PHD logo"
              fill
              sizes="120px"
              className="object-contain object-left"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 md:flex lg:gap-8"
          >
            {siteNavigation.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  items={item.children}
                  tone={navTone}
                />
              ) : (
                <AnimatedNavLink key={item.href} href={item.href} tone={navTone}>
                  {item.label}
                </AnimatedNavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <SocialLinks
              iconOnly
              className="hidden lg:flex"
              linkClassName={cn(
                "!min-h-9 !min-w-9 border-0 bg-transparent shadow-none transition-colors",
                isSolidHeader ? "text-ink/60 hover:text-ink" : "text-white/60 hover:text-white",
              )}
            />
            <div
              aria-hidden
              className={cn(
                "mx-1 hidden h-4 w-px lg:block",
                isSolidHeader ? "bg-ink/15" : "bg-white/20",
              )}
            />

            <CtaLink
              href={ctaConfig.scheduleUrl}
              variant="secondary"
              {...(ctaConfig.scheduleUrl.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
              eventName="cta_schedule_click"
              className={cn(
                "hidden items-center justify-center rounded-full px-5 py-2.5 font-mono text-[10px] font-medium tracking-[0.1em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 md:inline-flex sm:text-[11px]",
                isSolidHeader
                  ? "border-line/80 bg-surface/90 text-ink shadow-[0_10px_24px_rgb(0_0_0/0.08)] hover:scale-[1.02] hover:border-line hover:bg-surface hover:text-ink active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  : "border-white/20 bg-white/5 text-white backdrop-blur-md hover:scale-[1.02] hover:border-white/40 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              )}
            >
              SCHEDULE
            </CtaLink>

            <div className="md:hidden">
              <MobileMenu navigation={siteNavigation} cta={ctaConfig} tone={navTone} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
