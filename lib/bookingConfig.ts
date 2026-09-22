import { servicesData } from "@/data/servicesData";

/**
 * The booking provider, in one file.
 *
 * `project-overview.md` locks this: "No Cal.com identifier, import or call
 * appears outside the booking component." This module and
 * `components/booking/BookingEmbed.tsx` are that boundary. Everything else -
 * the page, the buttons, the catalogue - talks in services and slugs and does
 * not know who takes the booking.
 *
 * That seam is not decoration. Frank is building the clinic's own booking
 * system, and Cal.com is what the site uses until it lands. When it does, this
 * file and that component are what change.
 */

/**
 * The account the booker belongs to, as it appears in `cal.com/<username>`.
 *
 * A CONSTANT, NOT AN ENV VAR, for the same reason `IMAGEKIT_FOLDER` is one:
 * this is a fact about the project rather than about a deployment, and hiding
 * a fact in an env var is what lets local and production drift apart.
 *
 * It shipped as `NEXT_PUBLIC_CALCOM_USERNAME` first and did exactly that
 * within the hour - booking worked locally and the live site quietly sent
 * every Book button to /contact, because `.env.local` is not deployed and
 * Vercel had nothing. Twenty minutes went into a bug that `imagekitConfig.ts`
 * already had a paragraph warning about.
 *
 * The reasoning for the env var was that the account moves. It does not: the
 * account is handed over by changing the email on it, which keeps the same
 * account and the same username. There was never a deployment for this to vary
 * across.
 *
 * Public by design either way - it is in every booking URL, and visible at
 * cal.com/face-and-body-wellness-centre to anyone who looks.
 */
export const CALCOM_USERNAME = "face-and-body-wellness-centre";

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
  /** The event type under the account, ie `cal.com/<username>/<eventSlug>`. */
  eventSlug: string;
};

/**
 * `bookingId` is the opaque handle the catalogue reserves for whoever takes
 * the booking; all 40 are null until the event types exist. Falling back to
 * the service's own slug means the generator can create event types named
 * after the treatments and leave `bookingId` null for every one that matches,
 * so the data only carries the exceptions.
 */
export function buildBookables(): Record<string, BookableType> {
  return Object.fromEntries(
    servicesData.map((service) => [
      service.slug,
      {
        slug: service.slug,
        name: service.name,
        durationMin: service.durationMin,
        eventSlug: service.bookingId ?? service.slug,
      },
    ]),
  );
}

/**
 * The booker shown when nothing is chosen, for the header's Book now and for
 * anyone landing on `/book` bare. An empty string is the account's own page,
 * which lists every event type - so the visitor picks the treatment there
 * rather than meeting an error.
 */
export const BOOKING_INDEX_EVENT = "";

/**
 * Where a Book control points.
 *
 * The href is what the overlay is layered on top of: Cal cancels the click and
 * opens the booker, and this is where the visitor goes when it cannot - no
 * JavaScript, a middle click, or copy link address.
 *
 * Enquiry is not booking and does not come through here. A treatment priced at
 * consultation cannot be booked by picking a time, so `ServiceCard` keeps
 * those on `/contact` deliberately rather than calling this.
 */
export function bookingHref(treatmentSlug?: string): string {
  return treatmentSlug ? `/book?treatment=${treatmentSlug}` : "/book";
}

/**
 * The attributes that turn a Book control into an overlay trigger.
 *
 * Spread onto the anchor, never used instead of its `href`. Cal's script
 * watches for `data-cal-link` and opens the booker in a modal when one is
 * clicked, so the element stays a working link for everything a link does and
 * the overlay is simply what happens when you click it.
 *
 */
export function bookingTrigger(
  treatmentSlug?: string,
): Record<string, string> {
  const eventSlug = treatmentSlug
    ? (buildBookables()[treatmentSlug]?.eventSlug ?? null)
    : null;
  return {
    "data-cal-link": eventSlug
      ? `${CALCOM_USERNAME}/${eventSlug}`
      : CALCOM_USERNAME,
    "data-cal-config": JSON.stringify({ layout: "month_view" }),
  };
}
