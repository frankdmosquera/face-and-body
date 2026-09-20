import type { Metadata } from "next";
import { Categories } from "@/components/home/Categories";
import { Consultation } from "@/components/home/Consultation";
import { Eminence } from "@/components/home/Eminence";
import { Facials } from "@/components/home/Facials";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Results } from "@/components/home/Results";
import { Reviews } from "@/components/home/Reviews";
import { Signature } from "@/components/home/Signature";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Divider } from "@/components/layout/Divider";

/**
 * THE PAGE CACHE. Ported from primo-painters, where this export sits beside
 * the same reviews fetch. It is the second of two caches and they are not
 * interchangeable:
 *
 *   next: { revalidate } in lib/googleReviews.ts   the FETCH cache. Decides
 *                                                  how often GOOGLE is hit.
 *   export const revalidate, here                  the PAGE cache. Decides
 *                                                  how often this HTML is
 *                                                  rebuilt.
 *
 * On a rebuild the page re-reads the fetch cache rather than calling Google,
 * so the two intervals matching means one Google call a day, not two.
 *
 * Next can infer this from the fetch inside the page, which is why it worked
 * before this line existed. It is declared anyway: if the API key is ever
 * missing at build there is no fetch to infer from, and the page would go
 * permanently static and never retry. This line means it retries tomorrow.
 */
export const revalidate = 86400;

/**
 * The home page was the one page on the site without its own metadata, so it
 * fell back to the layout default and went to search as the bare business
 * name. Every other page already sets its own.
 *
 * `absolute` rather than a plain string, because the layout template appends
 * " | Face and Body Wellness Centre", which would run the title past the 60
 * characters Google shows. The name is shortened to keep the whole thing
 * visible.
 *
 * Facials only, as of 2026-09-20. This page carries the full facial menu and
 * is the one page built to rank for that term, so the title names it and
 * nothing else. Laser came out when it stopped being a headline service, and
 * massage lives on /other-treatments, which has its own title.
 *
 * The layout default stays general on purpose. It is the fallback for any
 * page added later that sets nothing, so nothing home-specific belongs in it.
 */
export const metadata: Metadata = {
  title: {
    absolute: "Facials in Midnapore, Calgary SE | Face & Body Wellness",
  },
  description:
    "Twenty-two facials in Midnapore, Calgary SE, from deep cleansing to microneedling and gold leaf. A qualified aesthetician who looks at your skin first.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      {/* Browse-by-concern came out on 2026-09-20 with the nine
          /what-we-treat pages it linked to. It was the entry point to a
          parallel set of landing pages competing with this one for the same
          searches, on a site with no authority to spend on both. The concern
          taxonomy stays in the data and still labels the results below. */}
      <Reviews />
      {/* The full facial menu, moved here from /treatments/facials on
          2026-09-20. It is below the proof rather than above it because most
          visitors today arrive from her Google listing or her Instagram
          already knowing the business; Google reads the whole document, so
          nothing is lost by making them meet the reviews first. */}
      <Facials />
      <Categories />
      <Signature />
      <Divider className="pb-section-sm lg:pb-section" />
      <Results />
      <Eminence />
      {/* Location removed. Hours and the address moved to /contact when the
          two were folded together, and the footer carries the full NAP on
          every page, so a "Find us" band here was the third copy of the same
          facts on one scroll. */}
      {/* Objection handling, which every other section on this page lacks:
          the rest showcase, this one answers the reasons someone closes the
          tab. It sits where Find us used to, directly before the consultation
          CTA, so the last thing before the ask is the answer to why not. */}
      <Faq />
      <Consultation />
    </>
  );
}
