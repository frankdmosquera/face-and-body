export type ReviewSourceType = "google" | "facebook" | "instagram";

export type ReviewType = {
  quote: string;
  source: ReviewSourceType;
  /** where the quote can be read */
  sourceUrl: string;
  /** first name and initial as shown publicly */
  author: string;
  /** 1-5, as Google records it. Every entry in data/reviewsData.ts is a 5. */
  rating: number;
  /**
   * Approximate date of the review, `YYYY-MM-DD`, anchored from the phrase
   * Google showed when the listing was read. Formatted at build time by
   * `lib/relativeTime.ts` so the wording ages by itself instead of being
   * frozen at whatever it said the day it was copied.
   */
  reviewedAt?: string;
  /**
   * Their Google profile picture, saved into public/reviews rather than
   * hotlinked. Google avatar URLs rotate and expire, so a linked one turns
   * into a broken circle without warning. Absent when the reviewer has no
   * uploaded photo, and the card falls back to copper initials.
   */
  avatar?: string;
  /**
   * What they had done. An array when the review names more than one, which
   * several do - "bio microneedling and a microdermabrasion" is two things
   * and one badge would drop half of it. Null when the review praises her
   * rather than a treatment; inventing one would put a service in their
   * mouth.
   */
  treatment: string | readonly string[] | null;
};
