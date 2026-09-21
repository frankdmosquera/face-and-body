import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/faqData";

/**
 * Anatomy ported from Primo's FAQ, surface rebuilt for this site.
 *
 * Kept: one data array feeding both the page and, later, the schema; the
 * open and closed glyph driven by `aria-expanded` rather than state, so the
 * whole section stays a server component and ships no JavaScript of its own.
 *
 * Changed: the ringed copper plus and minus match `TrustStrip`'s glyphs
 * rather than Primo's blue, and the questions are h3 under one h2. Primo
 * renders its questions as h2 on purpose, because its live SEO baseline has
 * them that way and text that ranks does not move on a design pass. This
 * page has no such baseline and already carries an h2 per section, so seven
 * more would flatten the outline for no gain.
 */
export function Faq() {
  return (
    <Section tone="sand" className="relative overflow-hidden">
      <Watermark className="-top-[120px] -right-[160px]" />
      <Container className="relative max-w-3xl">
        <Eyebrow>Before you book</Eyebrow>
        <h2 className="mt-4">Questions we get asked</h2>

        <Accordion className="mt-10">
          {faqData.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="gap-6 py-5 text-left [&_[data-slot=accordion-trigger-icon]]:hidden">
                {/* A span, not a heading. AccordionPrimitive.Header already
                    renders an h3 around this, so an h3 here nested one
                    heading inside another and the outline listed every
                    question twice. */}
                <span className="font-serif text-[19px] leading-snug lg:text-[21px]">
                  {item.question}
                </span>
                {/* One ringed glyph, swapped on aria-expanded. The chevrons the
                    base component ships are hidden above rather than removed
                    from components/ui, which stays stock. */}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-copper font-serif text-lg text-copper"
                >
                  <span className="group-aria-expanded/accordion-trigger:hidden">
                    +
                  </span>
                  <span className="hidden group-aria-expanded/accordion-trigger:inline">
                    &minus;
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">
                {item.answer}
                {item.book ? (
                  <Link
                    href="/contact"
                    className="mt-3 block text-foreground underline underline-offset-4 hover:text-copper"
                  >
                    Book a free consultation
                  </Link>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
