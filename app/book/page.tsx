import type { Metadata } from "next";
import { Booker } from "@/components/booking/Booker";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
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
 * INLINE, NOT A LINK OUT. Every Book control on the site lands here rather
 * than on a booking provider's own page. The visitor stays on the domain, the
 * page keeps the site's header, footer and theme, and what changes underneath
 * when the clinic's own booking system replaces Cal.com is one component.
 *
 * `noindex`, deliberately. This page is a tool for someone who has already
 * chosen, not a landing page: its content is an iframe Google cannot read, and
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
  return (
    <Section>
      <Container>
        <Eyebrow>Appointments</Eyebrow>
        <h1 className="mt-4">Book an appointment</h1>
        <Lede className="mt-5 max-w-2xl">
          Pick a time that suits you. You will get a confirmation by email, and
          a reminder before your appointment.
        </Lede>
        <div className="mt-14">
          {/* Built here, on the server, and handed down: the booker is a
              client component, and importing the catalogue there would ship 40
              descriptions to the browser to read a name and a duration. */}
          <Booker bookables={buildBookables()} />
        </div>
      </Container>
    </Section>
  );
}
