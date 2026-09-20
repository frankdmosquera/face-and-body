import { CATEGORIES, categoryHref } from "@/data/categories";
import { CONCERNS, concernHref } from "@/data/concerns";
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
   * Was "More", holding the concerns and a "Clinic" column with Hours and
   * Contact in it. Two problems with that. A menu item called More tells a
   * visitor nothing, so the eight concerns underneath went unfound; and
   * Contact, which is the page people actually go looking for, sat two
   * levels deep behind a word that means nothing.
   *
   * Now the label says what is in it, and Contact is its own item below.
   */
  {
    label: "What we treat",
    // Points at the real index page. "We" rather than "to": the clinic
    // saying what it handles reads warmer than an instruction, and it is
    // the question a visitor actually has - can they help me.
    href: "/what-we-treat",
    sections: [
      {
        links: CONCERNS.map((concern) => ({
          label: concern.label,
          href: concernHref(concern),
        })),
      },
    ],
  },
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
