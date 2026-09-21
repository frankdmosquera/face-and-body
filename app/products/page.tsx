import type { Metadata } from "next";
import Link from "next/link";
import { ProductList } from "@/components/products/ProductList";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { buttonVariants } from "@/components/ui/button";
import { productsData } from "@/data/productsData";
import { getLowestProductPrice } from "@/lib/productQueries";

/**
 * Prices are Eminence's Canadian list price, carried through from
 * `data/products/`. Frank's decision on 2026-09-21: what she charges at the
 * counter is what Eminence charges, so the page says so rather than sending
 * everyone to the phone to ask. The page still sells the consultation, because
 * knowing the price is not the same as knowing which one you need.
 */
export const metadata: Metadata = {
  title: "Eminence Organics",
  description:
    "Authorised Eminence Organics stockist in Midnapore, Calgary SE. Cleansers, serums, moisturisers and SPF, with prices, sold in the clinic.",
};

export default function ProductsPage() {
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
              <span aria-current="page">Products</span>
            </nav>
            <Eyebrow>
              {productsData.length} products from ${getLowestProductPrice()}
            </Eyebrow>
            <h1 className="my-5 lg:text-[66px]">Eminence Organics</h1>
            <Lede>
              We are an authorised stockist of Eminence Organics, the Hungarian
              line built on organic and biodynamic ingredients. It is what every
              facial on the{" "}
              <Link href="/#facials" className="underline underline-offset-4">
                home page
              </Link>{" "}
              uses, and you can take it home from the clinic.
            </Lede>
            {/* Grouped by the same four words the facials are grouped by, which
                is the whole reason this page is worth reading: someone who
                booked a Hydrating and brightening facial knows which tab is
                theirs before they open it. */}
            <p className="mt-6 text-[15px] text-muted-foreground">
              Grouped the way the treatments are, so the products that go with
              your facial sit under the same heading. Sold in the clinic rather
              than online. Come in and we will tell you which of these you
              actually need, which is usually fewer than you think.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <Container>
          <ProductList />
        </Container>
      </Section>

      <Divider className="pb-section-sm lg:pb-section" />

      <Section tone="sand" className="pt-0 lg:pt-0">
        <Container className="max-w-3xl pt-16 text-center lg:pt-24">
          <Eyebrow>Not sure what you need</Eyebrow>
          <h2 className="mt-4">Ask before you buy</h2>
          <Lede className="mt-5">
            A shelf of the wrong products is expensive and does nothing. Come in
            and we will work out what your skin is actually short of.
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
