"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useOpenTreatment } from "@/components/booking/BookingHost";
import { buttonVariants } from "@/components/ui/button";
import type { BookableType } from "@/lib/bookingConfig";

/**
 * Picks the treatment off the query string and opens the window on it.
 *
 * `/book` is where every Book control lands when the window could not open in
 * place: no JavaScript yet, a middle click, a copied link. So the page opens
 * the window itself, once, on the treatment the link named, and keeps a
 * button for opening it again after the visitor closes it.
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
 * `useSyncExternalStore` rather than reading it in an effect: this is the hook
 * that exists for a value the server cannot know, read once the browser is
 * there, without the markup disagreeing across hydration.
 */

/* The query changes only by navigation, and a navigation remounts this. So
   there is nothing to subscribe to and nothing to tear down. */
const subscribe = () => () => {};
const getSearch = () => window.location.search;
/* The server has no query, and neither does the hydrating render: null, so the
   window waits for the real one rather than opening on her whole list first. */
const getServerSearch = () => null;

export function Booker({
  bookables,
}: {
  bookables: Record<string, BookableType>;
}) {
  const search = useSyncExternalStore<string | null>(
    subscribe,
    getSearch,
    getServerSearch,
  );
  const slug = new URLSearchParams(search ?? "").get("treatment");
  /* An unknown slug falls back to the whole menu rather than erroring. A stale
     link from an old print-out should offer every treatment, not a dead end. */
  const bookable = slug ? (bookables[slug] ?? null) : null;
  const open = useOpenTreatment();
  const bookingId = bookable?.bookingId;

  const queryRead = search !== null;

  /* Once per page load, after hydration has read the query. */
  useEffect(() => {
    if (queryRead) open(bookingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, not on every new open
  }, [queryRead, bookingId]);

  return (
    <div>
      {bookable && (
        /* The treatment is named in our own type. The visitor clicked Book on
           a specific card and has to see that it survived the journey. */
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[15px]">
            <span className="text-muted-foreground">Booking</span>{" "}
            <span className="text-accent-foreground">{bookable.name}</span>
            <span className="text-muted-foreground">
              {" "}
              · {bookable.durationMin} min
            </span>
          </p>
          {/* A plain anchor, not `Link`: a same-page `Link` changes the URL
              with `history.pushState`, which fires no event, so this would
              keep the treatment it read on mount. A real navigation re-reads
              it. */}
          <a
            href="/book"
            className="border-b border-copper pb-0.5 text-[11px] tracking-[0.1em] text-accent-foreground uppercase"
          >
            Change treatment
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => open(bookingId)}
        className={buttonVariants()}
      >
        {bookable ? "Choose a time" : "Choose a treatment and a time"}
      </button>
    </div>
  );
}
