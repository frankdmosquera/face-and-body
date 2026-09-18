# Feature: Design foundation

**From build-plan:** feature 1
**Branch:** `feature/design-foundation`
**Status:** verified

## Goal

Port the locked look from `prototypes/theme.css` into the app so every later
page is built from one set of tokens, two fonts, the orchid motif and a shared
shell of header, footer and section primitives, in light and dark. After this
feature the scaffold placeholder is gone, the site renders in the brand
palette, and features 3 to 9 only add page content between an existing header
and footer.

## Design reference

- `prototypes/theme.css` - the `:root` block is the token source; everything
  under "Base layer" is prototype plumbing to rebuild as components
- `prototypes/home.html` lines 170 to 193 (header) and 446 to 464 (footer) for
  the shell markup; lines 195 to 210 for the interim home copy
- `prototypes/orchid.svg` - the motif, line drawn, coloured from the theme
- `prototypes/about.html:87` - the active nav link treatment
- There is no dark mockup. The dark palette is derived from the prototype's
  dark-band tokens, see Data / contracts

## In scope

- `app/globals.css` rewritten: Tailwind v4 `@theme` holding the brand tokens,
  shadcn semantic aliases mapped onto them, light and dark themes, base
  typography, two extra small-screen breakpoints
- Cormorant Garamond and Inter loaded through `next/font/google`, exposed as
  `--font-serif` and `--font-sans`; Geist removed
- Dark mode by OS preference through a `.dark` class on `<html>`, set before
  first paint, with the class as the seam for a later toggle
- `data/siteConfig.ts` seeded with only the facts the shell renders (name,
  phone, email, address, socials, nav and footer links)
- Section primitives: `Container`, `Section` (default, sand, dark), `Eyebrow`,
  `Lede`, `Divider`, `Watermark`, `Orchid`
- shadcn `Button` restyled to the prototype's pill treatment (primary, ghost,
  link)
- `SiteHeader`: sticky, brand wordmark, category links, phone, Book now, mobile
  menu, active link state
- `SiteFooter`: address block, three link columns, giant wordmark, copyright
- Root layout mounts the shell; root `metadata` default title and description
  come from `siteConfig` so "Create Next App" never ships
- `app/page.tsx` reduced to the prototype hero copy inside the new primitives,
  so the shell is observable now; feature 3 replaces it with the real home page

## Out of scope

- Hours, services, concerns, reviews and the rest of the business facts module
  (feature 2 extends the same `siteConfig.ts`)
- Any page beyond the interim home stand-in: categories, details, about,
  contact (features 3 to 9)
- The booking component and Cal.com (feature 11). Book now is a plain link to
  `/contact` until then. No Square link anywhere
- A visible theme toggle. The `.dark` class seam is built; the control is a
  later decision
- Per-page metadata, JSON-LD, sitemap, robots (feature 10)
- The announcement bar ("Now booking fall microneedling series") and the footer
  newsletter form from the prototype. Neither maps to a plan feature and both
  carry copy she has not approved
- Privacy and Terms links, FAQ, Gift cards, Before and after links in the
  footer. No Phase 1 route exists for them
- Logo image in the brand mark and a replacement favicon. Blocked on the logo
  file (project-plan blocker 2); the wordmark stands in
- Image placeholder or ImageKit wrapper primitives (first needed in feature 3)
- Removing `drizzle-orm`, `postgres`, `drizzle-kit`, `better-auth` from
  `package.json`. The plan wants them gone; that is a `/fix`, not this feature

## Build loop

- `workflow.stepReview` is `feature`: build all steps, then stop once for
  review before `/complete`. No pause between steps
- `workflow.checkpointCommits` is `disabled`: no commits during the build.
  `/complete` creates the single feature commit
- Every step ends with `npm run lint` and `npm run build` passing. There is no
  test runner and no Verify command; do not add one here
- Read `node_modules/next/dist/docs/` for `next/font`, `metadata` and inline
  scripts in the root layout before touching `app/layout.tsx`. Next 16 differs
  from older training data
- No package is installed for any of this. Theme detection is a few lines of
  hand-written script, not `next-themes`

