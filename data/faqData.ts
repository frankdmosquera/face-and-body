import { siteConfig } from "@/data/siteConfig";

export type FaqItemType = {
  question: string;
  answer: string;
  /** shows the consultation link under the answer */
  book?: boolean;
};

const { address, phone, consultation } = siteConfig;

/**
 * The home page FAQ.
 *
 * Deliberately logistics only: booking, parking, pricing posture, what to do
 * when you do not know what you need. Not one answer here makes a clinical
 * claim, because those are hers to make and wrong ones are a liability rather
 * than bad copy. The clinical questions belong on the concern pages, with her
 * sign-off.
 *
 * Every fact is read from `siteConfig`, never retyped. A phone number or a
 * postcode spelled out here is one that goes stale the day she moves.
 *
 * Feature 10 owns schema. When it lands, `FAQPage` JSON-LD derives from this
 * array so the markup and the page can never disagree; that is why this stays
 * a plain const rather than being inlined into the component.
 */
export const faqData: readonly FaqItemType[] = [
  {
    question: "Do I need a consultation first?",
    answer: `For anything beyond a straightforward facial, yes, and it is free. ${consultation.durationMin} minutes, no commitment. It is the only way to tell which treatment suits your skin, and the only way to price the treatments listed at consultation.`,
    book: true,
  },
  {
    question: "How do I know which treatment I need?",
    answer:
      "You do not have to work it out on your own. Start from whatever is bothering you rather than from a treatment name, and the what we treat pages will narrow it down. If you would rather someone just looked, that is what the consultation is for.",
  },
  {
    question: "How do I book?",
    answer: `Text or call ${phone.display}, or send the form on the contact page. Texting usually gets the fastest reply, because she is with clients for most of the day.`,
  },
  {
    question: "Where are you, and is there parking?",
    answer: `${address.unit}, ${address.street}, in Midnapore, ${address.city} SE. Free parking at the door.`,
  },
  {
    question: "Why do some treatments not show a price?",
    answer:
      "Because the price genuinely depends on the area being treated and on your skin. Putting a number on the page that changes the moment you walk in is worse than leaving it off, so those say consultation and mean it.",
  },
  {
    question: "What products do you use?",
    answer:
      "Every facial uses Eminence Organics, the Hungarian organic skincare line she is an authorised stockist for.",
  },
];
