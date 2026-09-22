/**
 * Creates one Cal.com event type per bookable treatment.
 *
 *   CALCOM_API_KEY=... node scripts/createCalcomEventTypes.mjs            # dry run
 *   CALCOM_API_KEY=... node scripts/createCalcomEventTypes.mjs --apply
 *
 * Feature 11 calls for "the script that generates event types from the
 * services data" rather than 37 of them typed in by hand, and this is it. The
 * catalogue is the source: the treatment's name is the title, its slug is the
 * event slug, and `durationMin` is the length - which is the whole reason the
 * booking is per treatment instead of one generic appointment. A Mini Facial
 * blocks 30 minutes of her day and a Hollywood Peel blocks 105.
 *
 * THE KEY IS NEVER WRITTEN DOWN. It is read from the environment for the life
 * of one command and nothing here persists it. It does not belong in
 * `.env.local` either: nothing the site renders reads it, and Turbopack
 * snapshots that file into `.next/cache`, which is exactly how a secret ends
 * up in a 100MB folder that travels with any copy of the repo.
 *
 * Safe to re-run. It reads the account's existing event types first and skips
 * every slug already there, so a second run after adding a treatment creates
 * only the new one. It never edits or deletes what it finds - a length changed
 * by hand in Cal stays changed, because she may have a reason this file does
 * not know about.
 *
 * Treatments priced at consultation are skipped on purpose. There is no time
 * to pick when nobody knows how long it takes yet; those three carry an
 * Enquire button to the contact form instead, and `ServiceCard` makes the same
 * split for the same reason.
 */

import { servicesData } from "../data/servicesData.ts";
import { siteConfig } from "../data/siteConfig.ts";

const API = "https://api.cal.com/v2";
const API_VERSION = "2024-06-14";

const KEY = process.env.CALCOM_API_KEY;
if (!KEY) {
  console.error("CALCOM_API_KEY is not set.");
  process.exit(1);
}

const APPLY = process.argv.includes("--apply");

/** In person, at the clinic. Built from the one set of business facts rather
 *  than typed again, so it cannot drift from the footer or the schema. */
const { unit, street, city, province, postalCode } = siteConfig.address;
const LOCATION = [
  {
    type: "address",
    address: `${unit}, ${street}, ${city}, ${province} ${postalCode}`,
    public: true,
  },
];

async function call(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "cal-api-version": API_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `${options.method ?? "GET"} ${path} -> ${response.status} ${JSON.stringify(body).slice(0, 300)}`,
    );
  }
  return body;
}

const existing = await call("/event-types");
const taken = new Set(existing.data.map((event) => event.slug));

const bookable = servicesData.filter((service) => service.price !== null);
const skipped = servicesData.filter((service) => service.price === null);
const todo = bookable.filter((service) => !taken.has(service.slug));

console.log(`account has ${taken.size} event types`);
console.log(`catalogue has ${servicesData.length} treatments`);
console.log(`  ${skipped.length} priced at consultation, not bookable`);
console.log(`  ${bookable.length} bookable`);
console.log(`  ${bookable.length - todo.length} already present`);
console.log(`  ${todo.length} to create\n`);

for (const service of todo) {
  console.log(
    `  ${String(service.durationMin).padStart(3)} min  ${service.slug}`,
  );
}

if (!APPLY) {
  console.log("\ndry run. re-run with --apply to create them.");
  process.exit(0);
}

console.log("");
let made = 0;
const failures = [];

for (const service of todo) {
  try {
    await call("/event-types", {
      method: "POST",
      body: JSON.stringify({
        title: service.name,
        slug: service.slug,
        lengthInMinutes: service.durationMin,
        description: service.description,
        locations: LOCATION,
        /* Nobody books a facial for someone else to also attend. */
        disableGuests: true,
      }),
    });
    made += 1;
    console.log(`  created  ${service.slug}`);
  } catch (error) {
    failures.push({ slug: service.slug, error: String(error) });
    console.log(`  FAILED   ${service.slug}`);
  }
}

console.log(`\ncreated ${made}, failed ${failures.length}`);
for (const failure of failures) console.log(`  ${failure.slug}: ${failure.error}`);
