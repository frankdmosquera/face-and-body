"use server";

import { createElement } from "react";
import { Resend } from "resend";
import { ContactEnquiryEmail } from "@/emails/contact-enquiry";
import { siteConfig } from "@/data/siteConfig";
import { CONTACT_TOPICS } from "@/lib/contactPrefills";
import {
  makeContactSchema,
  type ContactValuesType,
} from "@/lib/contactValidation";

export type ContactResultType =
  { success: true } | { success: false; error: string };

// Every failure past validation says the same thing; the form adds the text
// and call links, so a visitor the form let down still has a way to reach the clinic.
const FAILED: ContactResultType = {
  success: false,
  error: "We couldn't send that.",
};

export async function submitContactAction(
  values: ContactValuesType,
): Promise<ContactResultType> {
  // The authoritative list. The client validates against the topics it was
  // handed; this is the copy that decides.
  const parsed = makeContactSchema(CONTACT_TOPICS).safeParse(values);
  if (!parsed.success) return { success: false, error: "Invalid submission." };

  // A filled honeypot reports success so a bot cannot learn which field gave it away.
  if (parsed.data.company) return { success: true };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return FAILED;

  const { name, email, phone, topic, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    // `RESEND_FROM` is an address at `faceandbodywellnesscentre.com`, verified
    // in Resend on 2026-09-21. No mailbox exists behind it and none is needed:
    // a verified domain is permission to send, not an inbox.
    //
    // The fallback is Resend's shared test sender, which delivers only to the
    // address owning the Resend account and rejects every other recipient with
    // a 403. So an unset `RESEND_FROM` on a deploy does not degrade quietly -
    // it fails every submission. Treat the fallback as a local-dev convenience,
    // never as a production state.
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      // The clinic's own inbox, and the only destination. She reads Gmail and
      // wants no address at the domain, which costs nothing: the domain sends,
      // Gmail receives, and the two are unrelated.
      to: [siteConfig.email],
      // A visitor who left an address is who Reply should reach. One who left
      // only a phone number is not reachable by email at all, and `from` is a
      // send-only address with no mailbox behind it - so Reply would vanish.
      // Her own inbox is the honest fallback: replying to herself is useless
      // but visible, where replying into a dead address is neither.
      replyTo: email || siteConfig.email,
      subject: `New enquiry from ${name}`,
      // The text part stays. It is the fallback a plain-text client renders,
      // and the copy a spam filter reads when it distrusts the HTML. A blank
      // field is left out rather than printed empty.
      text: [
        `Name: ${name}`,
        email && `Email: ${email}`,
        phone && `Phone: ${phone}`,
        `Topic: ${topic}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      // createElement rather than JSX so this file stays .ts. One call does not
      // justify renaming the module and churning every import of it.
      //
      // react escapes every interpolation, so a visitor typing HTML into the
      // message field gets it back as text rather than as markup.
      react: createElement(ContactEnquiryEmail, {
        name,
        email,
        phone,
        topic,
        message,
        // Stamped here, on the server, at the moment the enquiry arrives.
        receivedAt: new Date(),
      }),
    });
    // Resend reports failures in the response rather than by throwing.
    if (error || !data) {
      console.error("[contact] resend rejected:", JSON.stringify(error));
      return FAILED;
    }
    return { success: true };
  } catch {
    return FAILED;
  }
}
