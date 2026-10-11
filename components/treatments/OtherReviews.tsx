import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import {
  ReviewCard,
  StarRating,
  StarSprite,
} from "@/components/home/ReviewCard";
import { buttonVariants } from "@/components/ui/button";
import { reviewsData } from "@/data/reviewsData";
import { siteConfig } from "@/data/siteConfig";
import { relativeTime } from "@/lib/relativeTime";
import type { ReviewType } from "@/types/reviewsTypes";

/* One review per kind of treatment on this page, in this order. Massage and
   laser have the most reviews; the peels stand in for the skin tab. */
const KINDS = [
  ["Relaxation Massage"],
  ["Laser Hair Removal"],
  ["Carbon Peel", "Chemical Peel"],
];

const treatmentsOf = (review: ReviewType) =>
  review.treatment == null
    ? []
    : Array.isArray(review.treatment)
      ? review.treatment
      : [review.treatment as string];

/* `ReviewCard` clamps a quote at four lines, about 170 characters at this
   width. Cut mid-sentence, a review reads as if it were hiding the rest. */
const FITS = 170;

/* The first quote of each kind that fits whole, else the shortest of that
   kind; verbatim from `reviewsData`. Picked at module load: the list is a
   constant, so the pick is too. */
const PICKS = KINDS.flatMap((kind) => {
  const ofKind = reviewsData.filter((review) =>
    treatmentsOf(review).some((treatment) => kind.includes(treatment)),
  );
  const found =
    ofKind.find((review) => review.quote.length <= FITS) ??
    [...ofKind].sort((a, b) => a.quote.length - b.quote.length)[0];
  return found ? [found] : [];
});

/**
 * Reviews about the treatments on THIS page.
 *
 * The page had none. The home page's band is mostly facials, which is what
 * that page sells, so someone weighing a massage or laser here had prices
 * and no one saying the treatment was any good. Sixteen reviews name a
 * massage and seven laser hair removal; these are real quotes from that same
 * list, not new copy.
 */
export function OtherReviews() {
  const { value, count } = siteConfig.ratings[0];
  const listingUrl = `https://www.google.com/maps/place/?q=place_id:${siteConfig.reviews.placeId}`;

  return (
    <Section tone="sand" className="relative overflow-hidden">
      <StarSprite />
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>From the treatment room</Eyebrow>
            <h2 className="mt-4">
              Massage, laser and peels, in{" "}
              <em className="text-copper">their</em> words
            </h2>
          </div>
          <div className="flex items-center gap-3 text-[14px] text-muted-foreground">
            <Image
              src="/google-g.png"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="size-6"
            />
            <StarRating rating={value} size={20} />
            <span>
              <b className="font-medium text-foreground">{value}</b> from{" "}
              {count} Google reviews
            </span>
          </div>
        </div>
        <ul className="reveal mt-12 grid gap-6 md:grid-cols-3">
          {PICKS.map((review) => (
            <li key={review.author}>
              <ReviewCard
                review={{
                  text: review.quote,
                  author: review.author,
                  rating: review.rating,
                  avatarUrl: review.avatar,
                  date: review.reviewedAt
                    ? relativeTime(review.reviewedAt)
                    : undefined,
                  service: review.treatment ?? undefined,
                }}
              />
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Read all {count} reviews on Google
          </a>
        </div>
      </Container>
    </Section>
  );
}
