import { siteConfig } from "@/data/siteConfig";

const SOURCE_LABEL = { google: "Google", facebook: "Facebook" } as const;

export function ratingSourceLabel(source: keyof typeof SOURCE_LABEL): string {
  return SOURCE_LABEL[source];
}

/** The rating the hero quotes: the first entry in siteConfig.ratings. */
export function primaryRating() {
  const rating = siteConfig.ratings[0];
  return {
    value: rating.value.toFixed(1),
    count: rating.count,
    source: ratingSourceLabel(rating.source),
  };
}