## Build steps

- [x] **1. Tokens, fonts, themes, base layer.** Rewrite `app/globals.css`:
  keep the three `@import`s and `@custom-variant dark (&:where(.dark, .dark *))`,
  delete the scaffold's oklch palette, put the brand tokens from `theme.css`
  `:root` into `@theme` under the names in Data / contracts, add the `tn` and
  `xsm` breakpoints, and map the shadcn semantic variables onto the brand
  tokens in `:root` with the dark overrides in `.dark`, so `Button` and future
  shadcn parts inherit both palettes. Base layer: `body` ground and ink from
  the semantic tokens, Inter, 16px / 1.6, antialiased; `h1`-`h4` Cormorant
  Garamond 500, 1.1 line height, -0.01em tracking, with the prototype's
  72 / 48 / 28 desktop and 44 / 34 mobile sizes; `a` inherits colour with no
  underline. In `app/layout.tsx` replace Geist with `Cormorant_Garamond` (400,
  500, 600 and italic 400, 500) and `Inter` (400, 500) from `next/font/google`,
  `display: "swap"`, variables `--font-serif` and `--font-sans`, applied on
  `<html>`. Add the theme script from Data / contracts as the first child of
  `<head>` so the class lands before first paint, and `suppressHydrationWarning`
  on `<html>` because the script edits its class list.
  **Done when:** `npm run build` and `npm run lint` pass; on `/` with a light
  OS preference the computed `body` background is `rgb(247, 242, 234)`, with
  a dark preference it is `rgb(28, 26, 23)` and `<html>` carries `class="dark"`;
  `body` font-family starts with Inter and an `h1` resolves to Cormorant
  Garamond; no oklch value remains in `globals.css`.

- [x] **2. Site config seed.** Create `data/siteConfig.ts` exporting the
  `SiteConfig` constant in Data / contracts. Values come from
  `prototypes/home.html` footer and `blueprint/reference/business.md`: full
  address with Unit 330, postal code `T2X 1P1`, phone `(587) 969-3796`, email
  `faceandbodywellnesscentre@gmail.com`, Instagram
  `https://www.instagram.com/faceandbodywellnesscentre/`. Check: the Facebook
  page URL is not recorded in the repository. Look in `business.md` first; if
  absent, look it up on her Google Business Profile or Instagram bio (Frank
  approved this lookup on 2026-09-18) and record where it came from in
  `business.md`. If it still cannot be found, ask; do not invent it.
  **Done when:** `npm run build` passes and `grep -rn "969-3796" app components`
  returns nothing (no component hardcodes a fact).

- [x] **3. Primitives, orchid, buttons, interim home.** Add
  `components/layout/Container.tsx`, `Section.tsx`, `Eyebrow.tsx`, `Lede.tsx`,
  `Divider.tsx`, `Watermark.tsx` and `components/brand/Orchid.tsx` per Data /
  contracts. Restyle `components/ui/button.tsx` so `default` is the copper
  pill, `outline` the ghost pill, `link` the accent-underlined uppercase link;
  remove variants the prototype has no use for only if nothing imports them.
  Replace `app/page.tsx` with the hero copy from `home.html` 198 to 205
  (eyebrow, headline with the italic accent `work`, lede, `Book a treatment`
  primary button and `Free consultation` link button, both to `/contact`)
  inside `Section` and `Container`, with the `Watermark` behind it, followed
  by a `Divider`. No stars, follower counts, hero media or trust strip; those
  are feature 3.
  **Done when:** build and lint pass; `/` shows the copper watermark, serif
  headline with `work` in copper italic, a copper pill button and the orchid
  divider, in both themes; `public/next.svg`, `vercel.svg`, `file.svg`,
  `globe.svg`, `window.svg` are deleted and nothing references them.

