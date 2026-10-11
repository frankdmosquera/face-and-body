"use client";

// The three colour looks (the data-look blocks at the end of app/globals.css),
// flippable on the real pages, live included, until the client picks one
// (Frank, 2026-10-10). Then the winner moves into @theme and this goes, with
// its boot script in app/layout.tsx.

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const LOOK_KEY = "look";
const LOOK_EVENT = "lookchange";
const LOOKS = [
  { id: "copper", label: "Copper" },
  { id: "gold", label: "Gold" },
  { id: "espresso", label: "Espresso" },
] as const;
type LookType = (typeof LOOKS)[number]["id"];

/** Puts a remembered look back on <html data-look> before the page draws. */
export const lookBootScript = `try{var l=localStorage.getItem(${JSON.stringify(LOOK_KEY)});if(l==="gold"||l==="espresso")document.documentElement.setAttribute("data-look",l)}catch(e){}`;

function showing(): LookType {
  const current = document.documentElement.getAttribute("data-look");
  return current === "gold" || current === "espresso" ? current : "copper";
}

function subscribe(change: () => void) {
  window.addEventListener(LOOK_EVENT, change);
  return () => window.removeEventListener(LOOK_EVENT, change);
}

export function LookSwitch() {
  const look = useSyncExternalStore(
    subscribe,
    showing,
    () => "copper" as LookType,
  );

  function pick(next: LookType) {
    const html = document.documentElement;
    if (next === "copper") html.removeAttribute("data-look");
    else html.setAttribute("data-look", next);
    window.dispatchEvent(new Event(LOOK_EVENT));
    try {
      localStorage.setItem(LOOK_KEY, next);
    } catch {
      // Storage blocked: the pick still holds for this page.
    }
  }

  return (
    <div
      role="group"
      aria-label="Colours"
      /* Beside the round options button (`DesignPicker`), on one row. */
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[4.25rem] z-50 flex h-11 items-center gap-1 rounded-full border border-border bg-card p-1 text-sm shadow-lg"
    >
      {LOOKS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => pick(option.id)}
          aria-pressed={look === option.id}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors duration-150",
            look === option.id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
