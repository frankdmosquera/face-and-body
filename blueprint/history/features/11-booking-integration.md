# Feature: Booking integration

**From build-plan:** feature 11

**Size:** light - one swap behind the existing seam, planned and reviewed as step 17.2 of
scheduleads-app's feature 17 (Face and Body), where the full spec lives.

**Status:** verified

**Branch:** feature/11-booking-integration

## Goal

Every Book control on the site opens Booking CRM's booking window on its treatment, instead of
Cal.com. The seam this item built (`lib/bookingConfig.ts` and `components/booking/`) is what
changed; the pages, the cards and the catalogue still talk in treatments and slugs.

## In scope

- `@frankdmosquera/booking-component` 0.2.0 in, `@calcom/embed-react` out, `.npmrc` for GitHub
  Packages (no secret; `NODE_AUTH_TOKEN` in the shell and in Vercel).
- `lib/bookingConfig.ts`: `BOOKING_SLUG` and `BOOKING_API_URL` (live unless
  `NEXT_PUBLIC_BOOKING_API_URL` is set on the laptop), `bookingTrigger` marks anchors with
  `data-booking`.
- `components/booking/BookingHost.tsx`: one `BookingProvider` in the root layout; a plain click on
  a Book anchor opens the window on that treatment. The window opens a service by its id in
  Booking CRM, which differs per database, so the site keeps slugs and reads the slug-to-id list
  once on the first click.
- `/book` and `/book?treatment=<slug>` open the window themselves; the footer's Book now goes there.
- The two Relaxation Massage lengths carry their Booking CRM slug as `bookingId`.
- `scripts/checkBookingLinks.mjs` replaces `createCalcomEventTypes.mjs`.
- The standard window look; her own colours and logo come later, for every business.

## Out of scope

- Launching the site (item 13) and its Next.js security update.
- The DesignPicker work in progress, stashed on 2026-10-26 (`git stash list`).

## Build steps

- [x] 1. **Booking CRM behind the seam.** **Done when:** build and lint pass; no Cal.com left in
  code or packages; the check script passes against the local API; on http://localhost:3402 a
  treatment's Book opens on it, Book now opens her list, `/book?treatment=` opens on that
  treatment, and a test booking lands as a lead in Booking CRM and is cancelled.

## Verify

`node scripts/checkBookingLinks.mjs` against the live API once her business is live; then one
real booking from the live site.

## Implementation walkthrough

Built as step 17.2 of scheduleads-app's feature 17 (Face and Body), whose archive
(`scheduleads-app/blueprint/history/features/17-face-and-body.md`) holds the full walkthrough,
the step's independent review and the two final reviews; the findings F-521 to F-524 and F-526
were raised against this branch there and are closed, F-522 after a second fix in `BookLink.tsx`.

- `lib/bookingConfig.ts` and `components/booking/BookingHost.tsx` are the seam now: Booking CRM
  behind it, opening a service by its id, which the site reads by slug once per visit.
- `BookLink` stays a plain server-rendered anchor and passes through what the phone menu's
  `SheetClose` renders, so the menu closes when its Book now opens the window.
- `/book` opens the window after reading the address; the footer's Book now goes there.
- `scripts/checkBookingLinks.mjs` replaces the Cal.com generator: 37 of 37 against the laptop.
- Her Cal.com API key stays in `.env.local` by Frank's choice; revoking it is on the go-live list
  (scheduleads-app item 17b), with her launch (item 13).
