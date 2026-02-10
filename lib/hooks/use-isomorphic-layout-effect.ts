import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe useLayoutEffect.
 * Falls back to useEffect on the server to avoid React warnings.
 * Prevents FOUC by running before paint on the client.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
