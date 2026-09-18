import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { REVIEWS } from "@/data/reviews";
import { siteConfig } from "@/data/siteConfig";
import { ratingSourceLabel } from "@/lib/ratings";

const SOURCE_LABEL = {
  google: "Google review",
  facebook: "Facebook review",
  instagram: "Instagram",
} as const;

export function Reviews() {
  return (
    <Section tone="dark">
      <Container>
        <Eyebrow>Client love</Eyebrow>
        <h2 className="mt-4">What clients say</h2>
        {REVIEWS.length > 0 && (
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <figure
                key={review.sourceUrl + review.author}
                className="flex flex-col rounded-sm bg-dark-surface px-8 py-9 dark:bg-dark"
              >
                <blockquote className="flex-1 font-serif text-[22px] leading-[1.4]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-[22px] text-xs tracking-[0.14em] text-on-dark-muted uppercase">
                  {review.author} &middot;{" "}
                  <a
                    href={review.sourceUrl}
                    rel="noopener"
                    className="hover:text-on-dark"
                  >
                    {SOURCE_LABEL[review.source]}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-3 text-[13px] text-on-dark-muted">
          {siteConfig.ratings.map((rating) => (
            <span key={rating.source}>
              <b className="font-medium text-on-dark">
                {rating.value.toFixed(1)}
              </b>{" "}
              {ratingSourceLabel(rating.source)} &middot; {rating.count} reviews
            </span>
          ))}
          <a
            href={siteConfig.social.instagram}
            rel="noopener"
            className="hover:text-on-dark"
          >
            <b className="font-medium text-on-dark">Client Love</b> highlights
            on Instagram
          </a>
        </div>
      </Container>
    </Section>
  );
}
