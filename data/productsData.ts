import type { ConcernSlug } from "@/types/services";

/**
 * ⚠️ PLACEHOLDER. NOT HER STOCK LIST. DO NOT DEPLOY WITHOUT HER SIGN-OFF.
 *
 * Every product below is a real Eminence Organics product from a real
 * collection, and she is an authorised Eminence stockist, so the shape of this
 * is right. What is NOT verified is which of them she actually carries. Nobody
 * has asked her yet, and there was no product data anywhere in this repo when
 * this was written on 2026-09-20.
 *
 * The rule from `blueprint/reference/catalogue.md` applies here exactly as it
 * does to the treatments: presentation is ours, but what exists and what it
 * costs is hers. So:
 *
 * - **No prices.** Not one. A made-up price on a live page is a customer
 *   arriving expecting to pay it. The page says "ask in clinic", which is also
 *   true: she sells these across the counter, not online.
 * - **No stock counts.** Same reason, and they would be wrong within a day.
 * - Descriptions are ours and read like the treatment descriptions do.
 *
 * Replacing this is a data-gathering job, not a coding one: walk her shelf,
 * write down what is on it, delete whatever is not. The page renders whatever
 * is in this array, so nothing else has to change.
 *
 * `concerns` reuses the same taxonomy as the treatments, so a product and the
 * facial that uses it can be tied together later without a second vocabulary.
 */

export type CollectionSlug =
  | "stone-crop"
  | "clear-skin"
  | "bright-skin"
  | "firm-skin"
  | "calm-skin"
  | "sun-defense";

export type Collection = {
  slug: CollectionSlug;
  label: string;
  /** One line on who it is for, in the voice the category groups use. */
  heading: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: CollectionSlug;
  /** Cleanser, Serum, Moisturiser and so on. Shown as the card's eyebrow. */
  format: string;
  description: string;
  concerns: readonly ConcernSlug[];
};

export const COLLECTIONS: readonly Collection[] = [
  {
    slug: "stone-crop",
    label: "Stone Crop",
    heading: "For dryness, dullness and skin that needs calming down",
  },
  {
    slug: "clear-skin",
    label: "Clear Skin",
    heading: "For congestion, breakouts and oily skin",
  },
  {
    slug: "bright-skin",
    label: "Bright Skin",
    heading: "For dark spots, uneven tone and sun damage",
  },
  {
    slug: "firm-skin",
    label: "Firm Skin",
    heading: "For fine lines and skin that has lost its bounce",
  },
  {
    slug: "calm-skin",
    label: "Calm Skin",
    heading: "For redness, sensitivity and reactive skin",
  },
  {
    slug: "sun-defense",
    label: "Sun Defense",
    heading: "Daily SPF, and the reason the rest of it works",
  },
] as const;

