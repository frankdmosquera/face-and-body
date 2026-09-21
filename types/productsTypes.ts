/** The seven headings on /products, in the order they are rendered. */
export type ProductGroupSlugType =
  | "cleansing"
  | "resurfacing"
  | "hydrating"
  | "lifting"
  | "eye-lip-spf"
  | "skin"
  | "body";

export type ProductGroupType = {
  slug: ProductGroupSlugType;
  /** The facial group labels come from `categoriesData`, deliberately word for
   *  word, so a client who had a hydrating facial finds the hydrating products
   *  under the heading they already read. */
  label: string;
  heading: string;
};

export type ProductType = {
  /** kebab-case, unique, and 1:1 with `sku` in both directions. */
  slug: string;
  name: string;
  /** Eminence's own product code. The key that joins a product filed under
   *  two headings back to one record. */
  sku: string;
  /** CAD, Eminence's Canadian list price. Never null on a retail product;
   *  the 19 that carry no price are spa-only and are not sold here. */
  priceCad: number;
  /** As Eminence prints it, both units: "4.2 oz / 125 ml". */
  retailSize: string;
  /** Ours, from `productDescriptionsData`. Never Eminence's wording. */
  description: string;
  /** Path in the ImageKit library, relative to the `face-and-body` folder:
   *  `/product-images/facials/cleansing/stone-crop-cleansing-oil.jpg`. */
  image: string;
  /** Every heading this product appears under. 39 products carry two and one
   *  carries three, which is correct rather than duplication: a firming serum
   *  is honestly both a serum and a firming product. */
  groups: readonly ProductGroupSlugType[];
};
