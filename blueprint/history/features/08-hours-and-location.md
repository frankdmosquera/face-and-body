# Feature: Hours and location

**From build-plan:** feature 8
**Status:** verified
**Branch:** `feature/hours-and-location`

## Goal

A `/hours` page: the seven days as written, whether she is open right now,
where the clinic is, how to get there, where to park, and one tap to call or
text. The header and footer have linked to `/hours` since the header was built
and it has 404ed ever since; this is one of the two remaining dead links.

The overview names her wrong Google Business Profile hours as one of the two
compounding failures this site exists to fix. This page is the correction: her
hours differ every day and total about 24 a week, so they render as seven
explicit rows and are never collapsed into ranges.

## Design reference

`prototypes/contact.html`, the sections deliberately held back from feature 9:
the open-now pill, the map, directions and parking. Tokens are already in
`globals.css`.

## In scope

- **Route** `app/hours/page.tsx`, static, with metadata naming the clinic,
  Midnapore and Calgary SE.
- **Hero**: breadcrumb (Home / Visit), eyebrow, `h1`, short lede, and the
  existing `room` photo slot.
- **Seven-day hours**, reusing `HoursTable` with a `data-day` added per row so
  today can be marked.
- **Open-now badge**, computed in the clinic's timezone, not the visitor's.
  `siteConfig.timezone` is `America/Edmonton` and already exists. Four states:
  - open now, naming the closing time
  - closed but opening later today, naming the opening time
  - closed for the rest of today, naming the next open day and time
  - nothing at all before hydration, so a wrong state never flashes
- **Today's row marked**, driven by the same client component setting a
  `data-today` attribute on a wrapper, with CSS matching it against each row's
  `data-day`. The pattern the concern filter already uses: no second copy of the
  logic and no hydration mismatch.
- **Address and getting there**: the address block, the landmark line and the
  parking line from the prototype.
- **Map**, an OpenStreetMap embed centred on `siteConfig.geo`. No API key, no
  billing, no Google cookies. See Data / contracts for why not Google.
- **Actions**: Get directions, deep-linking to Google Maps with the
  coordinates and needing no key; Call; Text. All three read `siteConfig`.
- **Consultation band**, the closing section the other inner pages use.

## Out of scope

- Any change to `siteConfig` hours, address or geo. That data is feature 2's;
  this page only renders it.
- The About page (feature 7), the other remaining dead link.
- LocalBusiness and `openingHoursSpecification` schema. Feature 10 owns all
  structured data, and this page is its most important input.
- Changing how the home or contact pages render hours. `HoursTable` gains an
  attribute; nothing about its appearance changes.

## Build loop

`workflow.stepReview` is `feature`, so one review at the end.
`workflow.checkpointCommits` is `disabled`, so no commits during the build.
`/complete` makes the one commit.

## Build steps

- [x] **1. Route, hero, hours and address.** Add `data-day` to `HoursTable`
  rows and build the static page around it.
  *Done when:* `npm run build` lists `/hours` as static; the page renders the
  breadcrumb, `h1`, the `room` photo, all seven rows in `siteConfig` order with
  Sunday showing "Closed", and the address block; and the header and footer
  links that already point at `/hours` return 200.

- [x] **2. Open-now badge and today's row.** One client component.
  *Done when:* the badge reports the right state for the clinic's timezone,
  checked by driving the pure function with four fixed instants and reading the
  result: Monday 17:00 (open, closes 8:00 p.m.), Monday 09:00 (closed, opens
  4:00 p.m.), Monday 21:00 (closed, opens Tuesday 10:00 a.m.) and Sunday
  (closed, opens Monday 4:00 p.m.). Today's row is marked in the table, and the
  server HTML contains no badge text at all.

- [x] **3. Map and actions.** The embed and the three buttons.
  *Done when:* the map renders centred on `siteConfig.geo` and the page issues
  no request to a Google-owned host; Get directions opens Google Maps at those
  coordinates; Call and Text use `siteConfig.phone.tel` and `.sms`.

- [x] **4. Link check and mobile.**
  *Done when:* `/hours` and every other route return 200, `/about` is the only
  internal link still 404ing, and `/hours` has no horizontal overflow at 375px.

- [x] **5. Unplanned: the badge could not use an effect.** The first cut set
  state in a `useEffect` to defer rendering until mount, which the project's
  lint rejects (`react-hooks/set-state-in-effect`). Replaced with
  `useSyncExternalStore` for mount detection: no effect, no state, both
  snapshots stable primitives. The state is then computed during render on the
  client only.
  *Done when:* `npm run lint` is clean and the badge is still absent from the
  server HTML.

