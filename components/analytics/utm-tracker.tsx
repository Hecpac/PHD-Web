"use client";

import { useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function UTMTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasAnyUtm = UTM_KEYS.some((key) => Boolean(params.get(key)));

    if (!hasAnyUtm) {
      return;
    }

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        window.sessionStorage.setItem(key, value);
      }
    }

    const landingPath = `${window.location.pathname}${window.location.search}`;
    window.sessionStorage.setItem("utm_landing_path", landingPath);
  }, []);

  return null;
}
