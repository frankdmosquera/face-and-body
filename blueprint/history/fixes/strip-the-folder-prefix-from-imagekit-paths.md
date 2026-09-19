# Fix: Strip the folder prefix from ImageKit paths

**Type:** Fix
**Status:** verified
**Branch:** `fix/strip-the-folder-prefix-from-imagekit-paths`

## The problem

No photo on the site loads. Every request goes to a doubled folder:

```
https://ik.imagekit.io/<id>/face-and-body/face-and-body/hero-led.jpg
```

Two places each add the folder once:

- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` in `.env.local` now ends with
  `/face-and-body`. That matches how `primo-painters` is set up, where the
  endpoint ends with `/primo-painters` and every path is relative to it.
- All thirteen `path` values in `data/images.ts` also start with
  `/face-and-body/`, because feature 3 was written against the bare account
  endpoint (its archive records `https://ik.imagekit.io/b5xayf4mq`).

The header comment in `data/images.ts` still describes the old convention, and
`.env.example` leaves the endpoint blank, so nothing tells the next clone
which shape the variable takes. `Photo.tsx` is correct and does not change.

## The fix

Follow Primo: the folder lives in the endpoint, the paths are relative to it.

- In `data/images.ts`, remove the `/face-and-body` prefix from all thirteen
  `path` values, so `/face-and-body/hero-led.jpg` becomes `/hero-led.jpg`.
  Update the header comment to say the path is relative to the site folder
  named by the endpoint.
- In `.env.example`, show the shape:
  `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<id>/face-and-body`.
  Without it, a fresh clone sets the bare account URL and gets the mirror image
  of this bug.

**Must not break**

- `.env.local` is not touched. It already has the folder endpoint and is
  ignored by git.
- No slot name, alt text, source or size changes. Only the thirteen `path`
  strings and the comment.
- `Photo.tsx`, `ImageSlot` and every component reading `IMAGES` stay as they
  are.
- The Vercel project's `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` must carry the
  folder too before the next push, or production gets the same 404s. That is
  a dashboard check, not code; it is listed under Verify.

## Build steps

- [x] **1. Paths and docs.** Strip the prefix from the thirteen paths, rewrite
  the header comment, and fill in the endpoint shape in `.env.example`.
  **Done when:** `npm run lint` and `npm run build` pass, and on the running
  dev server every image on the home page reports `naturalWidth > 0` with a
  request URL containing `/face-and-body/` exactly once.

## Verify

1. Load the home page on the dev server. The hero, five category cards, the
   signature photo, the result photo, the three Eminence shots, the
   consultation photo and the room photo all render.
2. In DevTools, filter the network panel by `imagekit`: every URL has the
   folder once and returns 200.
3. `grep -c "/face-and-body/" data/images.ts` returns 0.
4. Before pushing `main`: open the Vercel project settings and confirm
   `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` ends with `/face-and-body`.

## Implementation walkthrough

**Paths** (`data/images.ts`) - a single regex pass turned every
`path: "/face-and-body/..."` into `path: "/..."`, thirteen replacements and
nothing else in the object. Slot names, alt text, sources and sizes are
byte-identical. The header comment now states the convention the endpoint
imposes: paths are relative to the site folder, and the endpoint ends in
`/face-and-body` the way Primo's ends in `/primo-painters`. `Photo.tsx` was
already right and did not change; it simply joins the endpoint and the path.

**Why the paths and not the endpoint** - both fixes produce the same URL. The
endpoint form was chosen because `.env.local` had already been set that way to
match Primo, and keeping the two client sites on one convention means the next
site is set up the same way without thinking. The feature 3 archive records the
bare account endpoint, which is how the folder ended up in both places.

**`.env.example`** - filled in with the endpoint shape as the spec asked, but
the file matches the `.env*` rule in `.gitignore` and is not tracked, so the
edit exists only on this machine. A fresh clone never sees the file. Making it
travel needs a `!.env.example` exception in `.gitignore`, which was left out
as scope beyond this spec.

**Verified** - `npm run lint` and `npm run build` clean. On the dev server at
port 3001, after scrolling every section into view so lazy images requested:
13 images on the page, 13 loaded with `naturalWidth > 0`, every ImageKit URL
containing `/face-and-body/` exactly once, no ImageKit errors in the console.
`grep -c "/face-and-body/" data/images.ts` returns 0. The Vercel environment
variable was not checked from here; it must end in `/face-and-body` before
`main` is pushed.
