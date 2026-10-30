import {
  englishChatWords,
  type ChatWordsType,
} from "@frankdmosquera/site-chat/words";
import { siteConfig } from "@/data/siteConfig";

const { phone } = siteConfig;

// The corner chat's lines: the package's English, with the ones that name her
// treatments, her free consultation and her phone in her words.
export const chatWords: ChatWordsType = {
  ...englishChatWords,
  float: {
    ...englishChatWords.float,
    title: "Ask Face and Body",
    greeting:
      "Hi! Ask me anything about our treatments: what suits your skin, prices, how long they take, or book one right here.",
    hello: "Questions about a treatment? I answer right away.",
  },
  paths: {
    book: "Happy to. Pick your treatment and a time on the next screen.",
    // Her FAQ: texting gets the fastest reply, so the message way is a text.
    call: `Happy to. Tap below to call us at ${phone.display}.`,
    message: `Texting usually gets the fastest reply. Tap below to text ${phone.display}.`,
  },
  ctas: {
    book: "Book a treatment",
    call: "Call us",
    message: "Text us",
  },
  ways: {
    label: "Ways to talk to a person",
    names: {
      book: { label: "Book", title: "Book a treatment" },
      call: { label: "Call", title: `Call ${phone.display}` },
      message: { label: "Text", title: `Text ${phone.display}` },
    },
  },
  offTopic:
    "I can only help with questions about our treatments and the clinic. Ask me what suits your skin, or book a treatment.",
  greeting:
    "Happy to help! Ask me anything about our treatments: what suits your skin, prices, how long they take, or book one right here.",
};

// Where a call and a text go; email stays on the contact page. Booking has no
// link: the chat books in the conversation, or hands it to her booking window.
export const chatLinks = {
  call: phone.tel,
  message: phone.sms,
};