- [x] **4. Header.** Add `components/layout/SiteHeader.tsx` (server) and
  `components/layout/NavMenu.tsx` (`"use client"`, reason: open state and
  `usePathname`). Header: sticky top, ground colour at 88% with 10px backdrop
  blur, bottom border, 76px tall (64px below `lg`); brand link to `/`
  rendering `siteConfig.shortName` in serif with `Wellness Centre` as the
  small caps line beneath; `NavMenu` renders `siteConfig.nav`; right side
  shows the phone as a `tel:` link (hidden below `lg`), the `Book now`
  primary button to `/contact`, and the burger (visible below `lg` only).
  Mobile menu: the burger is a `<button aria-label="Menu" aria-expanded
  aria-controls>` toggling a full-width list under the header; Escape closes
  it; it closes on route change. Active link gets `aria-current="page"` and
  the copper bottom border when the pathname equals the href or starts with
  `href + "/"`. Mount it in `app/layout.tsx` above `{children}`.
  **Done when:** build and lint pass; at 1280px wide the five links, phone and
  Book now are visible and the burger is not; at 375px the links and phone are
  hidden, the burger is visible, clicking it sets `aria-expanded="true"` and
  reveals the five links, Escape hides them again; on `/` no link carries
  `aria-current`; the header reads correctly in both themes.

- [x] **5. Footer.** Add `components/layout/SiteFooter.tsx` (server): dark
  band in light mode, `dark-surface` band in dark mode so it still separates
  from the page; 80px top / 32px bottom padding; four-column grid at `lg`
  (1.4fr 1fr 1fr 1fr), two columns below; column one is the brand wordmark and
  the address block (unit, street, city and postal code, phone as `tel:`,
  email as `mailto:`); the other three are `siteConfig.footer` groups with the
  accent-soft uppercase heading; then the giant serif `Face & Body` wordmark
  one step lighter than the band, clamped 64px to 160px, and a bottom row with
  the copyright using the current year and `siteConfig.name`. Mount it in
  `app/layout.tsx` below `{children}`, with `<main>` growing to keep the
  footer at the bottom on short pages.
  **Done when:** build and lint pass; the footer renders every address line
  and both link hrefs (`tel:`, `mailto:`) exactly as in `siteConfig`; every
  footer link href is one of the routes listed in Data / contracts; no
  `Privacy`, `Terms`, `Subscribe`, newsletter or Square markup exists.

- [x] **6. Root metadata and final pass.** In `app/layout.tsx` set
  `metadata.title` to `{ default: siteConfig.name, template:
  "%s | " + siteConfig.name }` and `metadata.description` to
  `siteConfig.description`. Confirm `<html lang="en">`, the font variables on
  `<html>`, and that `app/page.tsx` exports no metadata of its own (it
  inherits the default). Remove anything left from the scaffold: Geist
  imports, `font-mono` mapping to Geist Mono, scaffold `dark:` utilities on
  the old home page.
  **Done when:** build and lint pass; `document.title` on `/` is exactly
  `siteConfig.name`; `grep -rn "Create Next App\|geist" app components`
  returns nothing; `npm run build` reports `/` as a static route.

## Files / areas

| Path | Action | Owner after this feature |
|---|---|---|
| `app/globals.css` | rewrite | tokens and both palettes live here; later features add component CSS only when a utility cannot express it |
| `app/layout.tsx` | rewrite | fonts, theme script, metadata default, shell mount |
| `app/page.tsx` | replace | feature 3 replaces it again |
| `data/siteConfig.ts` | new | feature 2 extends it with hours and the rest |
| `components/layout/Container.tsx`, `Section.tsx`, `Eyebrow.tsx`, `Lede.tsx`, `Divider.tsx`, `Watermark.tsx` | new | shared |
| `components/layout/SiteHeader.tsx`, `NavMenu.tsx`, `SiteFooter.tsx` | new | shared |
| `components/brand/Orchid.tsx` | new | shared |
| `components/ui/button.tsx` | restyle | shared |
| `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` | delete | scaffold leftovers |
| `blueprint/reference/business.md` | append the Facebook URL and its source, step 2 only | reference |
| `prototypes/` | untouched | reference only; `orchid.svg` is copied as a React component, not moved |

## Data / contracts

### Brand tokens in `@theme`

Prototype `:root` names on the left, the Tailwind v4 token on the right. The
value is copied byte for byte from `theme.css`. These never change between
themes; the theme switch happens in the semantic layer below.

