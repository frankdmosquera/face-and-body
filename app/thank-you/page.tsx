import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, MessageSquare } from "lucide-react";
import { BookedDetails } from "@/components/booking/BookedDetails";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/siteConfig";

/**
 * Where the booking window sends a visitor once she is booked.
 *
 * ITS OWN PAGE, NOT ONLY THE WINDOW'S "BOOKED". A page every booking lands on
 * is the one place an analytics or ads tool can count bookings, whichever is
 * picked later (Frank, 2026-10-29), and it has room for what happens next.
 * `BookingHost` sends the visitor here with the treatment and the time.
 *
 * `noindex`: nobody should arrive here from a search.
 *
 * Only facts the site already states: her address and parking, her number for
 * a text, and the confirmation email's own link to move or cancel.
 */
export const metadata: Metadata = {
  title: "You are booked",
  description: `Your appointment at ${siteConfig.name} is booked.`,
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  const { address, phone } = siteConfig;

  return (
    <Section className="relative overflow-hidden">
      <Watermark className="-top-[140px] -left-[180px]" />
      <Container className="relative max-w-3xl">
        <Eyebrow>Booked</Eyebrow>
        <h1 className="mt-4">
          You are <em className="text-copper">booked</em>
        </h1>
        <Lede className="mt-5 max-w-2xl">
          Your confirmation is on its way by email. If it is not there in a few
          minutes, look in your spam folder.
        </Lede>

        <BookedDetails />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-serif text-[20px] leading-snug">Finding us</p>
            <address className="mt-3 flex gap-3 text-[15px] leading-snug not-italic">
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
          </div>
          <div>
            <p className="font-serif text-[20px] leading-snug">
              Need to change it?
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Your confirmation email has a link to move or cancel your
              appointment. Or send a text:
            </p>
            <a
              href={phone.sms}
              className="mt-2 flex items-center gap-3 text-[15px] hover:text-accent-foreground"
            >
              <MessageSquare
                aria-hidden="true"
                className="size-4 text-copper"
              />
              {phone.display}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/" className={buttonVariants()}>
            Back to the home page
          </Link>
          <Link
            href="/book"
            className={cn(buttonVariants({ variant: "link" }), "text-xs")}
          >
            Book another treatment
          </Link>
        </div>
      </Container>
    </Section>
  );
}
