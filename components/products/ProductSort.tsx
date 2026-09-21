"use client";

import { useEffect, useId, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Reorders the cards already on the page.
 *
 * It ships no product data. The cards are rendered on the server and carry
 * their own `data-name` and `data-price`, so this reads the keys off the DOM
 * and sets a CSS `order` on each card. Passing 133 products across the
 * boundary to sort them would put every description into the browser bundle
 * for a control most visitors never touch, which is the mistake `data/nav.ts`
 * exists to avoid.
 *
 * `order` works because every panel's grid is a grid container and `order`
 * reorders its items without touching the document. One ascending counter
 * across all seven panels is enough: `order` only needs to be relatively
 * correct inside each container, so a global sequence sorts every panel at
 * once and no card ever moves between groups.
 *
 * The control is Base UI's Select, wrapped in `components/ui/select.tsx` and
 * styled as one of the page's chips. Base UI is already a dependency, since
 * the tabs are built on it, so this costs no new package.
 */
const SORTS = [
  { value: "default", label: "Featured" },
  { value: "name-asc", label: "Name, A to Z" },
  { value: "name-desc", label: "Name, Z to A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
] as const;

type SortValueType = (typeof SORTS)[number]["value"];

function compare(a: HTMLElement, b: HTMLElement, sort: SortValueType) {
  const nameA = a.dataset.name ?? "";
  const nameB = b.dataset.name ?? "";
  const priceA = Number(a.dataset.price ?? 0);
  const priceB = Number(b.dataset.price ?? 0);

  switch (sort) {
    case "name-asc":
      return nameA.localeCompare(nameB);
    case "name-desc":
      return nameB.localeCompare(nameA);
    // Ties broken by name so the order is stable rather than whatever the
    // browser's sort happened to do. 133 products across 40-odd price points
    // means ties are the common case, not the edge one.
    case "price-asc":
      return priceA - priceB || nameA.localeCompare(nameB);
    case "price-desc":
      return priceB - priceA || nameA.localeCompare(nameB);
    default:
      return 0;
  }
}

export function ProductSort() {
  const [sort, setSort] = useState<SortValueType>("default");
  const id = useId();

  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>("[data-product]")];

    if (sort === "default") {
      for (const card of cards) card.style.order = "";
      return;
    }

    for (const [index, card] of [...cards]
      .sort((a, b) => compare(a, b, sort))
      .entries()) {
      card.style.order = String(index);
    }
  }, [sort]);

  return (
    <div className="flex items-center gap-2.5">
      <label
        htmlFor={id}
        className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
      >
        Sort
      </label>
      {/* `items` is what makes the trigger read "Name, A to Z" rather than
          "name-asc". Without it Base UI's Value renders the raw value, which
          is the kind of bug that ships because the developer knows what the
          values mean. */}
      <Select
        items={SORTS}
        value={sort}
        onValueChange={(value) => setSort(value as SortValueType)}
      >
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORTS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
