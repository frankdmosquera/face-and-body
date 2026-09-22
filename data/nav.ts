import { categoriesData, categoryHref } from "@/data/categoriesData";
import { productGroupsData } from "@/data/productsData";
import {
  siteConfig,
  type NavItemType,
  type SiteLinkType,
} from "@/data/siteConfig";

/**
 * The header and footer menus.
 *
 * This lives apart from `siteConfig` on purpose. It reads the catalogue, so
 * anything importing it pulls treatment data into its bundle. That is correct
 * for a server component rendering a menu and wrong for a client one, which is
 * why `siteConfig` stays free of service imports and is safe anywhere.
 *
 * The header is three panels and one link, set 2026-09-21. Each panel holds
 * that page's categories and nothing else.
 *
 * TWO EARLIER VERSIONS, and this is neither of them.
 *
 * It began as four panels listing all 40 treatments by name. Those came out on
 * 2026-09-20 because every link was an anchor - `/#chemical-peel` and the like
 * - so the menu advertised a forty-page site that does not exist, and clicking
 * one scrolled you into a closed tab panel and appeared to do nothing at all.
 *
 * What replaced them was four flat links, one per page. That fixed the lying
 * but left "Facials" pointing at `/#facials`, a header item that reads as a
 * page and behaves as a scroll - and from another page it was a route change
 * followed by a jump, which is exactly as odd as it sounds.
 *
 * So: panels again, holding categories rather than treatments. Four words in
 * the facials panel, not 22, and every one of them lands somewhere real -
 * `GroupTabs` opens the group a hash names before scrolling to it, so the tab
 * is already on when you arrive. The treatment anchors were never the problem;
 * a menu full of them was.
 *
 * The treatments did not go anywhere: all 22 facials are on the home page and
 * the other 18 are on /other-treatments, each still carrying its own `id`, so
 * every `/#slug` link ever published still lands on the right card. The footer
 * keeps the five section links because a footer listing sections is how the
 * massage list stays one click from any page.
 */

const treatments: SiteLinkType[] = categoriesData.map((category) => ({
  label: category.label,
  href: categoryHref(category),
}));

/* Thrown at module load rather than rendered around: a facial category with no
   groups is a broken data file, not a menu state worth degrading into. */
function facialGroups(): SiteLinkType[] {
  const groups = categoriesData.find((entry) => entry.slug === "facial")
    ?.groups;
  if (!groups?.length)
    throw new Error("The facial category has no groups in categoriesData");
  /* An anchor on the home page, matched by group slug rather than by name, so
     renaming a group's label in `categoriesData` cannot break its link. */
  return groups.map((group) => ({
    label: group.label,
    href: `/#${group.slug}`,
  }));
}

export const NAV: NavItemType[] = [
  /**
   * Facials are the home page, so this panel is the only way to reach a group
   * directly - and deliberately has no link to a facials page, because there
   * is no facials page. The panel is the answer to a header item that used to
   * imply one.
   */
  {
    label: "Facials",
    href: "/#facials",
    layout: "row",
    sections: [{ links: facialGroups() }],
  },
  /** Skin, body, massage and laser, all 18 on one page. These four are plain
   *  anchors into sections that already carry the ids - no tabs involved, so
   *  the browser does the work. */
  {
    label: "Other Treatments",
    href: "/other-treatments",
    layout: "row",
    more: "All other treatments",
    sections: [
      {
        links: categoriesData
          .filter((category) => category.slug !== "facial")
          .map((category) => ({
            label: category.label,
            href: categoryHref(category),
          })),
      },
    ],
  },
  /** Eminence retail. Sold in the clinic, not online, so this is a catalogue
   *  and a reason to come in rather than a shop. Same tabs as the facials
   *  menu, so the same group anchors work. */
  {
    label: "Products",
    href: "/products",
    layout: "row",
    more: "All products",
    sections: [
      {
        links: productGroupsData.map((group) => ({
          label: group.label,
          href: `/products#${group.slug}`,
        })),
      },
    ],
  },
  /** Hours and location live on /contact now, so one item covers both. */
  { label: "Contact", href: "/contact" },
];

export const FOOTER: { heading: string; links: SiteLinkType[] }[] = [
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
