"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { CALCOM_USERNAME } from "@/lib/bookingConfig";

/**
 * Arms every Book control on the site to open the booker as an overlay.
 *
 * ONE COMPONENT FOR THE WHOLE SITE, mounted in the root layout and rendering
 * nothing. Cal's popup works by watching for clicks on anything carrying
 * `data-cal-link`, so the 40 Book buttons stay ordinary server-rendered
 * anchors - no client component per card, no catalogue crossing into the
 * browser, forty attributes instead of forty bundles.
 *
 * THE BUTTONS ARE STILL REAL LINKS. Each one points at `/book?treatment=...`
 * and Cal intercepts the click. So the overlay is what a visitor gets, and
 * everything a link is for still works underneath it: middle-click, copy link
 * address, share it, and the page itself if the script never arrives. An
 * overlay that is only an overlay is a dead end for all four.
 *
 * LOADED IN TWO HALVES, ON TWO DIFFERENT SIGNALS, and that split is the whole
 * design. An inline embed loads everything for every visitor, most of whom
 * never book, which is what makes a site carrying one feel slow. Loading
 * nothing until the click just moves the wait to the worst moment.
 *
 * So: Cal's script when the browser goes idle, because it has to be listening
 * before anyone clicks. The booker itself only when someone hovers, focuses or
 * touches a Book button - an entire hidden iframe, bought only once a visitor
 * has shown they might want it. Somebody who reads the treatment list and
 * leaves pays for neither.
 */
export function BookingPopup() {
  /* `resolvedTheme`, not `theme`: the site default is "system" and Cal needs
     the concrete answer. Undefined until next-themes has read the DOM. */
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    let cancelled = false;
    let warmed = false;
    /* Cal is loaded and configured, so it can take a click from here. */
    let ready = false;

    /**
     * Cal's script, once the browser is idle.
     *
     * This is the small half and it cannot wait for intent: the script is what
     * watches for `data-cal-link` clicks, so without it a Book button is just
     * a link to /book and nobody on a phone ever sees the overlay. Idle rather
     * than immediate keeps it out of the way of the page's own loading, which
     * is the part Google measures.
     */
    /* Safari only shipped requestIdleCallback recently, so the timeout is a
       real branch rather than defensive noise. Captured as a boolean because
       TypeScript types the method as always present. */
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => void configure())
      : window.setTimeout(() => void configure(), 2000);

    async function configure() {
      const cal = await getCalApi();
      if (cancelled) return;
      cal("ui", {
        theme: resolvedTheme === "dark" ? "dark" : "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      ready = true;
    }

    /**
     * Stops a Book link navigating once Cal is there to open the overlay.
     *
     * CAL DOES NOT CANCEL THE CLICK ITSELF. Their documentation puts
     * `data-cal-link` on a `<button>`, which has nothing to cancel, so their
     * handler never needed to - and on an anchor both things happen. Measured:
     * clicking Book took the visitor to /book, which renders the inline
     * booker, and the overlay opened on top of it. Two calendars stacked, and
     * you had to dismiss one to use the other.
     *
     * Only after `ready`, which is the point. Before Cal's script has loaded,
     * or if it never does, the anchor stays a working link to /book - so the
     * button is never dead, it just stops being an overlay.
     *
     * Modified clicks are left alone. Ctrl or Cmd click opens /book in a new
     * tab and middle click does the same, which is exactly what someone doing
     * it expects; hijacking those is what makes a link feel broken.
     */
    function stopNavigation(event: MouseEvent) {
      if (!ready || event.defaultPrevented) return;
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a[data-cal-link]")) return;
      event.preventDefault();
    }

    /**
     * The booker itself, only once someone shows intent.
     *
     * This is the expensive half - an entire hidden iframe - and most visitors
     * to a marketing site never book, so it waits. Hover is the desktop
     * signal and gives 100-300ms of head start before the click; `focusin`
     * covers the keyboard; `touchstart` is the phone's nearest equivalent and
     * fires before the tap completes.
     *
     * The account page rather than any one treatment, because what is slow is
     * the shared shell - fonts, styles, the booker - and every event type
     * reuses it. One warm-up covers all 40.
     */
    async function warm(event: Event) {
      if (warmed) return;
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("[data-cal-link]"))
        return;
      warmed = true;
      const cal = await getCalApi();
      if (cancelled) return;
      cal("preload", { calLink: CALCOM_USERNAME });
    }

    /* Capture, because `pointerenter` does not bubble. */
    const options = { capture: true, passive: true } as const;
    document.addEventListener("pointerenter", warm, options);
    document.addEventListener("focusin", warm, options);
    document.addEventListener("touchstart", warm, options);
    /* Capture, so the navigation is cancelled before anything else handles
       the click. preventDefault does not stop Cal own listener running. */
    document.addEventListener("click", stopNavigation, true);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      document.removeEventListener("pointerenter", warm, options);
      document.removeEventListener("focusin", warm, options);
      document.removeEventListener("touchstart", warm, options);
      document.removeEventListener("click", stopNavigation, true);
    };
  }, [resolvedTheme]);

  return null;
}
