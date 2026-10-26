import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, MessageSquare } from "lucide-react";
import { Booker } from "@/components/booking/Booker";
import { OpenNow } from "@/components/business/OpenNow";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { Backdrop } from "@/components/theme/Backdrop";
import { DesignPicker } from "@/components/theme/DesignPicker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { buildBookables } from "@/lib/bookingConfig";
import { siteConfig } from "@/data/siteConfig";

/**
 * Booking, on our own page.
 *
 * ONE PAGE, NOT FORTY. The treatment arrives as `?treatment=<slug>` and the
 * booker reads it in the browser, which is the same shape `/contact` already
 * uses for its prefill. Forty routes would be forty prerendered copies of one
 * layout differing by a name and a number.
 *
 * ON OUR OWN PAGE, NOT A LINK OUT. A Book control opens Booking CRM's window
 * in place; this page is where it lands when it could not (no JavaScript yet,
 * a middle click, a copied link), and it opens the same window itself. The
 * visitor stays on the domain with the site's header, footer and theme.
 *
 * `noindex`, deliberately. This page is a tool for someone who has already
 * chosen, not a landing page: it holds a button and a window, and
 * 40 query-string variants of it competing with the treatment cards on the
 * home page is exactly the signal-splitting the 2026-09-20 restructure existed
 * to undo.
 */
export const metadata: Metadata = {
  title: "Book an appointment",
  description: `Book a treatment at ${siteConfig.name} in Midnapore, Calgary SE.`,
  robots: { index: false, follow: true },
};

export default function BookPage() {
  const { address, phone, consultation } = siteConfig;

  return (
    <Section className="relative overflow-hidden">
      {/* Until the design options are picked. */}
      <DesignPicker page="book" />
      <Backdrop
        group="bk-hero"
        word="Renew"
        className="bottom-auto h-[36rem] mask-b-from-60%"
      />
      <Watermark className="-top-[140px] -left-[180px]" />
      <Container className="relative">
        <Eyebrow>Appointments</Eyebrow>
        <h1 className="mt-4">
          Book an <em className="text-copper">appointment</em>
        </h1>
        <Lede className="mt-5 max-w-2xl">
          Pick a time that suits you, and you will get a confirmation by email.
        </Lede>
        {/* THE CALENDAR AND THE VISIT, SIDE BY SIDE. The page was a heading
            over an embed, and the embed is someone else's design: the one
            page where a visitor commits was the plainest on the site. The
            panel beside it answers what someone picking a time wonders about
            next, where it is, whether it is open, where to park, using only
            facts the site already states. Below `lg` it follows the
            calendar, because the calendar is the job. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:gap-14">
          {/* Built here, on the server, and handed down: the booker is a
              client component, and importing the catalogue there would ship 40
              descriptions to the browser to read a name and a duration. */}
          <Booker bookables={buildBookables()} />
          <aside className="lg:sticky lg:top-28">
            {/* Her own photograph of the room, from her Instagram, which
                carries its own "My treatment room" caption, so it gets no
                second one here. Desktop only: the file is 361px wide, enough
                for this column and soft at a phone's full width. */}
            <div className="relative mb-5 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Photo slot="room" fill sizes="340px" className="object-cover" />
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)]">
              <OpenNow>{null}</OpenNow>
              <address className="flex gap-3 text-[15px] leading-snug not-italic">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-copper"
                />
                <span>
                  {address.unit}, {address.street}
                  <br />
                  {address.city}, {address.province} {address.postalCode}
                  <span className="mt-1 block text-[13px] text-muted-foreground">
                    Free parking right outside the door.
                  </span>
                </span>
              </address>
              <a
                href={phone.sms}
                className="mt-4 flex items-center gap-3 text-[15px] hover:text-accent-foreground"
              >
                <MessageSquare
                  aria-hidden="true"
                  className="size-4 text-copper"
                />
                {phone.display}
              </a>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-serif text-[20px] leading-snug">
                  Not sure which one?
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                  Start with the free {consultation.durationMin} minute
                  consultation. We look at your skin first and you leave with a
                  plan.
                </p>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "mt-4 text-xs",
                  )}
                >
                  Ask for a consultation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
