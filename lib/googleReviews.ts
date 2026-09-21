import { siteConfig } from "@/data/siteConfig";

/**
 * Reads her Google reviews, server side. Ported from primo-painters, where it
 * has been running in production; the comments below are the reasons that
 * version settled on this shape, and they still hold here.
 *
 * SERVER ONLY, but not enforced. The `server-only` package would turn a
 * client-side import of this file into a build error. It is not installed and
 * nothing gets installed without asking, so this is a comment rather than a
 * guarantee. What does hold regardless: GOOGLE_MAPS_API_KEY has no
 * NEXT_PUBLIC_ prefix, so it is simply absent from the browser bundle.
 * Imported from a client component this returns empty rather than leaking it.
 *
 * SERVER SIDE, not in the browser. Review text fetched client side never
 * reaches the HTML, and on a site built to rank, review text Google cannot
 * read is review text that does not exist.
 *
 * TWO CACHES, DIFFERENT SCOPES. Do not collapse them into one.
 *
 *   next: { revalidate } here   the FETCH cache, keyed by URL and shared by
 *                               every caller. Decides how often GOOGLE is hit.
 *   export const revalidate     the PAGE cache, per page file. Decides how
 *                               often that page's HTML regenerates.
 *
 * The page one alone is not enough: several pages rendering this section would
 * regenerate on unaligned schedules and each would call Google. The fetch cache
 * means the first caller pays and the rest read the stored copy. Same at build
 * time, where `next build` renders every route in one run.
 *
 * The interval is not arbitrary. Reviews come from Place Details Enterprise +
 * Atmosphere: 1,000 calls a month free, then $25 per 1,000. Once a day is about
 * 30 a month. Do the arithmetic again before lowering it.
 *
 * NEVER THROWS. Every failure path returns empty. A dead key, a rotated place
 * id, a Google outage or a quota stop should cost the section its live data,
 * not take the page down. The caller falls back to the curated quotes in
 * `data/reviewsData.ts`, so the section never renders empty either.
 */

const ENDPOINT = "https://places.googleapis.com/v1/places";

/** Fours and fives are shown; three and below are not. */
const MIN_RATING = 4;

/** One day. See the note above before changing it. */
const REVALIDATE_SECONDS = 86_400;

export type GoogleReviewType = {
  rating: number;
  author: string;
  /** The reviewer's avatar, hosted by Google. */
  photoUrl?: string;
  /** Their Google profile, when Google supplies one. */
  authorUrl?: string;
  /** Google's own wording, e.g. "a month ago". Not a date we format. */
  relativeTime: string;
  text: string;
};

export type GoogleReviewsResultType = {
  /** Null when Google returned nothing, so callers can tell it from 0. */
  rating: number | null;
  total: number;
  reviews: GoogleReviewType[];
  /** The listing on Maps, for a "read or leave a review" link. */
  mapsUrl: string | null;
};

const EMPTY: GoogleReviewsResultType = {
  rating: null,
  total: 0,
  reviews: [],
  mapsUrl: null,
};

/**
 * Google's shape, named so the mapping below reads as a translation rather
 * than as guesswork. Everything is optional: a field mask can come back
 * partially filled, and a review can carry a rating with no text.
 */
type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

/**
 * A real photograph, or nothing.
 *
 * Google never reports "no avatar". For anyone who has not uploaded a
 * picture it generates one - a flat coloured circle with their first letter -
 * and returns that like any other image. So the card always received a valid
 * src, the initials fallback never fired, and the section showed a row of
 * purple, magenta and slate circles that belong to Google's palette and not
 * to this site's.
 *
 * The two are told apart by the path. An uploaded photo is served from
 * `/a-/`; a generated one from `/a/`. All five of her current reviewers are
 * `/a/`, so all five now fall through to the copper initials. If someone
 * with a real photo reviews her tomorrow, theirs shows.
 */
function uploadedPhoto(uri: string | undefined) {
  return uri?.includes("googleusercontent.com/a-/") ? uri : undefined;
}

export async function getGoogleReviews(): Promise<GoogleReviewsResultType> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = siteConfig.reviews.placeId;

  if (!key || !placeId) return EMPTY;

  try {
    const response = await fetch(`${ENDPOINT}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        // Asking for less costs less. Every extra field can move the request
        // into a pricier SKU, and reviews already sit in the dearest one.
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return EMPTY;

    const data = (await response.json()) as PlacesResponse;

    const reviews: GoogleReviewType[] = (data.reviews ?? [])
      // A review can be a star rating with no words. Nothing to quote.
      .filter((review) => review.text?.text)
      // Fours and fives only. A three or below is a real review and it stays
      // on her listing where anyone can read it - the rating and the count
      // above the section are Google’s unfiltered numbers, and the link
      // goes straight to the listing. This section is the testimonial wall,
      // not the record.
      .filter((review) => (review.rating ?? 0) >= MIN_RATING)
      .map((review) => ({
        rating: review.rating ?? 0,
        author: review.authorAttribution?.displayName ?? "Google reviewer",
        photoUrl: uploadedPhoto(review.authorAttribution?.photoUri),
        authorUrl: review.authorAttribution?.uri,
        relativeTime: review.relativePublishTimeDescription ?? "",
        text: review.text?.text ?? "",
      }));

    return {
      rating: data.rating ?? null,
      total: data.userRatingCount ?? 0,
      reviews,
      mapsUrl: data.googleMapsUri ?? null,
    };
  } catch {
    return EMPTY;
  }
}
