"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "cn";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

/* Scrolls sideways rather than wrapping. Four labels do not fit on a phone,
   and a wrapped row reads as two rows of links rather than one control. */
function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        /* Bleeds to the screen edge and pads itself back, so a tab scrolled
           half out of view is cut by the window rather than floating in the
           gutter. The values are the gutter tokens, not a guess: Container is
           20px at mobile and 32px from lg, and -mx-4 left the row 4px short of
           the heading above it. */
        /* scroll-pl matters as much as px here. Base UI scrolls the active tab
           into view on mount, and without scroll-padding it scrolls the
           padding away, leaving the first tab flush against the screen edge
           while the heading above it sits in the gutter. */
        "-mx-gutter-sm flex snap-x gap-7 overflow-x-auto scroll-pl-gutter-sm border-b border-border px-gutter-sm [scrollbar-width:none] lg:-mx-gutter lg:scroll-pl-gutter lg:px-gutter [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}

/* Copper underline on the active tab, matching the header's TOP_LINK, so the
   two controls on the page read as the same system. -mb-px sits the underline
   on the list's own border rather than above it. */
function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "-mb-px shrink-0 snap-start border-b-2 border-transparent pb-3 font-sans text-[13px] tracking-[0.06em] whitespace-nowrap text-muted-foreground uppercase transition-colors outline-none",
        "hover:text-foreground focus-visible:border-copper focus-visible:text-foreground",
        /* data-active, not data-selected. Base UI names it `active` on Tab
           (see TabsTabDataAttributes), and the wrong one fails silently:
           the tabs work, they just all look inactive. */
        "data-active:border-copper data-active:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * `keepMounted` is not a default to be tidied away later. The home page is the
 * one page built to rank for facials, and a panel Base UI unmounts is a
 * treatment that is not in the HTML Google reads. Hidden is fine; absent is
 * not. Every panel stays in the document and the inactive ones are hidden by
 * the `hidden` attribute.
 */
function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      keepMounted
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel };
