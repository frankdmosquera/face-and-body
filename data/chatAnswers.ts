import type {
  ChatAnswersType,
  StoredAnswerType,
} from "@frankdmosquera/site-chat/words";
import { categoriesData, categoryHref } from "@/data/categoriesData";
import { faqData } from "@/data/faqData";

// What the corner chat answers without the AI, all in her own words: her FAQ,
// and her treatment categories as the home page lists them. Jev picks one by
// its place, so the order is fixed. The chat downloads this file on its first
// open; the server reads the same one.

const TREATMENTS_QUESTION = "What treatments do you offer?";

const treatmentsAnswer: StoredAnswerType = {
  question: TREATMENTS_QUESTION,
  answer: `Five kinds of treatment, all in the clinic in Midnapore, Calgary SE:\n${categoriesData.map((c) => `${c.label}: ${c.blurb}`).join("\n")}`,
};

const faqAnswers: StoredAnswerType[] = faqData.map((item) => ({
  question: item.question,
  answer: item.answer,
  // The FAQ shows the consultation link under these: the chat offers the ways to a person.
  ...(item.book && { offersPerson: true }),
}));

export const chatAnswers: ChatAnswersType = {
  stored: [treatmentsAnswer, ...faqAnswers],
  // One FAQ on her site, so one group: an answer is followed by the next questions.
  groups: [[TREATMENTS_QUESTION, ...faqData.map((item) => item.question)]],
  // Other ways visitors word a question, read by Jev only.
  alsoAsked: {
    [TREATMENTS_QUESTION]: [
      "What services do you offer?",
      "What do you do?",
      "Do you do facials?",
      "Do you do massages?",
    ],
  },
  tiles: [
    {
      question: TREATMENTS_QUESTION,
      tiles: categoriesData.map((c) => ({
        label: c.label,
        note: c.blurb,
        href: categoryHref(c),
      })),
    },
  ],
};
