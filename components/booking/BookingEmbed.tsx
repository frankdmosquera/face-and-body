"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { CALCOM_USERNAME } from "@/lib/bookingConfig";

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
  eventSlug,
}: {
  /** Which event type to open. Empty opens the account page, the full menu. */
  eventSlug: string;
}) {
  /* `resolvedTheme`, not `theme`: the site's default is "system" and Cal needs
     the concrete answer. Undefined until next-themes has read the DOM. */
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
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
