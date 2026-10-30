"use client";

import { SiteChat } from "@frankdmosquera/site-chat";
import "@frankdmosquera/site-chat/site-chat.css";
import { useOpenTreatment } from "@/components/booking/BookingHost";
import { chatLinks, chatWords } from "@/data/chatWords";

const loadAnswers = () =>
  import("@/data/chatAnswers").then((m) => m.chatAnswers);

/**
 * The AI chat in the corner of every page, mounted once in the root layout
 * inside BookingHost. It books a treatment right in the conversation,
 * following her booking form; when it cannot read her calendar, "Book a
 * treatment" opens the same booking window as every other Book button. Its
 * answers download on the first open.
 *
 * The business comes in as props from the server layout, like BookingHost's,
 * so this file imports nothing from `lib/bookingConfig` and its catalogue.
 */
export function ChatHost({ apiUrl, slug }: { apiUrl: string; slug: string }) {
  const openTreatment = useOpenTreatment();
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
