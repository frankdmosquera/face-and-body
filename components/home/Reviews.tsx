import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import {
  ReviewCard,
  StarRating,
  StarSprite,
  type ReviewCardData,
} from "@/components/home/ReviewCard";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { reviewsData } from "@/data/reviewsData";
import { siteConfig } from "@/data/siteConfig";
import { getGoogleReviews } from "@/lib/googleReviews";
import { relativeTime } from "@/lib/relativeTime";

/**
 * Her Google reviews, in the-latam-painters' `GoogleReviewCarousel3` layout.
 *
 * A SAMPLE, AND IT SAYS SO. The heading reads "8 of 79", the average is
 * Google's own unfiltered 4.7 across all 79, and one button goes to the
 * listing where every review lives. Nothing here implies it is the full set,
 * which is the whole point: an earlier version put 54 more behind a reveal,
 * which was more cards and less clarity.
 *
 * NO REVIEW SCHEMA, AND NOT BECAUSE OF HOW THIS LOOKS. Google's review
 * snippet policy disallows marking up reviews about your own business that
 * were collected from a third party, and disallows self-serving ratings. That
 * applies to the markup regardless of how honest the page is, so presenting
 * this well does not earn the right to emit `Review` or `aggregateRating`.
 * Feature 10 adds `LocalBusiness` and leaves both out.
 *
 * THE DESIGN IS LATAM'S. THE DATA PLUMBING IS PRIMO'S. None of LATAM's
 * dataset came with it - theirs is 20 fabricated reviews with pravatar
 * headshots, which is why their file carries a do-not-ship banner.
 *
 * SERVER COMPONENT, deliberately. It awaits the fetch while the HTML is being
 * built, so the review text is in the markup Google reads. Only the sliding
 * ships to the browser.
 *
 * NEVER EMPTY. `getGoogleReviews` returns empty rather than throwing, so a
 * dead key, a rotated place id or a quota stop falls back to the curated
 * quotes in `data/reviewsData.ts` instead of taking the social proof off the page.
 */

/**
 * How many cards the carousel holds. Eight at two per view is four laps,
 * enough for autoplay to have somewhere to go. The rest of `data/reviewsData.ts`
 * is a pool: it backfills when Google is short and is the whole section when
 * Google fails, but it does not all render.
 */
const SHOWN = 8;

/**
 * How many of Google's live reviews lead the row.
 *
 * Two, because that is how many of hers are recent enough to be worth
 * leading with, and because they are the only cards that keep their own
 * dates current. More than two and the section becomes mostly monograms,
 * since none of the live five uploaded a profile picture.
 */
const LIVE_ON_TOP = 2;

export async function Reviews() {
  const live = await getGoogleReviews();

  // Google gives no treatment name, so live cards carry no badge - inventing
  // one would be putting a service in a client's mouth.
  const liveCards: ReviewCardData[] = live.reviews.map((review) => ({
    text: review.text,
    author: review.author,
    date: review.relativeTime,
    rating: review.rating,
    avatarUrl: review.photoUrl,
  }));

  // THE CARDS ARE THE ONES WITH FACES.
  //
  // Not the live five, and that is a deliberate trade. Google returns its
  // five most relevant, and all five of hers are from people who never
  // uploaded a profile picture, so the section rendered eight copper
  // monograms in a row. These eight are reviewers who did upload one, saved
  // into public/reviews.
  //
  // What it costs: these cards no longer change when she gets a new review.
  // What it does not cost: the 4.7 and the count above them are still read
  // from Google every day, so the numbers stay honest even as the quotes sit
  // still. The live text is the fallback if this list is ever emptied.
  const photoCards: ReviewCardData[] = reviewsData
    .filter((review) => review.avatar)
    .map((review) => ({
      text: review.quote,
      author: review.author,
      // Every entry in data/reviewsData.ts is a verified 5, read off the listing
      // one by one, so these carry stars rather than looking unrated.
      rating: review.rating,
      avatarUrl: review.avatar,
      // Formatted now, not stored. The page revalidates daily, so the wording
      // moves on its own instead of insisting it is still 2024.
      date: review.reviewedAt ? relativeTime(review.reviewedAt) : undefined,
      service: review.treatment ?? undefined,
    }));

  // LIVE FIRST, THEN THE PHOTO SET.
  //
  // Not all-photos, which is what this was. Every hand-written review is
  // between two and five years old, so once the dates went on the cards the
  // whole row read as a business nobody had visited lately. Her two newest
  // are a month old; they have no profile picture, which is why they were
  // dropped, and that was the wrong thing to optimise for.
  //
  // Mixing them fixes three things at once. The row now spans a month to
  // five years, which reads as established rather than abandoned. The live
  // pair carry Google's own wording and re-fetch daily, so the section can
  // never go entirely stale however long this file sits. And a mix of
  // photographs and monograms is what a real listing looks like - eight
  // portraits in a row is closer to what a fabricated wall looks like.
  const cards = [...liveCards.slice(0, LIVE_ON_TOP), ...photoCards].slice(
    0,
    SHOWN,
  );

  // Google's own numbers beat the hand-read ones the moment they arrive.
  const rating = live.rating ?? siteConfig.ratings[0].value;
  const total = live.total || siteConfig.ratings[0].count;

  // NOT live.mapsUrl: the API's googleMapsUri carries a g_mp= session
  // parameter and landed on a different page. Not the writereview deep link
  // either, which degrades to a page of search results when signed out. This
  // is the canonical place URL - identical whether or not the visitor is
  // signed in, and every review is on it.
  const listingUrl = `https://www.google.com/maps/place/?q=place_id:${siteConfig.reviews.placeId}`;

  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/5 via-70% to-background">
      {/* LATAM's soft depth, kept low and to the sides, clear of the heading. */}
      <div className="pointer-events-none absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <StarSprite />
      <Container className="relative">
        {/* Wider than LATAM's `max-w-4xl`. Theirs holds two cards; three in
            896px is 288px each, which clamped seven of the eight quotes and
            made the section a wall of cut-off text. At 6xl a card is ~370px
            and most reviews fit whole. */}
        <div className="mx-auto max-w-6xl">
          <div className="relative z-10 text-center">
            <Eyebrow>Client love</Eyebrow>
            <h2 className="mt-4">What clients say</h2>

            {/* Says what it is showing and out of how many. The 4.7 is
                Google's average across all 79, negative ones included. */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {/* Google's own mark, unmodified, establishing the source
                  before anyone reaches a card. */}
              <Image
                src="/google-g.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="size-8"
              />
              {/* Unrounded on purpose: 4.7 draws four full stars and 70% of
                  a fifth. Math.round() here claimed a flat 5.0. */}
              <StarRating rating={rating} size={30} />
              <span className="text-[15px] text-muted-foreground">
                <b className="text-xl font-medium text-foreground">
                  {rating.toFixed(1)}
                </b>{" "}
                &middot; showing {cards.length} of {total} Google reviews
              </span>
            </div>
          </div>

          <ReviewsCarousel
            slides={cards.map((card, i) => (
              <ReviewCard key={i} review={card} />
            ))}
          />

          {/* One button, and it leaves the site. New tab on purpose: someone
              reading reviews has not finished with the page they are on. */}
          <div className="mt-10 text-center">
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              Read all {total} reviews on Google
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
