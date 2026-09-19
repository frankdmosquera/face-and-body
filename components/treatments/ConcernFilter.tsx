"use client";

// Client for the selected chip and nothing else. The rows stay on the server:
// they carry data-concerns, this sets data-concern on the wrapper, and the
// stylesheet below does the hiding. No service data reaches the browser.
import { useState, type ReactNode } from "react";
import type { ConcernChip } from "@/lib/services";
import { cn } from "@/lib/utils";

const CHIP =
  "shrink-0 rounded-full border px-4 py-2 text-[13px] transition-colors duration-150";

export function ConcernFilter({
  chips,
  total,
  children,
}: {
  chips: readonly ConcernChip[];
  total: number;
  children: ReactNode;
}) {
  const [active, setActive] = useState("");
  const shown = chips.find((chip) => chip.slug === active)?.count ?? total;

  return (
    <div data-concern={active}>
      {chips.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto border-y border-border py-3">
          <span className="mr-2 shrink-0 text-xs tracking-[0.12em] text-muted-foreground uppercase">
            Filter
          </span>
          {chips.map((chip) => {
            const on = active === chip.slug;
            return (
              <button
                key={chip.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(on ? "" : chip.slug)}
                className={cn(
                  CHIP,
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card hover:border-copper",
                )}
              >
                {chip.label}
              </button>
            );
          })}
          <span
            aria-live="polite"
            className="ml-auto shrink-0 pl-4 text-[13px] text-muted-foreground"
          >
            {shown} {shown === 1 ? "treatment" : "treatments"}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * One pair of rules per concern present, emitted next to the list. CSS cannot
 * compare two attribute values, so the alternative was either shipping the
 * services to the client or hand-maintaining a rule per concern in globals.css.
 * Slugs come from the closed ConcernSlug union, so there is nothing to escape.
 */
export function ConcernFilterStyles({ chips }: { chips: readonly ConcernChip[] }) {
  const css = chips
    .map(
      ({ slug }) =>
        `[data-concern="${slug}"] [data-concerns]:not([data-concerns~="${slug}"]){display:none}` +
        `[data-concern="${slug}"] [data-group]:not(:has([data-concerns~="${slug}"])){display:none}`,
    )
    .join("");
  return <style>{css}</style>;
}
