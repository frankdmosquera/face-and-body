import type { Metadata } from "next";
import Link from "next/link";
import { Directions } from "@/components/business/Directions";
import { HoursTable } from "@/components/business/HoursTable";
import { OpenNow } from "@/components/business/OpenNow";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

const LEDE =
  "Every day is different, so check before you come. A text lands whenever and gets answered between clients.";

export const metadata: Metadata = {
  title: "Hours and location",
  description:
    "Face and Body Wellness Centre in Midnapore, Calgary SE. Seven-day hours, directions, parking, and how to reach us.",
};

export default function VisitPage() {
  const { address, consultation } = siteConfig;

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
              <span aria-current="page">Visit</span>
            </nav>
            <Eyebrow>Midnapore, Calgary SE</Eyebrow>
            <h1 className="my-5 lg:text-[66px]">Hours and location</h1>
            <Lede>{LEDE}</Lede>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Photo
              slot="room"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section tone="sand">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Eyebrow>When we&apos;re here</Eyebrow>
            <h2 className="mt-4 mb-6">Hours</h2>
            <OpenNow>
              <HoursTable />
            </OpenNow>
          </div>
          <div>
            <Eyebrow>Where to find us</Eyebrow>
            <h2 className="mt-4 mb-6">Getting here</h2>
            <address className="text-[17px] not-italic">
              {address.unit}, {address.street}
              <br />
              {address.city}, {address.province} {address.postalCode}
            </address>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Off Macleod Trail at Midlake Boulevard, next to the Midnapore
              lake. Free parking right outside the door.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <Container className="pt-16 lg:pt-24">
          <Directions />
        </Container>
      </Section>

      <Divider className="pb-section-sm lg:pb-section" />

      <Section className="pt-0 lg:pt-0">
        <Container className="max-w-3xl text-center">
          <Eyebrow>First time here</Eyebrow>
          <h2 className="mt-4">Let us look first</h2>
          <Lede className="mt-5">
            The free {consultation.durationMin} minute consultation is the
            fastest way to find out what your skin actually needs, and what it
            will cost.
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
