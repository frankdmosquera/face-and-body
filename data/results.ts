import type { ImageSlot } from "@/data/images";
import type { ConcernSlug } from "@/types/services";

export type Result = {
  /** one image that already contains before and after */
  slot: ImageSlot;
  concerns: readonly ConcernSlug[];
  /** factual, no outcome claim */
  caption: string;
  source: string;
  /** null until she says which treatment the photo shows */
  treatment: string | null;
};

export const RESULTS: readonly Result[] = [
  {
    slot: "resultRedness",
    concerns: ["acne"],
    caption: "Facial redness. Before and after, from her Instagram.",
    source: "instagram post-01",
    treatment: null,
  },
];
