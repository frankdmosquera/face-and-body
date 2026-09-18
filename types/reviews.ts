export type ReviewSource = "google" | "facebook" | "instagram";

export type Review = {
  quote: string;
  source: ReviewSource;
  /** where the quote can be read */
  sourceUrl: string;
  /** first name and initial as shown publicly */
  author: string;
  treatment: string | null;
};
