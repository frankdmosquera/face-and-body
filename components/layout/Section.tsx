import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "sand" | "dark";

const tones: Record<Tone, string> = {
  default: "",
  sand: "bg-secondary",
  // A brand band, not a theme surface: stays dark in both themes.
  dark: "bg-dark text-on-dark",
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
