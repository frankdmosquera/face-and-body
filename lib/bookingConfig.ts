import { servicesData } from "@/data/servicesData";

/**
 * The booking provider, in one file.
 *
 * `project-overview.md` locks the seam: no provider identifier, import or call
 * appears outside the booking component. This module and
 * `components/booking/BookingHost.tsx` are that boundary. Everything else -
 * the page, the buttons, the catalogue - talks in services and slugs and does
 * not know who takes the booking.
 *
 * That seam is not decoration, and it has now paid for itself once: Cal.com
 * was the provider until Booking CRM, the clinic's own booking system, landed
 * (feature 11, 2026-10-26), and the swap changed this file and that component.
 */

/**
 * The business in Booking CRM, as its API knows it.
 *
 * A CONSTANT, NOT AN ENV VAR, for the same reason `IMAGEKIT_FOLDER` is one:
 * this is a fact about the project rather than about a deployment. Her
 * business name made it, and it is the same handle her Cal.com account had.
 */
export const BOOKING_SLUG = "face-and-body-wellness-centre";

/**
 * Where Booking CRM's API answers.
 *
 * The live address is the constant, and the env var only ever points the
 * laptop at a local API. That order is the lesson this file used to carry:
 * the Cal.com username shipped as an env var first, `.env.local` is not
 * deployed, Vercel had nothing, and the live site quietly sent every Book
 * button to /contact. A missing variable here still books live.
 */
export const BOOKING_API_URL =
  process.env.NEXT_PUBLIC_BOOKING_API_URL || "https://api.booking-crm.com";

/**
 * What the booker needs about one treatment, and nothing else.
 *
 * Built on the server and handed to the client as a prop, the same way
 * `buildPrefills` feeds the contact form. `/book` is a client page - it reads
 * the treatment off the query string - and importing the catalogue there would
 * ship 40 descriptions to the browser to render a name and a duration.
 */
export type BookableType = {
  slug: string;
  name: string;
  durationMin: number;
  /** The slug of the service's booking link in Booking CRM; `BookingHost` turns it into the link's id. */
  bookingId: string;
};

/**
 * `bookingId` is the opaque handle the catalogue reserves for whoever takes
 * the booking. Booking CRM makes each link's slug from the treatment's name,
 * which is the site's own slug for all but the two Relaxation Massage lengths,
 * so the data carries only those exceptions. `scripts/checkBookingLinks.mjs`
 * proves every bookable treatment has its link.
 */
export function buildBookables(): Record<string, BookableType> {
  return Object.fromEntries(
    servicesData.map((service) => [
      service.slug,
      {
        slug: service.slug,
        name: service.name,
        durationMin: service.durationMin,
        bookingId: service.bookingId ?? service.slug,
      },
    ]),
  );
}

/**
 * Where a Book control points.
 *
 * The href is what the window is layered on top of: `BookingHost` cancels a
 * plain click and opens the window, and this is where the visitor goes when it
 * cannot - no JavaScript yet, a middle click, or copy link address. `/book`
 * then opens the window itself.
 *
 * Enquiry is not booking and does not come through here. A treatment priced at
 * consultation cannot be booked by picking a time, so `ServiceCard` keeps
 * those on `/contact` deliberately rather than calling this.
 */
export function bookingHref(treatmentSlug?: string): string {
  return treatmentSlug ? `/book?treatment=${treatmentSlug}` : "/book";
}

/**
 * The attribute that turns a Book control into a window trigger.
 *
 * Spread onto the anchor, never used instead of its `href`. `BookingHost`
 * watches for clicks on `data-booking` and opens the window on that service;
 * an empty value opens it on her whole list. The anchor stays a working link
 * for everything a link does.
 */
export function bookingTrigger(treatmentSlug?: string): Record<string, string> {
  const bookingId = treatmentSlug
    ? (buildBookables()[treatmentSlug]?.bookingId ?? "")
    : "";
  return { "data-booking": bookingId };
}
