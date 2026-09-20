import { CATEGORIES, categoryHref } from "@/data/categories";
import {
  siteConfig,
  type NavGroup,
  type NavItem,
  type NavSection,
  type SiteLink,
} from "@/data/siteConfig";
import { getServicesByCategory, serviceHref } from "@/lib/services";
import type { CategorySlug, Service } from "@/types/services";

/**
 * The header and footer menus, derived from the service catalogue.
 *
 * This lives apart from `siteConfig` on purpose. Building the nav means reading
 * all 41 services, so anything importing this module pulls the whole catalogue -
 * every name, price, duration and description - into its bundle. That is correct
 * for a server component rendering a menu and wrong for a client one.
 *
 * It used to sit inside `data/siteConfig.ts`, which made the two inseparable: a
 * client component wanting the phone number or the opening hours got 56KB of
 * treatment descriptions with it, on every page. `OpenNow` was shipping the full
 * catalogue to render "open now" from an hours array.
 *
 * So: import this from server components only, and pass the result down as
 * props. `siteConfig` stays free of service imports and is safe anywhere.
 */

const treatments: SiteLink[] = CATEGORIES.map((category) => ({
  label: category.label,
  href: categoryHref(category),
}));

function category(slug: CategorySlug) {
  const entry = CATEGORIES.find((item) => item.slug === slug);
  if (!entry) throw new Error(`Unknown category ${slug}`);
  return entry;
}

function serviceLinks(services: readonly Service[]): SiteLink[] {
  return services.map((service) => ({
    label: service.name,
    href: serviceHref(service),
  }));
}

function categorySection(slug: CategorySlug, label?: string): NavSection {
  return {
    label,
    href: label ? categoryHref(category(slug)) : undefined,
    links: serviceLinks(getServicesByCategory(slug)),
  };
}

// The header shows Skin and Laser under one button; the data keeps five categories.
function treatmentGroup(
  label: string,
  slugs: CategorySlug[],
  sections: NavSection[],
): NavGroup {
  const total = sections.reduce((sum, section) => sum + section.links.length, 0);
  return {
    label,
    href: categoryHref(category(slugs[0])),
    sections,
    more: `See all ${total}`,
  };
}

const facialSections: NavSection[] = (category("facial").groups ?? []).map(
  (group) => ({
    label: group.label,
    links: serviceLinks(
      getServicesByCategory("facial").filter(
        (service) => service.group === group.slug,
      ),
    ),
  }),
);

export const NAV: NavItem[] = [
  treatmentGroup("Facials", ["facial"], facialSections),
  treatmentGroup(
    "Skin and Laser",
    ["skin", "laser"],
    [
      categorySection("skin", "Skin Treatments"),
      categorySection("laser", "Laser and IPL"),
    ],
  ),
  treatmentGroup("Body", ["body"], [categorySection("body")]),
  treatmentGroup("Massage", ["massage"], [categorySection("massage")]),
  /**
   * "What we treat" and its eight concern links came out on 2026-09-20, with
   * the pages behind them. They were a second set of landing pages aimed at
   * the same searches as the home page, and on a domain with no authority yet
   * that splits the signal instead of widening it. The concern taxonomy stays
   * in `data/concerns.ts`, and the pages come back from git history if they
   * are ever worth rebuilding.
   */
  /** Hours and location live on /contact now, so one item covers both. */
  { label: "Contact", href: "/contact" },
];

export const FOOTER: { heading: string; links: SiteLink[] }[] = [
  { heading: "Treatments", links: treatments },
  {
    heading: "Clinic",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    heading: "Book",
    links: [
      { label: "Book now", href: "/contact" },
      { label: "Instagram", href: siteConfig.social.instagram },
      { label: "Facebook", href: siteConfig.social.facebook },
    ],
  },
];
