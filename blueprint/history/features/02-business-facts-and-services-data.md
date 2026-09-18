# Feature: Business facts and services data

**From build-plan:** feature 2
**Branch:** `feature/business-facts-and-services-data`
**Status:** verified

## Goal

One typed source for everything the rest of the site reads: the clinic's facts
(hours, address, geo, socials, tagline) and the treatment catalogue (categories,
concerns, every service with price, duration, category and concerns). Features
3 to 11 and Phase 2 read these modules; nothing downstream hardcodes a price, a
duration, an opening time or a treatment name. This feature ships data, types
and pure accessors only. No page changes.

## Design reference

Not visual. Sources of truth for the values:

- `blueprint/reference/services.md` - the 45 Square listings with price and
  duration
- `prototypes/facials.html` lines 130 to 256 - the four facial groups and the
  one-line descriptions per facial
- `prototypes/home.html` lines 233 to 242 - the eight concerns; 250 to 256 - the
  five category blurbs
- `blueprint/reference/business.md` lines 183 to 199 - the hours table
  (Instagram, 22 Jul 2026); 128 to 131 - the postal code conflict
- `blueprint/context/project-overview.md` - the locked `Service`, `Concern` and
  `BusinessFacts` shapes and the geo coordinates

## In scope

- `types/services.ts` - `Category`, `CategorySlug`, `Concern`, `ConcernSlug`,
  `Service`
- `data/categories.ts` - the five categories with label, URL segment and blurb
- `data/concerns.ts` - the eight concerns with label and landing-page intro
- `data/services.ts` - every site service, typed, with a duplicate-slug guard
- `data/siteConfig.ts` extended with `tagline`, `geo`, `timezone` and the
  seven-day `hours`; `nav` and `footer` treatment links derived from
  `data/categories.ts` so the category list exists once
- `lib/services.ts` - pure accessors the pages will call: by slug, by category,
  by concern, category from-price, concern counts
- One-sentence `description` per service, taken from the prototype where it
  has one and written plainly where it does not, all flagged for her sign-off

## Out of scope

- Rendering anything. No page reads the new data yet; the interim home page is
  untouched (feature 3 is the first consumer)
- Open-now logic and hours display (feature 8). This feature stores the hours
  and the timezone; feature 8 computes with them
- Reviews data (feature 14) and the `Review` type
- `bookingId` values. The field exists and is `null` everywhere until feature 11
- Rewriting descriptions into full treatment-page copy (feature 5)
- Deciding the Laser, IPL and Fractional Microneedling prices. They are
  `price: null`, which the model defines as "priced at consultation"
- Fixing her Google Business Profile hours. Not code; project-plan section 8

## Build loop

- `workflow.stepReview` is `feature`: build all steps, one review at the end
- `workflow.checkpointCommits` is `disabled`; `/complete` makes the one commit
- Gate per step: `npm run lint` and `npm run build`. No Verify command, no test
  runner (`verification.logicTests` is `when-configured`)
- Nothing to install. Nothing to run in a browser; this feature has no UI

## Build steps

- [x] **1. Types, categories, concerns.** Create `types/services.ts` with the
  types in Data / contracts. Create `data/categories.ts` exporting
  `CATEGORIES` (five, in the order Facials, Skin Treatments, Body, Massage,
  Laser and IPL) and `data/concerns.ts` exporting `CONCERNS` (eight, prototype
  order). Change `data/siteConfig.ts` so the Treatments footer group and the
  first four `nav` entries are built from `CATEGORIES` (`label`, `href` from
  `segment`), leaving every rendered href exactly as it is today.
  **Done when:** `npm run lint` and `npm run build` pass;
  `grep -c '"/treatments/' data/siteConfig.ts` prints `0` (the literal paths
  now come from categories) and the built header still lists Facials, Skin
  Treatments, Body, Massage, About in that order.

