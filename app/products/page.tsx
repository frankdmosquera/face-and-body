import type { Metadata } from "next";
import Link from "next/link";
import { ProductList } from "@/components/products/ProductList";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { PhotoCta } from "@/components/layout/PhotoCta";
import { Watermark } from "@/components/layout/Watermark";
import { ProductTrio } from "@/components/products/ProductTrio";
import { Backdrop } from "@/components/theme/Backdrop";
import { DesignPicker } from "@/components/theme/DesignPicker";
import { Photo } from "@/components/media/Photo";
import type { ImageSlotType } from "@/data/imagesData";
import { productsData } from "@/data/productsData";
import { getLowestProductPrice } from "@/lib/productQueries";

/** The photographs offered behind the catalogue in the design options. */
const SHELF_BACKGROUNDS: readonly { id: string; slot: ImageSlotType }[] = [
  { id: "warm", slot: "hero" },
  { id: "globes", slot: "catFacial" },
];

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
      {/* Until the design options are picked. */}
      <DesignPicker page="products" />
      <section className="relative overflow-hidden">
        <Backdrop group="pr-hero" word="Revitalize" />
        <Container className="relative grid items-center gap-16 py-10 lg:grid-cols-[1fr_380px] lg:py-[72px]">
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
          {/* Decorative: the same three products are named in the list below. */}
          <div
            aria-hidden="true"
            className="relative hidden aspect-square overflow-hidden rounded-full shadow-[0_40px_80px_-40px_rgba(28,26,23,0.4)] ring-1 ring-gold/40 ring-offset-8 ring-offset-background lg:block"
          >
            <ProductTrio />
          </div>
        </Container>
      </section>

      {/* Not `pt-0` any more: flush, the search bar sat on the foot of the
          hero's "Revitalize". */}
      <Section className="relative isolate pt-6! lg:pt-10!">
        {/* One photograph behind the whole catalogue, pinned while the cards
            scroll over it under a cream veil, chosen in the design options
            ("None" leaves the plain cream). A sticky child inside an absolute
            box rather than `background-attachment: fixed`, which iPhones
            ignore. */}
        {SHELF_BACKGROUNDS.map(({ id, slot }) => (
          <div
            key={id}
            data-option={`pr-bg-${id}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="sticky top-0 h-svh">
              <Photo slot={slot} fill sizes="100vw" className="object-cover" />
              {/* How much of the photograph shows, chosen in the options. */}
              {[85, 70, 55, 40, 25].map((veil, index) => (
                <div
                  key={veil}
                  data-option={`pr-veil-${index + 1}`}
                  className="absolute inset-0 bg-background"
                  style={{ opacity: veil / 100 }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
          </div>
        ))}
        <Container>
          <ProductList />
        </Container>
      </Section>

      <PhotoCta
        slot="concernFineLines"
        eyebrow="Not sure what you need"
        title={
          <>
            Ask <em className="text-gold">before</em> you buy
          </>
        }
        href="/contact"
        action="Book a consultation"
      >
        A shelf of the wrong products is expensive and does nothing. Come in and
        we will work out what your skin is actually short of.
      </PhotoCta>
    </>
  );
}
