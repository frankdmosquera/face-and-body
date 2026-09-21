/**
 * Google's relative wording, recomputed rather than frozen.
 *
 * THE PROBLEM THIS SOLVES. The hand-written reviews in `data/reviewsData.ts` used
 * to store the phrase Google showed on the day they were read - "2 years
 * ago". That string never changes. Two years from now the card still claims
 * two years, and the older the file gets the more wrong every card becomes.
 * Storing a date and formatting it at build time means the page ages
 * correctly on its own: the home page revalidates daily, so the day a review
 * crosses from eleven months to a year, the wording follows.
 *
 * WHAT THE DATES ARE, HONESTLY. Google's listing does not publish an exact
 * timestamp on a review - it shows the same fuzzy phrase we are producing
 * here. So the stored dates are anchored: a review that read "2 years ago"
 * when the listing was captured is stored as two years before that capture.
 * For anything measured in years that is accurate to within a few months,
 * and it does not matter, because the output is a fuzzy phrase too. A date
 * that is six weeks out still formats to "3 years ago".
 *
 * It would matter for a recent review, where a few weeks is the difference
 * between "a month ago" and "2 months ago". Those come from the live API,
 * which supplies Google's own current phrase, so they never pass through
 * here at all.
 *
 * WHY NOT Intl.RelativeTimeFormat. It produces "2 years ago" happily, but it
 * has no notion of "a year ago" versus "1 year ago", and Google writes the
 * first. Matching their wording is the point of the whole exercise, so the
 * thresholds are spelled out instead.
 */

const DAY = 24 * 60 * 60 * 1000;

/**
 * @param iso     the review's (approximate) date, `YYYY-MM-DD`
 * @param now     injectable so the behaviour can be reasoned about and
 *                tested without waiting a year
 */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";

  const days = Math.floor((now.getTime() - then.getTime()) / DAY);

  // A clock skew or a date typed in the future should not print "-3 days
  // ago". Google would just say it is new.
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "a week ago";
  if (days < 30) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return "a month ago";
  if (days < 365) return `${months} months ago`;

  const years = Math.floor(days / 365);
  if (years === 1) return "a year ago";
  return `${years} years ago`;
}
