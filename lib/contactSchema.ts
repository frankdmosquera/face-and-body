import { z } from "zod";
import { CONTACT_TOPICS } from "@/lib/contact";

export function isEmail(value: string): boolean {
  return z.email().safeParse(value).success;
}

function isPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export const contactSchema = z.object({
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
  topic: z
    .string()
    .refine((value) => CONTACT_TOPICS.includes(value), "Pick a topic"),
  message: z
    .string()
    .trim()
    .min(10, "A little more, so we can answer properly")
    .max(2000, "Keep it under 2000 characters"),
  // Honeypot. Never rejected here: the action answers a filled one with success.
  company: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
