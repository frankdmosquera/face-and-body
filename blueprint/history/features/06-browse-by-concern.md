# Feature: Browse by concern

**From build-plan:** feature 6
**Status:** verified
**Branch:** `feature/browse-by-concern`

## Goal

Eight landing pages at `/concerns/[slug]`, one per concern, for the visitor who
knows what is bothering her but not what the treatment is called. Each answers
"what do you have for this" with every treatment that addresses it, grouped by
category so the range and the price ladder are visible in one screen.

This is the second audience in the overview: the researcher comparison-shopping
on her phone at night, who searches the problem rather than the product. The
home page already sends her here from eight chips and the header has a Concerns
dropdown with the same eight links. All sixteen 404 today.

After this, the only dead links left are the forty treatment detail pages that
feature 5 owns.

## In scope

- **Route** `app/concerns/[slug]/page.tsx`, static per slug via
  `generateStaticParams` over `CONCERNS`, with `dynamicParams = false` so an
  unknown slug is a 404. Same shape feature 4 used.
- **Metadata**: title from the label, description from a new `metaDescription`
  on `Concern`, under 155 characters. The existing `description` is one sentence
  and is already the page lede, which is what the overview says it is for.
- **Hero**: breadcrumb (Home / label), eyebrow with the treatment count, `h1` of
  the label, the existing `description` as lede, and a photo.
- **Photo without new assets**: there is no per-concern image slot. Use the
  `cat*` slot of the category holding the most treatments for that concern,
  ties broken by `CATEGORIES` order. Derived from data, so it cannot go stale.
- **Treatments grouped by category**, from `getServicesByConcern`. One block per
  category that has a match, in `CATEGORIES` order, each headed by the category
  label linking to `/treatments/<segment>`. This is what makes a concern page
  more than a filtered category page, and it feeds the internal linking that
  feature 10 depends on.
- **Reuse `ServiceCard`** from feature 4 unchanged. It is already category
  agnostic and carries the three price forms, the Eminence tag and the
  Book / Ask action.
- **Other concerns** at the foot: the remaining seven as chips, so a visitor who
  picked the wrong one is one click from the right one.
- **Consultation band**, the closing section the category pages already use.
- **One cleanup**: `components/home/Concerns.tsx` builds the URL with a template
  string instead of `concernHref`. Switch it, so the concern URL has one
  definition rather than two.

## Out of scope

- Treatment detail pages (feature 5). Cards keep pointing at `/contact`.
- JSON-LD, canonical tags, and the duplicate-content question between concern
  and category pages, which list some of the same treatments. Feature 10 owns
  schema and metadata.
- Any change to the header or the category pages. (`ServiceCard` was scoped
  out too, but step 5 had to change it; see there.)
- New concern copy beyond one `metaDescription` each.
- Giving `Thermo-Coagulation` concerns (Open questions).

## Build loop

`workflow.stepReview` is `feature`, so one review at the end.
`workflow.checkpointCommits` is `disabled`, so no commits during the build.
`/complete` makes the one commit.

## Build steps

- [x] **1. Data and route shell.** Add `metaDescription` to `Concern`, fill all
  eight, add the dominant-category helper, and build the page with its hero.
  *Done when:* `npm run build` lists eight static routes under `/concerns/`,
  `/concerns/acne` renders the breadcrumb, `h1` "Acne and congestion", its
  existing description as the lede and a photo, and `/concerns/nonsense`
  returns 404.

- [x] **2. Treatments grouped by category.** Render the matches.
  *Done when:* each page's card count equals `getServicesByConcern`, matching
  the spread already read from the data: fine-lines 10 across 3 categories,
  acne 9 across 2, pigmentation 9 across 3, dull-dehydrated 11 across 1,
  scarring-texture 10 across 2, unwanted-hair 2 across 1, body-contouring 6
  across 3, muscle-tension 10 across 2. Category headings appear in
  `CATEGORIES` order and each links to its category page.

- [x] **3. Other concerns and the consultation band.** Close the page.
  *Done when:* each page lists the other seven concerns as working links and
  never itself, and ends with the consultation CTA.

- [x] **4. Link check and mobile.** Confirm nothing is dead.
  *Done when:* all eight header Concerns links and all eight home-page chips
  return 200, the home chips still show their counts, and `/concerns/acne` has
  no horizontal overflow at 375px.

- [x] **5. Unplanned: fix a mobile overflow in `ServiceCard`.** Step 4 failed.
  `ServiceCard`'s footer put the price beside a `shrink-0` action button, and
  "At consultation" next to "Ask about pricing" exceeds a phone-width card with
  neither able to shrink, so the card forced the whole page wider. This is a
  defect shipped in feature 4, not caused by this feature, and feature 4's
  claim of no overflow at 375px was wrong: it was tested on `/treatments/facials`
  only, whose cards have short prices and a short button. `/treatments/laser`
  was broken on merge. The repair is `flex-wrap` on that footer.
  `ServiceCard` was out of scope for this feature, but step 4 could not pass
  while it was broken and the alternative was leaving a known live defect.
  *Done when:* all fifteen routes measure `scrollWidth === 375` at a 375px
  viewport, and the wrapped card still reads as deliberate rather than broken.

## Files / areas

| Path | Change |
|---|---|
| `app/concerns/[slug]/page.tsx` | new, the template |
| `components/concerns/ConcernServices.tsx` | new, server, grouping by category |
| `types/services.ts` | add `metaDescription` to `Concern` |
| `data/concerns.ts` | fill it for all eight |
| `lib/services.ts` | dominant-category and grouping helpers |
| `components/home/Concerns.tsx` | use `concernHref` |

