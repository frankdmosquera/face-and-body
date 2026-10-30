// Facts the corner chat may state that no data file holds. The chat answers only
// from its brief (data/chatSite.ts), so a fact missing here and from the pages
// gets "someone from Face and Body can confirm" instead of a guess. Each line is
// word for word what her own site already says; nothing here is new.
export const chatFacts: readonly string[] = [
  // The home page's consultation band (components/home/Consultation.tsx).
  "The free consultation is in the clinic and costs nothing: a skin analysis, an honest read on what will actually work, and a written plan with pricing before you commit to anything.",
  // The home page's Eminence band (components/home/Eminence.tsx).
  "Every facial uses Eminence Organics, the Hungarian skincare line built on organic, biodynamic ingredients, and she is an authorised Eminence Organics stockist: the same products are on the clinic shelf to take home.",
  // The FAQ's booking answer.
  "Texting usually gets the fastest reply, because she is with clients for most of the day.",
];
