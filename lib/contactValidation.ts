import { z } from "zod";

/**
 * The topic list is a parameter, not an import.
 *
 * This module is pulled into the browser by `ContactForm`, and importing
 * `CONTACT_TOPICS` from `lib/contactPrefills` meant importing `servicesData` with it -
 * every treatment's price, duration and description - so that a dropdown could
 * be validated. Turbopack then hoisted the catalogue into a chunk shared by
 * every route, so the home page paid for it too.
 *
 * The client builds a schema from the topics it was handed; the server action
 * builds one from the authoritative list. Same rule, same failure message,
 * and the server's copy is the one that decides.
 */

export function isEmail(value: string): boolean {
  return z.email().safeParse(value).success;
}

function isPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function makeContactSchema(topics: readonly string[]) {
  return z.object({
    name: z
      .string()
      .trim()
      // One line, always. `.trim()` only strips the ends, so a name holding a
      // carriage return survives validation and reaches the Resend subject
      // header. Resend builds its MIME from a JSON payload rather than raw
      // SMTP, so this is near-certainly safe already - but nothing in this
      // project proves that, and the guard costs one line.
      .regex(/^[^\r\n]+$/, "Tell us your name")
      .min(2, "Tell us your name")
      .max(80, "Keep it under 80 characters"),
    // Both optional on their own, and the object-level refine below requires
    // one of them. Two fields rather than the single "phone or email" this
    // replaces: a visitor who has both should be able to leave both, because
    // the clinic answers some enquiries by phone and some by email and only
    // she knows which this one is.
    //
    // An empty string passes here so that leaving a field blank is silent -
    // the refine is what complains, once, when both are blank.
    email: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || isEmail(value),
        "That email address doesn't look right",
      ),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || isPhone(value),
        "That phone number doesn't look right",
      ),
    topic: z.string().refine((value) => topics.includes(value), "Pick a topic"),
    message: z
      .string()
      .trim()
      .min(10, "A little more, so we can answer properly")
      .max(2000, "Keep it under 2000 characters"),
    // Honeypot. Never rejected here: the action answers a filled one with success.
    company: z.string().optional(),
  })
  // One way back is the requirement; which one is the visitor's choice. The
  // message is pinned to `email` so it renders under a field rather than
  // floating above the form with nothing to point at.
  .refine((values) => values.email !== "" || values.phone !== "", {
    message: "An email or a phone number, so we can reply",
    path: ["email"],
  });
}

export type ContactValuesType = z.infer<ReturnType<typeof makeContactSchema>>;
