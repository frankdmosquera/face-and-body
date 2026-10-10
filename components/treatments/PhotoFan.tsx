import { Photo } from "@/components/media/Photo";
import type { ImageSlotType } from "@/data/imagesData";
import { cn } from "@/lib/cn";

/* Back to front: each card's tilt and offset, written out so Tailwind sees them. */
const PLACE = [
  "-left-2 top-16 -rotate-[11deg]",
  "-right-2 top-16 rotate-[11deg]",
  "left-1/2 top-0 z-10 w-[46%] -translate-x-1/2 rotate-[-1deg]",
];

/**
 * Three treatment photographs fanned like cards on the page's dark header, the
 * front one straight and the two behind it tilted out. They spread a little
 * further on hover. Decorative: the treatments are all in the tabs below.
 */
export function PhotoFan({
  slots,
  className,
}: {
  slots: readonly [ImageSlotType, ImageSlotType, ImageSlotType];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("group relative h-[400px] w-full", className)}
    >
      {slots.map((slot, index) => (
        <div
          key={slot}
          className={cn(
            "absolute aspect-[3/4] w-[42%] overflow-hidden rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-[rotate,translate] duration-500 ease-out",
            PLACE[index],
            index === 0 &&
              "group-hover:-translate-x-3 group-hover:-rotate-[12deg]",
            index === 1 &&
              "group-hover:translate-x-3 group-hover:rotate-[11deg]",
          )}
        >
          <Photo slot={slot} fill sizes="240px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
