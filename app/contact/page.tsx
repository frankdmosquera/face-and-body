import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MessageCircle, ScanFace } from "lucide-react";
import { Directions } from "@/components/business/Directions";
import { HoursTable } from "@/components/business/HoursTable";
import { OpenNow } from "@/components/business/OpenNow";
import { ConsultSeal } from "@/components/home/ConsultSeal";
import { buttonVariants } from "@/components/ui/button";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { PricingEnquiry } from "@/components/contact/PricingEnquiry";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { Backdrop } from "@/components/theme/Backdrop";
import { DesignPicker } from "@/components/theme/DesignPicker";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/cn";
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
    { icon: MessageCircle, text: "Tell us what you are hoping to change." },
    {
      icon: ScanFace,
      text: `We look at your skin in person, ${consultation.durationMin} minutes, free, no commitment.`,
    },
    {
      icon: FileText,
      text: "You leave with a plan and real prices, in writing.",
    },
  ];

  return (
    <>
      {/* Until the design options are picked. */}
      <DesignPicker page="contact" />
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
          own.

          The photograph came back on desktop, BEHIND the form rather than
          instead of it: a treatment in progress fills the right edge and the
          form card floats over its left side, so the form keeps its place
          above the fold and the page stops opening on two flat columns. Below
          `lg` there is no room beside the form, so there is no photograph. */}
      <section className="relative overflow-hidden">
        <Backdrop group="ct-hero" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[46%] rounded-l-[40px] overflow-hidden lg:block"
        >
          <Photo slot="catFacial" fill sizes="46vw" className="object-cover" />
          <div className="absolute inset-0 bg-dark/15" />
        </div>
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
            className="relative scroll-mt-44 xsm:scroll-mt-24 rounded-2xl border border-border bg-card p-7 lg:border-transparent lg:p-11 lg:shadow-[0_40px_90px_-40px_rgba(28,26,23,0.45)]"
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
          <div className="reveal">
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="mt-4">
              From a message to a <em className="text-copper">plan</em>
            </h2>
          </div>
          {/* Cards rather than three bare numbers on the sand. As a row of
              small grey sentences the band read as a footnote; this is the
              answer to "what am I signing up for", so it gets the weight of
              the treatment cards. */}
          {/* A dashed thread runs behind the three cards at the height of
              their icons, showing in the gaps, so they read as one path. */}
          <ol className="reveal relative mt-12 grid gap-6 md:grid-cols-3 md:before:absolute md:before:inset-x-[10%] md:before:top-[52px] md:before:border-t md:before:border-dashed md:before:border-copper/45 md:before:content-[''] lg:gap-8 lg:before:top-[56px]">
            {STEPS.map(({ icon: Icon, text }, index) => (
              <li
                key={text}
                className="relative overflow-hidden rounded-2xl bg-card p-7 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)] lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-6 font-serif text-[64px] leading-none text-copper/15 italic"
                >
                  0{index + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-full bg-copper-tint text-copper">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-6 text-[17px] leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Hours and location, moved here from the page that used to hold them
          on its own. The scroll-mt pair keeps the heading clear of the sticky
          header when someone arrives on #hours from the link above, from the
          menu, or from the old /hours URL - 172px of header below `xsm`, where
          Book now takes its own row, and 96px from there up. One value of 96
          put every anchor on the site 76px behind the header on a phone. */}
      <Section id="hours" className="scroll-mt-44 xsm:scroll-mt-24">
        {/* TWO CARDS, AND THE MAP MOVED INTO THE SECOND. The map used to be
            a section of its own under both columns, a full-width frame a
            screen away from the address it shows. Inside the Getting here
            card it sits with its address and its one action, and the hours
            get a card of the same weight beside it. */}
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-10">
          {/* The hours, and under them the ask, dark with the turning seal.
              The map card beside them is taller, and the space it left under
              the hours read as a gap (2026-10-11). */}
          <div className="grid gap-8 lg:gap-10">
            <div className="rounded-2xl bg-card p-7 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)] lg:p-9">
              <Eyebrow>When we&apos;re here</Eyebrow>
              <h2 className="mt-4 mb-6">Hours</h2>
              <OpenNow>
                <HoursTable />
              </OpenNow>
            </div>
            <div
              data-tone="dark"
              className="relative flex items-center gap-6 overflow-hidden rounded-2xl bg-dark-surface p-7 text-on-dark lg:p-9"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -bottom-24 size-64 rounded-full bg-copper/25 blur-3xl"
              />
              <ConsultSeal className="relative size-24 shrink-0" />
              <div className="relative">
                <p className="font-serif text-[24px] leading-tight">
                  Not sure yet? Start with a{" "}
                  <em className="text-gold">free</em> look.
                </p>
                <a
                  href="#form"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "mt-3 text-xs text-gold-soft",
                  )}
                >
                  Ask for a consultation
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-card p-7 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)] lg:p-9">
            <Eyebrow>Where to find us</Eyebrow>
            <h2 className="mt-4 mb-6">Getting here</h2>
            <address className="text-[17px] not-italic">
              {address.unit}, {address.street}
              <br />
              {address.city}, {address.province} {address.postalCode}
            </address>
            <p className="mt-3 mb-7 text-[15px] leading-relaxed text-muted-foreground">
              Off Macleod Trail at Midlake Boulevard, next to the Midnapore
              lake. Free parking right outside the door.
            </p>
            <Directions />
          </div>
        </Container>
      </Section>

      <Divider className="py-section-sm lg:py-section" />

      <PricingEnquiry />
    </>
  );
}
