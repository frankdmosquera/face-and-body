"use client";

// Client because it reads and writes the theme through next-themes.
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const subscribe = () => () => {};

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The server does not know the stored theme, so the label settles after hydration.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";

  // A view transition crossfades the page; browsers without it just switch.
  function toggle() {
    const next = dark ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
    >
      <Sun className="size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
    </button>
  );
}
