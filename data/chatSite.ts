import type { ChatSiteType } from "@frankdmosquera/site-chat/server";
import { categoriesData } from "@/data/categoriesData";
import { chatAnswers } from "@/data/chatAnswers";
import { chatFacts } from "@/data/chatFacts";
import { chatWords } from "@/data/chatWords";
import { productGroupsData } from "@/data/productsData";
import { servicesData } from "@/data/servicesData";
import { siteConfig } from "@/data/siteConfig";
import { visitData } from "@/data/visitData";

// Everything the chat's server answers from: her stored answers, and the brief
// the AI reads, built from her own data files. Server only: the routes under
// app/api/chat import it.

const { address, consultation } = siteConfig;

/** "16:00" as "4 pm", "15:30" as "3:30 pm". */
function clock(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const twelve = hour % 12 || 12;
  return `${twelve}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${hour < 12 ? "am" : "pm"}`;
}

const hours = siteConfig.hours
  .map((d) => {
    const day = d.day[0].toUpperCase() + d.day.slice(1);
    return "closed" in d
      ? `${day} closed`
      : `${day} ${clock(d.open)} to ${clock(d.close)}`;
  })
  .join(", ");

/** One treatment as her menu shows it: its price, its length, its line. */
function treatmentLine(service: (typeof servicesData)[number]): string {
  const price =
    service.price === null
      ? "priced at a free consultation"
      : `${service.priceFrom ? "from " : ""}$${service.price}`;
  return `${service.name}: ${price}, ${service.durationMin} minutes. ${service.description}`;
}

export const chatSite: ChatSiteType = {
  lang: "en",
  answers: chatAnswers,
  words: chatWords,
  brief: {
    business: {
      name: siteConfig.name,
      // As her site describes her (siteConfig.description).
      about:
        "a wellness clinic in Midnapore, Calgary SE, with advanced facials, microneedling, laser and IPL, delivered by a qualified aesthetician",
      area: `${address.city}, ${address.province}`,
      phone: siteConfig.phone.display,
      email: siteConfig.email,
      hours,
      address: `${address.unit}, ${address.street}, ${address.city} ${address.province} ${address.postalCode}`,
    },
    facts: chatFacts,
    pages: [
      ...categoriesData.map((category) => ({
        title: category.label,
        lines: [
          category.intro,
          ...servicesData
            .filter((s) => s.category === category.slug)
            .map(treatmentLine),
        ],
      })),
      {
        title: "Your visit",
        lines: [
          `The consultation is free and takes ${consultation.durationMin} minutes.`,
          ...visitData.map((step) => `${step.title}: ${step.text}`),
        ],
      },
      {
        title: "Eminence products on the clinic shelf",
        lines: productGroupsData.map((g) => `${g.label}: ${g.heading}`),
      },
    ],
  },
};