- [x] **6. Reworked during review: /visit became /hours, and /contact gave the
  hours back.** Frank pushed on why the page existed at all. The answer was
  that feature 9's spec, which I wrote, put the hours table and address on
  `/contact` even though build-plan item 9 never mentions them. That left
  item 8 holding only a badge, a map and a parking line, which is why the page
  looked pointless. Untangled rather than merged: `/contact` lost the hours
  table and address and now carries a short "her hours change daily" note with
  a link across, so each page has one job again. The route was also renamed
  from `/visit` to `/hours`, because "Visit" is a word that appears nowhere a
  visitor can see, the same mismatch as `/concerns` the day before.
  *Done when:* `/hours` returns 200, `/visit` is gone, the nav points at the
  new URL, `/contact` renders no hours rows, and `/about` is the only dead
  internal link on the site.

- [x] **7. Reworked during review: the contact page's three cards.** Frank
  pointed out that an Email card next to a form is the same channel twice, and
  that three cards to say "phone her" is a lot of page. `Ways.tsx` is deleted.
  The page is now one section: a Text block with her number, a text button and
  a call button on the left, the form on the right. Her email address stays in
  the footer, which is on every page. Also added "Book a free consultation" as
  the first form topic, because every consultation CTA on the site lands here
  and there was no way to actually ask for one.
  *Done when:* no Ways cards render, the page offers text, call and the form,
  the footer still carries the mailto, the topic list leads with the
  consultation, and `/contact` has no overflow at 375px.

## Files / areas

| Path | Change |
|---|---|
| `app/hours/page.tsx` | new (specced as `/visit`, renamed in step 6) |
| `app/contact/page.tsx` | hours removed, cards replaced, step 6 and 7 |
| `components/contact/Ways.tsx` | deleted, step 7 |
| `lib/contact.ts` | consultation topic, step 7 |
| `lib/openNow.ts` | new, the pure state function |
| `components/business/OpenNow.tsx` | new, client, badge plus `data-today` |
| `components/business/HoursTable.tsx` | add `data-day` per row |
| `components/business/Directions.tsx` | new, server, map and the three actions |

## Data / contracts

- **URL is `/hours`.** The overview and the nav said `/visit`, and that was
  wrong: nothing a visitor sees anywhere on the site says "Visit". The menu
  says "Hours and location" and so does the heading. Renamed during the build,
  and the nav updated with it. See step 6.
- **Open-now is computed in `siteConfig.timezone`**, never the visitor's. Read
  the clinic's current weekday and time with `Intl.DateTimeFormat` and a
  `timeZone`. A visitor in Toronto or Vancouver must see the same answer.
- **The badge renders only after mount.** The page is static, so the server has
  no meaningful "now"; rendering one would bake a wrong answer into the HTML and
  mismatch on hydration. Before mount the badge is absent, not a placeholder.
- **The state function is pure and takes the instant as an argument**, so it can
  be driven at fixed times rather than waited on.
- **Hours are read, never reformatted here.** `formatHours` and `dayLabel` in
  `lib/hours.ts` already own the display strings.
- **Closed days** are `{ day, closed: true }` with no times. Every calculation
  must handle a closed day and must wrap from Sunday round to Monday when
  looking for the next opening.
- **Why OpenStreetMap and not Google.** A Google embed needs a key in the page
  source. The project's `GOOGLE_MAPS_API_KEY` is server-only and feature 14 will
  spend it on billable Places calls; publishing that same key in HTML is not
  acceptable, and a second referrer-restricted key is a setup task nobody has
  done. OSM needs no key and adds no third-party cookies to a site with no
  consent banner, and the directions button hands people to Google Maps anyway,
  which is where navigation actually happens. Swappable later if she wants the
  Google look.

## Testing

No test command is declared in `AGENTS.md`, so this feature adds no unit tests
and installs no runner. The open-now logic is exactly what the standards say to
test, and it is the one thing here that can be wrong in a way a screenshot will
not reveal, so it lives in `lib/openNow.ts` as a pure function taking an
injected instant. Step 2 drives it at four fixed instants. If `/tests` is ever
run, this is the first thing to cover.

## Notes for the AI

- Server components except `OpenNow`, which needs the clock and an effect.
- Reuse `Section`, `Container`, `Eyebrow`, `Lede`, `Photo`, `Divider` and
  `HoursTable`. No new layout primitives, no new dependencies, no new images.
- Do not fold the open-now logic into `HoursTable`. The home and contact pages
  render that table and neither should gain a live badge.
- The map is an `iframe` with `loading="lazy"` and a `title`.

## Open questions

Neither blocks the build. Both block the launch, and belong in feature 13.

- **The hours are not confirmed.** `data/siteConfig.ts` records them from her
  Instagram post of 22 July 2026, with a comment that Google disagrees on six
  days and is known wrong, awaiting her confirmation. An open-now badge built on
  unconfirmed hours is worse than no badge: it will tell someone she is open
  when she is not. This page must not go live until she confirms them.
- **The directions and parking copy is unverified.** The prototype marks it
  "confirm directions": off Macleod Trail at Midlake Boulevard, next to the
  Midnapore lake, free parking right outside the door. Plausible, unconfirmed,
  and exactly the kind of detail someone acts on while driving.

## Implementation walkthrough

**The logic first** (`lib/openNow.ts`) - written before anything rendered,
because it is the one part that can be silently wrong. `getOpenState` takes the
instant as an argument rather than calling `Date.now()` itself, so it can be
driven at fixed times. It reads the clinic's weekday and minute through
`Intl.DateTimeFormat` with `siteConfig.timezone`, never the visitor's clock: the
same instant checked from Toronto returns the same answer. Four states, and the
search for the next opening wraps Sunday round to Monday. A final fallback
covers every-day-closed, which cannot happen today but must not invent an
opening if it ever does.

Driven at six instants before a line of UI existed: Monday 17:00 open until
8:00 p.m., Monday 09:00 closed until 4:00, Monday 21:00 closed until Tuesday,
Sunday closed until Monday, and the Saturday boundary at 11:29 open and 11:30
closed.

**The badge** (`components/business/OpenNow.tsx`) - the first cut deferred
rendering with `useState` in a `useEffect`, which this project's lint rejects.
Replaced with `useSyncExternalStore` for mount detection: no effect, no state,
both snapshots stable primitives, and the state computed during render on the
client only. The badge is absent from the server HTML, so no wrong answer is
ever baked into a static page.

**Today's row** - the same trick the concern filter uses. `HoursTable` rows
carry `data-day`, the client component sets `data-today` on a wrapper, and one
generated rule per day does the matching, because CSS cannot compare two
attribute values.

**The map** (`components/business/Directions.tsx`) - OpenStreetMap, not Google.
A Google embed needs a key in the page source, and `GOOGLE_MAPS_API_KEY` is
server-only and will be spending money on Places calls in feature 14. OSM needs
no key and sets no third-party cookies on a site with no consent banner. The
directions button still hands off to Google Maps with the coordinates, which is
where navigation actually happens. Confirmed zero requests to any Google host.

**Then the page stopped making sense, and Frank said so.** He asked what `/visit`
was for when `/contact` existed. The answer was that feature 9's spec, which I
wrote, put the hours table and address on the contact page even though
build-plan item 9 never mentions them. That left item 8 holding a badge, a map
and a parking line, which is why the page read as redundant. The plan was right;
I had blurred two pages together.

Untangled rather than merged. `/contact` gave the hours and address back and now
carries a short "her hours change daily" note with a link across. Each page has
one job: contact is get in touch, hours is where and when. Kept separate because
the menu already lists them as two things, and because the hours page is the one
that gets `openingHoursSpecification` in feature 10, which matters here more than
usual given her Google Business Profile publishes wrong hours.

**The route was also wrong.** `/visit` came from the overview, but nothing a
visitor sees anywhere says "Visit" - the menu and the heading both say "Hours
and location". Renamed to `/hours`, which is also closer to what people type.
The same mismatch as `/concerns` the day before.

**The contact page's three cards** - Frank pointed out that an Email card beside
a form is the same channel twice, and that three cards to say "phone her" is a
lot of page. `Ways.tsx` deleted. One section now: her number, a text button and
a call button on the left, the form on the right. Her email stays in the footer,
which is on every page. `lib/contact.ts` also gained "Book a free consultation"
as the first topic, because every consultation CTA on the site lands on this
form and there was no way to actually ask for one.

**The About links** were removed from the nav and footer, and the "More"
dropdown trigger repointed at `/hours`. Feature 7 restores them when the page
exists.

**Verified** - `npx tsc --noEmit`, `npm run lint`, `npm run build` clean, 19
routes. Crawled every internal link on twelve pages: 193 links, zero dead, the
first time that has been true. No overflow at 375px on `/contact` or `/hours`.

**Not verified visually.** The browser pane's screenshot tool failed repeatedly
with "the page did not finish rendering in time. Claude's window may be behind
another window", so the rendered map and the reworked contact layout were
confirmed structurally and in the DOM, not with eyes on pixels.
