import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "sand" | "dark";

const tones: Record<Tone, string> = {
  default: "",
  sand: "bg-secondary",
  // A brand band, not a theme surface: stays dark in both themes, one step
  // lighter than the page in dark mode so it still reads as a band.
  dark: "bg-dark text-on-dark dark:bg-dark-surface",
};

export function Section({
  tone = "default",
  className,
  ...props
}: ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section
      data-tone={tone}
      className={cn("py-section-sm lg:py-section", tones[tone], className)}
      {...props}
    />
  );
}
