"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True at the top of the page and while scrolling up; false while scrolling down. */
export function useScrollDirection(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      if (y < threshold) setVisible(true);
      else setVisible(y < lastY.current);
      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const show = useCallback(() => setVisible(true), []);

  return { visible, show };
}
