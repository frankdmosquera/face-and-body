import { Image } from "@imagekit/next";
import { imagesData, type ImageSlotType } from "@/data/imagesData";
import { imagekitEndpoint, MEDIA_VERSION } from "@/lib/imagekitConfig";
import { cn } from "@/lib/cn";

type Props = {
  slot: ImageSlotType;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

/**
 * Site photography, by named slot. Anything with a slot in `imagesData`
 * belongs here: the hero, the category shots, the room.
 *
 * Catalogue packshots go through `ProductPhoto` instead. They are addressed by
 * path rather than by slot because there are 133 of them and a hand-written
 * slot per product, each needing its own alt text, is a worse file than the
 * problem it solves.
 */
export function Photo({ slot, className, sizes, priority, fill }: Props) {
  const image = imagesData[slot];

  if (!imagekitEndpoint) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn(
          "grid place-items-center bg-placeholder text-center text-[11px] tracking-[0.14em] text-placeholder-text uppercase",
          fill ? "absolute inset-0" : "aspect-[3/4] w-full",
          className,
        )}
      >
        {slot}
      </div>
    );
  }

  return (
    <Image
      urlEndpoint={imagekitEndpoint}
      src={image.path}
      alt={image.alt}
      width={fill ? undefined : image.w}
      height={fill ? undefined : image.h}
      fill={fill}
      queryParameters={{ v: MEDIA_VERSION }}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
