# Fix: ImageKit folder belongs in the repo, not the endpoint variable

**Type:** Fix
**Status:** verified
**Branch:** `fix/imagekit-folder-in-repo-not-env`

## The problem

No images on the live site. Every photo 404ed.

The live pages requested `https://ik.imagekit.io/b5xayf4mq/cat-facial.jpg`.
The file is at `https://ik.imagekit.io/b5xayf4mq/face-and-body/cat-facial.jpg`.
One path segment apart, same file.

`Photo.tsx` builds the URL as endpoint + path, where path comes from
`data/images.ts` as a bare `/cat-facial.jpg`. The `face-and-body` folder was
carried in the endpoint variable instead, so it existed in `.env.local` and
not in Vercel. Commit `2d25a51` moved the folder out of the paths and into the
endpoint; only the local copy of the endpoint was updated.

Everything else was fine, which is what made it hard to see. All thirteen
images are uploaded and serve 200 under the folder. The account, the paths,
the component and the deploy were all correct. The only wrong thing was a
string in a dashboard nobody can see from the repo, and nothing in the repo
recorded what it should be, because the scaffold's `.env*` ignore rule also
swallows `.env.example` (finding F-04, still open).

## The fix

Move the folder into the code, where git can see it.

`Photo.tsx` holds `const FOLDER = "face-and-body"` and appends it to the
endpoint unless it is already there. A folder name is a fact about the repo,
not about a deployment, so this is where it belongs; the environment variable
goes back to naming only the account.

Accepting the endpoint with or without the folder means both spellings keep
working, so no environment has to be touched for the site to come right and
neither can drift from the other again.

## Verify

Built three times with different endpoint values and read the rendered URL out
of the static HTML:

| Endpoint given to the build | Rendered URL |
|---|---|
| `https://ik.imagekit.io/b5xayf4mq` (Vercel's) | `.../b5xayf4mq/face-and-body/cat-facial.jpg` |
| `https://ik.imagekit.io/b5xayf4mq/face-and-body` (local) | identical |
| `https://ik.imagekit.io/b5xayf4mq/` (trailing slash) | identical |

All thirteen slots in `data/images.ts` return 200 at that URL, checked
individually. `npx tsc --noEmit`, `npm run lint` and `npm run build` clean,
19 routes, 14 distinct image URLs on the home page.

## Notes

The Vercel variable can still be corrected to the full endpoint and nothing
breaks, but it is no longer required. Primo Painters uses the same account and
the same pattern with `/primo-painters`, and its production variable does carry
the folder, which is why that site was unaffected.
