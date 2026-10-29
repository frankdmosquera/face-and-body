"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  BookingProvider,
  useBooking,
  type BookedType,
} from "@frankdmosquera/booking-component";
import "@frankdmosquera/booking-component/booking-component.css";

/**
 * Booking CRM's booking window, for the whole site.
 *
 * ONE PROVIDER, MOUNTED IN THE ROOT LAYOUT, so the 40 Book buttons stay
 * ordinary server-rendered anchors, with no client component per card. Each
 * anchor carries `data-booking` (`bookingTrigger` in `lib/bookingConfig.ts`)
 * and one click listener here opens the window on that service.
 *
 * The address and the business come in as props from the server layout, so
 * this file imports nothing from `bookingConfig`. (The catalogue still reaches
 * the browser another way: `MobileNav`, a client component, imports `BookLink`
 * and through it `bookingConfig`. That predates this file.)
 *
 * Its colours are hers, from Booking CRM's Look page. After a booking the
 * visitor goes to /thank-you with the treatment and the time
 * (`thankYouHref`), the one page every booking lands on (2026-10-29).
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
      afterBooking={{ redirectTo: thankYouHref }}
    >
      <OpenTreatment apiUrl={apiUrl} slug={slug}>
        {children}
      </OpenTreatment>
    </BookingProvider>
  );
}

/** The thank-you page for a booking just made: its treatment and time, never
 *  the visitor's own details (the window hands over none). */
function thankYouHref(booked: BookedType): string {
  const query = new URLSearchParams({
    service: booked.serviceName,
    when: booked.startsAt,
    zone: booked.timeZone,
  });
  return `/thank-you?${query}`;
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
 * A request that fails or takes more than five seconds opens her list this
 * time and is tried again on the next click. When two clicks overlap, the
 * last one wins.
 *
 * Modified clicks are left alone: Ctrl or Cmd click and middle click open
 * /book in a new tab, which is what someone doing them expects. Bubble, not
 * capture, so the phone menu's own close (SheetClose) runs first.
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
  const latestClick = useRef(0);

  const openTreatment = useCallback<OpenTreatmentType>(
    (bookingId) => {
      const click = ++latestClick.current;
      if (!bookingId) return open();
      ids.current ??= fetch(
        `${apiUrl.replace(/\/+$/, "")}/public/${slug}/booking-links`,
        { credentials: "omit", signal: AbortSignal.timeout(5000) },
      )
        .then((response) => {
          if (!response.ok) throw new Error(`${response.status}`);
          return response.json();
        })
        .then(
          (list: { bookingLinks: { id: string; slug: string }[] }) =>
            new Map(list.bookingLinks.map((link) => [link.slug, link.id])),
        )
        .catch(() => {
          ids.current = null; // failed or too slow: tried again on the next click
          return new Map<string, string>();
        });
      void ids.current.then((found) => {
        if (click === latestClick.current) open(found.get(bookingId));
      });
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

    document.addEventListener("click", openFromAnchor);
    return () => document.removeEventListener("click", openFromAnchor);
  }, [openTreatment]);

  return (
    <OpenTreatmentContext.Provider value={openTreatment}>
      {children}
    </OpenTreatmentContext.Provider>
  );
}
