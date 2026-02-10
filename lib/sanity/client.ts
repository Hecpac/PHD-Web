import { createClient } from "next-sanity";

const apiVersion = process.env.SANITY_API_VERSION ?? "2026-02-10";
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

export const hasSanityConfig = Boolean(projectId && dataset);

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
