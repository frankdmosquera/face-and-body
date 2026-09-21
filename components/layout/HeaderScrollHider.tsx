"use client";

// Client because it listens to scroll; the header markup it wraps stays on the server.
import type { ReactNode } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/cn";

export function HeaderScrollHider({ children }: { children: ReactNode }) {
  const { visible, show } = useScrollDirection();

  return (
    <header
      // Keyboard focus landing in a hidden header brings it back, so Tab never targets an invisible link.
      onFocus={show}
      className={cn(
        "sticky top-0 z-20 border-b border-border bg-background/88 backdrop-blur-[10px]",
        "transition-transform duration-300 motion-reduce:transition-none",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      {children}
    </header>
  );
}
