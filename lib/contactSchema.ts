import { z } from "zod";

/**
 * The topic list is a parameter, not an import.
 *
 * This module is pulled into the browser by `ContactForm`, and importing
 * `CONTACT_TOPICS` from `lib/contact` meant importing `SERVICES` with it -
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
      .min(2, "Tell us your name")
      .max(80, "Keep it under 80 characters"),
    contact: z
      .string()
      .trim()
      .refine(
        (value) => isEmail(value) || isPhone(value),
        "A phone number or an email address, so we can reply",
      ),
    topic: z.string().refine((value) => topics.includes(value), "Pick a topic"),
    message: z
      .string()
      .trim()
      .min(10, "A little more, so we can answer properly")
      .max(2000, "Keep it under 2000 characters"),
    // Honeypot. Never rejected here: the action answers a filled one with success.
    company: z.string().optional(),
  });
}

export type ContactValues = z.infer<ReturnType<typeof makeContactSchema>>;