## Data / contracts

- **URL**: `/concerns/<slug>`, slug from `ConcernSlug`. `concernHref` in
  `data/concerns.ts` is the single definition; the template string does not get
  written anywhere else.
- **Grouping order** follows `CATEGORIES`, not the order services happen to
  appear in `SERVICES`, so a concern page and a category page never disagree
  about sequence.
- **Empty groups cannot occur**: a category block renders only when it has at
  least one match, so there is no empty state to design.
- **`unwanted-hair` is legitimately thin**: two treatments, both laser, both
  `price: null`. The page renders normally with two cards and the consultation
  band carries more of the weight. That is correct, not something to pad.
- **No client JavaScript.** Unlike the category pages there is nothing to
  filter, so every component here is a server component.

## Testing

No test command is declared in `AGENTS.md`, so this feature adds no unit tests
and installs no runner. Evidence is `npm run build` plus the browser, per the
done-whens. The per-concern counts in step 2 are the substantive check: they
come from the data, so a wrong `concerns` array surfaces as a wrong count.

## Notes for the AI

- Server components throughout. No `"use client"` anywhere in this feature.
- Reuse `Section`, `Container`, `Eyebrow`, `Lede`, `Photo`, `Divider` and
  `ServiceCard`. Do not fork `ServiceCard` to add a category label; the category
  is already the group heading.
- No new dependencies and no new image assets.
- Do not touch the header. Its concern links already point at these URLs and
  start working the moment the routes exist.

## Open questions

- **`Thermo-Coagulation` has an empty `concerns` array**, the only service of
  the forty with none. It renders on its category page but is unreachable from
  any concern page. That is either an oversight in the feature 2 data or a
  deliberate choice, and either way which concerns it treats is a clinical call,
  not a build decision. Scoped out here. It is a one-line data edit whenever the
  answer comes.

## Implementation walkthrough

**Concern data** (`types/services.ts`, `data/concerns.ts`) - `Concern` gained
`metaDescription` only. The existing `description` was already written as the
landing-page intro, which is what the overview says it is for, so it became the
lede untouched and no new body copy was invented. The eight meta descriptions
are each under 155 characters, asserted in the script that wrote them rather
than eyeballed.

**Two helpers** (`lib/services.ts`) - `getServicesByConcernGrouped` returns
category blocks in `CATEGORIES` order, dropping empties, so a concern page and
a category page can never disagree about sequence and there is no empty block
to render. `getDominantCategory` picks the hero photo by whichever category
holds most of the concern's treatments, which avoided commissioning eight new
images for a data set that already implies the right one. It falls back to the
first category when a concern has no treatments at all: that cannot happen
today, but the reduce would otherwise crash the build with an unreadable error
the moment someone adds a concern before its services.

**The page** (`app/concerns/[slug]/page.tsx`) - the same shape feature 4
established: `generateStaticParams` over `CONCERNS`, `dynamicParams = false`,
awaited `params`, breadcrumb with no link to a `/concerns` index because none
exists. Entirely server-rendered; unlike the category pages there is nothing to
filter, so no `"use client"` appears anywhere in this feature.

**Grouping** (`components/concerns/ConcernServices.tsx`) - one section per
category, each headed by the category label with a link through to that
category page. That link is the point of the component: it is what makes a
concern page more than a filtered list, and it is the internal linking feature
10 will want. `ServiceCard` is reused unmodified, so the three price forms, the
Eminence tag and the Book / Ask action all behave exactly as they do on a
category page.

**One cleanup** (`components/home/Concerns.tsx`) - the home chips built the URL
with a template string while `concernHref` already existed. Switched, so the
concern URL has one definition.

**The unplanned repair** (`components/treatments/ServiceCard.tsx`) - step 4
failed on mobile and the cause was not this feature. The card footer placed the
price beside a `shrink-0` action button; "At consultation" next to "Ask about
pricing" exceeds a phone-width card and neither element could shrink, so the
card's min-content width pushed the whole page wider. `/treatments/laser` had
been broken at 375px since feature 4 merged, and feature 4's no-overflow claim
was wrong because it was measured on `/treatments/facials` alone, whose cards
carry short prices and a short label. One `flex-wrap` fixed every affected
page. Recorded here rather than patched quietly, because the interesting part
is the testing mistake, not the CSS.

**Verified** - `npx tsc --noEmit`, `npm run lint`, `npm run build` clean, 18
static routes. Card and block counts per concern matched the data exactly:
fine-lines 10 across 3, acne 9 across 2, pigmentation 9 across 3,
dull-dehydrated 11 across 1, scarring-texture 10 across 2, unwanted-hair 2
across 1, body-contouring 6 across 3, muscle-tension 10 across 2, with headings
in `CATEGORIES` order. All eight concern pages returned 200 and
`/concerns/nonsense` returned 404. Each page showed exactly seven other-concern
links and never itself, confirmed by the absence of its own slug even though
the header lists all eight. The home page still rendered eight chips with their
counts. After the `flex-wrap` repair and a server restart, all fifteen routes
measured `scrollWidth` exactly 375 at a 375px viewport, and a screenshot of
`/concerns/unwanted-hair` confirmed the wrapped card reads as deliberate.

**Known and out of scope** - `Thermo-Coagulation` is the only service of the
forty with an empty `concerns` array, so it appears on its category page and on
no concern page. Which concerns it treats is a clinical call, not a build
decision. A one-line data edit closes it whenever the answer comes.
