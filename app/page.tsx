import { Categories } from "@/components/home/Categories";
import { Concerns } from "@/components/home/Concerns";
import { Consultation } from "@/components/home/Consultation";
import { Eminence } from "@/components/home/Eminence";
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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Concerns />
      {/* Straight after "what to treat", not down at eighth of ten where it
          used to sit. The order is now: say what is wrong, see that she
          fixes it, then go and look at the treatments. Proof belongs between
          the problem and the price list, and almost nobody scrolls past
          Eminence. Tones still alternate - Concerns is plain, this brings
          its own soft gradient, Categories is sand. */}
      <Reviews />
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
