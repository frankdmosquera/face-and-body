import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import type { ServiceType } from "@/types/servicesTypes";

/**
 * The opener both channels use, so a reword cannot land on one and miss the
 * other. It ends in a space on purpose: the visitor's cursor lands after it
 * and they finish the sentence.
 */
export const GENERAL_OPENER = "Hi! I'd like to ask about ";

/** `?&body=` is the one form that opens a prefilled text on both iOS and Android. */
export function smsLink(message: string): string {
  return `${siteConfig.phone.sms}?&body=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp's own click-to-chat form. `?text=` is its prefill, the equivalent
 * of `?&body=` above, and the number in `siteConfig` must stay digits only
 * with the country code and no +, spaces or dashes or wa.me will not resolve
 * it.
 *
 * Returns "" when WhatsApp is not configured, which cannot reach the page:
 * `ContactChannels` gates the whole channel on the same value.
 */
export function whatsappLink(message: string): string {
  const base = siteConfig.phone.whatsapp;
  return base ? `${base}?text=${encodeURIComponent(message)}` : "";
}

export function pricingMessage(service: ServiceType): string {
  return `Hi! Can I get pricing for ${service.name}?`;
}

export function getUnpricedServices(): readonly ServiceType[] {
  return servicesData.filter((service) => service.price === null);
}

export const CONSULTATION_TOPIC = "Book a free consultation";

export const GENERAL_TOPIC = "A question about a treatment";

export function pricingTopic(service: ServiceType): string {
  return `Pricing for ${service.name}`;
}

export type ContactPrefillType = { topic: string; message: string };

/**
 * Every `?treatment=<slug>` the contact form might be handed, resolved to the
 * two strings it actually sets. Built on the server and passed in as a prop:
 * the form is a client component, and importing `getService` there pulled the
 * whole catalogue - descriptions included - into the browser bundle to read a
 * name and a null check. This ships the answers instead of the data.
 */
export function buildPrefills(): Record<string, ContactPrefillType> {
  return Object.fromEntries(
    servicesData.map((service) => [
      service.slug,
      {
        topic: service.price === null ? pricingTopic(service) : GENERAL_TOPIC,
        message: `Hi, I have a question about ${service.name}. `,
      },
    ]),
  );
}

export const CONTACT_TOPICS: readonly string[] = [
  // First, because every "Book a consultation" button on the site lands here.
  CONSULTATION_TOPIC,
  GENERAL_TOPIC,
  ...getUnpricedServices().map(pricingTopic),
  "Am I a candidate for this",
  "Gift cards",
  "Something else",
];
