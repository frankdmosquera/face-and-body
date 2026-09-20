import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

/**
 * The mark, then the wordmark.
 *
 * WHY THE TEXT STAYS. The logo is added beside the words rather than instead of
 * them. The name in the header is the one Google reads, it recolours itself
 * between themes for free, and it stays sharp at any density. Swapping it for a
 * picture of the same words gives all three away.
 *
 * WHY A PLAIN `img`. The same reason `ReviewCard` gives: a 36px square that is
 * already the right size gains nothing from an optimisation pipeline, and it
 * must be in the server HTML rather than mounting after hydration, or the
 * header would settle visibly on every page load.
 *
 * WHY IT IS ROUND, AND WHY THE WHITE STAYS. The source is her Instagram avatar,
 * a 150px JPEG of copper orchids and black hair on white. Knocking the white out
 * is possible - 58% of the image is background and all but 0.2% of it is
 * reachable from the border - but it is the wrong answer here: the hair is black
 * and the header is nearly black, so a transparent mark loses its own silhouette
 * in dark mode. Kept as a white disc it is legible on either theme and reads as
 * the badge it already is on her own profile.
 *
 * DECORATIVE ON PURPOSE. The business name is rendered right beside it, so alt
 * text would make a screen reader say it twice.
 */
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
    >
      {/* The source is 150px square but the artwork only occupies the middle
          117x122 of it, so a straight render wastes a fifth of the badge on
          white margin and the mark reads smaller than the circle it sits in.
          The disc is the fixed size; the image is scaled up inside it and the
          surplus white is clipped, so the orchid fills its own badge. */}
      <span className="size-20 shrink-0 overflow-hidden rounded-full bg-white lg:size-22">
        <Image
          src="/logo-mark.jpg"
          alt=""
          aria-hidden="true"
          width={88}
          height={88}
          // In the header of every page, above the fold on all of them.
          priority
          className="size-full scale-[1.28]"
        />
      </span>
      {/* THE MARK ALONE UNTIL `sm`, THEN THE LOCKUP.
          Measured at 440, which is the tightest width the header has: the row
          had 390px of content in 400px of container, 10px spare, so the disc
          could not grow by a single step without pushing the burger onto
          another line. The wordmark is the cheapest thing in that row to drop,
          because the mark is the brand and the name is two taps away in the
          menu, on the contact page and in the footer of every page.

          It leaves the HTML, not the page. The `sr-only` name below carries the
          link's accessible name for a screen reader and the full business name
          for a crawler, so nothing is lost to either - only to the eye, and
          only on a phone. */}
      <span className="sr-only sm:hidden">{siteConfig.name}</span>
      <span className="hidden font-serif text-lg leading-none tracking-[0.04em] sm:block lg:text-[26px]">
        {siteConfig.shortName}
        <small className="mt-1 block font-sans text-[9px] tracking-[0.22em] uppercase text-muted-foreground lg:mt-1.5 lg:text-[11px]">
          {siteConfig.subName}
        </small>
      </span>
    </Link>
  );
}
