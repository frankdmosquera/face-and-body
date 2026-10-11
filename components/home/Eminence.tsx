import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { PhotoByPath } from "@/components/media/PhotoByPath";
import { ProductTrio } from "@/components/products/ProductTrio";
import { productsData } from "@/data/productsData";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * A cleanser, a serum and a moisturiser, in that order, because three named
 * products in the order you would use them is a routine, and three jars in no
 * order is a shelf.
 *
 * Which three, and what each one is called here, is editorial: nothing else
 * reads it, and the reason a product is on the home page is a decision about
 * this band rather than a fact about the product. The product itself is not
 * editorial, so the name and the photograph are read from the catalogue. This
 * band used to carry its own copy of both, in three files under `public/`, and
 * a band that disagrees with `/products` about what a product is called is the
 * failure that arrangement was always going to produce.
 */
const PICKS = [
  { slug: "stone-crop-gel-wash", role: "Cleanse" },
  { slug: "bright-skin-licorice-root-booster-serum", role: "Treat" },
  { slug: "stone-crop-whip-moisturizer", role: "Hydrate" },
] as const;

/* Thrown at module load rather than rendered around, because a pick that is
   not in the catalogue is a broken constant, not a state this band should
   degrade into. Same reasoning as `facialCategory` in `Facials`. */
const PRODUCTS = PICKS.map((pick) => {
  const product = productsData.find((entry) => entry.slug === pick.slug);
  if (!product)
    throw new Error(
      `The Eminence band picks ${pick.slug}, which is not stocked`,
    );
  return { ...pick, product };
});

/**
 * THE STOCKIST BAND, SHOWING THE STOCK, ON A SHELF.
 *
 * The packshots are catalogue photographs, product centred on pure white.
 * They were first laid out as three white cards, which solved the white
 * (a white card carries the photograph's own white) but read as a product
 * listing: three identical boxes in a row, the one place on the home page
 * that looked like a shop page rather than the clinic.
 *
 * Now they stand together on one warm ground, the way `ProductTrio` already
 * shows them in the /products hero. `mix-blend-multiply` drops the white into
 * the ground instead of leaving a rectangle, the serum stands slightly larger
 * in the middle, and a single ledge runs under all three so they read as one
 * routine on one shelf. `object-contain`, never `cover`: a packshot that is
 * cropped is a product you cannot identify.
 *
 * THE GROUND IS PINNED LIGHT IN BOTH THEMES. `copper-tint` and `surface` are
 * brand constants, not theme surfaces, and multiply needs a light ground: on
 * the dark theme's surface it would turn every packshot to mud. The text on
 * it is pinned dark for the same reason.
 *
 * Text beside the shelf rather than above it: the shelf is one wide object,
 * not three cards competing for the container, so it can share the row.
 */