- [x] **2. Catalogue review.** Fetch the two public Square pages named at the
  top of `services.md` (read-only). Compare every listing against
  `services.md`; note any price, duration or name that differs, and any
  description with an obvious error (the stray "4o mini" line, the bare
  "eminenceorganics"). Write `blueprint/reference/catalogue.md`: one table of
  all 45 Square listings with columns Square name, site name, decision (kept,
  renamed, merged, dropped), reason, and a second short list of overlaps she
  should rule on (see Data / contracts, Catalogue cleanup). The spec's mapping
  tables are the starting point; where Square disagrees with `services.md`,
  record both and use the Square value.
  **Done when:** `catalogue.md` exists with 45 rows, every row has a decision,
  and the count of `kept` plus `renamed` rows equals the number of services
  step 3 will type (40 unless the review changes it, in which case update the
  numbers in step 3 and say so in the handoff).

- [x] **3. Services.** Create `data/services.ts` exporting `SERVICES:
  readonly Service[]` with the entries in Data / contracts as amended by
  `catalogue.md`, in category order then the order `services.md` lists them. Each entry carries the exact
  price and duration from `services.md`, the `group` where the category has
  groups, `concerns` from the mapping table, `description` per the description
  rule, `eminence` where the name says so, `variantOf` for the two longer
  Relaxation lengths, `bookingId: null`, `featured` per Data / contracts. End
  the module with the duplicate-slug guard so a repeated slug throws at import.
  **Done when:** `npm run lint` and `npm run build` pass;
  `grep -c 'slug: "' data/services.ts` prints `40`;
  `grep -o 'slug: "[^"]*"' data/services.ts | sort | uniq -d` prints nothing;
  `grep -c "price: null" data/services.ts` prints `3`.

- [x] **4. Business facts and accessors.** Extend `siteConfig.ts` with
  `tagline`, `geo`, `timezone` and `hours` (seven rows, Monday first, values
  from the `business.md` Instagram column, with a one-line comment that they
  await her confirmation). Create `lib/services.ts` with the accessors in Data
  / contracts, each a pure function over the imported constants.
  **Done when:** `npm run lint` and `npm run build` pass; `hours` has exactly
  seven entries whose `day` values are Monday through Sunday in order (grep
  the seven day names in `data/siteConfig.ts` and count 7); `lib/services.ts`
  exports exactly the five named functions.

## Files / areas

| Path | Action | Note |
|---|---|---|
| `types/services.ts` | new | the contract everything reads |
| `data/categories.ts` | new | five categories |
| `data/concerns.ts` | new | eight concerns |
| `data/services.ts` | new | 40 services |
| `data/siteConfig.ts` | extend | tagline, geo, timezone, hours; nav and footer derived from categories |
| `lib/services.ts` | new | accessors |
| `blueprint/reference/catalogue.md` | new | the cleaned catalogue: 45 rows, decision and reason each; her sign-off document |
| `blueprint/reference/services.md` | untouched | remains the raw scrape record |
| everything under `app/` and `components/` | untouched | |

## Data / contracts

### Types (`types/services.ts`)

```ts
export type CategorySlug = "facial" | "skin" | "body" | "massage" | "laser";

export type Category = {
  slug: CategorySlug;
  label: string;      // "Facials", "Skin Treatments", "Body", "Massage", "Laser and IPL"
  segment: string;    // URL segment under /treatments/: facials, skin, body, massage, laser
  blurb: string;      // prototype's one-liner: "Microneedling, peels, RF"
  groups?: readonly { slug: string; label: string; heading: string }[]; // facials only, see below
};

export type ConcernSlug =
  | "fine-lines" | "acne" | "pigmentation" | "dull-dehydrated"
  | "scarring-texture" | "unwanted-hair" | "body-contouring" | "muscle-tension";

export type Concern = {
  slug: ConcernSlug;
  label: string;        // "Fine lines and wrinkles"
  description: string;  // one sentence, the landing-page intro; flagged for sign-off
};

export type Service = {
  slug: string;                 // kebab-case, unique across all categories
  name: string;                 // display name, Square's name tidied (no "CIT", no "(Eminence)")
  category: CategorySlug;
  group?: string;               // a slug from the category's groups; facials only
  price: number | null;         // CAD, whole dollars; null = priced at consultation
  priceFrom: boolean;           // true renders "from $X"
  durationMin: number;          // minutes; for "15 min+" listings the listed minimum
  description: string;          // one sentence, see the description rule
  concerns: readonly ConcernSlug[];
  bookingId: string | null;     // null until feature 11
  featured: boolean;
  eminence?: true;              // uses Eminence Organics products
  variantOf?: string;           // slug of the base service this is a length variant of
};
```

