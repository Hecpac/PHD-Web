"use client";

import { useEffect } from "react";

export function FooterHeightObserver() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const update = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      document.documentElement.style.setProperty(
        "--footer-height",
        isDesktop ? `${footer.offsetHeight}px` : "0px"
      );
    };

    const ro = new ResizeObserver(update);
    ro.observe(footer);
    update();

    return () => ro.disconnect();
  }, []);

  return null;
}
