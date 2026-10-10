import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        /* inline-flex so a centred parent still centres it; the copper rule leads it in. */
        "inline-flex items-center gap-3 font-sans text-xs font-medium tracking-[0.18em] uppercase text-accent-foreground before:h-px before:w-7 before:bg-copper before:content-[''] in-data-[tone=dark]:text-copper-soft",
        className,
      )}
      {...props}
    />
  );
}
