import type { ConcernType } from "@/types/servicesTypes";

/**
 * PARKED. Kept deliberately. Do not wire this up, and do not raise it as a
 * gap.
 *
 * A concern is what a customer wants fixed - acne, fine lines, muscle tension
 * - rather than what a treatment is called. It is a third way of slicing the
 * same 40 treatments, alongside `category` (which page) and `group` (which
 * tab).
 *
 * There is no concerns page and no concerns filter on this site, on purpose.
 * The nine /what-we-treat routes this was built for were deleted on
 * 2026-09-20 because they competed with the home page for the same searches
 * on a domain with no authority to spend on both. Branching happens after
 * something ranks, not before.
 *
 * Still live, so this file is not dead weight:
 * - `components/home/Results.tsx` reads these labels for the
 *   before-and-after section
 * - `next.config.ts` redirects the nine deleted URLs using these slugs
 *
 * Parked alongside it, and listed here so nobody has to go looking: the five
 * concern functions in `lib/serviceQueries.ts`, and the `data-concerns` attribute
 * that `ServiceCard` writes onto every card. Both are marked where they sit.
 *
 * If concern-based browsing comes back it is likelier to be a section on an
 * existing page than a page of its own. That is Frank's call and it is not
 * decided.
 */

// Descriptions are the landing-page intros and await her sign-off.
export const concernsData: readonly ConcernType[] = [
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

/**
 * `concernHref` was removed on 2026-09-20 along with the nine /what-we-treat
 * routes. A function returning a URL to a deleted page is a trap for whoever
 * reads this next, so it is gone rather than left pointing at a 404.
 *
 * The taxonomy itself stays. `data/servicesData.ts` tags every treatment with the
 * concerns it addresses, `data/resultsData.ts` tags every before-and-after, and
 * `components/home/Results.tsx` reads these labels. It is also what the pages
 * would be rebuilt from if branching by concern is ever worth doing again,
 * which is a question for after the home page ranks rather than before.
 */
