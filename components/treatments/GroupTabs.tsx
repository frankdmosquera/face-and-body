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
  /* A ref, not state: the card waiting to be scrolled to is a note to the next
     render, not something the UI shows. As state, clearing it would be a
     setState in an effect body and a second render for nothing. */
  const pendingRef = useRef<string | null>(null);
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
   * `hashchange` as well as mount, because clicking a same-page anchor while
   * already on the page fires that and nothing else.
   */
  useEffect(() => {
    function openTabForHash() {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      const group = slug ? groupOf[slug] : undefined;
      if (!group) return;
      pendingRef.current = slug;
      setValue(group);
    }

    openTabForHash();
    window.addEventListener("hashchange", openTabForHash);
    return () => window.removeEventListener("hashchange", openTabForHash);
  }, [groupOf]);

  /**
   * Scrolls to the card once its panel is genuinely open.
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
    const slug = pendingRef.current;
    if (!slug) return;

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
    const land = (card: HTMLElement) =>
      card.scrollIntoView({ block: "start", behavior: "instant" });

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
    function startSettling(card: HTMLElement) {
      const observer = new ResizeObserver(() => land(card));
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
      const card = document.getElementById(slug);
      /* `offsetParent` is null inside a hidden ancestor, which is the signal to
         wait: on mount this effect runs in the same commit as the `setValue`
         above, and the panel does not drop its `hidden` attribute on the next
         render either. A card with no layout cannot be scrolled to, and the
         failure is silent - right tab open, page at the top, link looking
         broken. Bounded at 20 frames so a slug that never appears gives up. */
      if (card && card.offsetParent !== null) {
        pendingRef.current = null;
        land(card);
        settling = startSettling(card);
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
  }, [value]);

  return (
    <Tabs
      ref={rootRef}
      value={value}
      onValueChange={(next) => setValue(next as string)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      /* `scroll-mt-24` is the clearance the cards already use for the header
         that returns on scroll up, and the swipe scrolls to this element. */
      className="scroll-mt-24 gap-10"
    >
      {children}
    </Tabs>
  );
}