/* The three names under the Plate option: role over name, each a link. */
function ProductNames({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-3 gap-3 text-center", className)}>
      {PRODUCTS.map(({ slug, role, product }) => (
        <li key={slug}>
          <Link href="/products" className="group block">
            <span className="block text-[10px] tracking-[0.16em] text-copper uppercase sm:text-[11px]">
              {role}
            </span>
            <h3 className="mt-1.5 font-serif text-[15px] leading-snug transition-colors group-hover:text-accent-foreground sm:text-[18px]">
              {product.name}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * PLATE: the round plate from the /products hero, the same `ProductTrio` on
 * the same gold-ringed circle, so the two pages show the routine one way.
 * The plate is the link; the names under it are links too.
 */
function PlateOption() {
  return (
    <div data-option="shelf-plate" className="reveal">
      <Link
        href="/products"
        aria-label="See the Eminence Organics range"
        className="group relative mx-auto block aspect-square w-full max-w-[30rem] overflow-hidden rounded-full shadow-[0_40px_80px_-40px_rgba(28,26,23,0.4)] ring-1 ring-gold/40 ring-offset-8 ring-offset-background transition-transform duration-500 ease-out hover:-translate-y-1.5"
      >
        <ProductTrio className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </Link>
      <ProductNames className="mx-auto mt-10 max-w-[34rem]" />
    </div>
  );
}

/**
 * TRIO: each product on a small plate of its own, the serum's larger and
 * raised, in a row. The routine as three steps rather than one group. The
 * plate and the product move together on hover, so the multiply blend always
 * has the plate's warm ground behind it.
 */
function TrioOption() {
  return (
    <ul
      data-option="shelf-trio"
      className="reveal grid grid-cols-3 items-end gap-3 sm:gap-6"
    >
      {PRODUCTS.map(({ slug, role, product }, index) => (
        <li key={slug} className={index === 1 ? "-translate-y-6" : ""}>
          <Link
            href="/products"
            className="group flex flex-col items-center text-center"
          >
            <div
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-full bg-linear-to-b from-copper-tint to-surface shadow-[0_30px_60px_-36px_rgba(28,26,23,0.45)] ring-1 ring-gold/40 ring-offset-4 ring-offset-background transition-transform duration-500 ease-out group-hover:-translate-y-2",
                index !== 1 && "mx-auto w-[86%]",
              )}
            >
              <PhotoByPath
                path={product.image}
                alt={product.name}
                width={1500}
                height={1125}
                sizes="(min-width: 1024px) 18vw, 30vw"
                className="absolute inset-0 h-full w-full scale-[1.25] object-contain mix-blend-multiply"
              />
            </div>
            <span className="mt-6 block text-[10px] tracking-[0.16em] text-copper uppercase sm:text-[11px]">
              {role}
            </span>
            <h3 className="mt-1.5 font-serif text-[15px] leading-snug transition-colors group-hover:text-accent-foreground sm:text-[18px]">
              {product.name}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Eminence() {
  return (
    <Section className="relative overflow-hidden">
      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="reveal">
          <Eyebrow>Products we trust</Eyebrow>
          <h2 className="mt-4">Authorised Eminence Organics stockist</h2>
          <Lede className="mt-5">
            Every facial uses Eminence Organics, the Hungarian skincare line
            built on organic, biodynamic ingredients. It&apos;s the brand behind
            our Detoxifying, Revitalizing and Fire and Ice facials, and you can
            take it home from the{" "}
            {/* Two words, not the whole phrase. Linking "take it home from the
                clinic" wrapped across two lines at most widths and broke the
                underline mid-sentence; two short words survive any wrap.

                It stays even though the button below goes to the same place.
                They are not the same reader: this one is following the
                sentence and finds the route inside it, the button is for
                someone who has already decided and is scanning for the way
                through. */}
            <Link
              href="/products"
              className="border-b border-copper pb-0.5 text-foreground hover:text-accent-foreground"
            >
              clinic shelf
            </Link>
            .
          </Lede>
          {/* Outlined rather than solid. The hero's Book a treatment and the
              consultation band's Book a consultation are both solid copper,
              and three solid slabs down one page means none of them is the
              loud one. Buying products is the smaller intent here; booking is
              the page's job. */}
          <div className="mt-9">
            <Link
              href="/products"
              className={buttonVariants({ variant: "outline" })}
            >
              See the full range
            </Link>
          </div>
        </div>

        {/* Three versions of the right-hand side, one shown at a time by the
            design options (`DesignPicker`): Shelf, Plate and Trio. */}
        <PlateOption />
        <TrioOption />
        <div
          data-option="shelf-shelf"
          className="reveal relative overflow-hidden rounded-[28px] bg-linear-to-b from-copper-tint to-surface px-3 pt-10 pb-8 text-dark shadow-[0_30px_70px_-40px_rgba(150,73,42,0.45)] sm:px-8 lg:pt-12 lg:pb-10"
        >
          <p className="text-center font-serif text-[22px] text-copper italic lg:text-[26px]">
            Eminence Organics
          </p>
          <ul className="mt-14 grid grid-cols-3 lg:mt-20">
            {PRODUCTS.map(({ slug, role, product }, index) => (
              <li key={slug}>
                {/* THE PRODUCT IS THE LINK. A product on a page is the thing
                    people try to click, and `Categories` on this same page
                    already works this way. */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center"
                >
                  {/* 4:3 matches the 1500x1125 assets, so `object-contain`
                      has nothing to pad. Every well is the same size, so the
                      ledge segments below line up into one; the serum's extra
                      size is a transform, which does not move the layout. */}
                  {/* THE BLEND SITS HERE, ON THE ELEMENT THAT MOVES. On the
                      image inside it, the hover's transform turned this box
                      into its own isolated group, so the photograph multiplied
                      against nothing, its white square came back mid-hover and
                      overlapped the product beside it. Blending the moving
                      box itself keeps the white dissolved into the shelf. */}
                  <div className="relative aspect-[4/3] w-full mix-blend-multiply transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <PhotoByPath
                      path={product.image}
                      alt={product.name}
                      width={1500}
                      height={1125}
                      sizes="(min-width: 1024px) 22vw, 33vw"
                      className={cn(
                        "absolute inset-0 h-full w-full origin-bottom object-contain",
                        index === 1 ? "scale-[1.5]" : "scale-[1.3]",
                      )}
                    />
                  </div>
                  {/* The ledge: one segment per product with no gap between
                      the cells, so the three join into a single shelf edge.
                      The soft shadow above it is what the product stands in. */}
                  <span
                    aria-hidden="true"
                    className="relative block h-px w-full bg-gold/50"
                  >
                    <span className="absolute -top-2 left-1/2 h-3 w-2/3 -translate-x-1/2 rounded-[50%] bg-dark/10 blur-[6px] transition-[width,opacity] duration-500 group-hover:w-1/2 group-hover:opacity-60" />
                  </span>
                  <span className="mt-5 block text-[10px] tracking-[0.16em] text-copper uppercase sm:text-[11px]">
                    {role}
                  </span>
                  <h3 className="mt-1.5 px-1 font-serif text-[15px] leading-snug transition-colors group-hover:text-copper sm:px-3 sm:text-[18px]">
                    {product.name}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
