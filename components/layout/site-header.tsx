"use client";

import { useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
import { SocialLinks } from "@/components/ui/social-links";
import { getCtaConfig, siteNavigation } from "@/lib/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("layout");
  const ctaConfig = getCtaConfig();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const supportsTransparentHeader =
    pathname === "/" || pathname.startsWith("/for-builders");
  const isSolidHeader = !supportsTransparentHeader || !isAtTop;
  const navTone = isSolidHeader ? "dark" : "light";
  const mobileLogoSrc = isSolidHeader ? "/logo/PHD_logo-removebg-preview.png" : "/logo/PHD_logo_white.png";

  const translatedNav = siteNavigation.map((item) => ({
    ...item,
    label: t(`nav.${item.tKey}`),
    children: item.children?.map((child) => ({
      ...child,
      label: t(`nav.${child.tKey}`),
    })),
  }));

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
            aria-label={t("goToHomepage")}
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
            {translatedNav.map((item) =>
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

            <LocaleSwitcher tone={navTone} />

            <div className="md:hidden">
              <MobileMenu navigation={translatedNav} cta={ctaConfig} tone={navTone} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
