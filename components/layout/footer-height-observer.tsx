"use client";

import { useEffect } from "react";

export function FooterHeightObserver() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const update = () => {
      document.documentElement.style.setProperty("--footer-height", `${footer.offsetHeight}px`);
    };

    const ro = new ResizeObserver(update);
    ro.observe(footer);
    update();

    return () => ro.disconnect();
  }, []);

  return null;
}
