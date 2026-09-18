import type { Review } from "@/types/reviews";

// Verbatim excerpts (whole sentences, nothing rewritten) from public Google
// reviews, read on the Maps listing on 2026-09-18. Authors as Google shows them,
// shortened to first name and initial. Feature 14 replaces this with a live feed.
const GOOGLE_LISTING =
  "https://www.google.com/maps/search/Face+and+Body+Wellness+Centre+290+Midpark+Way+SE+Calgary";

export const REVIEWS: readonly Review[] = [
  {
    quote:
      "I've been seeing Sandra at Face & Body Wellness for about a year for my acne-prone skin, and the improvement has been amazing.",
    source: "google",
    sourceUrl: GOOGLE_LISTING,
    author: "O.O. B",
    treatment: "Deep Cleansing Facial",
  },
  {
    quote:
      "Laser hair removal has been a success for me, she made me feel very comfortable from the first session. Sandra is always punctual and gives me recommendations after treatments.",
    source: "google",
    sourceUrl: GOOGLE_LISTING,
    author: "Daniela F.",
    treatment: "Laser Hair Removal",
  },
  {
    quote:
      "Absolutely amazing facial experience! My skin has not felt this soft and smooth in years!",
    source: "google",
    sourceUrl: GOOGLE_LISTING,
    author: "Irene R.",
    treatment: null,
  },
];
