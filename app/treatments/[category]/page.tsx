import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import {
  ConcernFilter,
  ConcernFilterStyles,
} from "@/components/treatments/ConcernFilter";
import { ServiceList } from "@/components/treatments/ServiceList";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORIES, getCategoryBySegment } from "@/data/categories";
import { siteConfig } from "@/data/siteConfig";
import type { ImageSlot } from "@/data/images";
import { getConcernsInCategory, getServicesByCategory } from "@/lib/services";
import type { CategorySlug } from "@/types/services";

const PHOTO: Record<CategorySlug, ImageSlot> = {
  facial: "catFacial",
  skin: "catSkin",
  body: "catBody",
  massage: "catMassage",
  laser: "catLaser",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.segment }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: segment } = await params;
  const category = getCategoryBySegment(segment);
  if (!category) return {};
  return { title: category.label, description: category.metaDescription };
}

export default async function CategoryPage({ params }: Props) {
  const { category: segment } = await params;
  const category = getCategoryBySegment(segment);
  if (!category) notFound();

  const services = getServicesByCategory(category.slug);
  const chips = getConcernsInCategory(category.slug);
  const { durationMin } = siteConfig.consultation;

  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="relative grid gap-8 py-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-[72px] lg:py-[72px]">
          <Watermark className="-top-[140px] -left-[180px]" />
          <div className="relative">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-xs tracking-[0.08em] text-muted-foreground uppercase"
            >
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span aria-hidden="true"> &nbsp;/&nbsp; </span>
              <span aria-current="page">{category.label}</span>
            </nav>
            <Eyebrow>{services.length} treatments</Eyebrow>
            <h1 className="my-5 lg:text-[66px]">{category.label}</h1>
            <Lede>{category.intro}</Lede>
          </div>
          {/* The ratio follows the layout. 4:5 is right only when the photo sits
              beside the text, which starts at lg. Below that it is a single
              column, so a 4:5 image is as wide as the page: at 834px it
              rendered 779x974, 97% of an iPad screen, and you scrolled a
              full viewport of photograph before reaching a word. Landscape
              on phones and tablets, portrait only when there is a column
              next to it. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[2/1] lg:aspect-[4/5]">
            <Photo
              slot={PHOTO[category.slug]}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <Container>
          <ConcernFilterStyles chips={chips} />
          <ConcernFilter chips={chips} total={services.length}>
            <div className="mt-12">
              <ServiceList category={category} />
            </div>
          </ConcernFilter>
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
