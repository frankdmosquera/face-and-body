import { cn } from "@/lib/cn";

/* Water rings: the clinic sits beside the Midnapore lake. */
const RINGS = [70, 120, 170, 220, 270, 320, 370];

/**
 * The background options for the top of a page, one shown at a time by the
 * design options (`lib/designOptions.ts`); "Plain" shows none of them. All
 * decorative, behind the copy, so the caller's content needs `relative`.
 *
 * PLATE: the round plate from the /products hero, very large. `seam` puts its
 * centre on the right edge of the box (home, where a photograph covers the
 * other half); `right` sits it whole behind the right-hand side.
 * GLOW: a warm wash from the top corner, a pool of gold low down and one of
 * the clinic's tagline words set huge and faint.
 * RINGS: fine gold circles spreading from the bottom corner, like rings on
 * still water.
 *
 * `light` is for cream heroes, `dark` for the espresso ones. The light
 * versions are brand constants, so each carries a `dark:` value of its own
 * rather than putting cream under dark-theme text.
 */
export function Backdrop({
  group,
  tone = "light",
  plate = "seam",
  word = "Radiate",
  className,
}: {
  group: string;
  tone?: "light" | "dark";
  plate?: "seam" | "right";
  word?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  const box = cn(
    "pointer-events-none absolute inset-0 overflow-hidden",
    className,
  );

  return (
    <>
      <div
        data-option={`${group}-plate`}
        aria-hidden="true"
        className={cn(box, "hidden lg:block")}
      >
        <div
          className={cn(
            "absolute rounded-full ring-1 ring-offset-[10px]",
            plate === "seam"
              ? "top-1/2 -right-[24rem] size-[48rem] -translate-y-1/2"
              : "top-1/2 right-[2%] size-[36rem] -translate-y-1/2",
            dark
              ? "bg-linear-to-b from-on-dark/[0.09] to-on-dark/[0.02] ring-gold/30 ring-offset-dark-surface"
              : "bg-linear-to-b from-copper-tint to-surface shadow-[0_40px_80px_-40px_rgba(28,26,23,0.25)] ring-gold/40 ring-offset-background dark:from-copper/15 dark:to-transparent dark:ring-gold/20",
          )}
        />
      </div>
      <div
        data-option={`${group}-glow`}
        aria-hidden="true"
        className={cn(
          box,
          !dark &&
            "bg-linear-to-br from-copper-tint via-background to-background dark:from-copper/10",
        )}
      >
        {dark && (
          <div className="absolute -top-40 right-[10%] size-[34rem] rounded-full bg-copper/25 blur-[120px]" />
        )}
        <div
          className={cn(
            "absolute -bottom-48 -left-24 size-[38rem] rounded-full blur-[120px]",
            dark ? "bg-gold/15" : "bg-gold/25",
          )}
        />
        <span
          className={cn(
            "absolute right-6 -bottom-6 font-serif text-[120px] leading-none italic select-none lg:-bottom-10 lg:text-[220px]",
            dark ? "text-gold/10" : "text-gold/20",
          )}
        >
          {word}
        </span>
      </div>
      <div
        data-option={`${group}-rings`}
        aria-hidden="true"
        className={cn(box, !dark && "bg-secondary")}
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          className={cn(
            "absolute bottom-0 left-0 size-[64rem] -translate-x-[38%] translate-y-[52%]",
            dark ? "text-gold/30" : "text-gold/70",
          )}
        >
          {RINGS.map((r) => (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    </>
  );
}