| theme.css | `@theme` | Utility example |
|---|---|---|
| `--bg` | `--color-cream` | `bg-cream` |
| `--surface` | `--color-surface` | `bg-surface` |
| `--surface-2` | `--color-sand` | `bg-sand` |
| `--border` | `--color-line` | `border-line` |
| `--dark` | `--color-dark` | `bg-dark` |
| `--dark-surface` | `--color-dark-surface` | `bg-dark-surface` |
| `--text` | `--color-ink` | `text-ink` |
| `--muted` | `--color-ink-muted` | `text-ink-muted` |
| `--faint` | `--color-faint` | `text-faint` |
| `--on-dark` | `--color-on-dark` | `text-on-dark` |
| `--on-dark-muted` | `--color-on-dark-muted` | `text-on-dark-muted` |
| `--accent` | `--color-copper` | `bg-copper` |
| `--accent-hover` | `--color-copper-hover` | `hover:bg-copper-hover` |
| `--accent-soft` | `--color-copper-soft` | `text-copper-soft` |
| `--accent-tint` | `--color-copper-tint` | `bg-copper-tint` |
| `--accent-ink` | `--color-copper-ink` | `text-copper-ink` |
| `--accent-text` | `--color-copper-text` | `text-copper-text` |
| `--placeholder-bg` / `--placeholder-text` | `--color-placeholder` / `--color-placeholder-text` | reserved for feature 3 |
| `--font-serif`, `--font-sans` | same names, values are the `next/font` variables with the prototype fallbacks | `font-serif`, `font-sans` |
| `--radius` 4px, `--radius-lg` 20px | `--radius-sm: 4px`, `--radius-lg: 20px` | `rounded-sm`, `rounded-lg` |
| `--container` 1200px | `--container-site: 1200px` | `max-w-site` |
| `--section` 112px / 64px | `--spacing-section: 112px`, `--spacing-section-sm: 64px` | `py-section` |
| `--gutter` 32px / 20px | `--spacing-gutter: 32px`, `--spacing-gutter-sm: 20px` | `px-gutter` |

`--price`, `--price-from`, `--tag-bg`, `--tag-text` are component states for
feature 5 and are not ported now.

The accent family is named `copper-*` and muted text `ink-muted` because
`--color-accent` and `--color-muted` collide with shadcn's semantic tokens of
the same name, and the semantic layer wins. Found in the browser check.

### Breakpoints

Tailwind's five stay (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536).
Two are added below them in `@theme`, because small phones are where layouts
break:

- `--breakpoint-tn: 22.5rem` (360px) - the smallest phones
- `--breakpoint-xsm: 27.5rem` (440px) - phones up to the large ones

Tailwind breakpoints are min-width, so these are used through their `max-`
twins: `max-tn:` is below 360px, `max-xsm:` is below 440px. The header
collapses at `lg`, the nearest standard step above the prototype's 900px.

### Semantic tokens, light and dark

The semantic layer is what components use for grounds and text, so a page
written once renders in both themes. Components reach for a brand token
directly only for the copper accent and for things that are the same in both
themes.

| Semantic | Light (`:root`) | Dark (`.dark`) |
|---|---|---|
| `--background` | `cream` | `dark` |
| `--foreground` | `ink` | `on-dark` |
| `--card`, `--popover` | `surface` | `dark-surface` |
| `--card-foreground`, `--popover-foreground` | `ink` | `on-dark` |
| `--secondary` (sand bands) | `sand` | `dark-surface` |
| `--secondary-foreground` | `ink` | `on-dark` |
| `--muted` | `sand` | `dark-surface` |
| `--muted-foreground` | `muted` | `on-dark-muted` |
| `--primary` | `accent` | `accent` |
| `--primary-foreground` | `accent-ink` | `accent-ink` |
| `--accent` | `accent-tint` | `dark-surface` |
| `--accent-foreground` | `accent-text` | `accent-soft` |
| `--border`, `--input` | `line` | `dark-surface` |
| `--ring` | `accent` | `accent` |
| `--radius` | `4px` | `4px` |

