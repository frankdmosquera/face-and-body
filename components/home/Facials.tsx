import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { ServiceList } from "@/components/treatments/ServiceList";
import { CATEGORIES } from "@/data/categoriesData";
import { getServicesByCategory } from "@/lib/serviceQueries";
import type { Category } from "@/types/servicesTypes";

/**
 * The full facial menu, on the home page rather than behind a link.
 *
 * This is the page that has to rank for "facials Calgary SE", and on a new
 * domain the home page is the only one with the authority to do it quickly. A
 * separate /treatments/facials page would split that signal instead of adding
 * to it, so the 22 treatments live here and there is no second facials page to
 * compete with.
 *
 * It sits below the hero, trust strip, concerns and reviews on purpose. Most
 * visitors today arrive from her Google listing or her Instagram bio already
 * knowing the business, and they should meet proof before a price list. Google
 * reads the whole document, not the first screen, so the ranking argument costs
 * the conversion argument nothing.
 */
/* Thrown at module load rather than rendered around, because a missing facial
   category is a broken data file, not a state this page should degrade into.
   A function, not a bare const, so the narrowing survives into the component. */
function facialCategory(): Category {
  const found = CATEGORIES.find((entry) => entry.slug === "facial");
  if (!found) throw new Error("The facial category is missing from CATEGORIES");
  return found;
}

const FACIAL = facialCategory();

export function Facials() {
  const count = getServicesByCategory("facial").length;

  return (
    /* Sand, taking the tone Categories used to carry in this slot, so the
       alternation down the page is unchanged: Concerns plain, Reviews with its
       own gradient, this sand. */
    <Section id="facials" tone="sand" className="scroll-mt-24">
      <Container>
        <Eyebrow>{count} treatments</Eyebrow>
        <h2 className="mt-4">Facials in Calgary SE</h2>
        <Lede className="mt-5 max-w-2xl">{FACIAL.intro}</Lede>
        <div className="mt-14">
          <ServiceList category={FACIAL} />
        </div>
      </Container>
    </Section>
  );
}
