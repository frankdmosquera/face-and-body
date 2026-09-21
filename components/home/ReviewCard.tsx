import Image from "next/image";
import { PhotoByPath } from "@/components/media/PhotoByPath";
import { Badge } from "@/components/ui/badge";

/**
 * A single review, built from the-latam-painters' `ReviewCard` and then
 * reworked to read as what it is: something someone wrote on Google.
 *
 * IT COPIES GOOGLE’S OWN CARD, measured off her listing rather than guessed:
 * 32px avatar, 16px name at weight 400, 16px stars, and the date in grey on
 * the star line rather than under the name. That last one is what makes it
 * read as a Google review; with the date tucked under the name it read as a
 * generic testimonial no matter what else was on it.
 *
 * LATAM’s card is the ancestor but little of its styling survived. Theirs
 * stacks avatar, stars, text and a badge all at one weight, so nothing leads.
 *
 * NO REVIEW MARKUP. Nothing here emits `Review` or `aggregateRating` JSON-LD.
 * Google's review snippet policy disallows marking up reviews about your own
 * business gathered from a third party, and presenting them honestly does not
 * change that. Her stars already show in Google's own local results, so the
 * markup would add nothing and risk a manual action.
 *
 * `date`, `rating` and `avatarUrl` are optional because a hand-written entry
 * may carry none of them. The card drops those rows rather than inventing a
 * date or a star count nobody gave it.
 */

export type ReviewCardDataType = {
  text: string;
  author: string;
  /** Google's own wording, e.g. "a month ago". Not a date we format. */
  date?: string;
  /** 1-5. */
  rating?: number;
  avatarUrl?: string;
  /** One treatment, several, or none. */
  service?: string | readonly string[];
};

/**
 * The star, defined once per page.
 *
 * Every rating draws each star twice - a grey outline and a gold copy clipped
 * to a percentage on top - which is what lets a 4.7 show as four and a bit. At
 * 5 stars across 8 cards and the section heading that is 90 stars, and while
 * each one was its own inline `<Star>` from lucide the home page carried 90
 * copies of the same 695-byte path: 62.5KB, 40% of its markup, more than every
 * other icon on the page put together by a factor of four.
 *
 * Render this once, above anything that draws stars, and the 90 become
 * `<use>` references to it. The shape and the clipping are untouched.
 */
export function StarSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      {/* GEOMETRY ONLY. No `fill` and no `stroke` here, which lucide's own
          markup carries and which is the trap: a presentation attribute on the
          symbol beats the value inherited from whatever `<use>` references it,
          so `fill="none"` made every star render hollow while the wrapper
          still reported amber. Colour is the caller's job - the outline layer
          asks for a transparent fill, the gold layer for amber - and leaving
          both off here is what lets one shape serve both. */}
      <symbol
        id="fb-star"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </symbol>
    </svg>
  );
}

function Star({ size, className }: { size: number; className: string }) {
  return (
    <svg
      aria-hidden="true"
      stroke="currentColor"
      className={className}
      style={{ width: size, height: size, maxWidth: "none" }}
    >
      <use href="#fb-star" />
    </svg>
  );
}

/**
 * Stars, including a partial one.
 *
 * A 4.7 used to be rounded to five full stars, which claims a perfect score
 * she has not got. The fifth star is now filled to 70% of its width and the
 * rest of it shows through as the empty outline - present, but visibly not
 * complete. Rounding up in a business's own favour is the kind of small lie
 * that makes a visitor doubt everything else on the page.
 *
 * Sized in pixels rather than by class because the fill is a clipping box:
 * the gold star has to stay its full width while the box around it shrinks,
 * and a percentage-width parent with a `w-full` child would squash the star
 * instead of cropping it.
 */
