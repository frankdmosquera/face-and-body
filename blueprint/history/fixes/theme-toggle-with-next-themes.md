# Fix: Theme toggle with next-themes

**Type:** Fix
**Status:** verified
**Branch:** `fix/theme-toggle-with-next-themes`

## The problem

Feature 1 shipped light and dark palettes, but the theme only follows the OS
setting. A visitor cannot pick one, and the only way to see the other theme is
to change Windows or macOS settings. The `.dark` class seam and the
`localStorage.theme` key exist; nothing writes them.

Frank decided on 2026-09-18 to do this the shadcn way: `next-themes` for the
provider and hook, and shadcn's `ModeToggle` pattern for the control.

## The fix

Replace the hand-written head script in `app/layout.tsx` with `next-themes`,
which does the same before-paint class write plus the hook a toggle needs. Add
a `ModeToggle` in the header between the brand and `Book now`, styled like the
burger so it belongs to the header we already have.

Must not break:

- Class-based dark mode: `next-themes` gets `attribute="class"` so the existing
  `@custom-variant dark` and the `.dark` palette block stay untouched
- The storage key stays `theme` (next-themes' default), so nothing else changes
- No cream flash for dark visitors: `next-themes` injects its own pre-paint
  script; `suppressHydrationWarning` on `<html>` stays because of it
- Server-first: the provider and the toggle are the only new client components;
  `SiteHeader` stays a server component and mounts the toggle as a child
- Nothing in `package.json` beyond `next-themes`. If `npx shadcn add
  dropdown-menu` wants to add any package, stop and ask; `@base-ui/react` is
  already installed and should be all it needs

## Build steps

- [x] **1. Install and provide.** Ask before running `npm install next-themes`.
  Add `components/theme/ThemeProvider.tsx` (`"use client"`, wraps
  `next-themes`' `ThemeProvider` with `attribute="class"`,
  `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`). In
  `app/layout.tsx` wrap the body contents with it and delete the `themeScript`
  constant and its `<script>`; keep `suppressHydrationWarning`.
  **Done when:** `npm run lint` and `npm run build` pass; with a dark OS
  preference `/` still loads with `class="dark"` on `<html>` and no cream
  flash; `grep -n themeScript app/layout.tsx` returns nothing.

- [x] **2. Toggle.** Run `npx shadcn add dropdown-menu` (file only, see above).
  Add `components/theme/ModeToggle.tsx` following shadcn's dark-mode pattern:
  a round `size-10` icon button with `Sun` and `Moon` from `lucide-react`,
  swapped with `scale-100 dark:scale-0` / `scale-0 dark:scale-100` so no
  mounted check is needed, `aria-label="Toggle theme"`, opening a menu with
  Light, Dark and System that call `setTheme`. Mount it in `SiteHeader` inside
  the `NavMenu` children, before the phone link, visible at every width.
  **Done when:** build and lint pass; at 375px and 1280px the toggle is
  visible; choosing Dark adds `class="dark"` to `<html>`, turns the body ground
  to `rgb(28, 26, 23)` and stores `theme=dark` in `localStorage`; a reload
  keeps it; choosing System stores `theme=system` and follows the OS again.

## Verify

1. `npm run lint` and `npm run build`.
2. Open `http://localhost:3000`. Click the sun/moon in the header, pick Dark:
   page turns dark immediately, reload keeps it dark.
3. Pick Light: page turns cream, reload keeps it.
4. Pick System: page follows the OS setting again.
5. Check the toggle sits between the brand and `Book now` at phone width without
   pushing the button off screen.

## Implementation walkthrough

**Provider** (`components/theme/ThemeProvider.tsx`) - a thin client wrapper
around `next-themes` with `attribute="class"`, `defaultTheme="system"`,
`enableSystem` and `disableTransitionOnChange`. Class mode is the whole point:
the `@custom-variant dark` and the `.dark` palette from feature 1 are untouched,
and `next-themes` simply becomes the thing that writes the class. It uses the
same `theme` key in `localStorage` the old script read, so the seam carried
over with no migration.

**Layout** (`app/layout.tsx`) - the hand-written pre-paint script and its
`<head>` are gone; the provider wraps header, main and footer inside `<body>`.
`suppressHydrationWarning` stays on `<html>` because `next-themes` injects its
own pre-paint script that edits the class before React hydrates. The layout is
still a server component; only the provider boundary is client.

**Toggle** (`components/theme/ModeToggle.tsx`) - shadcn's dark-mode pattern:
a round `size-10` trigger matching the burger, `Sun` and `Moon` from
`lucide-react` stacked and swapped with `scale-100 dark:scale-0` and its
mirror, so the icon is right on first paint with no mounted check and no
hydration mismatch. The menu offers Light, Dark and System through
`setTheme`. It uses the shadcn `DropdownMenu`, added with
`npx shadcn add dropdown-menu`, which created one file and no package
because `@base-ui/react` was already installed.

**Header** (`components/layout/SiteHeader.tsx`) - the toggle is passed into
`NavMenu` as the first child, so it sits before the phone number and Book
now at every width. `SiteHeader` stays a server component.

**Dependency** - `next-themes ^0.4.6`, approved by Frank on 2026-09-18 before
install. Nothing else changed in `package.json`.

**Decision worth recording** - choosing System stores `theme=system` rather
than clearing the key. That is how `next-themes` behaves and it is fine; the
spec's done-when was corrected to say so.

**Checks run** - `npm run lint` and `npm run build` (`/` static). Browser at
`localhost:3000`: toggle visible at the pane's 334px width without pushing
Book now off screen; Dark sets `class="dark"`, ground `rgb(28, 26, 23)` and
`theme=dark`, survives a reload; System sets `theme=system` and follows the
OS; three fresh loads with every request `200`.
