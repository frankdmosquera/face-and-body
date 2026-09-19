import type { Concern } from "@/types/services";

// Descriptions are the landing-page intros and await her sign-off.
export const CONCERNS: readonly Concern[] = [
  {
    slug: "fine-lines",
    label: "Fine lines and wrinkles",
    description:
      "Treatments that firm, lift and smooth, from collagen-stimulating facials to microneedling.",
    metaDescription:
      "Treatments for fine lines and wrinkles in Midnapore, Calgary SE. Collagen-stimulating facials, microneedling and radiofrequency tightening.",
  },
  {
    slug: "acne",
    label: "Acne and congestion",
    description:
      "Deep cleansing, extractions and light therapy for skin that keeps breaking out.",
    metaDescription:
      "Acne and congestion treatments in Midnapore, Calgary SE. Deep cleansing facials, extractions and LED light therapy for skin that keeps breaking out.",
  },
  {
    slug: "pigmentation",
    label: "Pigmentation and sun damage",
    description:
      "Peels, brightening facials and IPL for uneven tone, dark spots and sun-marked skin.",
    metaDescription:
      "Treatments for pigmentation and sun damage in Midnapore, Calgary SE. Chemical peels, brightening facials and IPL for uneven tone and dark spots.",
  },
  {
    slug: "dull-dehydrated",
    label: "Dull or dehydrated skin",
    description:
      "Hydrating and oxygen facials that put moisture and glow back into tired skin.",
    metaDescription:
      "Treatments for dull, dehydrated skin in Midnapore, Calgary SE. Hydrating and oxygen facials that put moisture and glow back into tired skin.",
  },
  {
    slug: "scarring-texture",
    label: "Scarring and texture",
    description:
      "Resurfacing facials and microneedling for acne scars, rough texture and enlarged pores.",
    metaDescription:
      "Treatments for acne scarring and rough texture in Midnapore, Calgary SE. Resurfacing facials and microneedling for scars and enlarged pores.",
  },
  {
    slug: "unwanted-hair",
    label: "Unwanted hair",
    description:
      "Laser hair removal for face and body, priced at a free consultation.",
    metaDescription:
      "Laser hair removal for face and body in Midnapore, Calgary SE. Priced at a free consultation, because it depends on the area and your skin.",
  },
  {
    slug: "body-contouring",
    label: "Body contouring",
    description:
      "Wood therapy, wraps and device-based body treatments that sculpt and smooth.",
    metaDescription:
      "Body contouring in Midnapore, Calgary SE. Wood therapy, wraps and device-based treatments that sculpt, smooth and shift stubborn areas.",
  },
  {
    slug: "muscle-tension",
    label: "Muscle tension",
    description:
      "Relaxation, deep tissue and therapeutic massage for tight shoulders and tired backs.",
    metaDescription:
      "Massage for muscle tension in Midnapore, Calgary SE. Relaxation, deep tissue and therapeutic massage for tight shoulders and tired backs.",
  },
] as const;

export function concernHref(concern: Concern): string {
  return `/treat/${concern.slug}`;
}
