import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

/**
 * A cleanser, a serum and a moisturiser, in that order, because three named
 * products in the order you would use them is a routine, and three jars in no
 * order is a shelf.
 *
 * The pick is editorial rather than catalogue data, which is why it lives here
 * and not in `data/`. Nothing else reads it, and the reason a given product is
 * on the home page is a design decision about this band, not a fact about the
 * product.
 */
const PICKS = [
  {
    src: "/eminence-gel-wash.jpg",
    name: "Stone Crop Gel Wash",
    role: "Cleanse",
    alt: "Eminence Stone Crop Gel Wash, a tall olive green bottle with a botanical print label",
  },
  {
    src: "/eminence-serum.jpg",
    name: "Bright Skin Licorice Root Booster-Serum",
    role: "Treat",
    alt: "Eminence Bright Skin Licorice Root Booster-Serum in an amber glass dropper bottle",
  },
  {
    src: "/eminence-moisturizer.jpg",
    name: "Stone Crop Whip Moisturizer",
    role: "Hydrate",
    alt: "Eminence Stone Crop Whip Moisturizer in a squat pale green glass jar",
  },
] as const;

/**
 * THE STOCKIST BAND, SHOWING THE STOCK.
 *
 * It was a text column beside three atmospheric photographs: a 2:1 above two
 * squares, amber glass and dried botanicals, deliberately unbranded. They were
 * the best available answer at the time and they still illustrated a sentence
 * about a named brand with pictures of nobody's products. See the header above
 * `eminenceGelWash` in `data/imagesData.ts` for why stock photography could
 * never have solved it.
 *
 * WHY THE LAYOUT CHANGED RATHER THAN THE PATHS. The replacements are catalogue
 * packshots, product centred on pure white, and they cannot be dropped into
 * the old boxes. Cropped to 2:1 a jar becomes a sliver; cropped to 1:1 it is
 * either clipped at the sides or surrounded by dead white. And three white
 * rectangles laid straight onto the cream punch holes in the page.
 *
 * A card solves all three at once. It is the same object the treatment grid is
 * built from, so the band matches the rest of the page rather than being the
 * one place with bare photographs, and a card can carry the photograph's own
 * white instead of fighting it - see the note on the `li` for why that white
 * is literal rather than `bg-card`. `object-contain`, never `cover`: a
 * packshot that is cropped is a product you cannot identify, which defeats the
 * point of naming it.
 *
 * The text column moves above the row rather than beside it. Beside it, three
 * cards share half the container and each one lands near 175px on a 1440
 * screen, which is too small to read a label on.
 */
export function Eminence() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
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
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14 lg:gap-8">
          {PICKS.map((pick) => (
            <li key={pick.src} className="contents">
              {/* THE CARD IS THE LINK, and until now nothing here was. The
                  band claimed a brand, showed its products and gave the
                  visitor nowhere to go; the only route to /products was the
                  header menu. A product on a page is the thing people try to
                  click, so it is the link, and `Categories` on this same page
                  already works exactly this way. */}
              <Link
                href="/products"
              /* WHITE, NOT `bg-card`, AND FIXED IN BOTH THEMES. Measured:
                  `bg-card` is rgb(255,253,249) and the packshot background is
                  pure rgb(255,255,255). Six points apart is nothing as a
                  colour and very visible as a hard edge across a large square,
                  so the photograph read as a white rectangle pasted into a
                  cream card. Matching the card to the photograph removes the
                  seam rather than hiding it.

                  Same decision `Brand` makes for the logo disc, and for the
                  same reason: the artwork has a white background baked in, so
                  a surface that flips with the theme cannot hold it. That
                  means the text colour has to be pinned too, or dark mode
                  would put near-white type on a white card. */
                className="group flex flex-col rounded-lg border border-border bg-white p-6 text-center text-dark transition-transform duration-200 hover:-translate-y-0.5 lg:p-8"
              >
                {/* THE WELL MATCHES THE ASSET, 4:3 against 1500x1125. It was
                    a square, which letterboxed every photograph and left about
                    12% of the card empty above and below the product for no
                    reason. Matching the ratio means `object-contain` has
                    nothing to pad, so the product is as large as the card can
                    make it without cropping. Re-measure this if the shots are
                    ever reshot at another ratio. */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pick.src}
                    alt={pick.alt}
                    fill
                    sizes="(min-width: 640px) 30vw, 80vw"
                    className="object-contain"
                  />
                </div>
                <span className="mt-5 block text-[11px] tracking-[0.14em] text-copper uppercase">
                  {pick.role}
                </span>
                {/* Nothing pins this to the floor, and it does not need it:
                    grid items stretch, so the two-line name on the serum sets
                    the height and all three cards take it. */}
                <h3 className="mt-2 font-serif text-[19px] leading-snug group-hover:text-accent-foreground">
                  {pick.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
        {/* A BUTTON, MATCHING `Consultation` FURTHER DOWN THE PAGE, and it
            sits alongside the link in the lede rather than instead of it. An
            earlier "See what we stock" line was dropped because it repeated
            the lede in weaker words; this does not repeat anything, it just
            gives the decided visitor something obvious to aim at. The cards
            are links too, so the section has four routes out and no reader
            has to hunt.

            Outlined rather than solid. The hero's Book a treatment and the
            consultation band's Book a consultation are both solid copper, and
            three solid slabs down one page means none of them is the loud
            one. Buying products is the smaller intent here; booking is the
            page's job. */}
        <div className="mt-10 lg:mt-12">
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline" })}
          >
            See the full range
          </Link>
        </div>
      </Container>
    </Section>
  );
}
