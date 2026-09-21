import type { Metadata } from "next";
import Link from "next/link";
import { Directions } from "@/components/business/Directions";
import { HoursTable } from "@/components/business/HoursTable";
import { OpenNow } from "@/components/business/OpenNow";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { PricingEnquiry } from "@/components/contact/PricingEnquiry";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { siteConfig } from "@/data/siteConfig";
import {
  buildPrefills,
  CONTACT_TOPICS,
  GENERAL_OPENER,
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

  /* Data, not three near-identical list items. Written out as markup, a
     change to the wording lands on two of the three and nobody notices the
     one that was missed. */
  const STEPS = [
    "Tell us what you are hoping to change.",
    `We look at your skin in person, ${consultation.durationMin} minutes, free, no commitment.`,
    "You leave with a plan and real prices, in writing.",
  ];

  return (
    <>
      {/* ONE PLACE TO REACH US, NOT FOUR. The page carried the same two
          actions in four separate blocks: buttons in the hero, a number and a
          heading in a band of its own, icons under the form, and icons again
          beside the map. Ten generic text, call and WhatsApp links on one
          page. Offered four times, an action reads as four different
          offers rather than one, and the visitor stops to work out which is
          which.

          So the band went, and what was worth keeping came up here. The form
          takes the photograph's place: on the one page whose job is being
          contactable, a form above the fold beats a picture, and the page is
          not left without one because the pricing section below carries its
          own. */}
      <section className="relative overflow-hidden">
        <Container className="relative grid gap-10 py-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-[72px] lg:py-[72px]">
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
            {/* The number is the display and the link; the icons under it are
                the three ways to use it. No label above them, because the
                number they belong to is directly above and a heading would be
                the page explaining itself again. */}
            <a
              href={smsLink(GENERAL_OPENER)}
              className="mt-9 block font-serif text-[28px] leading-none hover:text-accent-foreground lg:text-[32px]"
            >
              {phone.display}
            </a>
            <ContactChannels label={null} className="mt-5" />
            <p className="mt-6 text-[13px] text-muted-foreground">
              We reply within a day.
            </p>
            {/* Jumps down the page rather than across to the old /hours. */}
            <a
              href="#hours"
              className="mt-8 inline-block border-b border-copper pb-0.5 text-xs tracking-[0.06em] uppercase"
            >
              Hours and location &darr;
            </a>
          </div>
          <div
            id="form"
            className="scroll-mt-24 rounded-lg border border-border bg-card p-7 lg:p-11"
          >
            {/* The heading lives inside `ContactForm`, not here. It used to sit
                at this level, which left "Send a message" standing over the
                confirmation that replaced the form - the card told you to send
                a message directly above the words saying you already had.
                Owning the heading lets the component swap it for the
                confirmation instead of stacking one on the other. */}
            <ContactForm
              topics={CONTACT_TOPICS}
              generalTopic={GENERAL_TOPIC}
              prefills={buildPrefills()}
            />
          </div>
        </Container>
      </section>

      {/* A band of its own now rather than a column beside the form, and
          three across rather than stacked. It answers the only question
          someone hesitating actually has, which is what they are signing up
          for, and every line of it was already true and already on the site,
          just scattered across three other pages. */}
      <Section tone="sand">
        <Container>
          <Eyebrow>What happens next</Eyebrow>
          <ol className="mt-7 grid gap-8 md:grid-cols-3 md:gap-10">
            {STEPS.map((step, index) => (
              <li key={step} className="reveal-step relative pt-5">
                <span className="block font-serif text-[26px] text-copper">
                  {index + 1}
                </span>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {step}
                </p>
              </li>
            ))}
          </ol>
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
