# Fix: Rework the header nav and theme toggle

**Type:** Fix
**Status:** verified
**Branch:** `fix/rework-the-header-nav-and-theme-toggle`

## The problem

Frank's requests after the LATAM header landed, revised once during the build
when he saw the first cut:

- The theme toggle opens a three-item menu with a System option. It should be
  one click between light and dark.
- "Concerns" as a top-level label reads like a warning. It comes off the bar;
  the concern pages move under a Resources section in a later feature.
- Treatments deserve the bar, not one label. Four category buttons sit on the
  bar directly, each opening the full list for that category: all 22 facials,
  not a curated four. Everything that is not a treatment lives under one more
  button, and that includes the concerns, which cut across categories and
  went missing from the nav in the first cut. On mobile the same four rows expand to the full lists and the sheet
  scrolls.

## The fix

**Theme toggle** (`components/theme/ModeToggle.tsx`,
`components/theme/ThemeProvider.tsx`) - one button that flips between `light`
and `dark` from `resolvedTheme`, icons keep their CSS swap, label reads
"Switch to dark mode" or "Switch to light mode" after mount. Provider defaults
to light with System off. The click runs through the View Transitions API so
the page crossfades over 400ms where the browser supports it, and switches
instantly elsewhere or under reduced motion. `components/ui/dropdown-menu.tsx` is deleted.

**Nav data** (`data/siteConfig.ts`, `lib/services.ts`) - the nav is five
groups, each opening a panel:

| Button | Panel sections | Links |
|---|---|---|
| Facials | the four facial groups from `CATEGORIES` | every facial in that group, 22 total |
| Skin and Laser | Skin Treatments, Laser and IPL | 4 and 2 |
| Body | one | 4 |
| Massage | one | 8, length variants included so the count matches the category |
| More | What to treat, Clinic | the eight concerns; Our story, Hours and location, Contact |

The data model is untouched: five categories stay five in `CATEGORIES`, the
header simply shows Skin and Laser under one button because two and four
services each do not earn a bar slot. Types:

```ts
export type NavSection = { label?: string; href?: string; links: SiteLink[] };
export type NavGroup = { label: string; href: string; sections: NavSection[]; more?: string };
export type NavItem = SiteLink | NavGroup;
```

Treatment groups carry `more: "See all N"` linking to the category page, since
that page has prices and photos. `serviceHref(service)` in `lib/services.ts`
builds `/treatments/<segment>/<slug>`.

**Desktop panel** (`components/layout/DesktopNav.tsx`) - each group opens a
panel with one column per section: an uppercase copper heading when the
section has a label (linked when it has an href), then the treatment names as
a plain list, and a "See all N" row along the bottom when the group has one.
Column count sets the width, from one column at 280px to four at 920px, and
the panel clamps to the viewport.

**Mobile sheet** (`components/layout/MobileNav.tsx`) - one accordion row per
group. Expanding a row shows its sections with small headings and every link,
then the "See all N" line. No nested accordion; the sheet body scrolls.

**Must not break**

- Scroll hiding, the Book now CTA, the phone link and the sheet footer stay.
- `data/services.ts` and `data/categories.ts` are not edited.
- The footer keeps its own flat treatment list.
- No package changes.
- Category and treatment routes still 404 until features 4 and 5.

## Build steps

- [x] **1. Theme toggle.** Single button, light default, no System,
  `dropdown-menu.tsx` deleted.
  **Done when:** one click switches the theme and the label flips; reload
  keeps it; no System option exists.
- [x] **2. Nav data.** Section-based `NavGroup`, five groups as in the table,
  `serviceHref`.
  **Done when:** `npx tsc --noEmit` passes and the Facials group carries four
  sections whose links total 22.
- [x] **3. Desktop panels.** Column per section, heading per labelled section,
  "See all N" row.
  **Done when:** at 1280px the bar reads Facials, Skin and Laser, Body,
  Massage, More; hovering Facials shows four columns totalling 22 names
  inside the viewport; More shows the eight concerns and three clinic links; Escape closes; Tab enters.
- [x] **4. Mobile rows.** One row per group, full lists, scrolling sheet.
  **Done when:** at 375px the sheet shows the five rows, Facials expands to
  22 names under four headings and the sheet scrolls to reach them, tapping a
  name closes the sheet and navigates.

## Verify

