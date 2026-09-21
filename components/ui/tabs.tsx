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
        "-mx-gutter-sm flex snap-x gap-2.5 overflow-x-auto scroll-pl-gutter-sm px-gutter-sm py-1 [scrollbar-width:none] lg:-mx-gutter lg:scroll-pl-gutter lg:px-gutter [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}

/**
 * An outlined chip that fills copper when it is the open one.
 *
 * It started as a copper underline borrowed from the header nav, and that was
 * the wrong borrow: the header is a menu you already expect to be clickable,
 * sitting alone on a bar. Dropped into the middle of a page, the same
 * treatment reads as a caption above a list. Two things made it worse -
 * `cursor` stayed `default` on hover while every other button on the site
 * turns to `pointer`, and the only hover feedback was a slight shift in text
 * colour. A control nobody can tell is a control is a control nobody uses.
 *
 * So: a border to make each one an object, a filled state that cannot be read
 * as anything but "this is the selected one", and a real pointer. The pill
 * shape echoes the Book buttons, but outlined rather than solid, so it reads
 * as a selector rather than a call to action.
 */
function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "group shrink-0 cursor-pointer snap-start rounded-full border border-border bg-card px-4 py-2 font-sans text-[12px] tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase transition-colors outline-none",
        "hover:border-copper hover:text-foreground",
        "focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/40",
        /* data-active, not data-selected. Base UI names it `active` on Tab
           (see TabsTabDataAttributes), and the wrong one fails silently:
           the tabs work, they just all look inactive. */
        "data-active:border-copper data-active:bg-copper data-active:text-copper-ink",
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
      className={cn(
        "outline-none",
        /**
         * 180ms of fade and rise when a panel opens.
         *
         * Both groups are rows of cards that look alike, so an instant swap
         * reads as a flicker or as nothing at all: you click, and you cannot
         * tell whether the page heard you. Starting the cards 8px low and
         * transparent means the eye watches them arrive, which is what says
         * "this is different content" rather than "the screen blinked".
         *
         * Base UI puts `data-starting-style` on the panel for the first frame
         * after it opens, which is the only hook this needs. It runs on a tab
         * change and never on first paint, so nothing is slowed down or
         * delayed for someone arriving on the page.
         */
        "transition-[opacity,translate] duration-180 ease-out data-starting-style:translate-y-2 data-starting-style:opacity-0",
        /* Off for anyone who asked their system for less motion. Vestibular
           disorders make movement like this genuinely unpleasant, and the
           tabs work identically without it. */
        "motion-reduce:transition-none motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-starting-style:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel };
