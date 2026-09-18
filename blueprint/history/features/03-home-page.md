# Feature: Home page

**From build-plan:** feature 3
**Branch:** `feature/home-page`
**Status:** verified

## Goal

Replace the interim hero with the real home page: the page that establishes
what she does, where she is and why her, with booking one tap away. Ten
sections from the prototype, every fact read from `siteConfig`, every price,
count and treatment name read from the services data, every photo served
through ImageKit. First real consumer of feature 2 and first page with
photography.

## Design reference

- `prototypes/home.html` - the whole page; lines 195 to 445 are the sections,
  lines 1 to 170 the section CSS. Build the ten sections below; skip the rest
  (see Out of scope)
- `blueprint/reference/ig/` - her real photographs; which file goes in which
  slot is in Data / contracts
- `blueprint/reference/business.md` lines 158 to 182 - what each photo shows
  and which are unusable promo graphics
- Feature 1's primitives (`Section`, `Container`, `Eyebrow`, `Lede`,
  `Divider`, `Watermark`, `Orchid`, `Button`) and its tokens; nothing here
  adds a new colour or font

## In scope

- `components/media/Photo.tsx` - the ImageKit wrapper every image uses from
  now on, plus `data/images.ts`, the slot manifest (path, alt, source)
- `app/page.tsx` rebuilt from ten server-rendered section components under
  `components/home/`: hero, trust strip, browse by concern, categories,
  signature treatment, results, Eminence, reviews, consultation, hours and
  location
- `data/reviews.ts` and `types/reviews.ts` (the overview's `Review` shape),
  filled only with real quotes found during the build; the section has an
  honest empty state
- `data/results.ts` - the one genuine before-and-after she has
- `lib/hours.ts` - `formatHours(day)` for the seven-row table
- `siteConfig` gains `founded`, `ratings` and `consultation` (the facts the
  hero, trust strip and consultation section print)
- `Tag` primitive in `components/layout/Tag.tsx` (the prototype's `.tag`)
- Responsive at 375, 768 and 1280, and both themes

## Out of scope

- Four prototype sections with no build-plan backing: "How it works", "Ways to
  commit" (feature 15, and its offers are unconfirmed), the Instagram grid
  (mostly promo graphics), and the FAQ (its copy names Square). Say if you
  want any of them and they become a plan line
- The "3 sessions to real change" stat badge. A treatment-outcome claim she
  has not approved; the photo stands alone
- The hero video. No footage exists; the slot holds her best action photo and
  takes a video later without layout change
- Map embed, directions and open-now (feature 8). The location section shows
  the address, the seven-row hours, a room photo and call / text buttons
- Category, concern, treatment, about and contact pages (features 4 to 9).
  Every link goes to its planned route and 404s until then
- JSON-LD, per-page metadata, Open Graph (feature 10)
- Booking (feature 11). Every Book control goes to `/contact`
- A reviews admin or feed (feature 14). This feature ships the data file and
  the section

## Build loop

- `workflow.stepReview` is `feature`: build all steps, one review at the end
- `workflow.checkpointCommits` is `disabled`; `/complete` makes the one commit
- Gate per step: `npm run lint` and `npm run build`; browser evidence for the
  visual done-whens on the running dev server (`check` is `when-behavioral`,
  and this page has one click path, the concern and category links)
- Nothing to install. `@imagekit/next` is already a dependency
- **Prerequisite for step 1:** `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` in
  `.env.local` (and later in Vercel) and the assets in Data / contracts
  uploaded to that ImageKit account under `/face-and-body/`. Step 1 stops and
  asks if either is missing. Steps 2 to 6 build against the wrapper regardless

## Build steps

- [x] **1. Image pipeline.** Confirm the endpoint and uploads exist (see
  prerequisite). Add `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` to `.env.example`
  is already there; leave it. Create `components/media/Photo.tsx`: a thin
  wrapper over `@imagekit/next`'s `Image` that takes `slot` (a key of
  `IMAGES`) plus the usual `className`, `sizes`, `priority`, `fill` props,
  looks up path and alt from `data/images.ts`, and passes
  `urlEndpoint` from the env var. Throw at render if the env var is missing
  in production; in development render a labelled `bg-placeholder` box so the
  layout can be built without the account. Create `data/images.ts` with the
  slot manifest in Data / contracts. Prove it by swapping the interim hero to
  use `<Photo slot="hero" />`.
  **Done when:** `npm run lint` and `npm run build` pass; on `/` the hero
  image request goes to `ik.imagekit.io` and returns 200, checked in the
  network log; the `<img>` has a non-empty `alt`.

- [x] **2. Hero and trust strip.** `components/home/Hero.tsx`: two columns at
  `lg`, copy left with the watermark, photo right with the Eminence badge
  (orchid, "Eminence Organics stockist", "Certified organic skincare, in every
  facial"); eyebrow, the three-line headline with copper `work`, lede from
  `siteConfig.description`, `Book a treatment` and `Free consultation`
  controls to `/contact`, and the proof row: five copper stars with
  `siteConfig.ratings` ("5.0 on Facebook and Google") and "Licensed since
  {founded}". No follower count. `components/home/TrustStrip.tsx`: four
  items on a surface band, borders between, two columns below `lg`: licensed
  since {founded} / City of Calgary registered clinic; {SERVICES.length}
  treatments / Face, body, skin and massage; Free consultation /
  {consultation.durationMin} minutes, no commitment; Free parking at the door
  / {address.unit}, {address.street}. Replace the interim `app/page.tsx` with
  these two.
  **Done when:** build and lint pass; `/` shows the hero photo, the badge, the
  proof row and four trust items; the trust strip's treatment count equals
  `SERVICES.length` (40, read it from the DOM); at 375px the hero stacks copy
  over photo and the trust strip is two columns.

- [x] **3. Browse by concern and categories.**
  `components/home/Concerns.tsx`: eyebrow "Start with the concern", heading
  "I'm interested in treating", the prototype lede, then one pill per
  `CONCERNS` entry linking to `/concerns/{slug}` with the label and
  `getConcernCount(slug)` as the small count ("9 treatments" on the first,
  bare number after, as the prototype does). `components/home/Categories.tsx`
  on the sand tone: eyebrow "Or browse by treatment", heading "What we do",
  five cards linking to `categoryHref`, each with its `Photo` (3:4.2
  portrait), the copper line that grows on hover, `label`, `blurb` (Facials
  shows "{n} treatments" from `getServicesByCategory().length` instead of
  its blurb, as the prototype does), and the from-price line:
  `getCategoryFromPrice` as "from $X", or "Consult for pricing" when null.
  Five across at `lg`, two below.
  **Done when:** build and lint pass; the concern pills' counts match
  `getConcernCount` for each slug (spot-check two from the DOM); the Laser
  card reads "Consult for pricing" and Facials reads "from $60"; every pill
  and card href is a planned route.

- [x] **4. Signature, divider, results, Eminence.**
  `components/home/Signature.tsx`: photo left (4:5), copy right: eyebrow
  "Signature treatment", heading "Microneedling collagen induction", the lede
  from `getService("microneedling-face").description`, a three-row list from
  the three `skin` microneedling services (name, price or "Priced at
  consultation", duration), and a ghost button "About microneedling" to
  `/treatments/skin/microneedling-face`. Then `<Divider />`.
  `components/home/Results.tsx`: eyebrow "Real results", heading "Before and
  after", one card per `RESULTS` entry: the photo, `Tag`s from its concerns,
  the caption, and the source line. `components/home/Eminence.tsx` on sand:
  eyebrow "Products we trust", heading "Authorised Eminence Organics
  stockist", the prototype lede, a `Shop the range` link only if the stockist
  URL check finds one (see Data / contracts), and the three-photo grid (one
  2:1 across the top, two squares).
  **Done when:** build and lint pass; the signature list prints $290, $350 and
  "Priced at consultation" read from data, not typed; the results section
  renders exactly `RESULTS.length` cards; the Eminence photos load from
  ImageKit.

- [x] **5. Reviews, consultation, hours and location.** Check: try to read her
  Google Business Profile reviews in the browser (search
  "Face and Body Wellness Centre Calgary" on Google Maps). Record any full
  quote with its source URL and reviewer initial in `data/reviews.ts`. If none
  are readable, leave `REVIEWS` empty; never type a quote from the prototype,
  those were placeholders. (Result: three full reviews were readable; verbatim
  sentence excerpts are in the data. Per-review stars are not printed because
  their star counts were not readable as text.) `components/home/Reviews.tsx` on the dark tone:
  eyebrow "Client love", heading "What clients say" (the prototype's "Five
  stars, every review" is untrue at 4.7), the quote cards
  only when `REVIEWS.length > 0`, and always the source strip built from
  `siteConfig.ratings` ("5.0 Google", "5.0 Facebook") plus "Client Love
  highlights on Instagram" linking to `social.instagram`.
  `components/home/Consultation.tsx`: photo left (5:4), eyebrow "Not sure
  where to start", heading "Book a free consultation", the three prototype
  bullets with the duration read from `siteConfig.consultation`, primary
  button "Book a consultation" to `/contact`. `lib/hours.ts` exports
  `formatHours(entry: DayHours): string` returning `Closed` or
  `4:00 - 8:00 p.m.` style text (a.m./p.m. once per side, "12:00 p.m." for
  noon). `components/home/Location.tsx`: eyebrow "Find us", heading
  "Midnapore, Calgary SE", address from `siteConfig`, a seven-row table from
  `siteConfig.hours` through `formatHours`, ghost buttons `Call {display}`
  (`tel:`) and `Text us` (`sms:`), and the room photo right. Assemble
  `app/page.tsx` in prototype order.
  **Done when:** build and lint pass; the hours table has seven rows in
  Monday-first order with Sunday reading "Closed" and Monday
  "4:00 - 8:00 p.m."; the reviews section shows the source strip and either
  real quote cards or none; the call and text hrefs equal `siteConfig.phone`
  values; no string on the page comes from the prototype's placeholder
  reviews, offers or follower count.

- [x] **6. Responsive and theme pass.** Walk the page at 375, 768 and 1280 in
  light and dark. Fix stacking, overflow and contrast only. Confirm every
  image has `alt`, the page has one `h1`, section headings are `h2`, and the
  console is clean.
  **Done when:** no horizontal scroll at 375; no console errors; `document.
  querySelectorAll("h1").length === 1`; every `img` has a non-empty `alt`;
  screenshots at the three widths in both themes recorded in the handoff.

## Files / areas

| Path | Action | Note |
|---|---|---|
| `components/media/Photo.tsx` | new | the ImageKit wrapper; every later image uses it |
| `data/images.ts` | new | slot manifest |
| `data/reviews.ts`, `types/reviews.ts` | new | real quotes only, may be empty |
| `data/results.ts` | new | one entry |
| `data/siteConfig.ts` | extend | `founded`, `ratings`, `consultation` |
| `lib/hours.ts` | new | `formatHours` |
| `components/layout/Tag.tsx` | new | pill tag |
| `components/home/Hero.tsx`, `TrustStrip.tsx`, `Concerns.tsx`, `Categories.tsx`, `Signature.tsx`, `Results.tsx`, `Eminence.tsx`, `Reviews.tsx`, `Consultation.tsx`, `Location.tsx` | new | one server component per section |
| `app/page.tsx` | rewrite | assembles the ten |
| `.env.local` | Frank creates | `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, never committed |
| `blueprint/reference/business.md` | append | the stockist URL if found, the source of any review quote |

## Data / contracts

### `Photo` and the manifest

```ts
// data/images.ts
export type ImageSlot = keyof typeof IMAGES;
export const IMAGES = {
  hero:           { path: "/face-and-body/hero-led.jpg",         alt: "...", source: "instagram post-04", w: 1600, h: 2000 },
  catFacial:      { path: "/face-and-body/cat-facial.jpg",       alt, source: "instagram post-03", w, h },
  catSkin:        { path: "/face-and-body/cat-skin.jpg",         alt, source: "instagram post-02", w, h },
  catBody:        { path: "/face-and-body/cat-body.jpg",         alt, source: "instagram post-05", w, h },
  catMassage:     { path: "/face-and-body/cat-massage.jpg",      alt, source: "pexels 7233264", w, h },
  catLaser:       { path: "/face-and-body/cat-laser.jpg",        alt, source: "pexels, a laser or IPL handpiece, chosen at build", w, h },
  signature:      { path: "/face-and-body/signature.jpg",        alt, source: "instagram post-06", w, h },
  resultRedness:  { path: "/face-and-body/result-redness.jpg",   alt, source: "instagram post-01", w, h },
  eminenceWide:   { path: "/face-and-body/eminence-1.jpg",       alt, source: "pexels 4482931", w, h },
  eminenceA:      { path: "/face-and-body/eminence-2.jpg",       alt, source: "pexels 7440140", w, h },
  eminenceB:      { path: "/face-and-body/eminence-3.jpg",       alt, source: "pexels 21528800", w, h },
  consultation:   { path: "/face-and-body/consultation.jpg",     alt, source: "pexels 6135650", w, h },
  room:           { path: "/face-and-body/room.jpg",             alt, source: "instagram post-09", w, h },
} as const;
```

`path` is the ImageKit path under the account's URL endpoint. `w` and `h` are
the intrinsic pixel size, read from the file when uploading, so `Image` can
reserve space and avoid layout shift. `alt` describes the photo, never the
treatment's outcome. `source` is a comment-grade credit for the sign-off doc;
stock is Pexels only (free licence, commercial use allowed), per Frank on
2026-09-18, and never a portrait that could be mistaken for her or a client
result.

`Photo` props: `slot: ImageSlot`, `className?`, `sizes?`, `priority?`,
`fill?`. It renders `@imagekit/next`'s `Image` with
`urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}`, `src=path`,
`alt`, `width`/`height` unless `fill`, and `transformation` left to the
component defaults (responsive `srcset` is built by the SDK). Missing env var:
throw when `VERCEL=1` (a deploy without it is a mistake), placeholder box
otherwise, so `npm run build` still passes before the account exists. `Image` is a client
component inside the SDK; `Photo` itself stays a server component.

### Assets to upload (once, to ImageKit under `/face-and-body/`)

| Slot | File | Where it comes from |
|---|---|---|
| hero-led | `blueprint/reference/ig/post-04.jpg` | her, LED device on a client |
| cat-facial | `ig/post-03.jpg` | man mid-facial |
| cat-skin | `ig/post-02.jpg` | abdomen skin texture |
| cat-body | `ig/post-05.jpg` | body treatment, towels |
| signature | `ig/post-06.jpg` | body treatment, towels (second) |
| result-redness | `ig/post-01.jpg` | her one genuine before and after |
| room | `ig/post-09.jpg` | the treatment room |
| cat-massage | Pexels 7233264 | massage, portrait crop |
| cat-laser | Pexels, chosen at build | laser or IPL handpiece, no face |
| eminence-1, 2, 3 | Pexels 4482931, 7440140, 21528800 | skincare product shots |
| consultation | Pexels 6135650 | consultation, no identifiable face if possible |

Pexels files are downloaded at build time only with Frank's yes, sized at
their original resolution, and uploaded by Frank through the ImageKit
dashboard (or by a script he runs with his private key; the key never goes
through Claude). Her Instagram photos are hers to publish.

### `siteConfig` additions

```ts
founded: 2023,
ratings: [{ source: "google", value: 4.7, count: 79 }, { source: "facebook", value: 5, count: 3 }] as const,
consultation: { durationMin: 15, price: 0 },
```

`ratings` renders as "4.7 on Google, 79 reviews" in the hero (the first entry
is the one quoted) and as the source strip in Reviews. Corrected during the
build: the public Maps listing shows 4.7 from 79, so `project-plan.md`'s "5.0
across every public review" is wrong and should be edited by Frank.

### `Review` and `Result`

```ts
// types/reviews.ts
export type Review = {
  quote: string;
  source: "google" | "facebook" | "instagram";
  sourceUrl: string;       // where the quote can be read
  author: string;          // first name and initial as shown publicly, e.g. "Maria K."
  treatment: string | null;
};
// data/reviews.ts
export const REVIEWS: readonly Review[] = [];   // filled only with real quotes found in step 5

// data/results.ts
export type Result = {
  slot: ImageSlot;         // one image that already contains before and after
  concerns: readonly ConcernSlug[];
  caption: string;         // factual, no outcome claim: "Facial redness. Before and after, from her Instagram."
  source: string;          // "instagram post-01"
  treatment: string | null;
};
export const RESULTS: readonly Result[] = [ { slot: "resultRedness", concerns: ["acne"], caption: ..., source: "instagram post-01", treatment: null } ];
```

`treatment` stays `null` until she says which treatment the photo shows.

### `formatHours`

Input `DayHours`. Output examples: `{ open: "16:00", close: "20:00" }` gives
`4:00 - 8:00 p.m.`; `{ open: "10:00", close: "13:00" }` gives
`10:00 a.m. - 1:00 p.m.`; `{ open: "12:00", close: "15:30" }` gives
`12:00 - 3:30 p.m.`; `{ closed: true }` gives `Closed`. Rule: the meridiem is
written once when both ends share it, on the close time; twice when they
differ. Pure string work, no `Date`. Feature 8 reuses it.

### Routes linked from this page

`/concerns/{slug}` (feature 6), `/treatments/{segment}` (feature 4),
`/treatments/skin/microneedling-face` (feature 5), `/contact` (feature 9),
`siteConfig.social.instagram`. Nothing else. The Eminence "Shop the range"
link appears only if the stockist URL is found: check `business.md` says she
"has an official spa link"; look for it on the Eminence Organics spa locator
during step 4 and record it in `business.md`; if not found, no link.

### Copy

Section eyebrows, headings, ledes and bullets are the prototype's, verbatim,
except where a fact is now data (counts, prices, hours, phone, address,
founded year, ratings, consultation length). Every string awaits her sign-off
with the rest (project-plan blocker 6). No em dashes.

## Testing

- No unit test runner; `formatHours` is the one piece of pure logic and is the
  first candidate when `/tests` is set up. Its four example cases above are
  the acceptance table
- Gate per step: `npm run lint` and `npm run build`
- Browser evidence on the dev server at each step's done-when: network log
  for ImageKit requests, DOM reads for counts and hrefs, screenshots at 375 /
  768 / 1280 in both themes for step 6
- Nothing here persists data or calls an API beyond image delivery

## Notes for the AI

- **Facts come from data, never typed into JSX.** Counts from
  `SERVICES.length` and the accessors, prices from `getCategoryFromPrice` and
  the services, hours through `formatHours`, phone and address from
  `siteConfig`. If a number appears literally in a component, it is wrong
- **The prototype's numbers were guesses.** It says "45 treatments", "from
  $150" for skin, "458 following". The data says 40, and skin's from-price is
  whatever `getCategoryFromPrice("skin")` returns ($40, Thermo-Coagulation).
  Render the data; if it reads oddly, that is a data question for her, not a
  reason to type a nicer number
- **Photos are hers or Pexels.** No stock portrait of a woman as "the
  aesthetician", no stock before-and-after pairs of different people presented
  as results. The one result is her real post
- **Server components throughout.** Nothing on this page needs state; the
  concern filter is feature 4's. `Photo` wraps a client component from the
  SDK but is itself a server component
- **Section order is the prototype's:** hero, trust, concerns, categories,
  signature, divider, results, Eminence, reviews, consultation, location.
  Tones alternate as the prototype does: default, surface band, default, sand,
  default, sand, dark, default, default
- **Dark mode:** sand bands become `bg-secondary`, the dark reviews band stays
  `Section tone="dark"` (it is a brand band), photos are unchanged
- **`sizes` on every `Photo`** so the SDK's srcset does not ship a 1600px
  image to a 375px phone. Hero `priority`
- No em dashes anywhere, including alt text

## Open questions

1. **ImageKit account and endpoint.** Blocks step 1 only. Frank creates the
   free account, puts `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<id>`
   in `.env.local` and in Vercel, and uploads the thirteen files above into a
   `face-and-body` folder. The Pexels downloads need his yes first.
2. **Real review quotes.** None are in the repo and Yelp blocks reading.
   Step 5 tries Google Maps; if that fails too, the section ships with the
   rating strip only, and the quotes come when she or feature 14 supplies
   them.
3. **"Free parking at the door."** From the prototype, not from a verified
   source. Confirm, or the trust item becomes the plain address.
4. **What `post-01` shows.** It is her one real before-and-after (facial
   redness). Which treatment, so the caption can name it.
5. **Four prototype sections left out** (How it works, Ways to commit,
   Instagram grid, FAQ). Confirm they stay out of feature 3.

## Implementation walkthrough

**Image pipeline** (`components/media/Photo.tsx`, `data/images.ts`) - the
first ImageKit wrapper and the slot manifest every later page reuses. `Photo`
takes a slot name, looks up path, alt and intrinsic size, and renders the
SDK's `Image` with the public URL endpoint from
`NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`. Without the endpoint it renders a
labelled placeholder box, except on Vercel (`VERCEL=1`) where it throws,
because a deploy without the variable is a mistake and a local build without
it is just the account not existing yet. That is a deliberate softening of the
spec's "throw in production": `npm run build` had to keep passing before the
account was created. Her seven usable Instagram photos (480x640 at best) and
six Pexels stock shots were staged in `blueprint/reference/upload/`, which
`.gitignore` now excludes, and uploaded by Frank to `/face-and-body/` in
the ImageKit media library. The endpoint is `https://ik.imagekit.io/b5xayf4mq`.

**Facts corrected during the build.** The public Google Maps listing shows
**4.7 from 79 reviews**, not the "5.0 across every public review" the project
plan asserts. `siteConfig.ratings` now carries value and count per source
(Google first, Facebook 5.0 from 3), the hero prints "4.7 on Google, 79
reviews", and the prototype heading "Five stars, every review" became "What
clients say". Recorded in `business.md`; the project plan line is Frank's to
correct. The listing also gave the owner's name, Sandra, for the About page.

**Reviews** (`data/reviews.ts`, `types/reviews.ts`,
`components/home/Reviews.tsx`) - three full Google reviews were readable in
the browser (Yelp returned 403 and `WebFetch` sees only titles on these
JavaScript pages), so the cards carry verbatim sentence excerpts with the
listing URL and the author shortened to first name and initial. Per-review
stars are not printed because star counts were not readable as text. The
section renders its rating strip regardless and the cards only when
`REVIEWS` has entries.

**Sections** (`components/home/*`) - ten server components in prototype
order, assembled in `app/page.tsx`. Every number is a data read:
`SERVICES.length` for "40 treatments" (the prototype said 45),
`getConcernCount` for the pills, `getCategoryFromPrice` for the cards (Laser
prints "Consult for pricing" because its from-price is `null`; Skin prints
"from $40", which is Thermo-Coagulation and a data question rather than a
reason to type a nicer number), `getService` for the three microneedling
rows, `formatHours` for the seven-row table. The "3 sessions" badge, the
follower count and the four prototype sections without plan backing (how it
works, offers, Instagram grid, FAQ) were left out.

**Results** (`data/results.ts`) - one entry, her only genuine before-and-after,
with a factual caption and `treatment: null` until she names it. No stock
pairs presented as results.

**Hours** (`lib/hours.ts`) - `formatHours` is pure string work: the meridiem
is written once when both ends share it ("4:00 - 8:00 p.m."), twice when they
differ ("10:00 a.m. - 1:00 p.m."). Feature 8 reuses it for open-now.

**Dark mode** - the responsive pass found the reviews band vanishing in dark
mode (`#1c1a17` on `#1c1a17`). `Section tone="dark"` now becomes
`dark-surface` in dark mode and its cards take the page colour, so the band
still reads as a band. The trust strip drops to one column under 440px, the
first real use of the `xsm` breakpoint.

**Checks run** - `npm run lint` and `npm run build` (`/` static). Browser on
the dev server: one `h1`, eight `h2`s, all counts and prices read from the
DOM and matched to the accessors, seven hour rows, tel and sms hrefs, three
review cards, 13 `<img>`s all served from `ik.imagekit.io` with alts, no
horizontal scroll at 375 / 768 / 1280, dark mode with the band fix, fresh
loads with every request 200. All 13 ImageKit files return 200 with a 400px
transform (hero 28 KB).
