import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "sand" | "dark";

const tones: Record<Tone, string> = {
  default: "",
  sand: "bg-secondary",
  // A brand band, not a theme surface: the same dark in both themes.
  //
  // dark-surface rather than dark, and that is the whole of it. It used to be
  // #1c1a17 in the light theme and #2a2723 in the dark one, five points of
  // lightness apart, and the dark theme's was the better band: the cards are a
  // translucent white wash, so on the lighter ground they composite brighter
  // and lift further off it. Now both themes get that one.
  //
  // The footer keeps #1c1a17 on purpose. A band is espresso, the floor under
  // the page is darker still.
  dark: "bg-dark-surface text-on-dark",
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
