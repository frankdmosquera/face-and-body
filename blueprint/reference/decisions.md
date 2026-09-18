# Decisions

Choices already made, with the reason. These move into `project-plan.md` when
it gets written. Recorded here so they are not re-argued after a context clear.

## Booking: Cal.com, embedded. Not Square, not Calendly

**Decided 2026-09-17.**

Booking is embedded in our own pages, one event type per service, styled with
the theme tokens. No handoff to a third-party screen.

**Why not Square.** It works and she already uses it, but its booking flow is a
JavaScript app with no per-service URLs, checked on 2026-09-17 on both
`book.squareup.com` and her `square.site`. Every visitor lands in the same flat
45-item list no matter which service page they came from, and the look cannot
be matched to the site. That is the thing Frank objected to, and it is real.

**Why not Calendly.** Same embed idea but worse terms: unlimited event types
and payments both sit behind paid tiers, and the embed is an iframe with
limited styling.

**Why Cal.com.** Open source, `@calcom/embed-react` is a real React component
rather than an iframe, and `cssVarsPerTheme` takes our own tokens so the booker
matches the page. Per event type on the free tier. Stripe for deposits when
she wants them.

**Known risk.** `--cal-brand-color` is reported not to apply through
`cssVarsPerTheme` in the React inline embed, falling back to black
(calcom/cal.com issue 16732). Spike this before committing to it.

**The clinical-records question is closed.** Microneedling and IPL need
contraindication screening and consent, and Cal.com does not store consent
forms, treatment notes or client photos. Frank confirmed she handles all of
that in person at the clinic, so the booking layer only has to take bookings.
Revisit only if she later wants records online.

**The UI never names the provider either.** Buttons say "Book now", not "Book
on Square" or "Book on Cal.com". A label naming the provider becomes a lie the
day it is swapped, and it leaks the implementation into copy for no gain.

**This does not block the build.** The Book control is one component and one
destination. Pages get built first; the booking layer drops in at the end.
Deliberately sequenced so she is not migrating booking systems in the same
month the site launches.

## Parked

Set aside deliberately, not dropped. Bring these back when the trigger is met.

- **Frank's own booking module, as an agency product.** He wants a reusable
  booker he can drop into every clinic and salon site the agency sells. Real
  goal, wrong project: building it inside his sister's site would delay her
  launch and hide the asset in one client's repo. Parked 2026-09-17, to be
  picked up as its own project after this site ships. The middle path if it
  revives: self-host Cal.com and build a custom front end against its API, so
  the calendar maths is borrowed and the experience is his.
- **Records online.** Consent forms, treatment notes and before/after photos
  per client. She does all of it in person today. Revisit only if she asks.
