import type { Category } from "@/types/services";

// Blurbs and group headings are copy and await her sign-off with the rest.
export const CATEGORIES: readonly Category[] = [
  {
    slug: "facial",
    label: "Facials",
    segment: "facials",
    blurb: "Microdermabrasion to gold leaf",
    intro:
      "Twenty-two facials, grouped by what they actually do rather than by name. If you are not sure which one your skin needs, the free consultation sorts that out first.",
    metaDescription:
      "Facials in Midnapore, Calgary SE. Twenty-two treatments, from deep cleansing and microdermabrasion to gold leaf and Eminence Organics.",
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
    intro:
      "The treatments that work below the surface, for scarring, texture and skin that has lost its firmness. Some are priced per session, some after a look at your skin.",
    metaDescription:
      "Microneedling, chemical peels and radiofrequency skin tightening in Midnapore, Calgary SE. Book a session, or a free consultation first.",
  },
  {
    slug: "body",
    label: "Body",
    segment: "body",
    blurb: "Contouring and wraps",
    intro:
      "Contouring and wraps for the areas that do not shift with the gym alone. These are best taken as a course rather than a one-off.",
    metaDescription:
      "Body contouring and wrap treatments in Midnapore, Calgary SE. Four treatments, best taken as a course.",
  },
  {
    slug: "massage",
    label: "Massage",
    segment: "massage",
    blurb: "Relaxation to deep tissue",
    intro:
      "Eight massages, from a short reset to ninety minutes of deep tissue. Pick by how much time you have and how much pressure you want.",
    metaDescription:
      "Relaxation, deep tissue and hot stone massage in Midnapore, Calgary SE. Eight treatments, thirty to ninety minutes.",
  },
  {
    slug: "laser",
    label: "Laser and IPL",
    segment: "laser",
    blurb: "Hair removal, rejuvenation",
    intro:
      "Laser hair removal and IPL, both priced after a look rather than off a list. What it costs depends on the area and how many sessions your skin needs.",
    metaDescription:
      "Laser hair removal and IPL photorejuvenation in Midnapore, Calgary SE. Both priced at a free consultation.",
  },
] as const;

export function getCategoryBySegment(segment: string): Category | undefined {
  return CATEGORIES.find((category) => category.segment === segment);
}

export function categoryHref(category: Category): string {
  return `/treatments/${category.segment}`;
}
