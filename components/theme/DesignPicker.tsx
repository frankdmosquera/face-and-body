"use client";

// The panel that flips the design options (lib/designOptions.ts) on the page
// it sits on, bottom right, folded on a phone. Goes with that file once the
// picks are made.

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
  /* null until tapped: open from `md`, folded on a phone, where the panel
     would sit over the colour switch and most of the screen. */
  const [open, setOpen] = useState<boolean | null>(null);
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

  const folded = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-lg"
    >
      <SlidersHorizontal aria-hidden="true" className="size-4" />
      Options
    </button>
  );
  if (open === false) return folded;

  return (
    <>
      {open === null && <span className="md:hidden">{folded}</span>}
      <div
        role="group"
        aria-label="Design options"
        className={cn(
          "fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-3 text-sm shadow-lg",
          open === null && "hidden md:block",
        )}
      >
        <div className="mb-2 flex items-center justify-between pl-1">
          <span className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            Options
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Hide options"
            className="rounded-full p-1 text-muted-foreground hover:text-foreground"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        {groups.map((group) => (
          <div key={group.key} className="mt-2 first-of-type:mt-0">
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
    </>
  );
}
