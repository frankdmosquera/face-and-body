"use client";

import { useSyncExternalStore } from "react";

/**
 * The booking just made, read off the thank-you page's query string.
 *
 * The booking window sends the visitor here with `?service=`, `?when=` (the
 * start, ISO) and `?zone=` (her time zone) once it is booked
 * (`BookingHost`). Written in her zone, never the visitor's, so someone
 * booking from another province sees the clinic's time. Nothing to show, or a
 * date that does not read, shows nothing rather than a wrong line: the page
 * still says the booking is made.
 *
 * Read the same way as `Booker`: the page is static, so the server never sees
 * the query, and `useSyncExternalStore` reads it once the browser is there.
 */

const subscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => null;

export function BookedDetails() {
  const search = useSyncExternalStore<string | null>(
    subscribe,
    getSearch,
    getServerSearch,
  );
  if (search === null) return null;

  const query = new URLSearchParams(search);
  const service = query.get("service");
  const startsAt = new Date(query.get("when") ?? "");
  const zone = query.get("zone") ?? "America/Edmonton";
  if (!service || Number.isNaN(startsAt.getTime())) return null;

  let when: string;
  try {
    when = new Intl.DateTimeFormat("en-CA", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: zone,
      timeZoneName: "short",
    }).format(startsAt);
  } catch {
    return null; // a zone the browser does not know
  }

  return (
    <p className="mt-8 rounded-2xl bg-card px-6 py-5 text-[17px] shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)]">
      <span className="font-serif text-[22px] text-accent-foreground">
        {service}
      </span>
      <span className="mt-1 block text-muted-foreground">{when}</span>
    </p>
  );
}
