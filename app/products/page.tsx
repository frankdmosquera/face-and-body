import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { buttonVariants } from "@/components/ui/button";
import {
  collectionsData,
  productsData,
  getProductsByCollection,
} from "@/data/productsData";

/**
 * ⚠️ The product list this renders is a placeholder. See `data/productsData.ts`.
 *
 * The page is finished; the data is not. Everything here reads from that array,
 * so replacing it with her real shelf changes nothing in this file.
 *
 * No prices and no stock counts, deliberately. She sells across the counter,
 * not online, so "ask in clinic" is both the honest answer and the true one.
 * Build-plan feature 15 owns gift cards and series, which link to Square.
 */
export const metadata: Metadata = {
  title: "Eminence Organics",
  description:
    "Authorised Eminence Organics stockist in Midnapore, Calgary SE. The collections we use in treatment and sell in the clinic, matched to your skin.",
};

/**
 * Placeholder photography, cycling the three Eminence stock photos already in
 * the media library and already used by the Eminence section on the home page.
 *
 * They repeat, obviously, because there are three of them and twenty-one
 * products. That is the correct kind of wrong for a placeholder: the layout is
 * true, the photography is visibly provisional, and nobody mistakes it for
 * finished. Real product shots replace it one for one by adding slots to
 * `data/imagesData.ts` and indexing them by `product.slug` instead.
 *
 * Deliberately not a hot-linked picsum or Unsplash URL. next/image would need
 * `remotePatterns` in next.config, which is configuration that outlives the
 * placeholder, and the alternative is a bare <img> that loses sizing and
 * lazy-loading. The project already solved this problem; this uses that.
 */
const TILES = [
  {
    src: "/eminence-gel-wash.jpg",
    alt: "Eminence Stone Crop Gel Wash, a tall olive green bottle with a botanical print label",
  },
  {
    src: "/eminence-serum.jpg",
    alt: "Eminence Bright Skin Licorice Root Booster-Serum in an amber glass dropper bottle",
  },
  {
    src: "/eminence-moisturizer.jpg",
    alt: "Eminence Stone Crop Whip Moisturizer in a squat pale green glass jar",
  },
] as const;

function ProductTile({ index }: { index: number }) {
  return (
    /* `contain` on a card, not `cover`. These are catalogue packshots now
       rather than atmospheric stock, and a cropped packshot is a product you
       cannot identify. The card colour is near-white, so the shot’s own
       background disappears into it. */
    <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-sm border border-border bg-card">
      <Image
        src={TILES[index % TILES.length].src}
        alt={TILES[index % TILES.length].alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-contain p-4"
      />
    </div>
  );
}

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
            <Eyebrow>{productsData.length} products</Eyebrow>
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
            <p className="mt-6 text-[15px] text-muted-foreground">
              Sold in the clinic rather than online, so prices are given in
              person. Bring your skin to a free consultation and we will tell
              you which of these you actually need, which is usually fewer than
              you think.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <Container className="grid gap-20">
          {collectionsData.map((collection) => {
            const products = getProductsByCollection(collection.slug);
            if (products.length === 0) return null;
            return (
              <section
                key={collection.slug}
                id={collection.slug}
                className="scroll-mt-24"
              >
                <div className="mb-10">
                  <h2 className="text-[40px]">{collection.label}</h2>
                  <p className="mt-2 text-[15px] text-muted-foreground">
                    {collection.heading}
                  </p>
                </div>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product, index) => (
                    <li
                      key={product.slug}
                      id={product.slug}
                      className="scroll-mt-24"
                    >
                      <ProductTile index={index} />
                      <Eyebrow className="mb-2 text-[11px]">
                        {product.format}
                      </Eyebrow>
                      <h3 className="text-[19px] leading-snug">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                        {product.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
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
