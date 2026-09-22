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
 * Public by design: it is in every booking URL. It is an env var rather than a
 * constant because the account moves - it is created on Frank's email to build
 * against and handed to the clinic by changing the email on it, and a
 * different account during that swap must not need a deploy to a data file.
 */
export const CALCOM_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME;

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
 * Where a Book control points, and the reason the swap needs no code change.
 *
 * Without an account configured this returns the contact page, which is
 * exactly where every Book control went before `/book` existed. So the page
 * can ship, be reviewed and sit on main without a half-connected calendar
 * reaching a visitor: set `NEXT_PUBLIC_CALCOM_USERNAME` and every Book button
 * on the site moves at once, unset it and they all move back.
 *
 * Enquiry is not booking and does not come through here. A treatment priced at
 * consultation cannot be booked by picking a time, so `ServiceCard` keeps
 * those on `/contact` deliberately rather than calling this.
 */
export function bookingHref(treatmentSlug?: string): string {
  const base = CALCOM_USERNAME ? "/book" : "/contact";
  return treatmentSlug ? `${base}?treatment=${treatmentSlug}` : base;
}

/**
 * The attributes that turn a Book control into an overlay trigger.
 *
 * Spread onto the anchor, never used instead of its `href`. Cal's script
 * watches for `data-cal-link` and opens the booker in a modal when one is
 * clicked, so the element stays a working link for everything a link does and
 * the overlay is simply what happens when you click it.
 *
 * Returns nothing when no account is configured, which is what keeps the site
 * honest before the swap: no attribute, no interception, and the href goes to
 * the contact page exactly as it did before booking existed.
 */
export function bookingTrigger(
  treatmentSlug?: string,
): Record<string, string> {
  if (!CALCOM_USERNAME) return {};
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
