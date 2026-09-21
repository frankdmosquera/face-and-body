"use client";

// Client because the answer depends on the current time, which a static page
// cannot know at build. Nothing renders until after mount, so a wrong state
// never flashes and there is nothing to mismatch on hydration.
import { useSyncExternalStore, type ReactNode } from "react";
import { siteConfig } from "@/data/siteConfig";
import { getOpenState, openStateText } from "@/lib/openNow";
import { cn } from "@/lib/cn";

// Mount detection without an effect, which the project's lint rules forbid for
// setState. Both snapshots are stable primitives, so there is nothing to loop on.
const noop = () => () => {};
const onClient = () => true;
const onServer = () => false;

// CSS cannot compare two attribute values, so one rule per day. The list is
// closed and comes from the same data the table renders.
const TODAY_RULES = siteConfig.hours
  .map(
    (entry) =>
      `[data-today="${entry.day}"] [data-day="${entry.day}"]{color:var(--foreground);font-weight:500}` +
      `[data-today="${entry.day}"] [data-day="${entry.day}"] td:last-child{color:var(--foreground)}`,
  )
  .join("");

export function OpenNow({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(noop, onClient, onServer);
  const state = mounted ? getOpenState(new Date()) : null;

  return (
    <div data-today={state?.today}>
      <style>{TODAY_RULES}</style>
      {state && (
        <p
          className={cn(
            "mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px]",
            state.open
              ? "border-copper bg-accent text-accent-foreground"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full",
              state.open ? "bg-copper" : "bg-muted-foreground",
            )}
          />
          {openStateText(state)}
        </p>
      )}
      {children}
    </div>
  );
}
