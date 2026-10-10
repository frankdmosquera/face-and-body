import type { ImageSlotType } from "@/data/imagesData";

/** One step of "Your visit": what happens, and the picture held beside it. */
export type VisitStepType = {
  title: string;
  text: string;
  /** A photograph slot, or the Eminence shelf for the take-home step. */
  visual: { kind: "photo"; slot: ImageSlotType } | { kind: "shelf" };
};
