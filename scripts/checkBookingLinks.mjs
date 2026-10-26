/**
 * Proves every bookable treatment on the site has its booking link in
 * Booking CRM.
 *
 *   node scripts/checkBookingLinks.mjs                                 # the live API
 *   node scripts/checkBookingLinks.mjs --api http://localhost:3401     # the laptop's
 *
 * The site's Book buttons open the booking window by `bookingId ?? slug`, and
 * Booking CRM makes each link's slug from the service's name. Nothing ties the
 * two but this check: a treatment added or renamed on either side shows up
 * here before a visitor finds a Book button that opens on nothing.
 *
 * Treatments priced at consultation are skipped on purpose, as `ServiceCard`
 * and `bookingConfig.ts` skip them: there is no length to book until she has
 * seen the client, so they carry an Enquire button to /contact instead.
 *
 * Exits 1 when a bookable treatment has no link. A link with no treatment on
 * the site is printed but passes: she may offer something in her CRM that the
 * site does not list.
 */
import { servicesData } from "../data/servicesData.ts";

/* The business in Booking CRM; the same constant as BOOKING_SLUG in
   lib/bookingConfig.ts, which imports through "@/" and cannot load here. */
const BUSINESS = "face-and-body-wellness-centre";

const apiAt = process.argv.indexOf("--api");
if (apiAt > -1 && !process.argv[apiAt + 1]) {
  console.error("--api needs an address, e.g. --api http://localhost:3401");
  process.exit(1);
}
const api = (
  apiAt > -1 ? process.argv[apiAt + 1] : "https://api.booking-crm.com"
).replace(/\/+$/, "");

const response = await fetch(`${api}/public/${BUSINESS}/booking-links`);
if (!response.ok) {
  console.error(`${api} answered ${response.status} for ${BUSINESS}.`);
  process.exit(1);
}
const { bookingLinks } = await response.json();
const links = new Set(bookingLinks.map((link) => link.slug));

const bookable = servicesData.filter((service) => service.price !== null);
const wanted = new Set(
  bookable.map((service) => service.bookingId ?? service.slug),
);
const missing = bookable.filter(
  (service) => !links.has(service.bookingId ?? service.slug),
);
const extra = [...links].filter((slug) => !wanted.has(slug));

console.log(
  `${api}: ${links.size} booking links, ${bookable.length} bookable treatments on the site.`,
);
for (const service of missing)
  console.log(
    `  no link for ${service.name} (${service.bookingId ?? service.slug})`,
  );
for (const slug of extra)
  console.log(`  a link the site does not list: ${slug}`);
if (missing.length > 0) process.exit(1);
console.log("Every bookable treatment has its link.");