The dark palette is derived from the prototype's dark band, not designed. Small
copper text uses `accent-text` on light and `accent-soft` on dark because the
contrast requirement flips. Keep `--destructive`, the chart and sidebar
variables from the scaffold as they are, mapped to the nearest brand token in
each theme; nothing in Phase 1 uses them and deleting shadcn's contract is not
this feature's call. Map the semantic tokens into `@theme inline` exactly as
the scaffold does so `bg-background`, `text-foreground`, `bg-card`,
`text-muted-foreground` and the rest work as utilities.

### Theme detection

Light is the default because it is the locked look. Dark applies when the OS
prefers it. Inline in `<head>`, before any stylesheet paints:

```js
try {
  var stored = localStorage.getItem("theme");
  var dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
```

`localStorage.theme` is read but never written in this feature. It is the seam
for a later toggle, which writes `"light"` or `"dark"` there. No package.

### `data/siteConfig.ts`

```ts
export type SiteLink = { label: string; href: string };

export type SiteConfig = {
  name: string;          // "Face and Body Wellness Centre"
  shortName: string;     // "Face & Body"
  subName: string;       // "Wellness Centre", the line under the wordmark
  description: string;   // one sentence, used as the root metadata description
  phone: { display: string; tel: string; sms: string }; // "(587) 969-3796", "tel:+15879693796", "sms:+15879693796"
  email: string;
  address: { unit: string; street: string; city: string; province: string; postalCode: string };
  social: { instagram: string; facebook: string };      // full URLs
  nav: SiteLink[];
  footer: { heading: string; links: SiteLink[] }[];
};

export const siteConfig: SiteConfig
```

`description` is the prototype lede: "Advanced facials, microneedling, laser
and IPL, delivered by a qualified aesthetician who looks at your skin before
she looks at the menu."

Routes the shell may link to, all from the overview. Anything else is out:

| Link | href | Exists after |
|---|---|---|
| Facials | `/treatments/facials` | feature 4 |
| Skin Treatments | `/treatments/skin` | feature 4 |
| Body | `/treatments/body` | feature 4 |
| Massage | `/treatments/massage` | feature 4 |
| Laser and IPL | `/treatments/laser` | feature 4 |
| About | `/about` | feature 7 |
| Contact | `/contact` | feature 9 |
| Book now, Book a treatment, Free consultation | `/contact` | feature 11 swaps Book for the booking component |
| Instagram, Facebook | `siteConfig.social.*` | now |

`nav` is the prototype's five: Facials, Skin Treatments, Body, Massage, About.
`footer` is three groups: Treatments (the five categories), Clinic (About,
Contact), Book (Book now, Instagram, Facebook). Internal links 404 until their
feature lands; that is expected and not a defect of this feature.

Category slugs match the overview's `Service.category` enum (`facial`,
`skin`, `body`, `massage`, `laser`) except the URL segment for `facial` is
`facials`, as written in the build plan and prototype. Feature 2 decides the
slug-to-segment mapping formally; feature 1 only writes these hrefs.

### Components

- `Container` - `div`, `max-w-site mx-auto px-gutter-sm lg:px-gutter`
- `Section` - `section`, `tone?: "default" | "sand" | "dark"`; default has no
  background, `sand` is `bg-secondary`, `dark` is `bg-dark text-on-dark` in
  both themes (it is a brand band, not a theme surface) and swaps `Eyebrow` to
  `accent-soft` and `Lede` to `on-dark-muted` through a `data-tone` attribute
  the child primitives read. Vertical padding `py-section-sm lg:py-section`.
  `className` is merged with `cn`
- `Eyebrow` - `span`, Inter 12px, 0.18em tracking, uppercase,
  `text-accent-foreground`, 500
- `Lede` - `p`, 19px (17px below `lg`), `text-muted-foreground`, `max-w-[56ch]`
- `Divider` - centred `Orchid` at 44 by 46px between two 96px hairlines (48px
  below `lg`) in `border`; accepts `className`
- `Watermark` - absolutely positioned `Orchid` at 520 by 540px, `text-accent`,
  opacity 0.07 (0.1 in dark, it vanishes at 0.07), `pointer-events-none`,
  `aria-hidden`; the parent supplies `relative` and the offset
