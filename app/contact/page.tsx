import type { Metadata } from "next";
import Link from "next/link";
import { Directions } from "@/components/business/Directions";
import { HoursTable } from "@/components/business/HoursTable";
import { OpenNow } from "@/components/business/OpenNow";
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
import {
  buildPrefills,
  CONTACT_TOPICS,
  GENERAL_TOPIC,
  smsLink,
} from "@/lib/contactPrefills";

/**
 * THIS PAGE LEADS WITH THE OFFER, NOT THE CHANNEL. It used to open on "Text
 * us. It's the fastest way." over a paragraph explaining that a call goes to
 * voicemail and the hours change daily. Every line of that was the clinic
 * describing its own constraint, which reads as an apology for being hard to
 * reach - and being booked out is a signal in a clinic's favour, not something
 * to explain away.
 *
 * It was also arguing a point nobody disputes. A visitor on the contact page
 * has already decided to make contact; talking them into one channel solves a
 * problem they do not have. The channels are buttons now and the copy is spent
 * on the thing that was previously last on the page: the free consultation,
 * which until now appeared only in the final section as an afterthought.
 */
const LEDE =
  "A free consultation, or just a question. Either way you get a straight answer about what your skin needs and what it costs, from someone who has looked at it first.";

/**
 * Contact, hours and location on one page.
 *
 * These were split apart earlier - /contact for getting in touch, /hours for
 * where and when - on the reasoning that they are two different jobs. In
 * practice they are one: nobody wants to reach a clinic without also knowing
 * when it is open, and a visitor who clicks Contact and cannot find the hours
 * has to go looking. /hours now redirects here and #hours deep-links to the
 * table, so nothing that pointed at the old URL breaks.
 */
export const metadata: Metadata = {
  title: "Contact, hours and location",
  description:
    "Text or message Face and Body Wellness Centre in Midnapore, Calgary SE. Seven-day hours, directions and parking.",
};

export default function ContactPage() {
  const { address, phone, consultation } = siteConfig;

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
              Start with a look at your skin.
            </h1>
            <Lede>{LEDE}</Lede>
            {/* THE ACTION LIVES IN THE HERO, and on this page of all pages it
                has to. A visitor who has already decided should not have to
                read anything first; one who has not decided scrolls on to
                What happens next and the form, which is the order they want
                it in anyway. The buttons do not repeat lower down, because
                the number below is itself the text link and two identical
                pairs inside one screen reads as a mistake rather than a
                reminder. */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={smsLink("Hi! I'd like to ask about ")}
                className={buttonVariants()}
              >
                Send a text
              </a>
              <a
                href={phone.tel}
                className={buttonVariants({ variant: "outline" })}
              >
                Call instead
              </a>
            </div>
          </div>
          {/* The ratio follows the layout. 4:5 is right only when the photo sits
              beside the text, which starts at lg. Below that it is a single
              column, so a 4:5 image is as wide as the page: at 834px it
              rendered 779x974, 97% of an iPad screen, and you scrolled a
              full viewport of photograph before reaching a word. Landscape
              on phones and tablets, portrait only when there is a column
              next to it. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[2/1] lg:aspect-auto lg:h-[min(72vh,620px)]">
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
            <Eyebrow>Reach us</Eyebrow>
            <h2 className="mt-4">Text, call or write</h2>
            <a
              href={smsLink("Hi! I'd like to ask about ")}
              className="mt-7 block font-serif text-[34px] leading-none hover:text-accent-foreground lg:text-[40px]"
            >
              {phone.display}
            </a>
            {/* One line, and it is the only thing the old paragraph was
                actually for. What a visitor needs is the expectation, not the
                reasoning behind it. Same claim the form already makes below,
                so the two cannot contradict each other. */}
            <p className="mt-5 text-[13px] text-muted-foreground">
              We reply within a day.
            </p>
            {/* The persuasion, and the reason the page no longer needs to
                argue for a channel. It answers the only question someone
                hesitating actually has, which is what they are signing up
                for. Every line of it was already true and already on the
                site, just scattered across three other pages. */}
            <Eyebrow className="mt-10">What happens next</Eyebrow>
            <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              <li className="flex gap-3.5">
                <span className="font-serif text-copper">1</span>
                Tell us what you are hoping to change.
              </li>
              <li className="flex gap-3.5">
                <span className="font-serif text-copper">2</span>
                We look at your skin in person, {consultation.durationMin}{" "}
                minutes, free, no commitment.
              </li>
              <li className="flex gap-3.5">
                <span className="font-serif text-copper">3</span>
                You leave with a plan and real prices, in writing.
              </li>
            </ol>
            {/* Jumps down the page now rather than across to /hours. */}
            <a
              href="#hours"
              className="mt-7 inline-block border-b border-copper pb-0.5 text-xs tracking-[0.06em] uppercase"
            >
              Hours and location &darr;
            </a>
          </div>
          <div
            id="form"
            className="scroll-mt-24 rounded-lg border border-border bg-card p-7 lg:p-11"
          >
            <Eyebrow>Or write it out</Eyebrow>
            <h2 className="mt-3 text-[34px]">Send a message</h2>
            <p className="mt-2.5 text-[14px] text-muted-foreground">
              Useful when your question needs more than a line.
            </p>
            <ContactForm
              topics={CONTACT_TOPICS}
              generalTopic={GENERAL_TOPIC}
              prefills={buildPrefills()}
            />
          </div>
        </Container>
      </Section>

      {/* Hours and location, moved here from the page that used to hold them
          on its own. `scroll-mt-24` keeps the heading clear of the sticky
          header when someone arrives on #hours from the link above, from the
          menu, or from the old /hours URL. */}
      <Section id="hours" className="scroll-mt-24">
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
        <Container className="pt-4 lg:pt-8">
          <Directions />
        </Container>
      </Section>

      <Divider className="py-section-sm lg:py-section" />

      <PricingEnquiry />
    </>
  );
}
