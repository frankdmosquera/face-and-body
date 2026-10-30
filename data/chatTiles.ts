import type { ChatTileType } from "@frankdmosquera/site-chat/words";
import { categoriesData } from "@/data/categoriesData";
import { servicesData } from "@/data/servicesData";

/**
 * Her five treatment groups as the chat's tiles, each opening to its treatments
 * with their price and length and a Book button. Server only: the layout builds
 * them and hands them to ChatHost, so the catalogue never reaches the browser.
 *
 * A treatment priced at consultation gets no Book button, as on her pages
 * (ServiceCard sends those to /contact); its booking link is its `bookingId`,
 * else its slug, as `lib/bookingConfig.ts` reads it.
 */
export function chatTreatmentTiles(): ChatTileType[] {
  return categoriesData.map((category) => ({
    label: category.label,
    note: category.blurb,
    items: servicesData
      .filter((s) => s.category === category.slug)
      .map((s) =>
        s.price === null
          ? { label: s.name, note: "Priced at a free consultation" }
          : {
              label: s.name,
              note: `${s.priceFrom ? "from " : ""}$${s.price} · ${s.durationMin} min`,
              book: s.bookingId ?? s.slug,
            },
      ),
  }));
}
