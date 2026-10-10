"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The only script behind "Your visit": it marks which step sits in the middle
 * of the screen as `data-active` on this wrapper, and CSS does the rest (the
 * pinned picture crossfades, the step brightens). The steps themselves stay
 * server rendered and arrive as children.
 *
 * Without JavaScript the wrapper keeps `data-active="0"`: the first picture
 * shows and every step reads in full, which is a complete section.
 */
export function StoryWatch({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = root.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            wrapper.setAttribute(
              "data-active",
              entry.target.getAttribute("data-step") ?? "0",
            );
          }
        }
      },
      // A thin band across the middle of the screen: a step is active while
      // it crosses it.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    wrapper
      .querySelectorAll("[data-step]")
      .forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} data-active="0" className={className}>
      {children}
    </div>
  );
}
