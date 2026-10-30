"use client";

import { useCallback } from "react";
import { SiteChat } from "@frankdmosquera/site-chat";
import type { ChatTileType } from "@frankdmosquera/site-chat/words";
import "@frankdmosquera/site-chat/site-chat.css";
import { useOpenTreatment } from "@/components/booking/BookingHost";
import { chatLinks, chatWords } from "@/data/chatWords";

/**
 * The AI chat in the corner of every page, mounted once in the root layout
 * inside BookingHost. It books a treatment right in the conversation,
 * following her booking form; when it cannot read her calendar, "Book a
 * treatment" opens the same booking window as every other Book button. Its
 * answers download on the first open.
 *
 * The business and her treatment tiles come in as props from the server
 * layout, like BookingHost's, so this file imports nothing from
 * `lib/bookingConfig` and its catalogue. The tiles open on her treatments,
 * each bookable on the spot, under "What treatments do you offer?" and when a
 * booking starts with no treatment named.
 */
export function ChatHost({
  apiUrl,
  slug,
  tiles,
}: {
  apiUrl: string;
  slug: string;
  tiles: ChatTileType[];
}) {
  const openTreatment = useOpenTreatment();
  const loadAnswers = useCallback(
    () =>
      import("@/data/chatAnswers").then(
        ({ chatAnswers, TREATMENTS_QUESTION }) => ({
          ...chatAnswers,
          tiles: [{ question: TREATMENTS_QUESTION, tiles }],
          bookingTiles: tiles,
        }),
      ),
    [tiles],
  );
  return (
    <SiteChat
      words={chatWords}
      loadAnswers={loadAnswers}
      links={chatLinks}
      booking={{ apiUrl, slug }}
      onWay={(path) => {
        if (path === "book") openTreatment();
      }}
      // The inspector (who answered, how long) shows only under `next dev`.
      debug={process.env.NODE_ENV === "development"}
    />
  );
}
