"use client";

import { useCadMode } from "@/lib/hooks/use-cad-mode";

export function CadMode() {
  const active = useCadMode();

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-[100] rounded-sm border border-[#64ffda]/30 bg-[#112240] px-4 py-2 font-mono text-xs text-[#64ffda]"
    >
      {"// STRUCTURAL VIEW UNLOCKED"}
    </div>
  );
}
