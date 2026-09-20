import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { CATEGORIES, categoryHref } from "@/data/categories";
import type { ImageSlot } from "@/data/images";
import { getCategoryFromPrice, getServicesByCategory } from "@/lib/services";
import type { CategorySlug } from "@/types/services";

const PHOTO: Record<CategorySlug, ImageSlot> = {
  facial: "catFacial",
  skin: "catSkin",
  body: "catBody",
  massage: "catMassage",
  laser: "catLaser",
};

/**
 * The four non-facial categories, as a route into /treatments.
 *
 * Facials used to be the fifth card here, linking out to their own page. They
 * are now the section directly above this one, so a card pointing at them would
 * link to the same screen the visitor is already on. What is left is the half of
 * the menu that does not live on this page, and this is how it stays visible
 * without being given the weight that facials get.
 */
const OTHERS = CATEGORIES.filter((category) => category.slug !== "facial");

export function Categories() {
  const total = OTHERS.reduce(
    (sum, category) => sum + getServicesByCategory(category.slug).length,
    0,
  );

  return (
    <Section>
      <Container>
        <Eyebrow>Also at the clinic</Eyebrow>
        <h2 className="mt-4">Massage, body and skin treatments</h2>
        <div className="mt-14 grid grid-cols-2 gap-[22px] lg:grid-cols-4">
          {OTHERS.map((category) => {
            const from = getCategoryFromPrice(category.slug);
            return (
              <Link
                key={category.slug}
                href={categoryHref(category)}
                className="group"
              >
                <div className="relative mb-[18px] aspect-[3/4.2] overflow-hidden rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <Photo
                    slot={PHOTO[category.slug]}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mb-3 h-px w-9 bg-copper transition-[width] duration-300 group-hover:w-16" />
                <h3 className="text-2xl">{category.label}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {category.blurb}
                </p>
                <span className="mt-2.5 block text-[13px]">
                  {from === null ? (
                    <>
                      <b className="font-medium">Consult</b> for pricing
                    </>
                  ) : (
                    <>
                      from <b className="font-medium">${from}</b>
                    </>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/treatments"
          className="mt-12 inline-block text-[15px] underline underline-offset-4 hover:text-copper"
        >
          See all {total} treatments
        </Link>
      </Container>
    </Section>
  );
}