- `Orchid` - inline SVG from `prototypes/orchid.svg` with `stroke="currentColor"`,
  `aria-hidden`, `className` for size and colour. Inline rather than a CSS mask
  so the colour is any Tailwind text colour and no `public/` asset is needed
- `Button` - `default` copper pill (`bg-primary text-primary-foreground
  hover:bg-accent-hover`), `outline` ghost (`border-foreground text-foreground
  hover:bg-foreground hover:text-background`), `link` (13px uppercase, 0.08em
  tracking, accent bottom border). All: `rounded-full`, 14px by 26px padding
  (12 by 20 below `lg`), 13px, 500, 0.08em tracking, uppercase, 200ms colour
  transition. Inside `Section tone="dark"`, `outline` uses `on-dark`
- `SiteHeader`, `NavMenu`, `SiteFooter` - as in steps 4 and 5. `NavMenu`
  takes `links: SiteLink[]` and renders them; the header passes `siteConfig.nav`

All text a visitor can read comes from `siteConfig` or the prototype hero copy
copied verbatim. No other strings.

## Testing

- No unit test runner exists and `verification.logicTests` is
  `when-configured`, so no tests are added. The client component has one
  boolean of state and a pathname read; nothing here needs a test seam
- Gate for every step: `npm run lint` and `npm run build`, both must pass
- Browser evidence is gathered by `/check` after the build: computed styles in
  both colour schemes in step 1, the header behaviour at 1280px and 375px in
  step 4, the footer contents in step 5, `document.title` in step 6. No
  browser test harness exists, so none of this is automated
- Nothing in this feature claims live, persisted or integration evidence

## Notes for the AI

- **Two themes, light default.** Frank confirmed on 2026-09-18. The locked
  cream look is the default; dark follows the OS. The dark palette is derived
  from the prototype's existing dark-band tokens, so if it looks wrong the fix
  is in the `.dark` block, not in components. Components use semantic tokens
  for grounds and text so they never need a `dark:` prefix for those; `dark:`
  is for the few places a value genuinely differs, like the watermark opacity
- **Business facts start here, not in feature 2, because the shell needs
  them.** The standard forbids hardcoding a fact in a component, so the seed
  module is the only place the phone and address can live. Feature 2 extends
  the same file; it does not create a second one
- **No Square anywhere.** Frank decided on 2026-09-18 that the site will not
  link to Square booking even as an interim. Book controls go to `/contact`
  until feature 11. The label never names a provider (`decisions.md`)
- **Prototype pieces deliberately not ported:** `.announce`, `.news`, `.ph`
  placeholders, `.tag`, `.note`, `.rule-accent`, `.btn` as a class. Tags and
  placeholders return when a feature needs them
- **The brand mark is the wordmark only.** The only logo we have is a 150px
  Instagram avatar. Do not upscale it into the header. When the logo file
  lands, the brand component gets the image through the ImageKit wrapper
- **Motion is CSS only.** The transitions here are colour and border. Do not
  add an animation library. `tw-animate-css` is already installed and is CSS;
  leave the import alone
- **No inline styles**, no `tailwind.config.js`, no `src/`. Tokens are `@theme`
  in `globals.css`; component classes are Tailwind utilities. The one inline
  `<script>` is the theme detector and it is the only exception
- **No em dashes** anywhere, including the copyright line and comments
- **Server first.** `NavMenu` is the one client component and its reason is
  written in the file in one line. `SiteHeader` and `SiteFooter` stay on the
  server
- The `feature/research-and-prototypes` branch already exists and is merged;
  this feature gets its own branch from `main`

## Open questions

Neither blocks starting.

1. **Postal code.** Square, Yelp and the City licence say `T2X 1P1`; her own
   post says `T2X 1M2`. This spec uses `T2X 1P1` per `business.md`. It is one
   field in `siteConfig` if it changes.
2. **Dark palette sign-off.** Derived, not designed. Look at it in `/check`
   and say if a token needs a different value; the change is one line in the
   `.dark` block.

## Implementation walkthrough

