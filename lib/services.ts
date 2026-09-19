import { CATEGORIES } from "@/data/categories";
import { SERVICES } from "@/data/services";
import type { CategorySlug, ConcernSlug, Service } from "@/types/services";

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
