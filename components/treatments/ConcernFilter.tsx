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
          {/* Clicking the active chip again clears it, but nobody guesses that. */}
          <button
            type="button"
            aria-pressed={active === ""}
            onClick={() => setActive("")}
            className={cn(
              CHIP,
              active === ""
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card hover:border-copper",
            )}
          >
            All
          </button>
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
  // Once a concern is chosen, the group headings are the same axis at lower
  // resolution and read as a second, contradicting filter: picking fine lines
  // should not answer with "For congested and breakout-prone skin". The
  // remaining cards collapse into one list instead.
  // Filtering also has to reflow. Each group owns its own grid, so hiding cards
  // in place leaves the survivors stranded in four sparse rows. display:contents
  // dissolves the group and list boxes while filtering, so every remaining card
  // becomes a child of one grid and they pack from the top.
  const on = `[data-concern]:not([data-concern=""])`;
  const whileFiltering =
    `${on} [data-group-head]{display:none}` +
    `${on} [data-group]{display:contents}` +
    `${on} [data-group]>ul{display:contents}` +
    `${on} [data-group-stack]{display:grid;gap:1.5rem;grid-template-columns:1fr}` +
    `@media(min-width:768px){${on} [data-group-stack]{grid-template-columns:repeat(2,1fr)}}` +
    `@media(min-width:1024px){${on} [data-group-stack]{grid-template-columns:repeat(3,1fr)}}`;

  const perConcern = chips
    .map(
      ({ slug }) =>
        `[data-concern="${slug}"] [data-concerns]:not([data-concerns~="${slug}"]){display:none}` +
        `[data-concern="${slug}"] [data-group]:not(:has([data-concerns~="${slug}"])){display:none}`,
    )
    .join("");

  return <style>{whileFiltering + perConcern}</style>;
}
