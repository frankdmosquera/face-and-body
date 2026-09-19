"use server";

import { Resend } from "resend";
import { siteConfig } from "@/data/siteConfig";
import { contactSchema, isEmail, type ContactValues } from "@/lib/contactSchema";

export type ContactResult = { success: true } | { success: false; error: string };

// Every failure past validation says the same thing; the form adds the text
// and call links, so a visitor the form let down still has a way to reach the clinic.
const FAILED: ContactResult = {
  success: false,
  error: "We couldn't send that.",
};

export async function submitContact(
  values: ContactValues,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Invalid submission." };

  // A filled honeypot reports success so a bot cannot learn which field gave it away.
  if (parsed.data.company) return { success: true };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return FAILED;

  const { name, contact, topic, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    // The onboarding sender only reaches the Resend account owner; RESEND_FROM
    // takes over once a domain is verified.
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: [siteConfig.email],
      replyTo: isEmail(contact) ? contact : undefined,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Contact: ${contact}`,
        `Topic: ${topic}`,
        "",
        message,
      ].join("\n"),
    });
    // Resend reports failures in the response rather than by throwing.
    if (error || !data) return FAILED;
    return { success: true };
  } catch {
    return FAILED;
  }
}
