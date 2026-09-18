# Project Plan

> Drafted 2026-09-17 from the research in `blueprint/reference/`. Frank owns
> this file; correct anything that is wrong rather than working around it.
> Facts marked **verify** have not been confirmed with the owner.

## 1. Problem - What problem are we solving?

Face and Body Wellness Centre is a licensed medical aesthetics clinic in
Midnapore, Calgary SE, running since 2023. It has no website. Its entire web
presence is a bare Square booking menu: 45 services in one flat list, no
photographs, no explanation, no reason to choose her.

Three concrete consequences:

- **High-intent searches find nothing.** Someone searching "microneedling
  Calgary" or "laser hair removal Calgary SE" has nowhere to land. Her most
  valuable treatments, at $290 and $350, are a line item in a dropdown.
- **Her Google Business Profile is wrong on six of seven days.** It says she
  is closed on Monday when she is open and taking bookings. Bad data is
  already spreading to directory sites that scrape Google.
- **Nothing communicates why her.** She is an authorised Eminence Organics
  stockist with 5.0 across every public review, and neither fact is visible
  anywhere a customer would look.

The site exists to turn searches into bookings, and to become the one place
her own facts are published correctly so the listings can be pointed at it.

**This is not a redesign.** There is nothing to redesign. It is a first
website.

## 2. Users - Who is this for?

**Primary: a woman in southeast Calgary, roughly 30 to 55, with a specific
skin concern.** Acne scarring, pigmentation, fine lines, texture. She is
comparison-shopping two or three local clinics on her phone, at night. She
wants to know what the treatment actually does, what it costs, whether it
hurts, and how many sessions before it works. She will not phone to ask.

**Secondary: the local regular.** Books a facial or massage every four to six
weeks. Already knows the clinic. Needs the fastest possible path from landing
to booked, and needs the hours to be right.

**Tertiary: the gift buyer.** Partner or family, around a birthday or
Christmas, who does not know what any of the treatments are.

Not targeting: downtown Calgary, out-of-city, or anyone shopping purely on
price. She is a neighbourhood clinic and the site should say so early.

## 3. Features - What does the MVP need?

- Home page that establishes what she does, where she is, and why she is
  credible, with booking always one tap away
- Treatment category pages: Facials, Skin Treatments, Body, Massage, Laser
  and IPL
- Individual pages for the high-value treatments, deep enough to answer the
  questions that decide a $290 booking
- Browse-by-concern entry, because most people know the problem and not the
  treatment name
- Correct, seven-day, per-day hours with an open-now state
- About page carrying her credentials, her room, and her own story
- Embedded booking, on our pages, per treatment
- Contact, text-first, with an enquiry path for the treatments that have no
  published price
- Local SEO foundations: schema, metadata, sitemap, one canonical set of
  business facts

