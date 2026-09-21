/**
 * The media library folder for this project. It lives here rather than inside
 * the endpoint variable on purpose: a folder name is a fact about the repo, not
 * about a deployment, and hiding it in an env var let local and production
 * drift apart. Production spent a day serving 404s from
 * `/b5xayf4mq/hero-led.jpg` while local served `/b5xayf4mq/face-and-body/hero-led.jpg`,
 * because only one of the two endpoints had the folder appended by hand.
 *
 * Accepting the endpoint with or without the folder keeps both spellings
 * working, so nothing breaks whichever value a given environment holds.
 */
export const IMAGEKIT_FOLDER = "face-and-body";

/**
 * Cache-busting token appended to every ImageKit URL.
 *
 * ImageKit serves images with `max-age=31536000` - a one-year browser cache -
 * and a photo swapped in under its existing filename keeps the same URL. So a
 * replaced photo keeps showing the old file to anyone who had already loaded
 * it, which on 2026-09-19 made a whole set of new images look like a failed
 * upload. curl is no help diagnosing it: curl has no cache, so it reports the
 * new image while every real browser still shows the old one.
 *
 * Bump this whenever a file in the media library is replaced in place. It
 * changes the URL, so every browser refetches once and then caches again for
 * the year. Leaving it alone costs nothing.
 */
export const MEDIA_VERSION = "2026-09-19";

function resolveEndpoint(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const base = raw.replace(/\/+$/, "");
  return base.endsWith(`/${IMAGEKIT_FOLDER}`)
    ? base
    : `${base}/${IMAGEKIT_FOLDER}`;
}

export const imagekitEndpoint = resolveEndpoint(
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
);

// A deploy without the endpoint is a mistake; a local build without it is
// just the account not existing yet, so callers get a labelled box instead.
if (!imagekitEndpoint && process.env.VERCEL === "1") {
  throw new Error("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set");
}
