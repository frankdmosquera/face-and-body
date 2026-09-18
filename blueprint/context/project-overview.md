# Face and Body Wellness Centre - Project Overview

<!-- blueprint:source-hash 5eb285d58a58e92b8e1618e7dcc8ed79a3ef3da96493206da88937ab27392eb5 -->

> A first website for a licensed medical aesthetics clinic in Midnapore,
> Calgary SE, turning high-intent local searches into booked appointments.

## Problem

The clinic has run since 2023 with no website. Its whole web presence is a bare
Square booking menu: 45 services in one flat list, no photographs, no
explanation. Someone searching "microneedling Calgary" has nowhere to land, and
her $290 and $350 treatments are line items in a dropdown.

Two compounding failures: her Google Business Profile publishes wrong hours on
six of seven days, including telling people she is closed on Monday when she is
open and taking bookings. And nothing anywhere states why her, despite being an
authorised Eminence Organics stockist with 5.0 across every public review.

The site turns searches into bookings, and becomes the one place her own facts
are published correctly so the directory listings can be pointed at it.

## Users

- **Primary: a woman in SE Calgary, roughly 30-55, with a specific skin
  concern.** Acne scarring, pigmentation, fine lines, texture. Comparison-shops
  two or three clinics on her phone, at night. Needs to know what the treatment
  does, what it costs, whether it hurts, and how many sessions before it works.
  She will not phone to ask.
- **Secondary: the local regular.** A facial or massage every four to six
  weeks. Needs the shortest path from landing to booked, and correct hours.
- **Tertiary: the gift buyer.** Does not know what any of the treatments are.

No accounts, no tiers. Every visitor is anonymous.

Not targeting downtown, out-of-city, or price-only shoppers.

## Features

Phase 1 in build order. Headline feature is **11, booking integration** - the
whole site exists to produce bookings.

1. **Design foundation** - port `prototypes/theme.css` into `globals.css`
   `@theme`, fonts, orchid motif, nav/footer shell.
2. **Business facts and services data** - one typed module for hours, address,
   socials and the 45 services. Everything downstream reads it.
3. **Home page** - hero, trust strip, browse by concern, categories, signature
   treatment, results, Eminence, reviews, consultation, hours, location.
4. **Treatment category pages** - five categories, grouped, with concern
   filtering.
5. **Treatment detail pages** - one template for every service, deep for the
   high-value ones.
6. **Browse by concern** - landing pages per concern for visitors who know the
   problem and not the treatment name.
7. **About page** - her story, credentials, the room, Eminence partnership.
8. **Hours and location** - seven-day hours with open-now state, map,
   directions, parking, click-to-call and text.
9. **Contact and enquiry** - text-first, Resend form as fallback, and the
   ask-about-pricing path for treatments with no published price.
10. **Local SEO foundations** - LocalBusiness and Service schema, metadata,
    Open Graph, sitemap, robots.
11. **Booking integration** - one booking component with a service-shaped
    interface, Cal.com behind it, plus the script generating event types.

**Phase 1b:** 12 before/after gallery, 13 deployment readiness, 14 maintainable
reviews, 15 gift cards and series.

**Phase 2 (AI, after launch):** 16 after-hours enquiry assistant, 17 booking
handoff, 18 enquiry triage.

## Data model

**No database.** Nothing about a visitor is persisted. These are typed
constants in the repo, built in feature 2 and read by everything after.

### Service

- `slug` (string) - URL segment, unique
- `name` (string) - display name
- `category` (enum) - `facial` | `skin` | `body` | `massage` | `laser`
- `price` (number | null) - CAD; `null` means priced at consultation
- `priceFrom` (boolean) - true renders "from $X"
- `durationMin` (number) - minutes, drives the Cal.com event type
- `description` (string) - rewritten, awaiting her sign-off
- `concerns` (Concern[]) - what it treats
- `bookingId` (string | null) - opaque handle for the booking provider
- `featured` (boolean) - surfaces on home and category pages

> **Locked.** Features 3-11 and Phase 2 all read this shape. `durationMin` and
> `price` carry real consequences: duration blocks her calendar, and three
> services legitimately have `price: null`.

> **`bookingId` is deliberately provider-agnostic.** No Cal.com identifier,
> import or call appears outside the booking component.

### Concern

