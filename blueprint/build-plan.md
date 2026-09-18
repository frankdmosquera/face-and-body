# Build Plan

> Drafted 2026-09-17 alongside `project-plan.md`. Frank owns this file.
> Rough order, adjust freely before running `/overview`.

Ordered so the site is useful as early as possible. Content and layout first,
booking last, because booking is one component and the least certain decision.
Features 1 to 4 give a site that could go live; everything after deepens it.

## Phase 1 - the site that books appointments

Everything needed for her to have a working, findable website. No AI.

- [ ] 1. **Design foundation** - port `prototypes/theme.css` into `globals.css`
  `@theme`, add the fonts, the orchid motif, and the shared layout shell of
  nav, footer and section primitives
- [ ] 2. **Business facts and services data** - one typed module for address,
  phone, hours and socials, and the 45 services with price, duration,
  category and concerns, so nothing is hard-coded twice
- [ ] 3. **Home page** - hero, trust strip, browse by concern, treatment
  categories, signature treatment, results, Eminence, reviews, consultation,
  hours and location
- [ ] 4. **Treatment category pages** - Facials, Skin Treatments, Body,
  Massage, Laser and IPL, grouped within each page with concern filtering
- [ ] 5. **Treatment detail pages** - one template covering every service,
  deep for the high-value ones: what it is, who it suits, what happens,
  pricing, FAQ, related treatments
- [ ] 6. **Browse by concern** - landing pages per concern that route to the
  treatments that address it, for the visitor who knows the problem and not
  the treatment name
- [ ] 7. **About page** - her story, credentials, the room, how she works,
  Eminence partnership
- [ ] 8. **Hours and location** - seven-day hours with an open-now state, map,
  directions, parking, click-to-call and text
- [ ] 9. **Contact and enquiry** - text-first contact page, click-to-text with
  a prefilled message, short form via Resend as the fallback, and an ask-about-
  pricing path on the treatments that have no price yet
- [ ] 10. **Local SEO foundations** - LocalBusiness and Service schema,
  per-page metadata, Open Graph, sitemap, robots, one canonical set of
  business facts feeding all of it
- [ ] 11. **Booking integration** - one booking component with a
  service-shaped interface, Cal.com behind it as the first provider, themed to
  match, plus the script that generates event types from the services data

## Phase 1b - after launch

- [ ] 12. **Before and after gallery** - filterable by treatment and concern,
  built to grow as she photographs more
- [ ] 13. **Deployment readiness** - Vercel config, production build check,
  domain, and a smoke-test path
- [ ] 14. **Reviews** - a maintainable way to add reviews as they accumulate,
  rather than three hand-typed quotes
- [ ] 15. **Gift cards and series** - present the packages and link to Square
  for purchase

## Phase 2 - AI automation

Deliberately after launch, not alongside it. Phase 1 has to work on its own
first, because an assistant layered on a site that cannot book appointments
just fails faster.

Tech choice is open. Frank is tracking current releases and will pick; nothing
below assumes a specific model or product.

- [ ] 16. **After-hours enquiry assistant** - the natural extension of feature
  9, answering the questions the contact page collects, at the times she
  cannot: which treatment suits which concern, what a service costs, what
  happens in a session, where the clinic is
- [ ] 17. **Booking handoff** - the assistant hands a qualified enquiry
  straight into the booking component rather than ending in a dead end
- [ ] 18. **Enquiry triage for her** - summarise what came in overnight so she
  opens one list instead of a week of unread texts

### Why AI belongs here specifically

She is open around 24 hours a week across seven different windows, and she is
treating a client through most of them. That is the actual constraint on this
business, and it is the same constraint feature 9 works around with text. An
assistant that answers well at 10pm on a Tuesday is not a gimmick here; it is
the shift with the most unanswered demand.

The services data built in feature 2 is already the knowledge base: 45
treatments with prices, durations, concerns and descriptions. Phase 2 grounds
on that rather than inventing a second source of truth.

### The one real risk

**It must not give medical advice.** Contraindication questions arrive
constantly in this category: pregnancy, isotretinoin, keloid history, active
infection, medication interactions. An assistant answering those wrongly is a
liability, not a support ticket. Scope it to treatments, prices, timing and
booking, and hand anything clinical to her with a booked consultation.

## Notes on ordering

- **Contact exists because she is closed most of the week.** Around 24 hours
  across seven different windows, so a visitor browsing at night cannot call.
  Booking covers "I know what I want"; contact covers "I have a question",
  which is currently a dead end. Text leads because that is how she already
  works and her Square page already invites it.


- **Feature 2 before 3** deliberately. Every page reads the same services and
  business facts, and her hours and postal code are already contradictory
  across five sources. One module means one place to correct them.
- **Booking last (feature 11)** because the booking decision is the least settled and
  the most likely to change. Everything before it works with a plain link.
- **Feature 11 is written to be replaced.** Frank intends to build his own
  booker as an agency product later. Keeping the provider behind one component
  means this site becomes its first customer rather than an obstacle.
- **Photography is not a feature.** It blocks quality, not code. Pages get
  built against the Instagram photos and stand-ins, and real images drop in
  without touching layout.