export function StarRating({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const exact = Math.max(0, Math.min(1, rating - i));
        // PERCEPTUAL, NOT ARITHMETIC, AND TUNED BY EYE.
        //
        // Clipping a star at 70% of its WIDTH does not show 70% of a star:
        // the shape is widest across the middle and tapers to points, so the
        // right-hand arm carries far less ink than the body. Straight
        // geometry made a 4.7 read as barely over half.
        //
        // The exponent is the dial. 0.7 overcorrected - 0.78 of the width
        // read as a 4.8 or 4.9, which overstates her just as the old
        // Math.round did. 0.85 lands at 0.74 and reads as the 4.7 it is.
        // Full and empty stars are untouched, so nothing is ever rounded up
        // to a five it did not earn.
        const fill = exact > 0 && exact < 1 ? exact ** 0.85 : exact;
        return (
          <span
            key={i}
            className="relative block shrink-0"
            style={{ width: size, height: size }}
          >
            <Star
              size={size}
              className="absolute inset-0 fill-transparent text-foreground/25 in-data-[tone=dark]:text-on-dark/25"
            />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: size * fill }}
              >
                <Star size={size} className="fill-amber-400 text-amber-400" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewCard({ review }: { review: ReviewCardDataType }) {
  const services =
    review.service == null
      ? []
      : Array.isArray(review.service)
        ? review.service
        : [review.service as string];

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-7 in-data-[tone=dark]:border-on-dark/10 in-data-[tone=dark]:bg-on-dark/[0.055] in-data-[tone=dark]:shadow-none">
      <div className="flex items-start gap-3">
        {/* `next/image`, not the shadcn Avatar and not a plain `img`.
            `AvatarImage` mounts only once the file has loaded in the browser,
            so the photo was absent from the server HTML and every card flashed
            its initials first. `next/image` has no such problem: it renders a
            real `img` into the server markup.

            It used to be a plain `img` on the reasoning that a 36px square
            already the right size gains nothing from an optimisation pipeline.
            That was wrong about these files - they are 160px masters, so the
            browser was fetching 4.4x the pixels it draws, 109KB across the
            eight of them. Next serves a 36 and a 72 from the same source in
            AVIF, which is the whole saving without touching the originals.

            Decorative on purpose. The name is rendered right beside it, so
            alt text would make a screen reader say it twice. */}
        {review.avatarUrl ? (
          /* Two kinds of value arrive here. A library path like
             `/reviews/abigail-l.jpg` is ours, uploaded to ImageKit alongside
             every other photograph on the site. An absolute URL is a live
             Google profile picture from the Places fetch, which is parked
             rather than removed, and hotlinking it through ImageKit would put
             a rotating third-party URL behind our CDN. So the source decides
             the renderer.

             Eager in both cases, not lazy. Five of the eight start off-screen
             inside the carousel, so lazy loading fetches them as they slide in
             and the face pops into a card someone is already reading. */
          review.avatarUrl.startsWith("http") ? (
            <Image
              src={review.avatarUrl}
              alt=""
              width={36}
              height={36}
              priority
              className="size-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <PhotoByPath
              path={review.avatarUrl}
              alt=""
              width={160}
              height={160}
              sizes="36px"
              priority
              className="size-9 shrink-0 rounded-full object-cover"
            />
          )
        ) : (
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-medium text-primary in-data-[tone=dark]:bg-copper-soft/15 in-data-[tone=dark]:text-copper-soft"
          >
            {initialsOf(review.author)}
          </span>
        )}

        {/* Name only. Google's card puts the date down beside the stars, not
            under the name, and at weight 400 rather than bold - measured off
            their own listing: 16px/400 name, 32px avatar, 16px stars, 14px
            grey date on the star line. Matching that order is what makes it
            read as a Google review rather than a generic testimonial. */}
        <figcaption className="min-w-0 flex-1">
          <span className="block truncate text-[15px] text-foreground in-data-[tone=dark]:text-on-dark">
            {review.author}
          </span>
        </figcaption>

        {/* Top-right, where Google's own cards and every widget imitating
            them put it. Their published asset, unmodified: the brand terms
            allow the mark for attribution, and Places data requires
            attribution, provided it is never recoloured, stretched, or used
            to suggest Google endorses the clinic.

            NOT decorative, and this matters. The footer used to spell out
            "Posted on Google" underneath, which was saying twice what the
            mark already says. Dropping that text only works if the mark
            itself is readable - so it carries real alt text instead of
            aria-hidden, and a screen reader and a crawler both still get the
            attribution the picture conveys to everyone else. */}
        <Image
          src="/google-g.png"
          alt="Posted on Google"
          width={22}
          height={22}
          className="mt-0.5 size-[22px] shrink-0"
        />
      </div>

      {/* Stars and date on one line, which is Google's arrangement. */}
      {(review.rating !== undefined || review.date) && (
        <div className="mt-2.5 flex items-center gap-2">
          {review.rating !== undefined && (
            <StarRating rating={review.rating} size={16} />
          )}
          {review.date && (
            <span className="text-[13px] text-muted-foreground in-data-[tone=dark]:text-on-dark-muted">
              {review.date}
            </span>
          )}
        </div>
      )}

      {/* FOUR LINES, FIXED. The cards are `items-stretch`, so every one is as
          tall as the tallest, and the tallest is whoever wrote the most.
          Card height should be a decision, not a side effect of someone's
          typing - four lines makes it a decision.

          Clamped, not truncated: the full quote stays in the HTML for Google
          to read and only the display is capped. There is no per-card "read
          more" because expanding one card inside a carousel grows it
          mid-autoplay and shunts everything around it; the button under the
          carousel goes to the same review on Google, where it is whole. */}
      <blockquote className="mt-3.5 line-clamp-4 flex-1 text-[14.5px] leading-[1.55] text-pretty text-foreground in-data-[tone=dark]:text-on-dark">
        {review.text}
      </blockquote>

      {/* Tags only. "Posted on Google" is gone from here: the mark in the
          corner already says it, and saying it twice was clutter. The row
          disappears entirely when a review names no treatment, rather than
          leaving an empty rule across the bottom of the card. */}
      {services.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-4 in-data-[tone=dark]:border-on-dark/10">
          {services.map((service) => (
            <Badge
              key={service}
              variant="secondary"
              className="in-data-[tone=dark]:bg-on-dark/10 in-data-[tone=dark]:text-on-dark-muted"
            >
              {service}
            </Badge>
          ))}
        </div>
      )}
    </figure>
  );
}
