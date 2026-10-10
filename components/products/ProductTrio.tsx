import { PhotoByPath } from "@/components/media/PhotoByPath";
import { productsData } from "@/data/productsData";
import { cn } from "@/lib/cn";

/* The three products the home page's Eminence band names, in routine order. */
const TRIO = [
  "stone-crop-gel-wash",
  "bright-skin-licorice-root-booster-serum",
  "stone-crop-whip-moisturizer",
].flatMap((slug) => productsData.filter((product) => product.slug === slug));

/**
 * Cleanser, serum and moisturiser grouped on a warm ground, the serum raised in
 * the middle. The packshots are on pure white, so they multiply into the ground
 * instead of sitting on it as white rectangles. Fills its parent.
 */
export function ProductTrio({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b from-copper-tint to-surface px-4",
        className,
      )}
    >
      <span className="font-serif text-[22px] text-copper italic lg:text-[26px]">
        Eminence Organics
      </span>
      <div className="mt-4 flex w-full items-end justify-center">
        {TRIO.map((product, index) => (
          <PhotoByPath
            key={product.slug}
            path={product.image}
            alt={product.name}
            width={1500}
            height={1125}
            sizes="25vw"
            className={cn(
              "-mx-[7%] w-[44%] shrink-0 object-contain mix-blend-multiply",
              index === 1 && "z-10 w-[54%] -translate-y-[10%]",
            )}
          />
        ))}
      </div>
    </div>
  );
}
