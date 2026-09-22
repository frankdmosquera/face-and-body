"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { Tabs } from "@/components/ui/tabs";

/**
 * Horizontal travel, in pixels, before a drag counts as a swipe rather than a
 * tap that wandered. Measured against a thumb, not chosen: below about 40 a
 * firm tap registers as a swipe.
 */
const SWIPE_MIN = 50;

/**
 * What a hash asked for, held until the panel holding it is genuinely open.
 *
 * `card` is a single treatment or product - `/#chemical-peel` - and lands on
 * that card. `group` is a whole group - `/#hydrating`, which is what the
 * header's panels link to - and lands on the top of this component, so you
 * arrive looking at the chip strip with your group lit rather than partway
 * down a list you did not choose the start of.
 */
type PendingType = { kind: "card"; slug: string } | { kind: "group" };

/**
 * The client half of the grouped service list: it owns which tab is open, and
 * nothing else.
 *
 * `children` arrives already rendered from the server, so the 22 treatment
 * cards and their descriptions never enter this component's bundle. The only
 * data crossing the boundary is `groupOf`, a flat map of 22 short slugs.
 * Passing the services themselves would ship the whole catalogue to the
 * browser, which is the same mistake `data/nav.ts` exists to avoid.
 */
export function GroupTabs({
  groupOf,
  order,
  children,
}: {
  /** Service slug to the slug of the group holding it. */
  groupOf: Record<string, string>;
  /**
   * Every group slug, in the order the panels are rendered. Built on the
   * server from the same blocks as the markup, so left and right can never
   * disagree with what is on screen. It replaced a `defaultValue` prop rather
   * than joining it: the first entry IS the default, and two props saying the
   * same thing is two props that can drift.
   */
  order: readonly string[];
  children: ReactNode;
}) {
  const [value, setValue] = useState(order[0]);
  /**
   * Bumped every time a hash is read, and in the scroll effect's deps
   * alongside `value`.
   *
   * Without it the header's own links are dead on arrival. Clicking
   * "Hydrating and brightening" while that tab is already open sets the value
   * it already holds, React skips the render, the effect never runs and
   * nothing scrolls - so the one link most likely to be clicked twice is the
   * one that appears broken.
   */
  const [arrival, setArrival] = useState(0);
  /* A ref, not state: the thing waiting to be scrolled to is a note to the
     next render, not something the UI shows. As state, clearing it would be a
     setState in an effect body and a second render for nothing.

     Two kinds, because the hash names either one treatment or a whole group,
     and they land in different places. */
  const pendingRef = useRef<PendingType | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  /* Where the finger went down, or null when this touch is not a candidate. */
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  /* Set by a swipe, read and cleared below. A tap never sets it, because the
     chips you just tapped were on screen to be tapped. */
  const swipedRef = useRef(false);
  const mountedRef = useRef(false);
  const index = order.indexOf(value);

  /**
   * SWIPE BETWEEN GROUPS, alongside the chips rather than instead of them.
   *
   * Nearly free, and `keepMounted` is why: all four panels are already in the
   * document, so changing group moves a `hidden` attribute and loads nothing.
   *
   * IT DOES NOT SLIDE, and that is the decision, not an unfinished edge. An
   * animation on a closing panel is what stacked all four on top of each other
   * and took the section from 1,111px to 2,802px; the post-mortem and the four
   * failed fixes are in the header of `TabsPanel`. The swap stays instant.
   */
  function onTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    /* The chip strip is its own horizontal scroller, so a drag starting there
       is someone moving the chips and must not also change the group. */
    if (
      event.touches.length > 1 ||
      (event.target as Element).closest('[data-slot="tabs-list"]')
    ) {
      touchRef.current = null;
      return;
    }
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || index < 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    /* Vertical wins ties. A finger on this page is overwhelmingly there to
       scroll, and a diagonal drag that changes group under someone reading a
       card is worse than a swipe that fails to register. Nothing here calls
       `preventDefault`, so the page scrolls normally either way and the
       listeners stay passive. */
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) <= Math.abs(dy)) return;

    /* Clamped, not wrapped. Four groups is few enough that falling off the
       last one back to the first reads as the tabs losing their place. */
    const next = order[index + (dx < 0 ? 1 : -1)];
    if (!next) return;

    swipedRef.current = true;
    setValue(next);
  }

  /**
   * Keeps the chip strip and the page honest once the group has changed.
   *
   * Two moves, deliberately on separate axes so they cannot fight each other:
   *
   * - The open chip is centred in its OWN scroller. `scrollIntoView` would do
   *   it in one line and move the page vertically as well, undoing the jump
   *   below. `scrollBy` on the strip touches only its horizontal scroll, and
   *   it clamps itself at both ends, so the first and last chips still sit
   *   flush in the gutter instead of centred with a hole beside them.
   * - The section returns to its own top, but only after a swipe. On a phone a
   *   panel runs past 1,100px, so a swipe always lands mid-list; without this
   *   you arrive somewhere inside a group you never saw the start of.
   *
   * Skipped on mount. `TabsList` carries scroll-padding precisely so Base UI's
   * own scroll-into-view lands the first chip in the gutter rather than
   * against the screen edge, and centring it here would undo that on arrival.
   */
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const root = rootRef.current;
    if (!root) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? ("auto" as const)
      : ("smooth" as const);

    const list = root.querySelector('[data-slot="tabs-list"]');
    const tab = list?.querySelectorAll<HTMLElement>(
      '[data-slot="tabs-tab"]',
    )[index];
    if (list && tab) {
      const listBox = list.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      list.scrollBy({
        left:
          tabBox.left +
          tabBox.width / 2 -
          (listBox.left + listBox.width / 2),
        behavior,
      });
    }

    if (!swipedRef.current) return;
    swipedRef.current = false;
    root.scrollIntoView({ block: "start", behavior });
  }, [index]);

  /**
   * Opens the tab a deep link points into.
   *
   * Every treatment card carries `id={slug}`, and links of the form
   * `/#chemical-peel` were published while the header dropdown listed all 22
   * by name. A browser cannot scroll to an element inside a hidden panel, so
   * without this the tabs would silently break every one of those links. The
   * hash names a treatment; this finds the group holding it and opens it.
   *
   * A group slug is accepted as well as a treatment one, and that is what the
   * header's panels are built on. `groupOf` answers "which group holds this
   * card"; `order` is every group there is, so a hash matching one of those
   * opens it directly. Checking `groupOf` first matters: a treatment could one
   * day be slugged the same as a group, and the more specific answer should
   * win.
   *
   * THREE WAYS IN, because no one of them covers the others.
   *
   * - On mount, for anyone arriving from another page or on a pasted link.
   * - On `hashchange`, for the back button and for a plain `<a>`.
   * - On a click, and this one is not belt and braces. A same-page `Link`
   *   updates the URL with `history.pushState`, and pushState fires NOTHING -
   *   not `hashchange`, not `popstate`. Measured: clicking "Hydrating and
   *   brightening" in the header while on the home page left the URL reading
   *   `/#hydrating` with the Cleansing tab still open and the page at the top.
   *   Dispatching the event by hand in the console opened the right tab and
   *   scrolled 1,228px, which is how we know the rest of this was never the
   *   problem.
   *
   *   So the click is read from the anchor rather than from the URL. No
   *   waiting a frame for the router to catch up and no guessing how many:
   *   the link already says where it is going. Only same-page clicks are taken
   *   here, because a click that changes page is answered by the mount above.
   */
  useEffect(() => {
    function open(slug: string) {
      if (!slug) return;
      const holding = groupOf[slug];
      const group = holding ?? (order.includes(slug) ? slug : undefined);
      if (!group) return;
      pendingRef.current = holding ? { kind: "card", slug } : { kind: "group" };
      setValue(group);
      setArrival((count) => count + 1);
    }

    function openForHash() {
      open(decodeURIComponent(window.location.hash.slice(1)));
    }

    function openForClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      open(decodeURIComponent(url.hash.slice(1)));
    }

    openForHash();
    window.addEventListener("hashchange", openForHash);
    document.addEventListener("click", openForClick);
    return () => {
      window.removeEventListener("hashchange", openForHash);
      document.removeEventListener("click", openForClick);
    };
  }, [groupOf, order]);

  /**
   * Scrolls to what the hash asked for, once its panel is genuinely open.
   *
   * Waiting a frame at a time rather than trusting this render is the whole
   * point. On mount this effect runs in the same commit as the `setValue`
   * above, so the tab has been asked to change but nothing has rendered yet,
   * and the panel does not drop its `hidden` attribute on the render after
   * that either. A card inside a hidden panel has no layout, `scrollIntoView`
   * on it silently does nothing, and the failure is invisible: the right tab
   * opens, the page sits at the top, and it just looks like the link did not
   * work. Both earlier attempts at this failed exactly that way.
   *
   * `offsetParent` is null for anything inside a hidden ancestor, which is the
   * signal to wait. Bounded at 20 frames so a slug that never becomes visible
   * gives up instead of spinning.
   */
  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending) return;

    let frame = 0;
    let tries = 0;
    let settling: ReturnType<typeof startSettling> | null = null;

    /**
     * `behavior: "instant"` is doing real work, not stating a default. `html`
     * carries `scroll-behavior: smooth` for anchor clicks and a plain
     * `scrollIntoView` inherits it, which turns the jump into an animation
     * across a 7,800px page - and in a freshly opened tab it does not run at
     * all. Measured: without this the page never left scrollY 0 and the deep
     * link looked dead. Nobody arriving on a link has a scroll position worth
     * animating away from.
     */
    const land = (target: HTMLElement) =>
      target.scrollIntoView({ block: "start", behavior: "instant" });

    /* A group lands on this component rather than on any one card, and the
       root is the same element the swipe returns to, so both ways of changing
       group arrive in the same place. It carries the header clearance below,
       which `scrollIntoView` honours. */
    const find = () =>
      pending.kind === "card"
        ? document.getElementById(pending.slug)
        : rootRef.current;

    /**
     * One jump is not enough on a first visit. The hero and review images
     * above this section have no intrinsic height until they arrive, so the
     * card's offset moves after the jump has already happened and the visitor
     * ends up somewhere in the middle of the list. Measured at 1,359px short.
     *
     * So: re-land while the document is still changing size, give up after a
     * second and a half, and stop immediately if the visitor scrolls. Fighting
     * someone for control of their own scroll position is worse than landing
     * in the wrong place.
     */
    function startSettling(target: HTMLElement) {
      const observer = new ResizeObserver(() => land(target));
      const done = () => {
        observer.disconnect();
        clearTimeout(timer);
        window.removeEventListener("wheel", done);
        window.removeEventListener("touchstart", done);
        window.removeEventListener("keydown", done);
      };
      const timer = setTimeout(done, 1500);

      observer.observe(document.body);
      window.addEventListener("wheel", done, { once: true, passive: true });
      window.addEventListener("touchstart", done, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", done, { once: true });
      return { done };
    }

    const attempt = () => {
      const target = find();
      /* `offsetParent` is null inside a hidden ancestor, which is the signal to
         wait: on mount this effect runs in the same commit as the `setValue`
         above, and the panel does not drop its `hidden` attribute on the next
         render either. A card with no layout cannot be scrolled to, and the
         failure is silent - right tab open, page at the top, link looking
         broken. Bounded at 20 frames so a slug that never appears gives up.

         A group's target is the root, which is never hidden, so it passes on
         the first frame and the wait costs it nothing. */
      if (target && target.offsetParent !== null) {
        pendingRef.current = null;
        land(target);
        settling = startSettling(target);
        return;
      }
      if (tries++ < 20) frame = requestAnimationFrame(attempt);
      else pendingRef.current = null;
    };

    attempt();
    return () => {
      cancelAnimationFrame(frame);
      settling?.done();
    };
  }, [value, arrival]);

  return (
    <Tabs
      ref={rootRef}
      value={value}
      onValueChange={(next) => setValue(next as string)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      /* Clearance for the header that returns on scroll up. This is where
         every group link in the header lands, and where a swipe returns to.

         TWO VALUES, because the header has two heights. Below `xsm` it wraps
         Book now onto its own full-width row and stands 172px tall; from
         `xsm` it is one row and the 96px that every card uses is right.
         Measured on a 375px viewport: one value of 96px put the chip strip at
         y=96 under a 172px header, so you arrived on the correct group with
         the chips that prove it hidden behind the logo.

         `xsm` is 440px, which is wider than every current phone - the 15 Pro
         Max is 430 - so the tall header is the one virtually all her visitors
         get, not an edge case. */
      className="scroll-mt-44 xsm:scroll-mt-24 gap-10"
    >
      {children}
    </Tabs>
  );
}
