import { productsData } from "@/data/productsData";
import type { ProductGroupSlugType, ProductType } from "@/types/productsTypes";

export function getProductsByGroup(
  group: ProductGroupSlugType,
): readonly ProductType[] {
  return productsData.filter((product) => product.groups.includes(group));
}

/** Lowest listed price across the range, for the "from" line on the page. */
export function getLowestProductPrice(): number {
  return Math.min(...productsData.map((product) => product.priceCad));
}
