import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { categoriesData, categoryHref } from "@/data/categoriesData";
import type { ImageSlotType } from "@/data/imagesData";
import {
  getCategoryFromPrice,
  getServicesByCategory,
} from "@/lib/serviceQueries";
import type { CategorySlugType } from "@/types/servicesTypes";

const PHOTO: Record<CategorySlugType, ImageSlotType> = {
  facial: "catFacial",
  skin: "catSkin",
  body: "catBody",
  massage: "catMassage",
  laser: "catLaser",
};

/**
 * The four non-facial categories, as a route into /other-treatments.
 *
 * Facials used to be the fifth card here, linking out to their own page. They
 * are now the section directly above this one, so a card pointing at them would
 * link to the same screen the visitor is already on. What is left is the half of
 * the menu that does not live on this page, and this is how it stays visible
 * without being given the weight that facials get.
 */
const OTHERS = categoriesData.filter((category) => category.slug !== "facial");

export function Categories() {
  const total = OTHERS.reduce(
    (sum, category) => sum + getServicesByCategory(category.slug).length,
    0,
  );

  return (
    <Section tone="sand">
      <Container>
        <div className="reveal">
          <Eyebrow>Also at the clinic</Eyebrow>
          <h2 className="mt-4">
            Massage, body and <em className="text-copper">skin</em> treatments
          </h2>
        </div>
        <div className="reveal mt-14 grid grid-cols-2 gap-[22px] lg:grid-cols-4">
          {OTHERS.map((category) => {
            const from = getCategoryFromPrice(category.slug);
            return (
              <Link
                key={category.slug}
                href={categoryHref(category)}
                className="group"
              >
                <div className="relative aspect-[3/4.2] overflow-hidden rounded-lg">
                  <Photo
                    slot={PHOTO[category.slug]}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-on-dark lg:p-6">
                    <div className="mb-3 h-px w-9 bg-copper-soft transition-[width] duration-300 group-hover:w-16" />
                    <h3 className="text-2xl lg:text-[28px]">
                      {category.label}
                    </h3>
                    <p className="mt-1 text-[13px] text-on-dark-muted max-xsm:hidden">
                      {category.blurb}
                    </p>
                    <span className="mt-2.5 flex items-center justify-between text-[13px]">
                      {from === null ? (
                        <span>
                          <b className="font-medium">Consult</b> for pricing
                        </span>
                      ) : (
                        <span>
                          from <b className="font-medium">${from}</b>
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="grid size-8 place-items-center rounded-full border border-on-dark/40 transition-[background-color,border-color,translate] duration-300 group-hover:translate-x-0.5 group-hover:border-copper group-hover:bg-copper"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href="/other-treatments"
          className="mt-12 inline-block text-[15px] underline underline-offset-4 hover:text-copper"
        >
          See all {total} treatments
        </Link>
      </Container>
    </Section>
  );
}