Explicitly out of scope for MVP: online product sales, client accounts,
consent forms, treatment records, before-and-after galleries behind login,
gift card commerce (link to Square's), blog, multi-language.

## 4. Data - What are we storing?

**No database.** Nothing about a visitor is stored.

Content is typed data in the repo, not a CMS:

- **Services** - name, slug, category, price or from-price, duration,
  description, concerns treated, Cal.com event type. Source of truth is
  `blueprint/reference/services.md`, 45 services scraped from Square.
- **Business facts** - address, phone, email, hours, socials. One module, so
  the footer, contact page and schema can never disagree.
- **Concerns** - the browse-by-concern taxonomy mapped to services.
- **Reviews** - hand-entered quotes with source. Not fetched.

Bookings live in Cal.com. Payments, if deposits are turned on, live in Stripe
via Cal.com. Neither touches our database, because there isn't one.

## 5. Tech - What stack are we using?

Next.js 16 and React 19, TypeScript, Tailwind v4, shadcn. Already scaffolded.

- **No database, no auth, no backend.** Marketing site; pages are static or
  server-rendered and deploy as one unit.
- **Booking: Cal.com, embedded** via `@calcom/embed-react`, styled with our
  theme tokens through `cssVarsPerTheme`. Not Square, not Calendly. Reasoning
  and the known brand-colour bug are in `blueprint/reference/decisions.md`.
- **Event types generated, not hand-made.** A script reads the services data
  and creates Cal.com event types through API v2, so duration and price per
  treatment stay correct without maintaining 45 things by hand.
- **Booking stays swappable.** Frank's longer-term goal is his own booking
  product for the agency. Cal.com is the tenant for this site, not a
  commitment, so booking goes behind one component with a service-shaped
  interface. No Cal.com call, SDK import or event-type id appears anywhere
  outside it. Pages ask to book a service; they do not know who answers.
  Replacing the provider later is then one file, not a rewrite.
- **Images**: `@imagekit/next`, already installed.
- **Email**: Resend, for the contact form fallback. In MVP. Text is the
  primary channel and needs no service at all, just a `sms:` link.
- Drizzle, Postgres and better-auth are in `package.json` from the scaffold
  and are **not used**. Remove them rather than leaving them to imply a
  backend that does not exist.

## 6. Monetize - How will this make money?

The site does not make money directly. It exists to increase booked
appointments at an independent clinic, and its success measure is bookings,
not traffic.

Commercially this is a client project for the agency: one build, with a
maintenance arrangement to be agreed separately. **verify** with Frank.

## 7. UI/UX - How should this look and feel?

**Warm editorial, clinic credibility.** Positioned as a medical aesthetics
clinic rather than a wellness sanctuary, so results and expertise lead, while
the styling keeps it from feeling cold or corporate.

The look is locked. Mockups are in `prototypes/`, the durable output is
`prototypes/theme.css`, and it ports into `globals.css` `@theme` in the first
UI feature.

- **Palette** sampled from her actual logo: copper `#c0704f`, deep copper
  `#a05030`, rose gold `#f0b090`, cream ground `#f7f2ea`, near-black ink.
  A darker copper `#96492a` exists for small text, because the base copper
  fails contrast below 18px.
- **Type**: Cormorant Garamond headlines, Inter for body, prices and UI.
- **Motif**: the orchid from her logo, as a watermark behind heroes and as
  section dividers. It is the one thing that makes the site unmistakably
  hers.
- **Motion** in CSS only. No animation library.
- **Photography carries the design.** Roughly 60% of every page. See the gap
  in section 8.

Mobile matters more than desktop; the primary user is on a phone at night.

## 8. Deployment - Where and how will this ship?

**Vercel.** Next.js app, `npm run build`, no server, no database, no cron, no
env vars for MVP. Cal.com needs a public username or event-type slugs, not a
secret.

Domain: **verify**. She does not own one that I could find. Something like
`faceandbodywellness.ca` needs registering, and the Square site and Google
profile should then point at it.

### Launch blockers that are not code

1. **Photography.** Her Instagram gave us 13 images, of which roughly seven
   are real photographs and the rest are Canva graphics. There is no wide
   shot of the room, no clean portrait of her, no product shelf, and one
   usable before-and-after. The design assumes better. Half a day with a
   local photographer is the highest-value spend on this project.
2. **The logo file.** We have a 150px Instagram avatar. Ship needs the
   original vector or high-resolution PNG.
3. **Her real hours, confirmed.** Taken from a July 2026 Instagram post.
   **verify** they are still current.
4. **Postal code.** Her post says T2X 1M2; Square, Yelp and the City licence
   say T2X 1P1. One is wrong and it affects maps.
5. **Prices for laser, IPL and fractional microneedling.** All three sit at
   $0.00 on Square. Laser hair removal is among the highest-intent searches
   in this category and currently has no number attached anywhere.
6. **Copy sign-off.** Service descriptions are rewritten from supplier
   marketing, her About story is written in a voice rather than from an
   interview, and the microneedling contraindications are medical claims.
   All need her approval.
7. **Advertising claims.** Detox, fat reduction and cellulite language
   appears throughout her Square copy. Worth checking Alberta rules before
   repeating any of it on a site we control.

### Do first, independent of the website

Her Google Business Profile hours are wrong on six of seven days, including
showing her closed on Monday when she is open. She can fix that today in
Google Business Profile, and it is probably worth more revenue this month
than the launch.
