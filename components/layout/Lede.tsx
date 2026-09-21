import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Lede({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-[56ch] text-[17px] text-muted-foreground lg:text-[19px] in-data-[tone=dark]:text-on-dark-muted",
        className,
      )}
      {...props}
    />
  );
}
