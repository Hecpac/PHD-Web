import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

export const hasSanityConfig = Boolean(projectId && dataset);

const apiVersion = process.env.SANITY_API_VERSION;
if (!apiVersion && hasSanityConfig) {
  throw new Error("SANITY_API_VERSION is required when Sanity is configured");
}

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_READ_TOKEN,
      perspective: "published",
    })
  : null;
