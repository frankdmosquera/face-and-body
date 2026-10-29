"use client";

// The panel that flips the design options (lib/designOptions.ts) on the page
// it sits on. Bottom left, folded to a round icon (Frank, 2026-10-11: no
// "Options" label). Goes with that file once the picks are made.

import { useState, useSyncExternalStore } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { DESIGN_OPTIONS, type DesignPageType } from "@/lib/designOptions";
import { cn } from "@/lib/cn";

const EVENT = "designoptionchange";

/* One string, so the snapshot is a stable primitive. */
function snapshot() {
  const html = document.documentElement;
  return DESIGN_OPTIONS.map(
    (group) => html.getAttribute(`data-${group.key}`) ?? group.fallback,
  ).join("|");
}
const serverSnapshot = () =>
  DESIGN_OPTIONS.map((group) => group.fallback).join("|");

function subscribe(change: () => void) {
  window.addEventListener(EVENT, change);
  return () => window.removeEventListener(EVENT, change);
}

export function DesignPicker({ page }: { page: DesignPageType }) {
  const [open, setOpen] = useState(false);
  const current = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const chosen = current.split("|");
  const groups = DESIGN_OPTIONS.map((group, index) => ({
    ...group,
    chosen: chosen[index],
  })).filter((group) => group.page === page);

  function pick(group: string, id: string) {
    document.documentElement.setAttribute(`data-${group}`, id);
    window.dispatchEvent(new Event(EVENT));
    try {
      localStorage.setItem(`option-${group}`, id);
    } catch {
      // Storage blocked: the pick still holds for this page.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-expanded={open}
        aria-label={open ? "Hide design options" : "Design options"}
        className={cn(
          "fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 z-50 grid size-11 place-items-center rounded-full border border-border shadow-lg transition-colors duration-150",
          open
            ? "bg-foreground text-background"
            : "bg-card text-foreground hover:text-accent-foreground",
        )}
      >
        {open ? (
          <X aria-hidden="true" className="size-4" />
        ) : (
          <SlidersHorizontal aria-hidden="true" className="size-4" />
        )}
      </button>
      {open && (
        <div
          role="group"
          aria-label="Design options"
          className="fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] left-4 z-50 max-h-[calc(100svh-6rem)] w-[min(19rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-border bg-card p-3 text-sm shadow-lg"
        >
          {groups.map((group) => (
            <div key={group.key} className="mt-3 first:mt-0">
              <span className="block pl-1 text-xs text-muted-foreground">
                {group.label}
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => pick(group.key, option.id)}
                    aria-pressed={group.chosen === option.id}
                    className={cn(
                      "rounded-full px-3 py-1 transition-colors duration-150",
                      group.chosen === option.id
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
