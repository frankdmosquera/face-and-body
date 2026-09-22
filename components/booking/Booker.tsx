"use client";

import { useSyncExternalStore } from "react";
import { BookingEmbed } from "@/components/booking/BookingEmbed";
import { BOOKING_INDEX_EVENT, type BookableType } from "@/lib/bookingConfig";

/**
 * Picks the treatment off the query string and hands it to the booker.
 *
 * `?treatment=<slug>` rather than `/book/<slug>`, so this is one page instead
 * of 40 routes for 40 rows of the same data - and one static shell, which is
 * what keeps `/book` prerendered like the rest of the site.
 *
 * NOT `useSearchParams`. The page is static, so the server never sees the
 * query; `useSearchParams` would put a Suspense boundary here, and the dev
 * server does not resolve those on a query-string load - the page hangs,
 * looking broken while being perfectly fine in production. `ContactForm` made
 * the same call for the same reason.
 *
 * `useSyncExternalStore` rather than reading it in an effect, which is what
 * this was first written as. Setting state from an effect body is a cascading
 * render and the lint rule says so; this is the hook that exists for exactly
 * this - a value the server cannot know, read once the browser is there,
 * without the markup disagreeing across hydration.
 */

/* The query changes only by navigation, and a navigation remounts this. So
   there is nothing to subscribe to and nothing to tear down. */
const subscribe = () => () => {};
const getSearch = () => window.location.search;
/* The server has no query, and neither does the hydrating render. */
const getServerSearch = () => "";

export function Booker({
  bookables,
}: {
  bookables: Record<string, BookableType>;
}) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const slug = new URLSearchParams(search).get("treatment");
  /* An unknown slug falls back to the whole menu rather than erroring. A stale
     link from an old print-out should offer every treatment, not a dead end. */
  const bookable = slug ? (bookables[slug] ?? null) : null;

  return (
    <div>
      {bookable && (
        /* The treatment is named above the calendar in our own type, not left
           to the embed to state. The visitor clicked Book on a specific card
           and has to see that it survived the journey, before they start
           picking times. */
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[15px]">
            <span className="text-muted-foreground">Booking</span>{" "}
            <span className="text-accent-foreground">{bookable.name}</span>
            <span className="text-muted-foreground">
              {" "}
              · {bookable.durationMin} min
            </span>
          </p>
          {/* A plain anchor, not `Link`, and that is deliberate. A same-page
              `Link` changes the URL with `history.pushState`, which fires no
              event at all - so the query would change while this component
              kept rendering the treatment it read on mount. The same trap the
              header's group links fell into. A real navigation re-reads it. */}
          <a
            href="/book"
            className="border-b border-copper pb-0.5 text-[11px] tracking-[0.1em] text-accent-foreground uppercase"
          >
            Change treatment
          </a>
        </div>
      )}

      <BookingEmbed
        bookable={bookable}
        eventSlug={bookable ? bookable.eventSlug : BOOKING_INDEX_EVENT}
      />
    </div>
  );
}
