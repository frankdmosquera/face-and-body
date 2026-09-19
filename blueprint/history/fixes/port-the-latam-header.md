# Fix: Port the LATAM header

**Type:** Fix
**Status:** verified
**Branch:** `fix/port-the-latam-header`

## The problem

The header from feature 1 is a flat row of five links with a burger that
drops a plain list under the bar. It works, but Frank has seen a better header
on `the-latam-painters` and wants that behaviour here, restyled in this site's
tokens rather than copied:

- The header never gets out of the way. On a phone it eats 64px of every
  screen while the visitor scrolls a long treatment page.
- Desktop has no dropdown, so the five categories sit as bare labels with no
  hint of what is inside. The primary user is choosing by what a treatment
  does, and the nav gives her nothing to go on. Concerns, the entry point that
  matches how she thinks, are not in the nav at all.
- The mobile menu is a plain list under the bar. It has no phone or Book now
  pinned where a thumb can reach them, and no room for sub-links.

Reference files, behaviour only, never styling:

| Behaviour | LATAM file |
|---|---|
| Hide on scroll down, return on scroll up | `components/HeaderScrollHider.tsx`, `hooks/useScrollDirection.ts` |
| Desktop dropdown panels with title and blurb per link | `components/NavBar.tsx` on shadcn `navigation-menu` |
| Mobile sheet from the right, accordion sub-links, phone and CTA pinned at the bottom, staggered reveal | `components/MobileNav.tsx` on shadcn `sheet` and `accordion` |

## The fix

Three behaviours, one header. Everything reads `siteConfig.nav`, which grows
from a flat list into grouped items so the dropdowns and the accordion render
the same data.

**Nav data.** In `data/siteConfig.ts`, `nav` becomes `NavItem[]`:

```ts
export type NavLink = SiteLink & { blurb: string };
export type NavItem = SiteLink | { label: string; items: NavLink[] };
```

Three items: **Treatments** (the five `CATEGORIES`, blurb from
`category.blurb`), **Concerns** (every entry in `CONCERNS`, blurb from
`concern.description`, href from a `concernHref` helper in `data/concerns.ts`
matching `categoryHref`), and **About**. Contact stays in the footer; the
header CTA is Book now. Footer links keep the plain `SiteLink[]` shape.

**Hide on scroll.** `hooks/useScrollDirection.ts` and a client
`components/layout/HeaderScrollHider.tsx` that wraps the existing header
markup. Visible at the top (under 10px), hidden past that while scrolling
down, back on the first scroll up. The transform transitions over 300ms. The
known LATAM quirk (Tab focus lands on the hidden header for 300ms) gets the
cheap fix: a `focusin` on the header shows it. `SiteHeader` stays a server
component and passes its markup in as `children`, per the interactive-shell
rule in the coding standards.

**Desktop dropdown.** `components/layout/DesktopNav.tsx` on shadcn
`navigation-menu`. Treatments and Concerns open a panel; About is a plain link.
Each panel is a two-column grid of title plus blurb, restyled: uppercase
tracked labels as the current nav, Cormorant titles inside the panel, copper
underline on hover, `bg-card` panel with `border-border`. The trigger for the
open section is marked active when the pathname starts with `/treatments` or
`/concerns`; plain links keep `aria-current="page"`.

**Mobile sheet.** `components/layout/MobileNav.tsx` on shadcn `sheet` and
`accordion`. Slides from the right, full width on phones and `sm:max-w-sm`
above. Header row holds the `Brand` wordmark. Treatments and Concerns are
accordion items whose sub-links show label only, no blurb. About is a plain
row. Footer pinned to the bottom with the call and text links side by side
(`siteConfig.phone.tel` and `.sms`, the site is text-first) and a full-width
Book now, with bottom safe-area padding. Items reveal with a stagger built from a
`nav-item-in` keyframe in `globals.css` and `nth-child` delays for up to eight
top-level rows, off under `prefers-reduced-motion`. Escape and any link close
the sheet; focus returns to the burger.

