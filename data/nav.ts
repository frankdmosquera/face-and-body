import { CATEGORIES, categoryHref } from "@/data/categoriesData";
import { siteConfig, type NavItem, type SiteLink } from "@/data/siteConfig";

/**
 * The header and footer menus.
 *
 * This lives apart from `siteConfig` on purpose. It reads the catalogue, so
 * anything importing it pulls treatment data into its bundle. That is correct
 * for a server component rendering a menu and wrong for a client one, which is
 * why `siteConfig` stays free of service imports and is safe anywhere.
 *
 * The header is four links, one per page, added 2026-09-20.
 *
 * It used to be four dropdown panels listing all 40 treatments by name. Every
 * one of those links was an anchor - `/#chemical-peel` and the like - so the
 * menu advertised a forty-page site that does not exist and never loaded a
 * page when clicked. The site is four pages. The menu now says four things.
 *
 * The treatments did not go anywhere: all 22 facials are on the home page and
 * the other 18 are on /other-treatments, each still carrying its own `id`, so
 * every `/#slug` link ever published still lands on the right card. The footer
 * keeps the five section links because a footer listing sections is how the
 * massage list stays one click from any page.
 */

const treatments: SiteLink[] = CATEGORIES.map((category) => ({
  label: category.label,
  href: categoryHref(category),
}));

export const NAV: NavItem[] = [
  /** Facials are the home page, so this is an anchor rather than a route. It
   *  skips the hero and lands on the menu itself. */
  { label: "Facials", href: "/#facials" },
  /** Skin, body, massage and laser, all 18 on one page. */
  { label: "Other Treatments", href: "/other-treatments" },
  /** Eminence retail. Sold in the clinic, not online, so this is a catalogue
   *  and a reason to come in rather than a shop. */
  { label: "Products", href: "/products" },
  /** Hours and location live on /contact now, so one item covers both. */
  { label: "Contact", href: "/contact" },
];

export const FOOTER: { heading: string; links: SiteLink[] }[] = [
  { heading: "Treatments", links: treatments },
  {
    heading: "Clinic",
    links: [
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
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
