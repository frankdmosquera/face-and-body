import { CATEGORIES } from "@/data/categories";
import { CONCERNS } from "@/data/concerns";
import { SERVICES } from "@/data/services";
import type {
  Category,
  CategorySlug,
  ConcernSlug,
  Service,
} from "@/types/services";

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServicesByCategory(
  category: CategorySlug,
): readonly Service[] {
  return SERVICES.filter((service) => service.category === category);
}

export function getServicesByConcern(
  concern: ConcernSlug,
): readonly Service[] {
  return SERVICES.filter((service) => service.concerns.includes(concern));
}

/** Lowest listed price in the category; null when every service is priced at consultation. */
export function getCategoryFromPrice(category: CategorySlug): number | null {
  const prices = getServicesByCategory(category)
    .map((service) => service.price)
    .filter((price): price is number => price !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function getConcernCount(concern: ConcernSlug): number {
  return getServicesByConcern(concern).length;
}

export function serviceHref(service: Service): string {
  const category = CATEGORIES.find((entry) => entry.slug === service.category);
  return `/treatments/${category?.segment ?? service.category}/${service.slug}`;
}

export type ConcernChip = { slug: ConcernSlug; label: string; count: number };

/** Only concerns with at least one service here, so a filter can never empty the list. */
export function getConcernsInCategory(
  category: CategorySlug,
): readonly ConcernChip[] {
  const services = getServicesByCategory(category);
  return CONCERNS.map((concern) => ({
    slug: concern.slug,
    label: concern.label,
    count: services.filter((service) => service.concerns.includes(concern.slug))
      .length,
  })).filter((chip) => chip.count > 0);
}

export type CategoryBlock = { category: Category; services: readonly Service[] };

/** Matches grouped into category blocks, in CATEGORIES order so a concern page
 *  and a category page never disagree about sequence. Empty blocks are dropped,
 *  so there is no empty state to render. */
export function getServicesByConcernGrouped(
  concern: ConcernSlug,
): readonly CategoryBlock[] {
  const matches = getServicesByConcern(concern);
  return CATEGORIES.map((category) => ({
    category,
    services: matches.filter((service) => service.category === category.slug),
  })).filter((block) => block.services.length > 0);
}

/** The category holding most of a concern's treatments, for the hero photo.
 *  Ties go to CATEGORIES order, which is how the blocks are already sorted.
 *  Falls back to the first category for a concern with no treatments yet, so
 *  adding one to the data cannot break the build. */
export function getDominantCategory(concern: ConcernSlug): Category {
  const blocks = getServicesByConcernGrouped(concern);
  if (blocks.length === 0) return CATEGORIES[0];
  return blocks.reduce((best, block) =>
    block.services.length > best.services.length ? block : best,
  ).category;
}
