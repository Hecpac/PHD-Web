import type { Metadata } from "next";

import HomePage from "@/app/page";
import { getSiteUrl } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    alternates: {
      canonical: `${siteUrl}/es`,
      languages: {
        "x-default": siteUrl,
        "en-US": siteUrl,
        "es-MX": `${siteUrl}/es`,
      },
    },
  };
}

export default HomePage;