Three fields are additions to the overview's locked `Service` shape, all
optional so nothing downstream is forced to handle them: `group` (the
prototype's facial page is grouped and feature 4 says "grouped within each
page"), `eminence` (the home and About pages call out Eminence treatments),
`variantOf` (the catalogue lists Relaxation three times by length and the
plan says "show the treatment once, lengths underneath"). Say if any should not
exist; each is one line to remove.

### Categories (`data/categories.ts`)

| slug | label | segment | blurb | groups |
|---|---|---|---|---|
| `facial` | Facials | `facials` | "Microdermabrasion to gold leaf" | `cleansing` "Cleansing and clearing" / "For congested and breakout-prone skin"; `resurfacing` "Resurfacing" / "For texture, scarring and dullness"; `hydrating` "Hydrating and brightening" / "For dull, dry or tired skin"; `lifting` "Lifting and firming" / "For skin that's losing its bounce" |
| `skin` | Skin Treatments | `skin` | "Microneedling, peels, RF" | none |
| `body` | Body | `body` | "Contouring and wraps" | none |
| `massage` | Massage | `massage` | "Relaxation to deep tissue" | none |
| `laser` | Laser and IPL | `laser` | "Hair removal, rejuvenation" | none |

The facial blurb is new because the prototype shows a count there ("22
treatments"), which is derived, not stored. Blurbs are copy and flagged for
sign-off with everything else.

### Concerns (`data/concerns.ts`)

Eight, from the prototype, in this order: Fine lines and wrinkles, Acne and
congestion, Pigmentation and sun damage, Dull or dehydrated skin, Scarring and
texture, Unwanted hair, Body contouring, Muscle tension. Each gets a one-sentence
`description` written plainly (no supplier language, no medical claims), flagged
for sign-off. Counts are derived by the accessor, never stored.

### Catalogue cleanup (`blueprint/reference/catalogue.md`)

The Square catalogue was typed by hand and it shows. Frank asked on
2026-09-18 for a cleanup pass so the data makes sense when it renders. Rules:

- **Fix presentation, never facts.** Names, grouping, duplicates and
  descriptions are ours to tidy. Prices, durations and which treatments exist
  are hers; a wrong-looking price is recorded as a question, not corrected
- **Every change is visible in `catalogue.md`** so she can veto a rename in
  one read

Renames proposed (Square name to site name):

| Square | Site | Why |
|---|---|---|
| Microneedling CIT Face | Microneedling, Face | "CIT" is supplier jargon |
| Microneedling Abdomen CIT | Microneedling, Abdomen | same |
| Facial Light Therapy LED | LED Light Therapy | word order |
| ACNE ADVANCED TREATMENT | Acne Advanced Treatment | `services.md` had recorded this listing as "SPF"; corrected from Square |
| Detoxifying Facial (Eminence) | Detoxifying Facial | brand moves to the `eminence` flag |
| Revitalizing Facial (Eminence) | Revitalizing Facial | same |
| Wood Therapy (Maderoterapia) | Wood Therapy | one name |
| Lipolysis (diode) | Laser Lipolysis | says what it is |
| Lymphatic (Manual Lymphatic Drainage) | Lymphatic Drainage Massage | one name |
| Relaxation 60 / 75 / 90 | Relaxation Massage, with 60, 75, 90 min as lengths | one treatment, three lengths |
| Relaxation Massage by Esthetician (low pressure) | Gentle Relaxation Massage | plain words |
| IPL Treatments | IPL Treatment | singular, like every other entry |

Dropped: Manicure, Consultation, Facial Consultation, IPL Consultation,
Massage (combined listing). Reasons in the Services section below.

Overlaps for her to rule on, listed in `catalogue.md` and left as separate
services until she does: Hydra Spa Facial versus Hydrodermabrasion (same
technique, different length and price?); Carbon Peel versus Hollywood Peel
Facial (same laser, is Hollywood the longer version?); Deep Cleansing Facial
versus Detoxifying Facial (two deep cleanses, one organic?).

### Services (`data/services.ts`)

Forty entries, subject to the catalogue review. The 45 Square listings map as follows; the five not carried each
have a recorded reason.

**Facials (22)**, `category: "facial"`, price and duration exactly as
`services.md`. Group and concerns from the prototype cards:

| Service | group | concerns | eminence |
|---|---|---|---|
| Deep Cleansing Facial | cleansing | acne | |
| Hydra Spa Facial | cleansing | dull-dehydrated, scarring-texture | |
| Detoxifying Facial | cleansing | acne, pigmentation | yes |
| Back Facial | cleansing | acne | |
| Facial Light Therapy LED | cleansing | acne, fine-lines | |
| Microdermabrasion Facial | resurfacing | scarring-texture, fine-lines, pigmentation | |
| Dermaplaning Facial | resurfacing | scarring-texture, dull-dehydrated | |
| Hydrodermabrasion | resurfacing | dull-dehydrated, acne | |
| Chemical Peel | resurfacing | pigmentation, scarring-texture, acne | |
| Carbon Peel | resurfacing | acne, scarring-texture | |
| Hollywood Peel Facial | resurfacing | pigmentation, dull-dehydrated | |
| Fire and Ice Facial | resurfacing | scarring-texture, dull-dehydrated | yes |
| Oxygen Rejuvenating Facial | hydrating | dull-dehydrated | |
| Oxygen Brightening Facial | hydrating | dull-dehydrated, pigmentation | |
| Revitalizing Facial | hydrating | scarring-texture, dull-dehydrated | yes |
| Eminence Facial | hydrating | dull-dehydrated | yes |
| Gold Facial | hydrating | fine-lines, dull-dehydrated | |
| Mini Facial | hydrating | dull-dehydrated | |
| Acne Advanced Treatment (was recorded as "SPF", a scrape error) | cleansing | acne | |
| HIFU Facial | lifting | fine-lines | |
| Radio Frequency Facial | lifting | fine-lines | |
| Lifting Facial | lifting | fine-lines | |

**Skin Treatments (4)**, `category: "skin"`: Microneedling Face ($290, 90,
`featured`), Microneedling Abdomen ($350, 90, `featured`), Fractional
Microneedling (null, 15), Thermo-Coagulation (from $40, 10). Concerns:
microneedling entries `scarring-texture, fine-lines, pigmentation`; abdomen also
`body-contouring`; fractional the same as face; thermo-coagulation none (it
treats spider veins and skin tags, which no concern covers). Thermo-Coagulation sits here rather than under Laser
because it is a skin-lesion treatment with a real price, and putting it under
Laser would make that category's from-price $40 when its two headline
treatments are priced at consultation.

**Laser and IPL (2)**, `category: "laser"`: IPL Treatment (null, 15,
`featured`, concerns `pigmentation, fine-lines, acne, unwanted-hair`), Laser Hair Removal
(null, 10, `featured`, concerns `unwanted-hair`).

**Body (4)**, `category: "body"`, all `body-contouring`: Wood Therapy (from
$110, 30), Lipolysis (from $150, 45), Cavitation (from $130, 45), Body Wrap
(from $130, 60). Wood Therapy and Body Wrap also `muscle-tension`.

**Massage (8)**, `category: "massage"`, all `muscle-tension`: Relaxation
Massage 60 ($100, 60, base slug `relaxation-massage`), Relaxation Massage 75
($120, 75, `variantOf: "relaxation-massage"`), Relaxation Massage 90 ($149, 90,
`variantOf: "relaxation-massage"`), Deep Tissue Massage ($126, 75; Square shows a fixed price, `services.md` had from $105),
Therapeutic Massage (from $100, 60), Lymphatic Drainage ($125, 60, also
`body-contouring`), Head Massage ($79, 30), Relaxation Massage by Esthetician
($80, 60).

**Not carried (5):** Manicure (not one of the five categories and outside the
clinic's positioning), Consultation, Facial Consultation and IPL Consultation
(the free consultation is a call to action, not a catalogue item; feature 11
decides how it is booked), Massage combined listing (a duplicate of the
massages above with no price).

`featured` is true for the four the project plan names as the high-value,
high-intent treatments: Microneedling Face, Microneedling Abdomen, IPL, Laser
Hair Removal. Nothing else.

**Slug rule:** the display name lowercased, spaces and punctuation to single
hyphens, `facial` suffix kept (`deep-cleansing-facial`), length variants
suffixed (`relaxation-massage-75`). The guard at the end of the module:

```ts
const seen = new Set<string>();
for (const s of SERVICES) {
  if (seen.has(s.slug)) throw new Error(`Duplicate service slug: ${s.slug}`);
  seen.add(s.slug);
}
```

**Description rule:** one sentence, plain, no supplier language, no medical
claim (no "detox", "fat reduction", "cellulite", "cures", "treats" a
condition). For the 22 facials use the prototype card sentence verbatim from
`facials.html`. For microneedling use the opening sentence of
`prototypes/microneedling.html`'s hero. For everything else write one sentence
that says what happens in the room, not what it promises. The module header
carries one comment: every description awaits her sign-off (project-plan
blocker 6).

### Business facts (`data/siteConfig.ts` additions)

```ts
tagline: "Renew. Revitalize. Radiate."   // her lockup line, from business.md
geo: { lat: 50.9095038, lng: -114.0637929 }
timezone: "America/Edmonton"
hours: readonly DayHours[]               // seven, Monday first
```

```ts
export type DayHours =
  | { day: Day; open: string; close: string }   // "16:00", "20:00", 24-hour local time
  | { day: Day; closed: true };
export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
```

| Day | open | close |
|---|---|---|
| monday | 16:00 | 20:00 |
| tuesday | 10:00 | 13:00 |
| wednesday | 09:00 | 12:00 |
| thursday | 12:00 | 15:30 |
| friday | 14:00 | 18:00 |
| saturday | 07:00 | 11:30 |
| sunday | closed | |

Source is her Instagram post of 22 Jul 2026. Google Business Profile disagrees
on six days and is known wrong. One comment above the array says the rows await
her confirmation. Hours are strings, not `Date`s, so they serialise and render
without timezone surprises; feature 8 turns them into an open-now state using
`timezone`.

`nav` becomes `[...CATEGORIES.slice(0, 4).map(link), { label: "About", href:
"/about" }]` and the Treatments footer group `CATEGORIES.map(link)`, where
`link` yields `{ label, href: "/treatments/" + segment }`. Rendered output is
identical to today.

### Accessors (`lib/services.ts`)

```ts
getService(slug: string): Service | undefined
getServicesByCategory(category: CategorySlug): readonly Service[]   // catalogue order
getServicesByConcern(concern: ConcernSlug): readonly Service[]      // catalogue order
getCategoryFromPrice(category: CategorySlug): number | null
  // lowest non-null price in the category; null when every service is priced at consultation
getConcernCount(concern: ConcernSlug): number
```

All pure, all over the imported constants, none touch `Date`, so no test seam
is needed. `getCategoryFromPrice("laser")` returns `null`, which is what lets
the home page print "Consult for pricing" as the prototype does.

## Testing

- No test runner is configured and `logicTests` is `when-configured`, so no
  tests are added. The accessors are five one-line filters over constants;
  when `/tests` is set up they are the first obvious unit tests
- Gate per step: `npm run lint` and `npm run build`
- The grep counts in each Done when are the evidence; they are run, not assumed
- No browser evidence is claimed. Nothing renders differently

## Notes for the AI

- **Values come from `services.md`, byte for byte.** Do not round, do not
  "correct" a price that looks odd, do not fill a null. Three nulls is the
  correct count and a launch blocker she owns
- **Descriptions are the only prose.** Keep them to one sentence, keep the
  banned words out, and copy the prototype's sentence where one exists rather
  than improving it. She signs off on copy, not us
- **`durationMin` is a number of minutes.** "1 hr 15 min" is 75. "15 min+" is
  15
- **Categories exist once**, in `data/categories.ts`. `siteConfig.ts` imports
  them; nothing else declares a category label or segment
- **No `Date`, no `Intl`, no timezone maths here.** Feature 8 owns open-now
- **`readonly` everywhere.** These are constants; `as const` on the arrays and
  `readonly` on the types so a page cannot mutate the catalogue by accident
- No em dashes in the data. Use a hyphen or rephrase
- The project has no `types/` folder yet; `coding-standards.md` says types
  live at `types/[feature].ts`, so this feature creates it

## Open questions

None block starting; all are single values to change later.

1. **Hours.** From a July 2026 Instagram post. Confirm with her. Six of seven
   rows disagree with Google, so someone is wrong, and it might be the post.
2. **Postal code.** `T2X 1P1` stays until she confirms.
3. **Manicure and the three consultation listings are not carried.** Say if
   Manicure should be on the site anyway; it would need a category.
4. **Featured set.** The four high-value treatments the plan names. Say if the
   home page should feature something else.
5. **Thermo-Coagulation under Skin Treatments, not Laser.** Reason above; one
   field to change.

## Implementation walkthrough

**Types** (`types/services.ts`) - the contract every later feature reads.
`Service` is the overview's locked shape plus three optional fields added for
concrete reasons: `group` (the facial page is grouped in four), `eminence`
(home and About call out Eminence treatments) and `variantOf` (Relaxation
Massage is one treatment at three lengths). All optional, so nothing downstream
is forced to handle them.

**Categories and concerns** (`data/categories.ts`, `data/concerns.ts`) - the
five categories carry their URL segment and blurb; only Facials has `groups`.
`categoryHref()` is the one place a `/treatments/` path is built.
`siteConfig.ts` now derives its nav and footer treatment links from
`CATEGORIES`, so the category list exists once and the rendered hrefs are
byte-identical to feature 1. The eight concerns are the prototype's, each with
a one-sentence intro for its future landing page.

**Catalogue review** (`blueprint/reference/catalogue.md`) - the live Square
booking page was rendered in the browser (it needs JavaScript; `WebFetch` saw
only a title) and every one of its 45 listings was compared with the day-old
scrape in `services.md`. Four things were wrong or missing: "SPF" was a scrape
artefact for **Acne Advanced Treatment**; Deep Tissue is a fixed $126, not
"from $105"; IPL lists hair removal among its uses; Thermo-Coagulation treats
spider veins and skin tags, which no concern covers. The doc records all 45
rows with a decision and reason, and seven questions for her. It is the
sign-off document; `services.ts` mirrors it.

**Services** (`data/services.ts`) - 40 entries in category order, then
`services.md` order. Prices and durations are Square's, byte for byte; three
are `null` (Laser Hair Removal, Fractional Microneedling, IPL), which the
model defines as priced at consultation. Facial descriptions are the prototype
card sentences verbatim; microneedling uses the prototype hero sentence; the
rest are one plain sentence each written to say what happens in the room, with
detox, fat, cellulite and cure words kept out. A duplicate-slug guard at the
end of the module throws at import.

**Business facts** (`data/siteConfig.ts`) - `tagline`, `geo`, `timezone`
and seven `hours` rows as 24-hour strings, Monday first, from her July 2026
Instagram post, with a comment that they await confirmation. `DayHours` is a
union so a closed day cannot carry times. No `Date` maths here; feature 8
owns open-now.

**Accessors** (`lib/services.ts`) - five pure functions over the constants.
`getCategoryFromPrice("laser")` returns `null`, which is what lets the home
page print "Consult for pricing" as the prototype does, because
Thermo-Coagulation was placed under Skin Treatments rather than Laser.

**Checks run** - `npm run lint` and `npm run build` (`/` static). Grep gates:
40 slugs, 0 duplicates, 3 null prices, 7 day rows, 5 exports, 45 catalogue
rows (28 kept, 12 renamed, 5 dropped), 0 literal `/treatments/` strings in
`siteConfig.ts`, no em dashes, no banned claim words in descriptions. Nothing
renders differently, so no browser evidence was taken.
