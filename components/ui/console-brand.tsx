"use client";

import { useEffect } from "react";

const ASCII_ART = `
%c
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║      ██████╗ ███████╗██╗    ██╗          ║
    ║      ██╔══██╗██╔════╝██║    ██║          ║
    ║      ██║  ██║█████╗  ██║ █╗ ██║          ║
    ║      ██║  ██║██╔══╝  ██║███╗██║          ║
    ║      ██████╔╝██║     ╚███╔███╔╝          ║
    ║      ╚═════╝ ╚═╝      ╚══╝╚══╝           ║
    ║                                          ║
    ║   MODERN DESIGN-BUILD · DALLAS-FORT WORTH║
    ║                                          ║
    ╚══════════════════════════════════════════╝

    Built on solid ground.

    If you're reading this, you appreciate craft.
    We're always looking for engineers who care about
    the details as much as we do.

    Performance: Lighthouse 90+ · CLS < 0.1
    Stack: Next.js · GSAP · Framer Motion · Sanity

`;

export function ConsoleBrand() {
  useEffect(() => {
    console.log(
      ASCII_ART,
      "color: #64ffda; font-family: monospace; font-size: 10px; line-height: 1.2;"
    );
  }, []);

  return null;
}
