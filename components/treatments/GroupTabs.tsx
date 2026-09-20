"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Tabs } from "@/components/ui/tabs";

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
  defaultValue,
  children,
}: {
  /** Service slug to the slug of the group holding it. */
  groupOf: Record<string, string>;
  defaultValue: string;
  children: ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  /* A ref, not state: the card waiting to be scrolled to is a note to the next
     render, not something the UI shows. As state, clearing it would be a
     setState in an effect body and a second render for nothing. */
  const pendingRef = useRef<string | null>(null);

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
      value={value}
      onValueChange={(next) => setValue(next as string)}
      className="gap-10"
    >
      {children}
    </Tabs>
  );
}