export const PRODUCTS: readonly Product[] = [
  // Stone Crop
  {
    slug: "stone-crop-gel-wash",
    name: "Stone Crop Gel Wash",
    collection: "stone-crop",
    format: "Cleanser",
    description:
      "A gentle gel cleanser that takes the day off without stripping. The one to start with if you are not sure what your skin wants.",
    concerns: ["dull-dehydrated"],
  },
  {
    slug: "stone-crop-hydrating-mist",
    name: "Stone Crop Hydrating Mist",
    collection: "stone-crop",
    format: "Mist",
    description:
      "Spritzed after cleansing so whatever goes on next has something to hold to. Also the thing to keep on a desk in a Calgary winter.",
    concerns: ["dull-dehydrated"],
  },
  {
    slug: "stone-crop-whip-moisturizer",
    name: "Stone Crop Whip Moisturizer",
    collection: "stone-crop",
    format: "Moisturiser",
    description:
      "Light enough for daytime, and it disappears rather than sitting on top. Good under makeup.",
    concerns: ["dull-dehydrated"],
  },
  {
    slug: "stone-crop-masque",
    name: "Stone Crop Masque",
    collection: "stone-crop",
    format: "Masque",
    description:
      "Ten minutes, once or twice a week, for skin that looks tired rather than problematic.",
    concerns: ["dull-dehydrated"],
  },

  // Clear Skin
  {
    slug: "clear-skin-probiotic-cleanser",
    name: "Clear Skin Probiotic Cleanser",
    collection: "clear-skin",
    format: "Cleanser",
    description:
      "Cleans out congestion without the squeaky tightness that makes oily skin produce more oil by lunchtime.",
    concerns: ["acne"],
  },
  {
    slug: "clear-skin-willow-bark-booster-serum",
    name: "Clear Skin Willow Bark Booster-Serum",
    collection: "clear-skin",
    format: "Serum",
    description:
      "Willow bark is where salicylic acid comes from. This is the workhorse of the collection and the one that changes things.",
    concerns: ["acne", "scarring-texture"],
  },
  {
    slug: "clear-skin-probiotic-moisturizer",
    name: "Clear Skin Probiotic Moisturizer",
    collection: "clear-skin",
    format: "Moisturiser",
    description:
      "Breakout-prone skin still needs moisturising. Skipping it is why the oil comes back.",
    concerns: ["acne"],
  },
  {
    slug: "clear-skin-targeted-treatment",
    name: "Clear Skin Targeted Treatment",
    collection: "clear-skin",
    format: "Spot treatment",
    description: "For the one that turns up the night before something.",
    concerns: ["acne"],
  },

  // Bright Skin
  {
    slug: "bright-skin-cleanser",
    name: "Bright Skin Cleanser",
    collection: "bright-skin",
    format: "Cleanser",
    description:
      "The first step of a pigmentation routine. On its own it will not shift a dark spot; as part of the set it earns its place.",
    concerns: ["pigmentation"],
  },
  {
    slug: "bright-skin-licorice-root-booster-serum",
    name: "Bright Skin Licorice Root Booster-Serum",
    collection: "bright-skin",
    format: "Serum",
    description:
      "Licorice root for uneven tone and sun spots. Slow and steady - think months, not weeks, and keep wearing SPF or it is wasted.",
    concerns: ["pigmentation"],
  },
  {
    slug: "bright-skin-moisturizer-spf-40",
    name: "Bright Skin Moisturizer SPF 40",
    collection: "bright-skin",
    format: "Moisturiser with SPF",
    description:
      "Treats and protects in the same step, which matters because pigmentation comes back the moment sunscreen stops.",
    concerns: ["pigmentation"],
  },
  {
    slug: "bright-skin-overnight-correcting-cream",
    name: "Bright Skin Overnight Correcting Cream",
    collection: "bright-skin",
    format: "Night cream",
    description:
      "The night half of the pair. Pigmentation work is a day-and-night routine or it is not a routine.",
    concerns: ["pigmentation"],
  },

  // Firm Skin
  {
    slug: "firm-skin-acai-cleanser",
    name: "Firm Skin Acai Cleanser",
    collection: "firm-skin",
    format: "Cleanser",
    description:
      "Creamy rather than foaming, because mature skin does not need stripping.",
    concerns: ["fine-lines"],
  },
  {
    slug: "firm-skin-acai-booster-serum",
    name: "Firm Skin Acai Booster-Serum",
    collection: "firm-skin",
    format: "Serum",
    description:
      "Antioxidants and a noticeable plumping. The one to take home after a microneedling course to hold the result.",
    concerns: ["fine-lines"],
  },
  {
    slug: "firm-skin-acai-moisturizer",
    name: "Firm Skin Acai Moisturizer",
    collection: "firm-skin",
    format: "Moisturiser",
    description:
      "Richer than the Stone Crop whip, for skin that drinks moisturiser and asks for more.",
    concerns: ["fine-lines", "dull-dehydrated"],
  },
  {
    slug: "firm-skin-acai-exfoliating-peel",
    name: "Firm Skin Acai Exfoliating Peel",
    collection: "firm-skin",
    format: "At-home peel",
    description:
      "A weekly at-home peel between appointments. Ask before adding it if you are already on a resurfacing course.",
    concerns: ["fine-lines", "scarring-texture"],
  },

  // Calm Skin
  {
    slug: "calm-skin-chamomile-cleanser",
    name: "Calm Skin Chamomile Cleanser",
    collection: "calm-skin",
    format: "Cleanser",
    description:
      "For skin that goes red at the smallest provocation. Nothing in it argues with you.",
    concerns: ["dull-dehydrated"],
  },
  {
    slug: "calm-skin-arnica-masque",
    name: "Calm Skin Arnica Masque",
    collection: "calm-skin",
    format: "Masque",
    description:
      "Arnica for visible redness. Useful after a treatment, and useful after a bad week.",
    concerns: ["dull-dehydrated"],
  },
  {
    slug: "calm-skin-chamomile-moisturizer",
    name: "Calm Skin Chamomile Moisturizer",
    collection: "calm-skin",
    format: "Moisturiser",
    description:
      "Light, unscented, and built for reactive skin that has been let down before.",
    concerns: ["dull-dehydrated"],
  },

  // Sun Defense
  {
    slug: "lilikoi-daily-defense-moisturizer-spf-40",
    name: "Lilikoi Daily Defense Moisturizer SPF 40",
    collection: "sun-defense",
    format: "Moisturiser with SPF",
    description:
      "Mineral SPF 40 that does not leave a cast. If you buy one thing on this page, buy this.",
    concerns: ["pigmentation", "fine-lines"],
  },
  {
    slug: "radiant-protection-spf-fluid",
    name: "Radiant Protection SPF Fluid",
    collection: "sun-defense",
    format: "SPF fluid",
    description:
      "Lighter than the Lilikoi and layers under makeup without pilling. The summer version.",
    concerns: ["pigmentation"],
  },
] as const;

export function getProductsByCollection(
  collection: CollectionSlug,
): readonly Product[] {
  return PRODUCTS.filter((product) => product.collection === collection);
}
