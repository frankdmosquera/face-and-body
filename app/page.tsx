import type { Metadata } from "next";
import { Categories } from "@/components/home/Categories";
import { Consultation } from "@/components/home/Consultation";
import { Eminence } from "@/components/home/Eminence";
import { Facials } from "@/components/home/Facials";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Results } from "@/components/home/Results";
import { Reviews } from "@/components/home/Reviews";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      {/* Browse-by-concern came out on 2026-09-20 with the nine
          /what-we-treat pages it linked to. It was the entry point to a
          parallel set of landing pages competing with this one for the same
          searches, on a site with no authority to spend on both. The concern
          taxonomy stays in the data and still labels the results below. */}
      {/* The full facial menu, moved here from /treatments/facials on
          2026-09-20, and moved above the reviews later the same day. This
          page is built to rank for facials and that is what its visitors
          come for, so it is what the page opens on. */}
      <Facials />
      {/* Reviews, below the menu rather than above it as of 2026-09-20.

          The earlier order put them first because "most visitors arrive from
          her Google listing already knowing the business". That is the
          argument against leading with them: her Google listing is where
          these reviews already live, so anyone arriving that way has just
          read them, and the page opened by handing them the one thing they
          already had.

          They also do more work down here. Above the menu they are
          sentiment. Directly after someone has read $153, $159 and $189 they
          answer whether she is worth it. Proof is still above the fold - the
          hero keeps the stars and the 4.7 - so this band is the
          reinforcement rather than the only copy of it.

          It suits the dark band as well. Third on the page it was the
          largest contrast event barely a screen in; here it breaks up a long
          middle instead of interrupting the arrival. */}
      <Reviews />
      <Categories />
      {/* Eminence moved up to sit directly under "Also at the clinic", on
          Frank's call: the retail line should get more exposure than the
          other treatment categories, and below the results band it was the
          second-last thing on a long page. */}
      <Eminence />
      {/* The microneedling signature section came out here. It led on the
          clinic's most expensive treatment, $290, which is not a facial at
          all - it is a skin treatment and it lives on /other-treatments. The
          home page is built to rank for facials, so a full band about
          something else sat between the facial menu and the store for no
          reason the page could justify. `Categories` still routes visitors to
          skin, body and massage, and Signature is in git history if it is ever
          wanted. */}
      <Divider className="pb-section-sm lg:pb-section" />
      <Results />
      {/* Location removed. Hours and the address moved to /contact when the
          two were folded together, and the footer carries the full NAP on
          every page, so a "Find us" band here was the third copy of the same
          facts on one scroll. */}
      <Consultation />
      {/* Objection handling, which every other section on this page lacks:
          the rest showcase, this one answers the reasons someone closes the
          tab.

          It sat directly BEFORE the consultation CTA until 2026-09-21, on the
          reasoning that the last thing before the ask should be the answer to
          why not. Moved after it on Frank's call. The trade is real and worth
          naming: the ask is no longer the last thing on the page, so a reader
          who runs out of patience in the questions leaves without passing it
          again. What it buys is that nobody has to scroll through six
          objections to reach the booking button. Both sections are sand, so
          the band is unchanged either way. */}
      <Faq />
    </>
  );
}