- `slug` (string) - e.g. `acne`, `pigmentation`, `fine-lines`
- `label` (string) - display name
- `description` (string) - intro copy for its landing page
- many-to-many with Service

### BusinessFacts

Single constant. One source for footer, contact, hours, map and schema, so they
can never disagree.

- `name`, `phone`, `email`, `instagram`, `facebook` (string)
- `address` - `{ unit, street, city, province, postalCode }`
- `geo` - `{ lat: 50.9095038, lng: -114.0637929 }`
- `hours` - seven entries of `{ day, open, close } | { day, closed: true }`

> **Locked.** Her hours differ every day and total ~24 hours a week. They must
> render as seven explicit rows, never collapsed into ranges.

### Review

- `quote` (string), `source` (enum) `google` | `facebook` | `instagram`,
  `treatment` (string | null)

Hand-entered. Not fetched.

## Tech stack

- **Next.js 16 / React 19** - static and server-rendered pages, one deploy unit
- **TypeScript** - the services and business data are typed constants
- **Tailwind v4 + shadcn** - styling, theme tokens from the prototype
- **@imagekit/next** - image delivery
- **Resend** - contact form fallback only; text needs no service, just `sms:`
- **Cal.com** (`@calcom/embed-react`) - booking, behind a swappable component
- **No database, no auth, no backend**

> Drizzle, Postgres and better-auth ship in `package.json` from the scaffold and
> are unused. Remove them rather than implying a backend that does not exist.

## Monetization

Not in v1. The site earns nothing directly; success is booked appointments.

Commercially an agency client project: one build, maintenance agreed
separately. See Open questions.

## UI/UX

**Warm editorial with clinic credibility.** Results and expertise lead; warm
styling keeps it from reading cold. The look is locked in `prototypes/`.

- Palette sampled from her real logo: copper `#c0704f`, deep copper `#a05030`,
  rose gold `#f0b090`, cream `#f7f2ea`, near-black ink. `#96492a` for small
  copper text, because the base copper fails contrast under 18px.
- Cormorant Garamond headlines, Inter for body, prices and UI.
- The orchid from her logo as hero watermark and section divider.
- Motion in CSS only. No animation library.
- Photography carries roughly 60% of each page.
- **Mobile matters more than desktop.** The primary user is on a phone at
  night.

Routes:

- `/` - home
- `/treatments/[category]` - five category pages
- `/treatments/[category]/[slug]` - treatment detail
- `/concerns/[slug]` - browse by concern
- `/about` - her story, credentials, the room
- `/contact` - text-first contact and enquiry
- `/visit` - hours, map, directions (may fold into `/contact`)

## Deployment

- **Host:** Vercel
- **App type:** Next.js, static and server-rendered, single deploy unit
- **Build:** `npm run build` · **Start:** `npm run start`
- **Env vars:** `RESEND_API_KEY` (feature 9 only). Cal.com needs a public slug,
  not a secret.
- **No** database, storage, workers, cron or health check path
- **Domain:** not owned. See Open questions.

## Open questions

> **Domain.** She owns none that could be found. Something like
> `faceandbodywellness.ca` needs registering, and the Square site and Google
> profile then pointed at it.

> **Is the primary user right?** Assumed, not learned. It drives what leads on
> every page, how deep treatment pages go, and how hard mobile is pushed.
> Highest-leverage thing to confirm with the owner.

> **Commercial arrangement** between Frank and the owner is unverified.

> **Phase 2 has no project-plan backing.** `build-plan.md` carries features
> 16-18 and their constraints; `project-plan.md` does not mention AI at all.
> Add a section there before Phase 2 starts, or the overview will keep
> under-representing it.

> **Seven launch blockers are not code** and are tracked in `project-plan.md`
> section 8: photography (the big one), missing prices for laser / IPL /
> fractional microneedling, the logo file, confirming hours, the postal code
> conflict (T2X 1M2 vs T2X 1P1), copy sign-off, and Alberta advertising claims.

> **Fingerprint and line endings.** `core.autocrlf=true` with no
> `.gitattributes`. The plans are LF on disk and the hash above is their LF
> form, but git writes CRLF on a fresh checkout, so `/status` will report
> phantom plan drift after any clone. A `.gitattributes` pinning `*.md` to LF
> fixes it at the root. This exact bug is already recorded in the workspace
> CLAUDE.md.