Dev server on port 3001, both themes, 375px then 1280px.

1. Click the theme button: flips, sticks across reload, no menu.
2. Desktop: bar reads Facials, Skin and Laser, Body, Massage, More. Hover
   each; count Facials to 22 and Massage to 8. Tab through a panel.
3. Mobile: burger, Facials, scroll to the bottom of the list, tap the last
   name: sheet closes, URL is a treatment route.
4. `npm run lint` and `npm run build` clean; no "Treatments" or "Concerns"
   button in the header.

## Implementation walkthrough

**How it got here** - the spec was written for a curated four-per-category
panel under one Treatments label, built, and shown to Frank, who asked for
the categories on the bar themselves with every treatment listed. The spec
was rewritten mid-build and the panel and sheet rebuilt on the same branch.
Then the concerns, which had quietly vanished when Concerns left the bar,
came back under the fifth button. That is why this archive's spec reads as
the second design; the first cut lives only in this paragraph.

**Theme toggle** (`components/theme/ModeToggle.tsx`,
`components/theme/ThemeProvider.tsx`, `app/globals.css`) - one button whose
label follows `resolvedTheme` after mount, using `useSyncExternalStore` as
the hydration guard so the server-rendered label never mismatches. The click
wraps `setTheme` in `document.startViewTransition` with `flushSync`, so the
DOM change lands inside the transition callback and the browser crossfades the
whole page; `::view-transition-old(root)` and `-new(root)` set the duration
to 400ms (Frank started at 300 and asked for a touch more), and reduced motion
turns the animation off. Browsers without the API just switch. The provider
defaults to light with System disabled; `disableTransitionOnChange` stays,
since the crossfade replaces per-element transitions rather than relying on
them. `components/ui/dropdown-menu.tsx` was deleted as the toggle was its
only user.

**Nav data** (`data/siteConfig.ts`, `lib/services.ts`) - the nav is built
from sections: a `NavGroup` has a label, an href for its own name, a list of
`NavSection`s (optional heading, optional heading link, links) and an
optional `more` line. Facials takes its four sections from the facial
`groups` already in `CATEGORIES`, filtering services by `group`. Skin and
Laser is one button over two categories because two and four services do not
earn a bar slot each; the data model keeps five categories and the section
headings link to the two category pages. Massage lists all eight including
the two length variants so "See all 8" matches what the category page will
show. The fifth button is "More" with two sections: "What to treat", the eight
concerns via `concernHref`, and "Clinic" with Our story, Hours and location
and Contact. `serviceHref` builds `/treatments/<segment>/<slug>` from the
category's URL segment. The footer keeps its own flat treatment list.

**Desktop panels** (`components/layout/DesktopNav.tsx`) - one column per
section, width and grid class chosen from the column count (280px for one,
920px for four), clamped to the viewport. Headings are 11px uppercase copper
text, linked when the section has an href. Rows tint on hover. The "See all
N" line sits in a bordered footer row. The trigger is marked active when the
pathname matches the group href or any link in it. `align="center"` on the
menu lets Base UI shift the panel to stay inside the viewport, which is why
the Facials panel hugs the left edge at 1280px.

**Mobile sheet** (`components/layout/MobileNav.tsx`) - one accordion row per
group with the sections and their headings inline, no second accordion level;
the earlier nested version was replaced because Frank preferred scrolling to
a second tap. Base UI renders each accordion trigger inside an `h3`, which the
global stylesheet sets to Cormorant, so the trigger carries `font-sans`
explicitly. The generated accordion underlines links inside its panel, so the
content overrides that. The sheet body scrolls; at 375px the Facials list
runs to about 1280px against a 608px viewport.

**Verified** - `npx tsc --noEmit`, `npm run lint` and `npm run build` clean.
Desktop at 1280px: the bar reads Facials, Skin and Laser, Body, Massage, More;
Facials opens four columns of 6, 7, 6 and 3 links totalling 22 with "See all
22"; Massage lists 8; More lists the eight concerns and three clinic links;
Escape closes each and Tab enters a panel. The toggle flips to dark and back
with `startViewTransition` present, and the choice survives a reload. Mobile
at 375px: five rows, Facials expands to 22 names under four headings, the
sheet scrolls, tapping Radio Frequency Facial closed the sheet and landed on
`/treatments/facials/radio-frequency-facial`. Reduced motion was checked by
rule only.
