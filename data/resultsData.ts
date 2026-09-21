import type { ImageSlot } from "@/data/imagesData";
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

/**
 * Empty on purpose, which hides the whole section: `Results` returns null
 * when this array is.
 *
 * One entry rendered a single narrow card into a three-column grid with
 * two-thirds of the row empty beside it, captioned "from her Instagram" and
 * unable to name the treatment. A "Before and after" heading over one
 * unattributed photo undersells her more than having no section at all.
 *
 * Restore by putting three or four back. The photo she already gave us is
 * kept below so it is not lost, and the `resultRedness` slot still exists
 * in the image library.
 */
export const RESULTS: readonly Result[] = [];

/** Waiting on more before-and-afters from her. */
const PENDING: readonly Result[] = [
  {
    slot: "resultRedness",
    concerns: ["acne"],
    caption: "Facial redness. Before and after, from her Instagram.",
    source: "instagram post-01",
    treatment: null,
  },
];
void PENDING;
