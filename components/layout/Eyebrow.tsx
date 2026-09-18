import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "block font-sans text-xs font-medium tracking-[0.18em] uppercase text-accent-foreground in-data-[tone=dark]:text-copper-soft",
        className,
      )}
      {...props}
    />
  );
}
