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
/**
 * No enter animation, and that is a decision rather than an omission. Do not
 * add one back without reading this.
 *
 * A 180ms fade-and-rise was built here and it looked good. It also broke the
 * tabs outright: Base UI will not put `hidden` back on a closing panel until
 * the animations in that panel's subtree have finished, and with no exit
 * animation there was nothing to finish. Every tab a visitor opened stayed
 * open underneath the next one. Four panels stacked, the section 2,802px
 * instead of 1,111, at any clicking speed a person can manage - 60ms apart or
 * 700ms, it made no difference.
 *
 * Four attempts, all verified failures:
 *
 * - `data-ending-style:transition-none`. Still leaks. The transition is
 *   declared while the panel is opening, which is when it matters.
 * - Scoping the transition off exiting panels with `:not([data-ending-style])`.
 *   Worse: `duration-180` stays behind on its own and CSS defaults
 *   transition-property to `all`, so exiting panels transition everything.
 * - Moving the animation to a child div. Base UI inspects the subtree, so the
 *   child blocks the hide exactly as the panel did.
 * - Removing it entirely. The only one that works: panels settle to one.
 *
 * Proven by stripping the animation from the source and re-testing, not by
 * reasoning about it. If this is ever wanted, it needs a real exit animation
 * that actually completes, or a Base UI version that stops waiting.
 */
function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      keepMounted
      /**
       * DO NOT hide panels with `data-ending-style`. It was tried, it shipped,
       * and it took the page down.
       *
       * The reasoning looked sound: Base UI marks a closing panel
       * `data-ending-style` and `inert`, then fails to put `hidden` back on it,
       * so panels stack up in the layout. Driving `display` off the attribute
       * instead seemed like the fix, and it tested clean on a freshly loaded
       * page.
       *
       * The attribute is never cleared. Once a panel has been closed once it
       * keeps `data-ending-style` for the life of the page, so after a visitor
       * had opened each tab, every panel was `display: none` and the section
       * showed nothing at all. Verified live, on all four panels of
       * /other-treatments.
       *
       * The stacking is the lesser bug: a section that is too tall still shows
       * every treatment. A section that is empty shows none. Until there is a
       * real fix - an exit animation that completes, or a Base UI version that
       * stops waiting - the panels stay as Base UI leaves them.
       */
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel };
