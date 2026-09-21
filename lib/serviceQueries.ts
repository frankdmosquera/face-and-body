import { categoriesData } from "@/data/categoriesData";
import { concernsData } from "@/data/concernsData";
import { servicesData } from "@/data/servicesData";
import type {
  CategoryType,
  CategorySlugType,
  ConcernSlugType,
  ServiceType,
} from "@/types/servicesTypes";

export function getService(slug: string): ServiceType | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getServicesByCategory(
  category: CategorySlugType,
): readonly ServiceType[] {
  return servicesData.filter((service) => service.category === category);
}

/**
 * PARKED, with the four other concern functions below. Nothing outside this
 * file calls any of them, and that is the intended state - see the header of
 * `data/concernsData.ts` for why there is no concerns page.
 *
 * They are kept because they are the working query layer a concerns section
 * would need, and rebuilding them from the taxonomy is busywork. They are
 * marked because five exported functions with no callers otherwise read as an
 * oversight, and the next reader wires them into something to "fix" it.
 *
 * Do not delete them, do not call them, and do not report them as dead code.
 */
export function getServicesByConcern(
  concern: ConcernSlugType,
): readonly ServiceType[] {
  return servicesData.filter((service) => service.concerns.includes(concern));
}

/** Lowest listed price in the category; null when every service is priced at consultation. */
export function getCategoryFromPrice(
  category: CategorySlugType,
): number | null {
  const prices = getServicesByCategory(category)
    .map((service) => service.price)
    .filter((price): price is number => price !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}

/** Parked. See `getServicesByConcern` above. */
export function getConcernCount(concern: ConcernSlugType): number {
  return getServicesByConcern(concern).length;
}

/** A published treatment gets its own route; everything else points at its card,
 *  on the home page for facials and on /other-treatments for the rest. The header
 *  links every treatment through here, so the whole nav follows the flag
 *  without knowing anything about it.
 *
 *  No service carries `detailPage` yet. The branch stays because the flag is
 *  the agreed mechanism for splitting a treatment out once it has earned its
 *  own page, and that split is a planned step rather than an abandoned one.
 *
 *  It returns /treatments/<slug> deliberately. The listing page is
 *  /other-treatments, so /treatments is free, and a treatment detail page
 *  reads better under it than under a path with "other" in the name. Nothing
 *  reaches this branch today. */
export function serviceHref(service: ServiceType): string {
  if (service.detailPage) return `/treatments/${service.slug}`;
  return service.category === "facial"
    ? `/#${service.slug}`
    : `/other-treatments#${service.slug}`;
}

export type ConcernChipType = {
  slug: ConcernSlugType;
  label: string;
  count: number;
};

/** Parked, see `getServicesByConcern` above.
 *
 *  Only concerns with at least one service here, so a filter can never empty the list. */
export function getConcernsInCategory(
  category: CategorySlugType,
): readonly ConcernChipType[] {
  const services = getServicesByCategory(category);
  return concernsData
    .map((concern) => ({
      slug: concern.slug,
      label: concern.label,
      count: services.filter((service) =>
        service.concerns.includes(concern.slug),
      ).length,
    }))
    .filter((chip) => chip.count > 0);
}

export type CategoryBlockType = {
  category: CategoryType;
  services: readonly ServiceType[];
};

/** Parked, see `getServicesByConcern` above.
 *
 *  Matches grouped into category blocks, in categoriesData order so a concern page
 *  and a category page never disagree about sequence. Empty blocks are dropped,
 *  so there is no empty state to render. */
export function getServicesByConcernGrouped(
  concern: ConcernSlugType,
): readonly CategoryBlockType[] {
  const matches = getServicesByConcern(concern);
  return categoriesData
    .map((category) => ({
      category,
      services: matches.filter((service) => service.category === category.slug),
    }))
    .filter((block) => block.services.length > 0);
}

/** Parked, see `getServicesByConcern` above.
 *
 *  The category holding most of a concern's treatments, for the hero photo.
 *  Ties go to categoriesData order, which is how the blocks are already sorted.
 *  Falls back to the first category for a concern with no treatments yet, so
 *  adding one to the data cannot break the build. */
export function getDominantCategory(concern: ConcernSlugType): CategoryType {
  const blocks = getServicesByConcernGrouped(concern);
  if (blocks.length === 0) return categoriesData[0];
  return blocks.reduce((best, block) =>
    block.services.length > best.services.length ? block : best,
  ).category;
}
