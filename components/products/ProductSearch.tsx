"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * Filters the cards already on the page, across every group at once.
 *
 * SEARCHING ONE TAB WOULD BE A SEARCH THAT LIES. Type "lip balm" while
 * Cleansing and clearing is open and a per-tab search says there is nothing,
 * on a page that stocks four of them. So every panel filters together and the
 * number on each chip is rewritten to the matches inside it: "peel" leaves
 * Resurfacing on 7 and Lifting and firming on 1, and you can see where to go
 * rather than being told no.
 *
 * It ships no product data and builds no index. The text is already in the
 * card, so this reads `textContent` once per card, caches it, and matches
 * against that. Name, description, size and price all come along for free,
 * which is why "salicylic" finds the willow bark products even though the word
 * is only in our own sentence about them.
 *
 * `style.display`, not the `hidden` attribute. A card's own class sets
 * `display: flex`, and a class beats the user agent's `[hidden] { display:
 * none }`, so `hidden` would have set the attribute and changed nothing
 * visible. That one is only obvious after it has wasted an afternoon.
 */
const TEXT = new WeakMap<HTMLElement, string>();

function textOf(card: HTMLElement) {
  let text = TEXT.get(card);
  if (text === undefined) {
    text = (card.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
    TEXT.set(card, text);
  }
  return text;
}

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  /* The match count is written straight into the live region rather than held
     in state. It is never rendered anywhere else, so as state it would be a
     second render per keystroke to produce a string only a screen reader ever
     reads, and `react-hooks/set-state-in-effect` is right to refuse it. */
  const announceRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const needle = query.trim().toLowerCase();
    const panels = [
      ...document.querySelectorAll<HTMLElement>("[data-slot='tabs-panel']"),
    ];

    let total = 0;

    for (const panel of panels) {
      const cards = [
        ...panel.querySelectorAll<HTMLElement>("[data-product]"),
      ];
      let found = 0;

      for (const card of cards) {
        const hit = needle === "" || textOf(card).includes(needle);
        card.style.display = hit ? "" : "none";
        if (hit) found += 1;
      }

      total += found;

      // The count on the chip, rewritten to what is actually in the panel.
      // Restoring it is why the original is parked in a data attribute rather
      // than being recalculated: the server rendered the truth once already.
      const group = panel.getAttribute("data-group-slug");
      const count = document.querySelector<HTMLElement>(
        `[data-count-for="${group}"]`,
      );
      if (count) {
        count.textContent =
          needle === "" ? (count.dataset.total ?? "") : String(found);
      }

      const empty = panel.querySelector<HTMLElement>("[data-empty]");
      if (empty) empty.style.display = found === 0 ? "" : "none";

      const head = panel.querySelector<HTMLElement>("[data-group-head]");
      if (head) head.style.display = found === 0 ? "none" : "";
    }

    if (announceRef.current) {
      announceRef.current.textContent =
        needle === ""
          ? ""
          : `${total} ${total === 1 ? "product" : "products"} match ${needle}`;
    }
  }, [query]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id={id}
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
        /* h-[38px] to match the sort trigger beside it, which is py-2 on a
           12px line. The shared Input is h-8, which is right in a form and
           6px short next to a chip. */
        className="h-[38px] rounded-full pr-10 pl-10"
      />
      {query !== "" && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
      {/* Announced, not just drawn. A filter that silently empties the page is
          the thing a screen reader user has no way to notice. */}
      <p ref={announceRef} aria-live="polite" className="sr-only" />
    </div>
  );
}
