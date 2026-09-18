import type { ComponentProps } from "react";
import { Orchid } from "@/components/brand/Orchid";
import { cn } from "@/lib/utils";

const hairline =
  "h-px w-12 bg-border lg:w-24 in-data-[tone=dark]:bg-dark-surface";

export function Divider({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-center gap-6 py-2", className)}
      {...props}
    >
      <span className={hairline} />
      <Orchid className="h-[46px] w-11 text-copper" />
      <span className={hairline} />
    </div>
  );
}
