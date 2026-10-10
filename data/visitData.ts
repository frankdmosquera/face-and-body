import { siteConfig } from "@/data/siteConfig";
import type { VisitStepType } from "@/types/visitTypes";

/**
 * "Your visit", the home page's scroll story. Every claim here is one the site
 * already makes elsewhere: the free consultation and its length
 * (`siteConfig`), the skin analysis and the written plan (the consultation
 * band), Eminence in every facial and on the clinic shelf (the Eminence band).
 * Nothing new is promised in this file.
 */
export const visitData: readonly VisitStepType[] = [
  {
    title: "She looks first",
    text: `A free ${siteConfig.consultation.durationMin} minute consultation in the clinic. Your skin is analysed before anyone opens the menu, and you get an honest read on what will actually work.`,
    visual: { kind: "photo", slot: "catSkin" },
  },
  {
    title: "A plan in writing",
    text: "Before you commit to anything you get a written plan with its pricing, so you know what it costs before the first treatment.",
    visual: { kind: "photo", slot: "concernPigmentation" },
  },
  {
    title: "The treatment",
    text: "Facials built on Eminence Organics, with the clinic's devices where your skin needs them: ultrasonic, LED and oxygen.",
    visual: { kind: "photo", slot: "catFacial" },
  },
  {
    title: "Take it home",
    text: "The same Eminence products used in the room are on the clinic shelf, so the routine carries on between visits.",
    visual: { kind: "shelf" },
  },
];
