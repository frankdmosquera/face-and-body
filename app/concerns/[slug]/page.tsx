import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConcernServices } from "@/components/concerns/ConcernServices";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { CONCERNS, concernHref } from "@/data/concerns";
import type { ImageSlot } from "@/data/images";
import { siteConfig } from "@/data/siteConfig";
import { getDominantCategory, getServicesByConcern } from "@/lib/services";
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
  return CONCERNS.map((concern) => ({ slug: concern.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const concern = CONCERNS.find((entry) => entry.slug === slug);
  if (!concern) return {};
  return { title: concern.label, description: concern.metaDescription };
}

export default async function ConcernPage({ params }: Props) {
  const { slug } = await params;
  const concern = CONCERNS.find((entry) => entry.slug === slug);
  if (!concern) notFound();

  const count = getServicesByConcern(concern.slug).length;
  const others = CONCERNS.filter((entry) => entry.slug !== concern.slug);
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
              <span aria-current="page">{concern.label}</span>
            </nav>
            <Eyebrow>
              {count} {count === 1 ? "treatment" : "treatments"}
            </Eyebrow>
            <h1 className="my-5 lg:text-[66px]">{concern.label}</h1>
            <Lede>{concern.description}</Lede>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Photo
              slot={PHOTO[getDominantCategory(concern.slug).slug]}
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
          <ConcernServices concern={concern.slug} />
        </Container>
      </Section>

      <Section tone="sand" className="pt-0 lg:pt-0">
        <Container className="pt-16 lg:pt-24">
          <Eyebrow>Something else bothering you</Eyebrow>
          <h2 className="mt-4">Browse another concern</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={concernHref(other)}
                className="inline-flex items-center rounded-full border border-border bg-card px-[22px] py-3.5 text-sm transition-colors hover:border-copper hover:text-accent-foreground"
              >
                {other.label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Divider className="py-section-sm lg:py-section" />

      <Section className="pt-0 lg:pt-0">
        <Container className="max-w-3xl text-center">
          <Eyebrow>Not sure where to start</Eyebrow>
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
