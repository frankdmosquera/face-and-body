import { productDescriptionsData } from "@/data/productDescriptionsData";
import type {
  ProductGroupSlugType,
  ProductGroupType,
  ProductType,
} from "@/types/productsTypes";

import cleansers from "@/data/products/facials/cleansing/cleansers.json";
import tonersMists from "@/data/products/facials/cleansing/toners-mists.json";
import eyeCare from "@/data/products/facials/eye-lip-spf/eye-care.json";
import lipCare from "@/data/products/facials/eye-lip-spf/lip-care.json";
import sunCare from "@/data/products/facials/eye-lip-spf/sun-care.json";
import moisturizers from "@/data/products/facials/hydrating/moisturizers.json";
import serums from "@/data/products/facials/hydrating/serums-oils-concentrates.json";
import firming from "@/data/products/facials/lifting/firming.json";
import exfoliants from "@/data/products/facials/resurfacing/exfoliants.json";
import bodyLotions from "@/data/products/other-treatments/body/body-lotions-oils.json";
import bodyScrubs from "@/data/products/other-treatments/body/body-scrubs.json";
import bodySunCare from "@/data/products/other-treatments/body/body-sun-care.json";
import handCare from "@/data/products/other-treatments/body/hand-care.json";
import masksTreatments from "@/data/products/other-treatments/skin/masks-treatments.json";

/**
 * The Eminence range she stocks, built from `data/products/` at build time.
 *
 * Four of these labels are lifted word for word from the facial groups in
 * `categoriesData`. That is the whole point of the page: a client who booked a
 * Hydrating and brightening facial finds the hydrating products under the same
 * words. Eminence's own collection names (Stone Crop, Clear Skin, Bright Skin)
 * are its marketing lines and are not how anyone shops.
 *
 * `spa-only` is deliberately not imported. Those 19 are back-bar, used on you
 * during a treatment, and Eminence keeps trade pricing behind a stockist
 * login, so they have no price and nothing to sell. Their descriptions are
 * written and waiting in `productDescriptionsData` for the treatment pages.
 */
export const productGroupsData: readonly ProductGroupType[] = [
  {
    slug: "cleansing",
    label: "Cleansing and clearing",
    heading: "Cleansers, toners and mists",
  },
  {
    slug: "resurfacing",
    label: "Resurfacing",
    heading: "Exfoliants and at-home peels",
  },
  {
    slug: "hydrating",
    label: "Hydrating and brightening",
    heading: "Moisturisers, serums and face oils",
  },
  {
    slug: "lifting",
    label: "Lifting and firming",
    // Eminence has no firming collection. This is its whole range filtered by
    // one concern, which is why most of these also appear above: a firming
    // serum is a serum and a firming product, and the SKU is the same product.
    heading: "Gathered from across the range, for firmness",
  },
  {
    slug: "eye-lip-spf",
    label: "Eye, lip and SPF",
    heading: "Eye creams, lip care and daily sun protection",
  },
  { slug: "skin", label: "Skin", heading: "Masques and leave-on treatments" },
  { slug: "body", label: "Body", heading: "Lotions, oils, scrubs and hands" },
] as const;

/** One scraped listing file, narrowed to the fields the site renders. */
type ScrapedListingType = {
  products: readonly {
    slug: string;
    name: string;
    sku: string;
    priceCad: number | null;
    retailSize: string | null;
    image: string;
  }[];
};

const LISTINGS: readonly [ProductGroupSlugType, ScrapedListingType][] = [
  ["cleansing", cleansers],
  ["cleansing", tonersMists],
  ["resurfacing", exfoliants],
  ["hydrating", moisturizers],
  ["hydrating", serums],
  ["lifting", firming],
  ["eye-lip-spf", eyeCare],
  ["eye-lip-spf", lipCare],
  ["eye-lip-spf", sunCare],
  ["skin", masksTreatments],
  ["body", bodyLotions],
  ["body", bodyScrubs],
  ["body", bodySunCare],
  ["body", handCare],
];

/**
 * The scraped `image` is where the file sits under `public/`, and `public/images/`
 * is gitignored, so that path resolves on Frank's machine and 404s on Vercel.
 * The files live in the ImageKit library instead, uploaded by
 * `scripts/uploadProductImagesToImageKit.mjs`, which mirrors the same folders
 * under `face-and-body/product-images/`. Dropping the `/images` prefix is the
 * whole conversion, and keeping the rest identical is what lets the upload
 * script and this function stay in step without a lookup table between them.
 */
function toMediaPath(publicPath: string): string {
  return publicPath.replace(/^\/images/, "");
}

/**
 * 194 records across those files collapse to 152 products, because 41 are
 * filed under two headings. The SKU already joins them, so this merges the
 * headings onto one record rather than filtering repeats away.
 *
 * A product with no price or no description of ours is dropped rather than
 * rendered half-built. Both are build-time facts, so if the count on the page
 * ever looks wrong, the cause is in `data/products/` or in
 * `productDescriptionsData`, not here.
 */
function buildProducts(): readonly ProductType[] {
  const bySlug = new Map<string, ProductType>();

  for (const [group, listing] of LISTINGS) {
    for (const raw of listing.products) {
      const existing = bySlug.get(raw.slug);
      if (existing) {
        if (!existing.groups.includes(group)) {
          bySlug.set(raw.slug, {
            ...existing,
            groups: [...existing.groups, group],
          });
        }
        continue;
      }

      const description = productDescriptionsData[raw.slug];
      if (!description || raw.priceCad === null || raw.retailSize === null) {
        continue;
      }

      bySlug.set(raw.slug, {
        slug: raw.slug,
        name: raw.name,
        sku: raw.sku,
        priceCad: raw.priceCad,
        retailSize: raw.retailSize,
        description,
        image: toMediaPath(raw.image),
        groups: [group],
      });
    }
  }

  return [...bySlug.values()];
}

export const productsData: readonly ProductType[] = buildProducts();
