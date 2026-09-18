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

export function Categories() {
  return (
    <Section tone="sand">
      <Container>
        <Eyebrow>Or browse by treatment</Eyebrow>
        <h2 className="mt-4">What we do</h2>
        <div className="mt-14 grid grid-cols-2 gap-[22px] lg:grid-cols-5">
          {CATEGORIES.map((category) => {
            const from = getCategoryFromPrice(category.slug);
            const count = getServicesByCategory(category.slug).length;
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
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mb-3 h-px w-9 bg-copper transition-[width] duration-300 group-hover:w-16" />
                <h3 className="text-2xl">{category.label}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {category.slug === "facial"
                    ? `${count} treatments`
                    : category.blurb}
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
      </Container>
    </Section>
  );
}
