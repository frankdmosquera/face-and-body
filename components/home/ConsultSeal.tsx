import { useId } from "react";
import { Orchid } from "@/components/brand/Orchid";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/cn";

/**
 * A round seal whose ring of words turns slowly around a still orchid: the
 * free consultation, said once more as an object rather than a sentence.
 * Decorative, so hidden from screen readers; the same offer is in the copy
 * beside it every time it is used.
 */
export function ConsultSeal({ className }: { className?: string }) {
  const ring = useId();
  const text = `Free consultation · ${siteConfig.consultation.durationMin} minutes · `;

  /* The ring is 2 x pi x 38 = 239 units round; the words are spread to 236 so
     the last dot always lands just short of the first letter, whatever the font. */
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative grid size-28 place-items-center rounded-full bg-linear-to-br from-gold-soft via-gold to-gold-deep text-dark shadow-[0_18px_40px_rgba(28,26,23,0.25)] ring-1 ring-gold-soft/60",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="lift-spin absolute inset-0 size-full"
      >
        <defs>
          <path
            id={ring}
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-current text-[8.4px] uppercase">
          <textPath href={`#${ring}`} textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Orchid className="h-9 w-8" />
    </div>
  );
}
