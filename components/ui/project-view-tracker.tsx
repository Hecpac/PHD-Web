"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics/events";

type ProjectViewTrackerProps = {
  slug: string;
};

export function ProjectViewTracker({ slug }: ProjectViewTrackerProps) {
  useEffect(() => {
    trackEvent("project_view", { slug });
  }, [slug]);

  return null;
}
