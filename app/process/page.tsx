import type { Metadata } from "next";

import { BlueprintSection } from "@/components/home/blueprint-section";
import { JsonLd } from "@/components/ui/json-ld";
import { getProcessSteps } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Process | Blueprint for DFW Projects",
  description:
    "A stage-based process with decision gates for custom home design-build projects in Dallas-Fort Worth.",
  openGraph: {
    title: "Process | Blueprint for DFW Projects",
    description:
      "A stage-based process with decision gates for custom home design-build projects in Dallas-Fort Worth.",
  },
  alternates: {
    canonical: "/process",
  },
};

export default async function ProcessPage() {
  const steps = await getProcessSteps();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Process", href: "/process" },
        ])}
      />
      <BlueprintSection steps={steps} headingAs="h1" />
    </>
  );
}
