import type { Category } from "@/types/services";

// Blurbs and group headings are copy and await her sign-off with the rest.
export const CATEGORIES: readonly Category[] = [
  {
    slug: "facial",
    label: "Facials",
    segment: "facials",
    blurb: "Microdermabrasion to gold leaf",
    groups: [
      {
        slug: "cleansing",
        label: "Cleansing and clearing",
        heading: "For congested and breakout-prone skin",
      },
      {
        slug: "resurfacing",
        label: "Resurfacing",
        heading: "For texture, scarring and dullness",
      },
      {
        slug: "hydrating",
        label: "Hydrating and brightening",
        heading: "For dull, dry or tired skin",
      },
      {
        slug: "lifting",
        label: "Lifting and firming",
        heading: "For skin that's losing its bounce",
      },
    ],
  },
  {
    slug: "skin",
    label: "Skin Treatments",
    segment: "skin",
    blurb: "Microneedling, peels, RF",
  },
  {
    slug: "body",
    label: "Body",
    segment: "body",
    blurb: "Contouring and wraps",
  },
  {
    slug: "massage",
    label: "Massage",
    segment: "massage",
    blurb: "Relaxation to deep tissue",
  },
  {
    slug: "laser",
    label: "Laser and IPL",
    segment: "laser",
    blurb: "Hair removal, rejuvenation",
  },
] as const;

export function categoryHref(category: Category): string {
  return `/treatments/${category.segment}`;
}
