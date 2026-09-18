import type { Concern } from "@/types/services";

// Descriptions are the landing-page intros and await her sign-off.
export const CONCERNS: readonly Concern[] = [
  {
    slug: "fine-lines",
    label: "Fine lines and wrinkles",
    description:
      "Treatments that firm, lift and smooth, from collagen-stimulating facials to microneedling.",
  },
  {
    slug: "acne",
    label: "Acne and congestion",
    description:
      "Deep cleansing, extractions and light therapy for skin that keeps breaking out.",
  },
  {
    slug: "pigmentation",
    label: "Pigmentation and sun damage",
    description:
      "Peels, brightening facials and IPL for uneven tone, dark spots and sun-marked skin.",
  },
  {
    slug: "dull-dehydrated",
    label: "Dull or dehydrated skin",
    description:
      "Hydrating and oxygen facials that put moisture and glow back into tired skin.",
  },
  {
    slug: "scarring-texture",
    label: "Scarring and texture",
    description:
      "Resurfacing facials and microneedling for acne scars, rough texture and enlarged pores.",
  },
  {
    slug: "unwanted-hair",
    label: "Unwanted hair",
    description:
      "Laser hair removal for face and body, priced at a free consultation.",
  },
  {
    slug: "body-contouring",
    label: "Body contouring",
    description:
      "Wood therapy, wraps and device-based body treatments that sculpt and smooth.",
  },
  {
    slug: "muscle-tension",
    label: "Muscle tension",
    description:
      "Relaxation, deep tissue and therapeutic massage for tight shoulders and tired backs.",
  },
] as const;
