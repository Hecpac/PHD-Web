import type { Metadata } from "next";

import { BlueprintSection } from "@/components/home/blueprint-section";
import { JsonLd } from "@/components/ui/json-ld";
import { getSiteUrl } from "@/lib/config/site";
import { getProcessSteps } from "@/lib/data";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: "Process | Blueprint for DFW Projects",
    description:
      "A stage-based process with decision gates for custom home design-build projects in Dallas-Fort Worth.",
    openGraph: {
      title: "Process | Blueprint for DFW Projects",
      description:
        "A stage-based process with decision gates for custom home design-build projects in Dallas-Fort Worth.",
    },
    alternates: {
      canonical: `${siteUrl}/process`,
    },
  };
}

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
