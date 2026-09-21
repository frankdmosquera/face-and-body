import type { ComponentProps } from "react";
import { Orchid } from "@/components/brand/Orchid";
import { cn } from "@/lib/cn";

// The parent supplies `relative` and the offset classes.
export function Watermark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <Orchid
      className={cn(
        "pointer-events-none absolute h-[540px] w-[520px] text-copper opacity-[0.07] dark:opacity-10",
        className,
      )}
      {...props}
    />
  );
}