**Must not break**

- `ModeToggle` stays in the header on every breakpoint, next to the burger on
  mobile. It is not moved into the sheet.
- `Brand`, `Container`, `SiteFooter` and the theme setup are untouched.
- `NavMenu.tsx` is deleted once both replacements are in. Nothing else imports
  it; confirm with a grep before removing.
- No `motion`, no new packages. The three shadcn components are files added
  with `npx shadcn add navigation-menu sheet accordion`. `@base-ui/react` is
  already installed, so the CLI should add no dependency. If it tries to
  install one, stop and ask before continuing.
- Header height, blur and 88% ground colour stay as feature 1 set them, so the
  home page sections under it do not shift.
- Mobile first: check 375px before 1280px.

## Build steps

- [x] **1. Data and foundations.** Add `NavLink` and `NavItem` types and the
  grouped `nav` to `data/siteConfig.ts`, add `concernHref` to
  `data/concerns.ts`, add the three shadcn component files, add
  `hooks/useScrollDirection.ts` and `HeaderScrollHider.tsx`, and wrap the
  current header in it. Update `NavMenu` only enough to compile against the
  new shape (render plain links, flatten grouped items) so the site keeps
  working between steps.
  **Done when:** `npm run build` and `npm run lint` pass, the header slides
  away scrolling down the home page and returns on scroll up, and tabbing
  into the hidden header brings it back.
- [x] **2. Desktop dropdown.** Add `DesktopNav.tsx`, mount it in `SiteHeader`
  from `lg` up, keep the phone and Book now on the right.
  **Done when:** at 1280px hovering or focusing Treatments opens a panel of
  five categories with blurbs, Concerns opens the full concerns list, About
  is a plain link, the active section is marked, arrow keys move between
  items, Escape closes, and the panel reads correctly in light and dark.
- [x] **3. Mobile sheet.** Add `MobileNav.tsx`, mount it below `lg` in place
  of the burger, delete `NavMenu.tsx`.
  **Done when:** at 375px the burger opens a sheet from the right with
  Treatments and Concerns as accordions, About as a row, call, text and Book
  now pinned at the bottom, rows stagger in, tapping a link closes it and
  navigates, Escape closes it and focus returns to the burger, and the sheet
  is hidden from the page while closed.

## Verify

Dev server on `http://localhost:3000`, both themes, 375px then 1280px.

1. Scroll down the home page: header leaves within 300ms. Scroll up a few
   pixels: it returns. At the very top it is always present.
2. From the top of the page press Tab repeatedly after scrolling down: the
   header reappears when focus enters it.
3. Desktop: hover Treatments, read five titles and blurbs, click one and land
   on its category route (a 404 until feature 4 is fine, the URL is the check).
   Hover Concerns, count the entries against `data/concerns.ts`. Tab through
   the menu with the keyboard only.
4. Mobile: open the sheet, expand Treatments, tap Facials, confirm the sheet
   closed and the URL changed. Reopen, press Escape, confirm focus is on the
   burger. Check the call link is `tel:`, text is `sms:`, and Book now goes to
   `/contact`.
5. Toggle reduced motion in DevTools: sheet rows appear with no stagger.
6. `npm run build` and `npm run lint` are clean, and `NavMenu.tsx` is gone.

## Implementation walkthrough

**Nav data** (`data/siteConfig.ts`, `data/concerns.ts`) - `nav` grew from
a flat `SiteLink[]` into `NavItem[]`, where an item is either a plain link
or a `NavGroup` of `NavLink`s carrying a blurb. `isNavGroup` is the one
type guard both navs branch on. Treatments maps `CATEGORIES` and takes each
category's existing `blurb`; Concerns maps `CONCERNS` and takes each
concern's landing-page `description`, so the dropdown copy is the same text
feature 6 will put at the top of those pages. `concernHref` was added next
to the data, mirroring `categoryHref`, so no component builds a concern URL
by hand. The footer keeps its flat `SiteLink[]` shape and did not change.

