export type CategorySlug = "facial" | "skin" | "body" | "massage" | "laser";

export type CategoryGroup = {
  slug: string;
  label: string;
  heading: string;
};

export type Category = {
  slug: CategorySlug;
  label: string;
  /** URL segment under /treatments/ */
  segment: string;
  blurb: string;
  /** lede on the category page */
  intro: string;
  /** under 155 characters, so Google shows all of it */
  metaDescription: string;
  groups?: readonly CategoryGroup[];
};

export type ConcernSlug =
  | "fine-lines"
  | "acne"
  | "pigmentation"
  | "dull-dehydrated"
  | "scarring-texture"
  | "unwanted-hair"
  | "body-contouring"
  | "muscle-tension";

export type Concern = {
  slug: ConcernSlug;
  label: string;
  description: string;
};

export type Service = {
  /** kebab-case, unique across every category */
  slug: string;
  name: string;
  category: CategorySlug;
  /** a slug from the category's groups; facials only */
  group?: string;
  /** CAD, whole dollars; null means priced at consultation */
  price: number | null;
  priceFrom: boolean;
  /** minutes; for "15 min+" listings the listed minimum */
  durationMin: number;
  description: string;
  concerns: readonly ConcernSlug[];
  /** opaque handle for the booking provider; null until feature 11 */
  bookingId: string | null;
  featured: boolean;
  /** uses Eminence Organics products */
  eminence?: true;
  /** slug of the base service this is a length variant of */
  variantOf?: string;
};
