import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import type { Service } from "@/types/servicesTypes";

/** `?&body=` is the one form that opens a prefilled text on both iOS and Android. */
export function smsLink(message: string): string {
  return `${siteConfig.phone.sms}?&body=${encodeURIComponent(message)}`;
}

export function pricingMessage(service: Service): string {
  return `Hi! Can I get pricing for ${service.name}?`;
}

export function getUnpricedServices(): readonly Service[] {
  return servicesData.filter((service) => service.price === null);
}

export const CONSULTATION_TOPIC = "Book a free consultation";

export const GENERAL_TOPIC = "A question about a treatment";

export function pricingTopic(service: Service): string {
  return `Pricing for ${service.name}`;
}

export type ContactPrefill = { topic: string; message: string };

/**
 * Every `?treatment=<slug>` the contact form might be handed, resolved to the
 * two strings it actually sets. Built on the server and passed in as a prop:
 * the form is a client component, and importing `getService` there pulled the
 * whole catalogue - descriptions included - into the browser bundle to read a
 * name and a null check. This ships the answers instead of the data.
 */
export function buildPrefills(): Record<string, ContactPrefill> {
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
