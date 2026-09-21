import { cn } from "@/lib/cn";

export function Stars({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("tracking-[2px] text-copper", className)}
    >
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </span>
  );
}