**Tokens and themes** (`app/globals.css`) - brand values from `theme.css` sit
in `@theme` as `cream`, `sand`, `line`, `ink`, `ink-muted`, `copper-*` and
friends; they never change between themes. The shadcn semantic layer
(`--background`, `--primary`, `--muted-foreground` and the rest) is defined
twice, in `:root` for light and `.dark` for dark, each pointing at brand tokens,
and re-exposed through `@theme inline` so `bg-background` and
`text-muted-foreground` work as utilities. Components use semantic tokens for
grounds and text and reach for `copper-*` only where copper is copper in both
themes. Two extra breakpoints, `tn` 360px and `xsm` 440px, sit below
Tailwind's five for small-phone fixes through `max-tn:` and `max-xsm:`.
Decision made mid-build: the accent family is `copper-*` and muted text
`ink-muted` because `--color-accent` and `--color-muted` collide with shadcn's
semantic names and the semantic layer wins. Found in the browser check when
every copper element rendered as pale tint.

**Fonts and theme detection** (`app/layout.tsx`) - Cormorant Garamond and
Inter through `next/font/google` as `--font-cormorant` and `--font-inter`;
`@theme` maps them onto `font-serif` and `font-sans`. Naming the next/font
variable `--font-sans` would have fought the `@theme` definition on the same
element. An inline script in `<head>` adds `.dark` when `localStorage.theme`
says so or, failing that, when the OS prefers dark. It never writes; a later
toggle owns that. `suppressHydrationWarning` on `<html>` because the script
edits its class before React hydrates. Metadata title default and template come
from `siteConfig`.

**Business facts** (`data/siteConfig.ts`) - the only place a phone, address,
email, social URL or link list lives. `subName` was added so the "Wellness
Centre" line under the wordmark is not a hardcoded string. The Facebook URL was
found by web search and recorded in `business.md`. Every Book control points
at `/contact` until feature 11; no Square link anywhere.

**Primitives** (`components/layout/`, `components/brand/Orchid.tsx`) -
`Container`, then `Section` with a `tone` written as a `data-tone` attribute
that `Eyebrow`, `Lede`, `Divider` and the outline button read through
`in-data-[tone=dark]:`, so a dark band recolours its children without threading
props. `Orchid` is the path data from `prototypes/orchid.svg` inline with
`stroke="currentColor"`. `Watermark` is `Orchid` positioned absolutely at 0.07
opacity, 0.1 in dark where 0.07 vanished. `Brand` is shared by header and
footer; wordmark only until the logo file lands.

**Button** (`components/ui/button.tsx`) - shadcn's variants trimmed to
`default`, `outline` and `link`, restyled to the prototype pill.
`border-transparent` lives on the `default` variant rather than the base,
because on the base it competed with the link variant's `border-copper` and the
class merge kept the wrong one.

**Header** (`SiteHeader.tsx`, `NavMenu.tsx`) - the header is a server
component. `NavMenu` is the single client component, owning the burger's open
state and reading `usePathname` for `aria-current`. It wraps the nav and the
CTA cluster in a `display: contents` div so the header's flex layout positions
them, and takes the phone link and Book button as `children` rendered on the
server. The menu closes on link click and on Escape. Closing on route change
through an effect was avoided because it trips the set-state-in-effect lint
rule.

**Footer** (`SiteFooter.tsx`) - dark band in light, `dark-surface` in dark so
it still separates from the page; the giant wordmark is one step lighter than
whichever band it sits on. Internal links use `next/link`, external ones a
plain anchor. No newsletter, Privacy, Terms or Square: none map to a Phase 1
feature.

**Interim home** (`app/page.tsx`) - the prototype hero copy inside the
primitives so the shell is observable now. Feature 3 replaces it.

**Removed** - the five create-next-app SVGs in `public/`, the Geist fonts, the
scaffold's oklch palette and its `dark:` utilities.

**Checks run** - `npm run lint` and `npm run build` (`/` prerendered static).
In the browser at `localhost:3000`: light and dark grounds, font resolution,
copper values, 375px burger open, Escape, close, 1280px nav row with phone and
no burger, footer contents and hrefs, `document.title`, no console errors.
