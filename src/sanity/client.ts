import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const sanityClient = createClient({
  projectId: projectId || "xfezos79",
  dataset,
  apiVersion,
  useCdn: false,
});

export function isSanityConfigured(): boolean {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId;
  return Boolean(
    pid &&
    pid !== "your-project-id" &&
    pid !== "sample-project-id"
  );
}
