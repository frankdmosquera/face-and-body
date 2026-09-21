import { Image } from "@imagekit/next";
import { imagekitEndpoint, MEDIA_VERSION } from "@/lib/imagekitConfig";
import { cn } from "@/lib/cn";

type Props = {
  /** Library path, relative to the `face-and-body` folder:
   *  `/product-images/facials/cleansing/x.jpg`, `/reviews/abigail-l.jpg`. */
  path: string;
  alt: string;
  /** Intrinsic size of the master, so the browser can reserve space. */
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A library photograph addressed by path rather than by a named slot.
 *
 * `Photo` is the other half of this: it takes a slot from `imagesData`, which
 * carries the alt text and the intrinsic size alongside the path. That is the
 * right shape for the handful of photographs chosen one at a time, the hero
 * and the category shots, where the alt text is a sentence somebody wrote.
 *
 * It is the wrong shape for a set. 133 packshots and 8 reviewer avatars would
 * mean 141 hand-written slots whose alt text is either the product name or
 * empty, restating data that already exists in `productsData` and
 * `reviewsData`. So these carry their path with them and pass it here.
 */
export function PhotoByPath({
  path,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
}: Props) {
  if (!imagekitEndpoint) {
    return (
      <div
        role={alt ? "img" : "presentation"}
        aria-label={alt || undefined}
        className={cn(
          "grid place-items-center bg-placeholder p-2 text-center text-[11px] tracking-[0.14em] text-placeholder-text uppercase",
          className,
        )}
      >
        {alt}
      </div>
    );
  }

  return (
    <Image
      urlEndpoint={imagekitEndpoint}
      src={path}
      alt={alt}
      width={width}
      height={height}
      queryParameters={{ v: MEDIA_VERSION }}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
