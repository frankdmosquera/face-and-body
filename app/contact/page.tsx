import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { PricingEnquiry } from "@/components/contact/PricingEnquiry";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";
import { smsLink } from "@/lib/contact";

const LEDE =
  "We're usually mid-treatment, so a text gets answered properly rather than a call going to voicemail. Ask anything: which treatment suits your skin, what something costs, whether you're a candidate.";

export const metadata: Metadata = {
  title: "Contact",
  description: LEDE,
};

export default function ContactPage() {
  const { phone } = siteConfig;

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

      <Section tone="sand" className="pt-10 lg:pt-14">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <Eyebrow>Fastest way</Eyebrow>
            <h2 className="mt-4">Text her</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              She is usually mid-treatment, so a text gets read between clients
              and a call often goes to voicemail. Her hours change every day,
              which is the other reason a text beats trying to catch her.
            </p>
            <a
              href={smsLink("Hi! I'd like to ask about ")}
              className="mt-7 block font-serif text-[34px] leading-none hover:text-accent-foreground lg:text-[40px]"
            >
              {phone.display}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={smsLink("Hi! I'd like to ask about ")} className={buttonVariants()}>
                Send a text
              </a>
              <a
                href={phone.tel}
                className={buttonVariants({ variant: "outline" })}
              >
                Call instead
              </a>
            </div>
            <Link
              href="/hours"
              className="mt-7 inline-block border-b border-copper pb-0.5 text-xs tracking-[0.06em] uppercase"
            >
              Hours and location &rarr;
            </Link>
          </div>
          <div
            id="form"
            className="scroll-mt-24 rounded-lg border border-border bg-card p-7 lg:p-11"
          >
            <Eyebrow>Or write it out</Eyebrow>
            <h2 className="mt-3 text-[34px]">Send a message</h2>
            <p className="mt-2.5 text-[14px] text-muted-foreground">
              Goes to the same inbox she reads. Useful when your question needs more
              than a line.
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
