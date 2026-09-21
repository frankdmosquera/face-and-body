import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { GroupTabs } from "@/components/treatments/GroupTabs";
import { ServiceList } from "@/components/treatments/ServiceList";
import { buttonVariants } from "@/components/ui/button";
import { TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { categoriesData } from "@/data/categoriesData";
import { siteConfig } from "@/data/siteConfig";
import { getServicesByCategory } from "@/lib/serviceQueries";

/**
 * Everything that is not a facial, on one page.
 *
 * It replaces the four category pages for Skin, Body, Massage and Laser, which
 * held 147 to 243 words each and were the thinnest pages on the site. One page
 * of 18 treatments beats four pages of four.
 *
 * Deliberately low exposure. The home page is the one built to rank; this page
 * exists so the other half of the menu is findable, linkable and priced, not to
 * compete for a search term. A treatment that turns out to have real demand of
 * its own gets split back out later, through the `detailPage` flag.
 */
const OTHERS = categoriesData.filter((category) => category.slug !== "facial");

/**
 * Every anchor this page answers to, mapped to the tab that has to be open for
 * it to exist on screen.
 *
 * Two kinds, and both were already published. The four category segments are
 * linked from the footer, from `categoryHref`, and from seven permanent
 * redirects in `next.config.ts` covering the concern and category pages
 * deleted on 2026-09-20. The eighteen treatment slugs come from
 * `serviceHref`. A hidden panel has no layout, so without this every one of
 * those links would land at the top of the page and look broken.
 *
 * A segment maps to itself because the panel carries it as an `id`.
 */
const ANCHOR_TO_TAB: Record<string, string> = Object.fromEntries(
  OTHERS.flatMap((category) => [
    [category.segment, category.segment],
    ...getServicesByCategory(category.slug).map((service) => [
      service.slug,
      category.segment,
    ]),
  ]),
);

export const metadata: Metadata = {
  title: "Other treatments",
  description:
    "Massage, body contouring, skin treatments and laser at Face and Body Wellness Centre in Midnapore, Calgary SE. Eighteen treatments with prices.",
};

export default function OtherTreatmentsPage() {
  const total = OTHERS.reduce(
    (sum, category) => sum + getServicesByCategory(category.slug).length,
    0,
  );
  const { durationMin } = siteConfig.consultation;

  return (
    <>
      {/**
       * A dark header band, so arriving here reads as somewhere else.
       *
       * Every page on this site opens on the same cream, which is why moving
       * between them feels like scrolling rather than navigating. `tone="dark"`
       * already existed for exactly this and had never been used: its own
       * comment calls it a brand band rather than a theme surface, and it stays
       * dark in both light and dark mode, so the page keeps its identity either
       * way.
       *
       * A tone rather than a new colour, on purpose. The palette is one accent
       * on cream and sand, and that restraint is most of why the site reads as
       * a clinic. Signalling "different page" is worth a band, not a second
       * palette.
       */}
      <Section tone="dark" className="relative overflow-hidden py-0 lg:py-0">
        <Container className="relative py-12 lg:py-[84px]">
          <Watermark className="-top-[140px] -left-[180px] opacity-[0.07]" />
          <div className="relative max-w-2xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-xs tracking-[0.08em] text-on-dark-muted uppercase"
            >
              <Link href="/" className="hover:text-on-dark">
                Home
              </Link>
              <span aria-hidden="true"> &nbsp;/&nbsp; </span>
              <span aria-current="page">Other treatments</span>
            </nav>
            <Eyebrow>{total} treatments</Eyebrow>
            <h1 className="my-5 lg:text-[66px]">Other treatments</h1>
            <Lede className="text-on-dark-muted">
              Massage, body work, skin treatments and laser. The facials are on
              the{" "}
              <Link
                href="/#facials"
                className="text-on-dark underline underline-offset-4"
              >
                home page
              </Link>
              , where there are another 22.
            </Lede>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <GroupTabs
            groupOf={ANCHOR_TO_TAB}
            order={OTHERS.map((category) => category.segment)}
          >
            <TabsList aria-label="Other treatments by kind">
              {OTHERS.map((category) => (
                <TabsTab key={category.slug} value={category.segment}>
                  {category.label}
                  <span className="ml-2 text-muted-foreground/70 group-data-active:text-copper-ink/70">
                    {getServicesByCategory(category.slug).length}
                  </span>
                </TabsTab>
              ))}
            </TabsList>

            {OTHERS.map((category) => (
              /* The segment stays an `id`, now on the panel rather than a
                 section. The footer, `categoryHref` and seven redirects in
                 `next.config.ts` all point at these four anchors, and
                 `GroupTabs` opens the tab before scrolling so a closed panel
                 does not swallow the link. scroll-mt clears the sticky
                 header. */
              <TabsPanel
                key={category.slug}
                value={category.segment}
                id={category.segment}
                className="scroll-mt-24"
              >
                {/* The label is the tab now, so a visible h2 would say it
                    twice. It stays in the outline for screen readers and for
                    anything reading the document structure, because the page
                    would otherwise jump from the h1 straight to the treatment
                    h3s. */}
                <h2 className="sr-only">{category.label}</h2>
                <Lede className="mb-10 max-w-2xl">{category.intro}</Lede>
                <ServiceList category={category} />
              </TabsPanel>
            ))}
          </GroupTabs>
        </Container>
      </Section>

      <Divider className="pb-section-sm lg:pb-section" />

      <Section tone="sand" className="pt-0 lg:pt-0">
        <Container className="max-w-3xl pt-16 text-center lg:pt-24">
          <Eyebrow>Not sure which one</Eyebrow>
          <h2 className="mt-4">Let us look first</h2>
          <Lede className="mt-5">
            The free {durationMin} minute consultation is the fastest way to
            find out what your skin actually needs, and what it will cost.
          </Lede>
          <Link
            href="/contact"
            className={`${buttonVariants()} mt-8 inline-flex`}
          >
            Book a consultation
          </Link>
        </Container>
      </Section>
    </>
  );
}
