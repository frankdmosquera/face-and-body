"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { BookingProvider, useBooking } from "@frankdmosquera/booking-component";
import "@frankdmosquera/booking-component/booking-component.css";

/**
 * Booking CRM's booking window, for the whole site.
 *
 * ONE PROVIDER, MOUNTED IN THE ROOT LAYOUT, so the 40 Book buttons stay
 * ordinary server-rendered anchors: no client component per card and no
 * catalogue crossing into the browser. Each anchor carries `data-booking`
 * (`bookingTrigger` in `lib/bookingConfig.ts`) and one click listener here
 * opens the window on that service.
 *
 * The address and the business come in as props from the server layout, so
 * the catalogue `bookingConfig` imports never reaches this bundle.
 *
 * The standard look for now: the window's own neutral tokens, none of hers.
 * After a booking the window shows its own confirmation; the site has no
 * thank-you page.
 */
export function BookingHost({
  apiUrl,
  slug,
  children,
}: {
  apiUrl: string;
  slug: string;
  children: ReactNode;
}) {
  return (
    <BookingProvider
      apiUrl={apiUrl}
      slug={slug}
      language="en"
      afterBooking="stay"
    >
      <OpenTreatment apiUrl={apiUrl} slug={slug}>
        {children}
      </OpenTreatment>
    </BookingProvider>
  );
}

/** Opens the window on a treatment by its booking id; none opens her list. */
type OpenTreatmentType = (bookingId?: string) => void;

const OpenTreatmentContext = createContext<OpenTreatmentType | null>(null);

/** For a client control of the site's own, like the button on /book. */
export function useOpenTreatment(): OpenTreatmentType {
  const openTreatment = useContext(OpenTreatmentContext);
  if (!openTreatment)
    throw new Error("useOpenTreatment is used outside BookingHost.");
  return openTreatment;
}

/**
 * Turns a treatment's booking id into the window, open on that treatment.
 *
 * THE WINDOW OPENS A SERVICE BY ITS ID IN BOOKING CRM, NOT ITS SLUG, and the id
 * differs between the laptop's database and the live one, so the site cannot
 * carry it. It carries the slug, and the first Book click reads her list once
 * (every link's slug and id, one small request) and keeps it for the visit. A
 * slug the list lacks, or a list that will not load, opens her whole list
 * rather than nothing.
 *
 * Modified clicks are left alone: Ctrl or Cmd click and middle click open
 * /book in a new tab, which is what someone doing them expects. Capture, so
 * the navigation is cancelled before anything else handles the click.
 */
function OpenTreatment({
  apiUrl,
  slug,
  children,
}: {
  apiUrl: string;
  slug: string;
  children: ReactNode;
}) {
  const { open } = useBooking();
  const ids = useRef<Promise<Map<string, string>> | null>(null);

  const openTreatment = useCallback<OpenTreatmentType>(
    (bookingId) => {
      if (!bookingId) return open();
      ids.current ??= fetch(`${apiUrl}/public/${slug}/booking-links`)
        .then((response) => (response.ok ? response.json() : null))
        .then(
          (list: { bookingLinks?: { id: string; slug: string }[] } | null) =>
            new Map(
              (list?.bookingLinks ?? []).map((link) => [link.slug, link.id]),
            ),
        )
        .catch(() => {
          ids.current = null; // a dropped request is tried again on the next click
          return new Map<string, string>();
        });
      void ids.current.then((found) => open(found.get(bookingId)));
    },
    [apiUrl, slug, open],
  );

  useEffect(() => {
    function openFromAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLElement>("[data-booking]");
      if (!anchor) return;
      event.preventDefault();
      openTreatment(anchor.dataset.booking || undefined); // empty: her whole list
    }

    document.addEventListener("click", openFromAnchor, true);
    return () => document.removeEventListener("click", openFromAnchor, true);
  }, [openTreatment]);

  return (
    <OpenTreatmentContext.Provider value={openTreatment}>
      {children}
    </OpenTreatmentContext.Provider>
  );
}
