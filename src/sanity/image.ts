import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: unknown): string {
  if (!source) return "";
  try {
    return builder.image(source as Parameters<typeof builder.image>[0]).auto("format").fit("max").url();
  } catch {
    return "";
  }
}
