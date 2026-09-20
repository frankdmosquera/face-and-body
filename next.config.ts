import type { NextConfig } from "next";

/**
 * Redirects for URLs this site used to serve.
 *
 * Every entry is a dead URL, frozen at the moment it died. That is why the
 * slugs are written out here instead of derived from `data/concerns.ts` or
 * `data/categories.ts`: deriving would tie a record of the past to data that
 * describes the present. Rename a concern in the data and the redirect for its
 * old URL has to survive the rename, not follow it. A redirect table is a
 * history, and histories do not get recomputed.
 *
 * The 2026-09-20 restructure moved facials onto the home page and collapsed
 * the rest onto /other-treatments, which deleted fifteen routes in one go. The
 * destinations below mirror `categoryHref` and `serviceHref`, so a visitor on
 * an old link lands exactly where the menu would send them today.
 */

/** Old /what-we-treat/<slug> and /treat/<slug> pages, sent to whichever page
 *  now carries the treatments that served that concern. Derived once from the
 *  catalogue rather than guessed: the counts behind each choice were facials
 *  11/8/7/6/5 for the five skin concerns, massage 8 for muscle tension, body 4
 *  for contouring, and laser as the only provider of hair removal. */
const CONCERN_DESTINATIONS: Record<string, string> = {
  "dull-dehydrated": "/#facials",
  acne: "/#facials",
  "scarring-texture": "/#facials",
  "fine-lines": "/#facials",
  pigmentation: "/#facials",
  "muscle-tension": "/other-treatments#massage",
  "body-contouring": "/other-treatments#body",
  "unwanted-hair": "/other-treatments#laser",
};

/** Old /treatments/<segment> category pages. `facials` is the exception: its
 *  22 treatments are the home page now, which is the whole point of the
 *  restructure. */
const CATEGORY_DESTINATIONS: Record<string, string> = {
  facials: "/#facials",
  skin: "/other-treatments#skin",
  body: "/other-treatments#body",
  massage: "/other-treatments#massage",
  laser: "/other-treatments#laser",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // /hours was its own page until contact absorbed it. Permanent
        // because the merge is the decision, not an experiment: a 308 passes
        // the old URL's ranking to /contact and stops Google keeping both.
        // It was linked from the menu and from contact, and may be in a
        // search index or someone's bookmark, so it redirects rather than
        // 404s. #hours lands on the table itself.
        source: "/hours",
        destination: "/contact#hours",
        permanent: true,
      },

      // The concern pages, under both prefixes they ever had. /treat/<slug>
      // was renamed to /what-we-treat/<slug> before launch, and then both
      // were deleted on 2026-09-20. The old /treat/:slug rule pointed at
      // /what-we-treat/:slug and survived that deletion, which left a
      // permanent redirect aimed into a 404. These replace it.
      ...Object.entries(CONCERN_DESTINATIONS).flatMap(([slug, destination]) => [
        { source: `/what-we-treat/${slug}`, destination, permanent: true },
        { source: `/treat/${slug}`, destination, permanent: true },
      ]),
      {
        source: "/what-we-treat",
        destination: "/",
        permanent: true,
      },

      // The five category pages. Written out one by one rather than as
      // /treatments/:segment on purpose: `serviceHref` still returns
      // /treatments/<slug> for any treatment that earns its own page, so that
      // path has to stay free. A wildcard here would swallow every future
      // detail page into a redirect.
      ...Object.entries(CATEGORY_DESTINATIONS).map(([segment, destination]) => ({
        source: `/treatments/${segment}`,
        destination,
        permanent: true,
      })),
      {
        source: "/treatments",
        destination: "/other-treatments",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
