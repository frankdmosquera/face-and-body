import type { Metadata } from "next";
import Link from "next/link";
import { HoursTable } from "@/components/business/HoursTable";
import { ContactForm } from "@/components/contact/ContactForm";
import { PricingEnquiry } from "@/components/contact/PricingEnquiry";
import { Ways } from "@/components/contact/Ways";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { siteConfig } from "@/data/siteConfig";

const LEDE =
  "We're usually mid-treatment, so a text gets answered properly rather than a call going to voicemail. Ask anything: which treatment suits your skin, what something costs, whether you're a candidate.";

export const metadata: Metadata = {
  title: "Contact",
  description: LEDE,
};

export default function ContactPage() {
  const { address } = siteConfig;

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
              <span aria-current="page">Contact</span>
            </nav>
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="my-5 lg:text-[66px]">
              Text us. It&apos;s the fastest way.
            </h1>
            <Lede>{LEDE}</Lede>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Photo
              slot="consultation"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section className="pt-4 lg:pt-6">
        <Container>
          <Ways />
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Eyebrow>When we&apos;re here</Eyebrow>
            <h2 className="mt-4">Hours</h2>
            <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
              Every day is different, so check before you call. A text lands
              whenever, and gets answered between clients.
            </p>
            <HoursTable className="mt-6" />
            <address className="mt-7 text-[15px] not-italic">
              {address.unit}, {address.street}
              <br />
              {address.city}, {address.province} {address.postalCode}
            </address>
          </div>
          <div
            id="form"
            className="scroll-mt-24 rounded-lg border border-border bg-card p-7 lg:p-11"
          >
            <Eyebrow>Prefer to write it out</Eyebrow>
            <h2 className="mt-3 text-[34px]">Send a message</h2>
            <p className="mt-2.5 text-[14px] text-muted-foreground">
              Goes to the same inbox. A text is faster, but this works.
            </p>
            <ContactForm />
          </div>
        </Container>
      </Section>

      <Divider className="py-section-sm lg:py-section" />

      <PricingEnquiry />
    </>
  );
}
