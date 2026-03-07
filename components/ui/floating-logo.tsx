"use client";

import dynamic from "next/dynamic";

const FloatingLogoScene = dynamic(
  () =>
    import("@/components/ui/floating-logo-scene").then(
      (mod) => mod.FloatingLogoScene,
    ),
  { ssr: false },
);

export function FloatingLogo() {
  return <FloatingLogoScene />;
}
