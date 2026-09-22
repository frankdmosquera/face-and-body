"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { CALCOM_USERNAME, type BookableType } from "@/lib/bookingConfig";

/**
 * The booker, inline on our own page.
 *
 * Inline, not a popup and not a redirect. The visitor never leaves the domain
 * and never meets Cal's own page - which is the whole point, and the
 * difference between this and pointing Book at a vendor's link.
 *
 * THIS WAS WRITTEN BY HAND FIRST, and the package is the correction. The
 * workspace rule is that two seconds of hand-written code beats a dependency,
 * and Cal's loader looks like exactly that: queue the calls, append the
 * script. It is not. Their bundle reads `Cal.ns`, `Cal.loaded` and a namespace
 * branch off the function it finds, and a queue missing any of it throws
 * "Cannot convert undefined or null to object" from inside their code - the
 * iframe gets created, comes up 0px wide, and nothing renders. Two attempts at
 * transcribing the snippet failed the same way.
 *
 * So the rule held and the estimate was wrong. This is not two seconds of
 * code; it is an undocumented interface with someone else's script, and they
 * publish the adapter for it. Do not re-litigate this by removing the package.
 */
export function BookingEmbed({
  bookable,
  eventSlug,
}: {
  /** The treatment being booked, or null for the full menu. */
  bookable: BookableType | null;
  /** Explicit event slug, so a bare `/book` can pass the account's own page. */
  eventSlug: string;
}) {
  /* `resolvedTheme`, not `theme`: the site's default is "system" and Cal needs
     the concrete answer. Undefined until next-themes has read the DOM. */
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!CALCOM_USERNAME || !resolvedTheme) return;
    let cancelled = false;

    (async () => {
      const cal = await getCalApi();
      if (cancelled) return;
      /* Theme only. Brand colour is set in the Cal.com account's appearance
         settings rather than passed from here: it is her brand, and it should
         look the same on the account's own page as it does embedded. */
      cal("ui", {
        theme: resolvedTheme === "dark" ? "dark" : "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedTheme]);

  /* A labelled box rather than a broken embed, the same way `Photo` handles a
     missing ImageKit endpoint. Without an account this is what /book shows,
     and it says so instead of rendering an empty white rectangle. */
  if (!CALCOM_USERNAME) {
    return (
      <div className="grid min-h-[28rem] place-items-center rounded-lg border border-dashed border-border bg-placeholder p-8 text-center">
        <div>
          <p className="text-[11px] tracking-[0.14em] text-placeholder-text uppercase">
            Booking not connected
          </p>
          <p className="mt-3 max-w-sm text-[14px] text-muted-foreground">
            {bookable
              ? `${bookable.name}, ${bookable.durationMin} minutes.`
              : "The full treatment menu."}{" "}
            Set NEXT_PUBLIC_CALCOM_USERNAME to show the calendar here.
          </p>
        </div>
      </div>
    );
  }

  const calLink = eventSlug
    ? `${CALCOM_USERNAME}/${eventSlug}`
    : CALCOM_USERNAME;

  return (
    <Cal
      calLink={calLink}
      config={{ layout: "month_view" }}
      /* min-h holds the page still while Cal measures itself, or the footer
         sits under the heading for a beat and then gets shoved down. No
         `overflow-hidden`: Cal grows the iframe when a day is picked and the
         times appear, and clipping it cuts the bottom off the slot list. */
      className="min-h-[40rem] w-full"
    />
  );
}
