import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-accent px-2.5 py-1 text-[11px] tracking-[0.06em] text-accent-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}
