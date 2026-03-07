"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { CtaLink } from "@/components/ui/cta-link";
import { SocialLinks } from "@/components/ui/social-links";
import { getCtaConfig, siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const ctaConfig = getCtaConfig();
  const { scrollY } = useScroll();
  
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine if we are at the very top
    if (latest <= 50) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }
  });

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isAtTop 
            ? "bg-transparent border-transparent" 
            : "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10"
        )} 
        role="banner"
      >
        <div className="container-swiss">
          <div className="flex items-center justify-between py-4 md:py-5">
            {/* Spacer — logo 3D is fixed in bottom-left via FloatingLogo */}
            <div className="w-10 shrink-0 md:hidden" />

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
                  />
                ) : (
                  <AnimatedNavLink key={item.href} href={item.href}>
                    {item.label}
                  </AnimatedNavLink>
                ),
              )}
            </nav>

            <div className="flex items-center gap-4">
              <SocialLinks
                iconOnly
                className="hidden lg:flex"
                linkClassName="!min-h-9 !min-w-9 text-white/60 hover:text-white transition-colors border-0 shadow-none bg-transparent"
              />
              <div aria-hidden className="hidden h-4 w-px bg-white/20 lg:block mx-1" />
              
              {/* Enhanced Pill CTA */}
              <CtaLink
                href={ctaConfig.scheduleUrl}
                {...(ctaConfig.scheduleUrl.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                eventName="cta_schedule_click"
                className="hidden md:inline-flex items-center justify-center text-[10px] sm:text-[11px] tracking-[0.1em] font-mono font-medium px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                SCHEDULE
              </CtaLink>

              <div className="md:hidden">
                <MobileMenu navigation={siteNavigation} cta={ctaConfig} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