**Hide on scroll** (`hooks/useScrollDirection.ts`,
`components/layout/HeaderScrollHider.tsx`) - the hook is the LATAM one with
two changes: a `threshold` argument instead of a literal 10, and a `show`
callback returned beside `visible`. The wrapper is the client shell from the
coding standards' interactive-shell rule: it owns the `<header>` element and
its transition, and `SiteHeader` stays a server component passing markup in
as children. The LATAM quirk where Tab focus lands on a hidden header is fixed
with `onFocus={show}` on the header, which React delivers for any descendant
gaining focus. Tailwind v4 implements `-translate-y-full` on the CSS
`translate` property rather than `transform`, which matters when reading
the state back in DevTools.

**Desktop dropdown** (`components/layout/DesktopNav.tsx`,
`components/ui/navigation-menu.tsx`) - the shadcn navigation menu on Base UI.
Triggers are restyled to the feature 1 nav look: uppercase 13px tracked text
with a copper bottom border on hover, open and active, and the default rounded
muted pill removed. The panel is a 600px two-column grid; each cell is a Base
UI `Link` rendering a Next `Link` with a Cormorant title, the blurb, and a
copper rule that widens on hover, the same motif as the home page category
cards. `closeOnClick` closes the panel on navigation. Active state comes
from `usePathname`: a group trigger gets `data-active` when any of its links
matches, and plain links carry `aria-current="page"`. The only edit to the
generated file is the popup surface: `rounded-md`, `shadow-lg` and
`ring-border` instead of the neutral defaults.

**Mobile sheet** (`components/layout/MobileNav.tsx`,
`components/ui/sheet.tsx`, `components/ui/accordion.tsx`) - the burger is
the same round button feature 1 drew, now a `SheetTrigger`. The sheet slides
from the right, full width on phones and `sm:max-w-sm` above, with the
`Brand` wordmark in its header row. Treatments and Concerns are each a
single-item `Accordion` so the stagger treats them as one row; sub-links
show label only with a copper-tinted left rule. The footer is pinned with the
call and text links side by side, because the site is text-first, and a
full-width Book now. That Book now is a `SheetClose` rendering a Next
`Link`, which needs `nativeButton={false}` or Base UI warns in the console
that it expected a real button. Closing after navigation is handled by the
render-time state adjustment React recommends (`seenPathname`) rather than
an effect, because the project's lint config rejects `setState` inside an
effect body; this also covers the wordmark in the sheet header, which is a
plain `Brand` and takes no click handler. The generated sheet's close button
referenced a `ghost` variant and an `icon-sm` size this project's button
does not define, so it now uses `outline` and `icon`.

**Stagger** (`app/globals.css`) - one `nav-item-in` keyframe (fade plus a
24px slide from the right) and a `.stagger` rule that animates each direct
child with a delay of 60ms plus 50ms per row, using `nth-child` for up to
eight rows so no inline style is needed. Base UI unmounts the sheet on close,
so the animation replays on every open. `prefers-reduced-motion` turns it
off entirely.

**What went** - `components/layout/NavMenu.tsx`, the feature 1 burger list,
was flattened to compile in step 1 and deleted in step 3. Nothing else imported
it. No package changed: the three shadcn components were added as files and
`@base-ui/react` was already installed, so the CLI installed nothing.

**Verified** - `npx tsc --noEmit`, `npm run lint` and `npm run build` clean.
In the browser at 375px: sheet opens with three rows, the Treatments accordion
lists five links, tapping Facials closed the sheet and landed on
`/treatments/facials`, Escape closed it with focus back on the burger, the
footer links are `tel:`, `sms:` and `/contact`. At 1280px: the Treatments
panel lists five links and Concerns eight, Escape closes, Tab moves focus into
the panel, and both panels read correctly in light and dark. The header class
flips to hidden on scroll down, back on scroll up, back on focus, and stays
visible at the top. Reduced motion was checked by rule only, not in a browser.
