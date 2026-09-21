import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { ServiceList } from "@/components/treatments/ServiceList";
import { buttonVariants } from "@/components/ui/button";
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

export const metadata: Metadata = {
  title: "Other treatments",
  description:
    "Massage, body contouring, skin treatments and laser at Face and Body Wellness Centre in Midnapore, Calgary SE. Eighteen treatments with prices.",
};

export default function TreatmentsPage() {
  const total = OTHERS.reduce(
    (sum, category) => sum + getServicesByCategory(category.slug).length,
    0,
  );
  const { durationMin } = siteConfig.consultation;

  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="relative py-10 lg:py-[72px]">
          <Watermark className="-top-[140px] -left-[180px]" />
          <div className="relative max-w-2xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-xs tracking-[0.08em] text-muted-foreground uppercase"
            >
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span aria-hidden="true"> &nbsp;/&nbsp; </span>
              <span aria-current="page">Other treatments</span>
            </nav>
            <Eyebrow>{total} treatments</Eyebrow>
            <h1 className="my-5 lg:text-[66px]">Other treatments</h1>
            <Lede>
              Massage, body work, skin treatments and laser. The facials are on
              the{" "}
              <Link href="/#facials" className="underline underline-offset-4">
                home page
              </Link>
              , where there are another 22.
            </Lede>
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <Container className="grid gap-20">
          {OTHERS.map((category) => (
            /* scroll-mt clears the sticky header, because the nav and the
               footer both link straight to these anchors. */
            <section
              key={category.slug}
              id={category.segment}
              className="scroll-mt-24"
            >
              <div className="mb-10">
                <Eyebrow>
                  {getServicesByCategory(category.slug).length} treatments
                </Eyebrow>
                <h2 className="mt-4">{category.label}</h2>
                <Lede className="mt-4 max-w-2xl">{category.intro}</Lede>
              </div>
              <ServiceList category={category} />
            </section>
          ))}
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
