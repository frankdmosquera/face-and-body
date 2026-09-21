import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import type { ImageSlotType } from "@/data/imagesData";

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
const PICKS: readonly { slot: ImageSlotType; name: string; role: string }[] = [
  { slot: "eminenceGelWash", name: "Stone Crop Gel Wash", role: "Cleanse" },
  {
    slot: "eminenceSerum",
    name: "Bright Skin Licorice Root Booster-Serum",
    role: "Treat",
  },
  {
    slot: "eminenceMoisturizer",
    name: "Stone Crop Whip Moisturizer",
    role: "Hydrate",
  },
];

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
            take it home from the clinic.
          </Lede>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14 lg:gap-8">
          {PICKS.map((pick) => (
            <li
              key={pick.slot}
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
              className="flex flex-col rounded-lg border border-border bg-white p-6 text-center text-dark lg:p-8"
            >
              {/* THE WELL MATCHES THE ASSET, 4:3 against 1500x1125. It was a
                  square, which letterboxed every photograph and left about
                  12% of the card empty above and below the product for no
                  reason. Matching the ratio means `object-contain` has
                  nothing to pad, so the product is as large as the card can
                  make it without cropping. Re-measure this if the shots are
                  ever reshot at another ratio. */}
              <div className="relative aspect-[4/3]">
                <Photo
                  slot={pick.slot}
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
                  the height and all three cards take it. Measured at 455px
                  each on a 1280 screen. */}
              <h3 className="mt-2 font-serif text-[19px] leading-snug">
                {pick.name}
              </h3>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
